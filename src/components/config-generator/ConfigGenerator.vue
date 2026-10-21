<!-- src/components/config-generator/ConfigGenerator.vue -->
<!--
  Configuration Generator: a self-contained, client-side tool that turns a
  handful of preset choices into ready-to-use etc/config.yaml / etc/auth.yaml
  override fragments plus a companion .env starter.

  It runs entirely in the browser inside the docs site: the vendored config JSON
  schemas (src/components/config-generator/schemas) provide field defaults and constraints, a
  small preset manifest (presets.ts) supplies the curation and ENV mapping, and
  the YAML is generated locally (generate.ts). No dependency on the running
  application.

  Selections are mirrored into the URL query string, so a configured link is
  shareable and bookmarkable. Secrets are only ever shown as empty .env
  placeholders; nothing sensitive is baked into the output.

  The root carries `not-content` so Starlight's prose rules (sibling margins,
  code and table styles) stay out of the tool's own layout.
-->

<script setup lang="ts">
  import { computed, onMounted, reactive, ref, watch } from 'vue';
  import { GROUPS, OPTIONS, type OptionSpec } from './presets';
  import {
    choicesFor,
    coerce,
    defaultFor,
    defaultSelections,
    generate,
    toQuery,
    type Selections,
  } from './generate';

  const selections = reactive<Selections>(defaultSelections());

  const groups = GROUPS.map((group) => ({
    ...group,
    options: OPTIONS.filter((opt) => opt.group === group.key),
  }));

  const outputs = [
    { key: 'configYaml' as const, label: 'config.yaml', filename: 'config.yaml' },
    { key: 'authYaml' as const, label: 'auth.yaml', filename: 'auth.yaml' },
    { key: 'envSnippet' as const, label: '.env', filename: '.env' },
  ];
  type OutputKey = (typeof outputs)[number]['key'];
  const activeOutput = ref<OutputKey>('configYaml');
  const tabRefs = ref<HTMLButtonElement[]>([]);
  const copied = ref(false);

  const result = computed(() => generate({ ...selections }));

  const activeMeta = computed(
    () => outputs.find((o) => o.key === activeOutput.value) ?? outputs[0]
  );
  const activeContent = computed(() => {
    const content = result.value[activeOutput.value];
    return content && content.length ? content : '# Nothing to override; the shipped defaults apply.\n';
  });

  function requirementMet(opt: OptionSpec): boolean {
    if (!opt.requires) return true;
    return Object.entries(opt.requires).every(([dep, val]) => selections[dep] === val);
  }
  function requirementHint(opt: OptionSpec): string {
    if (!opt.requires) return '';
    return Object.entries(opt.requires)
      .map(([dep, val]) => {
        const depOpt = OPTIONS.find((o) => o.key === dep);
        const choice = depOpt && choicesFor(depOpt).find((c) => c.value === val);
        const choiceLabel = choice?.label.split(':')[0] ?? String(val);
        return `${choiceLabel} ${(depOpt?.label ?? dep).toLowerCase()}`;
      })
      .join(' and ');
  }
  function describedBy(opt: OptionSpec): string | undefined {
    const ids = [
      opt.description && `cg-${opt.key}-desc`,
      !requirementMet(opt) && `cg-${opt.key}-req`,
    ].filter(Boolean);
    return ids.length ? ids.join(' ') : undefined;
  }

  // ── URL <-> state sync ──────────────────────────────────────────────
  function seedFromUrl() {
    const params = new URLSearchParams(window.location.search);
    for (const opt of OPTIONS) {
      const raw = params.get(opt.key);
      selections[opt.key] = raw == null ? defaultFor(opt) : coerce(opt, raw);
    }
  }
  function syncUrl() {
    const query = toQuery(selections);
    const search = new URLSearchParams(query).toString();
    const url = search ? `${window.location.pathname}?${search}` : window.location.pathname;
    window.history.replaceState(null, '', url);
  }

  onMounted(() => {
    seedFromUrl();
    watch(selections, syncUrl, { deep: true });
    // When a change leaves a dependent option's requirement unmet (switching
    // back to Simple mode with SSO on), reset it rather than leaving a stale
    // value for generate() to warn about. A stale value seeded from a shared
    // link is left alone, so that link still gets its warning.
    watch(
      () => OPTIONS.filter((opt) => !requirementMet(opt)).map((opt) => opt.key),
      (unmet) => {
        for (const key of unmet) {
          const opt = OPTIONS.find((o) => o.key === key);
          if (opt) selections[key] = defaultFor(opt);
        }
      }
    );
  });

  // ── Tabs ────────────────────────────────────────────────────────────
  function onTabKeydown(event: KeyboardEvent, index: number) {
    const last = outputs.length - 1;
    const next =
      event.key === 'ArrowRight' ? (index === last ? 0 : index + 1)
      : event.key === 'ArrowLeft' ? (index === 0 ? last : index - 1)
      : event.key === 'Home' ? 0
      : event.key === 'End' ? last
      : null;
    if (next == null) return;
    event.preventDefault();
    activeOutput.value = outputs[next].key;
    tabRefs.value[next]?.focus();
  }

  // ── Copy / download ─────────────────────────────────────────────────
  let copiedTimer: ReturnType<typeof setTimeout> | undefined;
  async function copyActive() {
    try {
      await navigator.clipboard.writeText(activeContent.value);
      copied.value = true;
      clearTimeout(copiedTimer);
      copiedTimer = setTimeout(() => (copied.value = false), 1500);
    } catch {
      /* clipboard unavailable; the user can still select the text */
    }
  }
  function downloadActive() {
    const blob = new Blob([activeContent.value], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeMeta.value.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
</script>

<template>
  <div class="cg not-content">
    <div class="cg-grid">
      <!-- ── Options ── -->
      <form
        class="cg-options"
        aria-label="Configuration options"
        @submit.prevent>
        <fieldset
          v-for="group in groups"
          :key="group.key"
          class="cg-group">
          <legend class="cg-group-title">{{ group.title }}</legend>
          <div class="cg-group-body">
            <div
              v-for="opt in group.options"
              :key="opt.key"
              class="cg-option"
              :class="{ 'is-select': opt.type === 'select', 'is-disabled': !requirementMet(opt) }">
              <div class="cg-option-text">
                <label
                  :for="`cg-${opt.key}`"
                  class="cg-option-label"
                  >{{ opt.label }}</label
                >
                <p
                  v-if="opt.description"
                  :id="`cg-${opt.key}-desc`"
                  class="cg-option-desc">
                  {{ opt.description }}
                </p>
                <p
                  v-if="!requirementMet(opt)"
                  :id="`cg-${opt.key}-req`"
                  class="cg-option-req">
                  Requires {{ requirementHint(opt) }}.
                </p>
              </div>

              <input
                v-if="opt.type === 'boolean'"
                :id="`cg-${opt.key}`"
                v-model="selections[opt.key]"
                type="checkbox"
                role="switch"
                class="cg-switch"
                :disabled="!requirementMet(opt)"
                :aria-describedby="describedBy(opt)" />

              <select
                v-else
                :id="`cg-${opt.key}`"
                v-model="selections[opt.key]"
                class="cg-select"
                :aria-describedby="describedBy(opt)">
                <option
                  v-for="choice in choicesFor(opt)"
                  :key="String(choice.value)"
                  :value="choice.value">
                  {{ choice.label }}
                </option>
              </select>
            </div>
          </div>
        </fieldset>
      </form>

      <!-- ── Output ── -->
      <section
        class="cg-output"
        aria-label="Generated files">
        <ul
          v-if="result.warnings.length"
          class="cg-warnings">
          <li
            v-for="(w, i) in result.warnings"
            :key="i">
            {{ w }}
          </li>
        </ul>

        <div class="cg-panel">
          <div class="cg-toolbar">
            <div
              class="cg-tablist"
              role="tablist"
              aria-label="Generated file">
              <button
                v-for="(output, index) in outputs"
                :id="`cg-tab-${output.key}`"
                :key="output.key"
                ref="tabRefs"
                type="button"
                role="tab"
                class="cg-tab"
                :aria-selected="activeOutput === output.key"
                aria-controls="cg-preview"
                :tabindex="activeOutput === output.key ? 0 : -1"
                @click="activeOutput = output.key"
                @keydown="onTabKeydown($event, index)">
                {{ output.label }}
              </button>
            </div>
            <div class="cg-actions">
              <button
                type="button"
                class="cg-btn"
                @click="copyActive">
                {{ copied ? 'Copied' : 'Copy' }}
              </button>
              <button
                type="button"
                class="cg-btn"
                @click="downloadActive">
                Download
              </button>
              <span
                class="cg-sr-only"
                aria-live="polite"
                >{{ copied ? `${activeMeta.label} copied to clipboard` : '' }}</span
              >
            </div>
          </div>

          <pre
            id="cg-preview"
            class="cg-preview"
            role="tabpanel"
            tabindex="0"
            :aria-labelledby="`cg-tab-${activeOutput}`"><code>{{ activeContent }}</code></pre>
        </div>

        <p class="cg-note">
          Save <code>config.yaml</code> and <code>auth.yaml</code> in your
          <code>etc/</code> directory. The <code>.env</code> tab lists the
          secrets and connection details your choices need, left blank: fill
          them in on the server, never in a shared link. Your selections are
          kept in the page URL, so you can bookmark or share a setup.
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped>
  /* Uses Starlight's CSS custom properties so the tool is theme-aware
     (light/dark) and matches the surrounding docs chrome. */
  .cg {
    container-type: inline-size;
    margin-top: 2rem;
  }
  .cg-grid {
    display: grid;
    gap: 2rem;
  }
  /* Side by side once the content column can hold both comfortably; the
     preview then stays in view while the options scroll past. */
  @container (min-width: 50rem) {
    .cg-grid {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      align-items: start;
      gap: 2.5rem;
    }
    .cg-output {
      position: sticky;
      top: calc(var(--sl-nav-height) + 1.5rem);
    }
    .cg-preview {
      max-height: calc(100vh - var(--sl-nav-height) - 15rem);
    }
  }
  .cg-options,
  .cg-output {
    min-width: 0;
  }

  /* Options */
  .cg-options {
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
  }
  .cg-group {
    margin: 0;
    padding: 0;
    border: 0;
    min-width: 0;
  }
  .cg-group-title {
    padding: 0 0 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--sl-color-gray-3);
  }
  /* hairline-light, not hairline: in dark mode hairline is the same gray as
     the sidebar background, which made the row dividers vanish. */
  .cg-group-body {
    border: 1px solid var(--sl-color-hairline-light);
    border-radius: 0.5rem;
    background: var(--sl-color-bg-sidebar);
  }
  .cg-option {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.875rem 1rem;
  }
  .cg-option + .cg-option {
    border-top: 1px solid var(--sl-color-hairline-light);
  }
  .cg-option.is-select {
    flex-direction: column;
    align-items: stretch;
    gap: 0.625rem;
  }
  .cg-option-text {
    min-width: 0;
  }
  .cg-option-label {
    display: block;
    font-weight: 600;
    line-height: 1.4;
    color: var(--sl-color-white);
  }
  .cg-option.is-disabled .cg-option-label {
    color: var(--sl-color-gray-3);
  }
  .cg-option-desc,
  .cg-option-req {
    margin: 0.25rem 0 0;
    font-size: var(--sl-text-sm);
    line-height: 1.5;
    color: var(--sl-color-gray-3);
  }
  .cg-option-req {
    color: var(--sl-color-orange-high);
  }
  .cg-select {
    width: 100%;
    padding: 0.5rem 0.625rem;
    border-radius: 0.375rem;
    border: 1px solid var(--sl-color-gray-5);
    background: var(--sl-color-bg);
    color: var(--sl-color-text);
    font: inherit;
    font-size: var(--sl-text-sm);
  }
  .cg-select:focus-visible {
    outline: 2px solid var(--sl-color-accent);
    outline-offset: 1px;
  }

  /* Toggle switch: a native checkbox, so labels, keyboard, and form
     semantics come for free. */
  .cg-switch {
    appearance: none;
    position: relative;
    flex: none;
    width: 2.5rem;
    height: 1.375rem;
    margin: 0.0625rem 0 0;
    border-radius: 9999px;
    background: var(--sl-color-gray-4);
    cursor: pointer;
    transition: background-color 0.15s;
  }
  .cg-switch::before {
    content: '';
    position: absolute;
    top: 0.1875rem;
    left: 0.1875rem;
    width: 1rem;
    height: 1rem;
    border-radius: 9999px;
    background: #fff;
    box-shadow: 0 1px 2px rgb(0 0 0 / 0.25);
    transition: transform 0.15s;
  }
  .cg-switch:checked {
    background: var(--sl-color-accent);
  }
  .cg-switch:checked::before {
    transform: translateX(1.125rem);
  }
  .cg-switch:focus-visible {
    outline: 2px solid var(--sl-color-accent);
    outline-offset: 2px;
  }
  .cg-switch:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  /* Output */
  .cg-warnings {
    margin: 0 0 1rem;
    padding: 0.625rem 1rem 0.625rem 2rem;
    border: 1px solid var(--sl-color-orange);
    border-radius: 0.5rem;
    background: var(--sl-color-orange-low);
    color: var(--sl-color-orange-high);
    font-size: var(--sl-text-sm);
  }
  .cg-panel {
    border: 1px solid var(--sl-color-gray-5);
    border-radius: 0.5rem;
    background: var(--sl-color-gray-7, var(--sl-color-gray-6));
    overflow: hidden;
  }
  .cg-toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    column-gap: 0.5rem;
    border-bottom: 1px solid var(--sl-color-gray-5);
    background: var(--sl-color-bg-sidebar);
  }
  .cg-tablist {
    display: flex;
    min-width: 0;
  }
  .cg-tab {
    margin: 0;
    padding: 0.625rem 0.875rem;
    border: 0;
    border-bottom: 2px solid transparent;
    background: none;
    cursor: pointer;
    font-family: var(--__sl-font-mono);
    font-size: var(--sl-text-xs);
    line-height: 1.25;
    color: var(--sl-color-gray-3);
  }
  .cg-tab:hover {
    color: var(--sl-color-white);
  }
  .cg-tab[aria-selected='true'] {
    color: var(--sl-color-white);
    border-bottom-color: var(--sl-color-accent);
  }
  .cg-tab:focus-visible {
    outline: 2px solid var(--sl-color-accent);
    outline-offset: -2px;
  }
  /* margin-inline-start: auto keeps the buttons right-aligned, including
     when a narrow screen wraps them onto their own row. */
  .cg-actions {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    margin-inline-start: auto;
    padding: 0.375rem 0.5rem;
  }
  .cg-btn {
    margin: 0;
    padding: 0.25rem 0.625rem;
    border: 1px solid var(--sl-color-gray-5);
    border-radius: 0.375rem;
    background: var(--sl-color-bg);
    color: var(--sl-color-text);
    font: inherit;
    font-size: var(--sl-text-xs);
    line-height: 1.5;
    cursor: pointer;
  }
  .cg-btn:hover {
    border-color: var(--sl-color-gray-4);
  }
  .cg-btn:focus-visible {
    outline: 2px solid var(--sl-color-accent);
    outline-offset: 1px;
  }
  .cg-preview {
    margin: 0;
    max-height: 60vh;
    overflow: auto;
    padding: 1rem 1.125rem;
    font-family: var(--__sl-font-mono);
    font-size: var(--sl-text-xs);
    line-height: 1.6;
    color: var(--sl-color-text);
    background: transparent;
  }
  .cg-preview:focus-visible {
    outline: 2px solid var(--sl-color-accent);
    outline-offset: -2px;
  }
  .cg-note {
    margin: 0.875rem 0 0;
    font-size: var(--sl-text-sm);
    line-height: 1.6;
    color: var(--sl-color-gray-3);
  }
  /* Inline code in the note sits on the tinted inline-code background, which
     drops muted gray-3 ink to 4.16:1 in light mode. Step the code up to body
     ink (9.10:1) — the note prose itself stays muted on the plain background. */
  .cg-note code {
    padding: 0.0625rem 0.3125rem;
    border-radius: 0.25rem;
    background: var(--sl-color-bg-inline-code);
    color: var(--sl-color-text);
    font-family: var(--__sl-font-mono);
    font-size: 0.875em;
  }
  .cg-sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
