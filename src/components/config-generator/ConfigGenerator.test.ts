// @vitest-environment jsdom
// src/components/config-generator/ConfigGenerator.test.ts
//
// Mounts the generator island the way a browser does, to cover what
// generate.test.ts cannot: the fallback a reader sees if the island never
// hydrates, the reset of a dependent option when its requirement goes away,
// URL mirroring in both directions, and the clipboard and download feedback
// including the failure paths. revealChange() is not covered: jsdom has no
// layout, so the output column never scrolls and it returns early.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { flushPromises, mount, type VueWrapper } from '@vue/test-utils';
import { createSSRApp } from 'vue';
import { renderToString } from 'vue/server-renderer';
import ConfigGenerator from './ConfigGenerator.vue';

const PAGE = '/en/reference/generator/';
const READY = 'Ready. Files update as you change options.';

let wrapper: VueWrapper | undefined;

beforeEach(() => {
  window.history.replaceState(null, '', PAGE);
});

afterEach(() => {
  wrapper?.unmount();
  wrapper = undefined;
  delete (navigator as { clipboard?: unknown }).clipboard;
  delete (URL as { createObjectURL?: unknown }).createObjectURL;
  delete (URL as { revokeObjectURL?: unknown }).revokeObjectURL;
  vi.restoreAllMocks();
  vi.useRealTimers();
});

/** jsdom has no Clipboard API; install one whose writeText resolves or rejects. */
function installClipboard(writeText: (text: string) => Promise<void>) {
  Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
}

/**
 * Mount and wait one tick: onMounted sets `ready`, but the render that drops
 * the `disabled` attributes runs on the next tick, and Vue Test Utils does not
 * dispatch events to a disabled control (as a browser would not).
 */
async function mountReady() {
  wrapper = mount(ConfigGenerator);
  await flushPromises();
  return wrapper;
}

const control = <T extends HTMLElement>(key: string) => wrapper!.get<T>(`#cg-${key}`);
const output = (key: string) => wrapper!.get(`[data-file="${key}"] pre`).text();
const status = () => wrapper!.get('.cg-status').text();
const warnings = () => wrapper!.find('.cg-warnings');

describe('ConfigGenerator', () => {
  it('renders the fallback with every control disabled until it hydrates', async () => {
    // The server output is what a reader sees if the island never hydrates.
    const html = await renderToString(createSSRApp(ConfigGenerator));
    expect(html).toContain('The interactive generator has not loaded yet.');
    expect(html).toContain('href="/en/reference/configuration-files-and-precedence/"');
    expect(html).not.toContain('class="cg-status"');
    const fieldsets = html.match(/<fieldset[^>]*>/g) ?? [];
    expect(fieldsets.length).toBeGreaterThan(0);
    for (const tag of fieldsets) expect(tag).toContain('disabled');
    const buttons = html.match(/<button[^>]*>/g) ?? [];
    expect(buttons).toHaveLength(6);
    for (const tag of buttons) expect(tag).toContain('disabled');
  });

  it('drops the fallback, enables the controls and reports ready once mounted', async () => {
    wrapper = mount(ConfigGenerator);
    // Straight after mount the controls are still inert; the ready render is a tick away.
    expect(wrapper.get('[aria-label="Copy .env"]').attributes('disabled')).toBeDefined();
    await flushPromises();
    expect(wrapper.find('.cg-loading').exists()).toBe(false);
    expect(status()).toBe(READY);
    for (const fieldset of wrapper.findAll('fieldset')) expect(fieldset.attributes('disabled')).toBeUndefined();
    for (const button of wrapper.findAll('button')) expect(button.attributes('disabled')).toBeUndefined();
    expect(output('authYaml')).toBe('mode: simple');
    expect(output('envSnippet')).toContain('SECRET=');
  });

  it('puts one hidden h2 over the files and an h3 on each, so the outline nests under the host page', () => {
    wrapper = mount(ConfigGenerator);
    const section = wrapper.get('#generated-files');
    expect(section.attributes('aria-labelledby')).toBe('cg-output-title');
    expect(wrapper.get('#cg-output-title').element.tagName).toBe('H2');
    expect(wrapper.findAll('h2')).toHaveLength(1);
    expect(wrapper.findAll('.cg-file h3')).toHaveLength(3);
    expect(wrapper.findAll('.cg-file h2')).toHaveLength(0);
  });

  it('resets a dependent option when its requirement goes away, instead of warning', async () => {
    wrapper = mount(ConfigGenerator);
    await control<HTMLSelectElement>('deployment_mode').setValue('full');
    await control<HTMLInputElement>('sso_enabled').setValue(true);
    expect(output('authYaml')).toContain('sso: true');
    expect(status()).toBe('Updated auth.yaml.');

    await control<HTMLSelectElement>('deployment_mode').setValue('simple');
    await flushPromises();
    expect(control<HTMLInputElement>('sso_enabled').element.checked).toBe(false);
    expect(control<HTMLInputElement>('sso_enabled').attributes('disabled')).toBeDefined();
    expect(warnings().exists()).toBe(false);
    expect(output('authYaml')).toBe('mode: simple');
  });

  it('seeds its state from the URL without marking anything as changed', async () => {
    window.history.replaceState(null, '', `${PAGE}?deployment_mode=full&default_ttl=300`);
    wrapper = mount(ConfigGenerator);
    await flushPromises();
    expect(control<HTMLSelectElement>('deployment_mode').element.value).toBe('full');
    expect(control<HTMLSelectElement>('default_ttl').element.value).toBe('300');
    // Full mode also writes the full.features block, all off.
    expect(output('authYaml')).toContain('mode: full');
    expect(output('authYaml')).toContain('sso: false');
    expect(output('configYaml')).toContain('default_ttl: 300');
    expect(wrapper.findAll('.cg-line.is-changed')).toHaveLength(0);
    expect(status()).toBe(READY);
  });

  it('keeps a stale shared-link value, with its warning, until the unmet set itself changes', async () => {
    window.history.replaceState(null, '', `${PAGE}?sso_enabled=true`);
    wrapper = mount(ConfigGenerator);
    await flushPromises();
    expect(warnings().text()).toBe('Single sign-on (SSO) requires deployment_mode: "full"; ignoring the selected value.');
    expect(output('authYaml')).toBe('mode: simple');

    // An unrelated change leaves it alone: the reset watcher runs when the set
    // of unmet options changes, not on every change.
    await control<HTMLInputElement>('domains_enabled').setValue(true);
    expect(warnings().exists()).toBe(true);

    // Meeting the requirement honours the seeded value; dropping it resets it.
    await control<HTMLSelectElement>('deployment_mode').setValue('full');
    await flushPromises();
    expect(warnings().exists()).toBe(false);
    expect(output('authYaml')).toContain('sso: true');
    await control<HTMLSelectElement>('deployment_mode').setValue('simple');
    await flushPromises();
    expect(control<HTMLInputElement>('sso_enabled').element.checked).toBe(false);
    expect(warnings().exists()).toBe(false);
  });

  it('mirrors changes into the URL, omitting defaults, and highlights only the lines that changed', async () => {
    wrapper = mount(ConfigGenerator);
    await control<HTMLInputElement>('domains_enabled').setValue(true);
    expect(window.location.search).toBe('?domains_enabled=true');
    expect(status()).toBe('Updated config.yaml.');
    const changed = wrapper.findAll('.cg-line.is-changed');
    expect(changed).toHaveLength(1);
    expect(changed[0].text()).toBe('enabled: true');

    await control<HTMLInputElement>('domains_enabled').setValue(false);
    expect(window.location.search).toBe('');
  });

  it('confirms a copy on the button and for screen readers, then reverts', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    const writeText = vi.fn<(text: string) => Promise<void>>().mockResolvedValue(undefined);
    installClipboard(writeText);
    await mountReady();
    const copy = wrapper!.get('[aria-label="Copy .env"]');
    await copy.trigger('click');
    await flushPromises();
    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText.mock.calls[0]?.[0]).toContain('SECRET=\n');
    expect(copy.text()).toBe('Copied');
    expect(wrapper!.get('.cg-sr-only[aria-live]').text()).toBe('.env copied to clipboard');

    vi.advanceTimersByTime(1500);
    await flushPromises();
    expect(copy.text()).toBe('Copy');
    expect(wrapper!.get('.cg-sr-only[aria-live]').text()).toBe('');
  });

  it('explains a refused copy in the status line and points at Download', async () => {
    installClipboard(vi.fn<(text: string) => Promise<void>>().mockRejectedValue(new Error('denied')));
    await mountReady();
    await wrapper!.get('[aria-label="Copy auth.yaml"]').trigger('click');
    await flushPromises();
    expect(status()).toBe('Could not copy auth.yaml. Select the text or use Download instead.');
    expect(wrapper!.get('[aria-label="Copy auth.yaml"]').text()).toBe('Copy');
  });

  it('copes with a browser that has no clipboard API at all', async () => {
    // jsdom ships none, which is also what an insecure (http) origin gets.
    await mountReady();
    await wrapper!.get('[aria-label="Copy config.yaml"]').trigger('click');
    await flushPromises();
    expect(status()).toBe('Could not copy config.yaml. Select the text or use Download instead.');
  });

  it('clears the copy-confirmation timer on unmount', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    installClipboard(vi.fn<(text: string) => Promise<void>>().mockResolvedValue(undefined));
    await mountReady();
    await wrapper!.get('[aria-label="Copy .env"]').trigger('click');
    await flushPromises();
    expect(vi.getTimerCount()).toBe(1);
    wrapper!.unmount();
    wrapper = undefined;
    expect(vi.getTimerCount()).toBe(0);
  });

  it('downloads a file under its real name and releases the object URL', async () => {
    const createObjectURL = vi.fn<(blob: Blob) => string>(() => 'blob:cg');
    const revokeObjectURL = vi.fn();
    Object.defineProperty(URL, 'createObjectURL', { value: createObjectURL, configurable: true });
    Object.defineProperty(URL, 'revokeObjectURL', { value: revokeObjectURL, configurable: true });
    const downloads: string[] = [];
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      downloads.push(this.download);
    });

    await mountReady();
    await wrapper!.get('[aria-label="Download .env"]').trigger('click');
    expect(downloads).toEqual(['.env']);
    const blob = createObjectURL.mock.calls[0]?.[0] as Blob | undefined;
    expect(blob?.type).toBe('text/plain;charset=utf-8');
    expect(await blob?.text()).toContain('SECRET=\n');
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:cg');
    expect(document.querySelector('a[download]')).toBeNull();
  });
});
