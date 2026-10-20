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
  import { changedLines, splitLines } from './diff';
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

  // Every file is shown at once, so a change is visible whichever file it
  // lands in. auth.yaml leads because Deployment mode, the first option,
  // writes to it.
  const files = [
    { key: 'authYaml', dir: 'etc/', name: 'auth.yaml' },
    { key: 'configYaml', dir: 'etc/', name: 'config.yaml' },
    { key: 'envSnippet', dir: '', name: '.env' },
  ] as const;
  type FileKey = (typeof files)[number]['key'];
  type FileMeta = (typeof files)[number];

  const EMPTY = '# Nothing to override; the shipped defaults apply.\n';
  const result = computed(() => generate({ ...selections }));
  const contents = computed<Record<FileKey, string>>(() => ({
    authYaml: result.value.authYaml || EMPTY,
    configYaml: result.value.configYaml || EMPTY,
    envSnippet: result.value.envSnippet || EMPTY,
  }));

  // Lines the latest change added or rewrote, per file. `revision` re-keys
  // the code block so the highlight animation restarts on every change.
  const changed = reactive<Record<FileKey, boolean[]>>({
    authYaml: [],
    configYaml: [],
    envSnippet: [],
  });
  const revision = reactive<Record<FileKey, number>>({
    authYaml: 0,
    configYaml: 0,
    envSnippet: 0,
  });
  const copiedKey = ref<FileKey | null>(null);
  const copiedName = computed(() => files.find((f) => f.key === copiedKey.value)?.name);

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
    // Registered after seeding, so a shared link does not light up on load.
    watch(contents, (next, prev) => {
      for (const { key } of files) {
        if (next[key] === prev[key]) continue;
        changed[key] = changedLines(prev[key], next[key]);
        revision[key]++;
      }
    });
  });

  // ── Copy / download ─────────────────────────────────────────────────
  let copiedTimer: ReturnType<typeof setTimeout> | undefined;
  async function copyFile(file: FileMeta) {
    try {
      await navigator.clipboard.writeText(contents.value[file.key]);
      copiedKey.value = file.key;
      clearTimeout(copiedTimer);
      copiedTimer = setTimeout(() => (copiedKey.value = null), 1500);
    } catch {
      /* clipboard unavailable; the user can still select the text */
    }
  }
  function downloadFile(file: FileMeta) {
    const blob = new Blob([contents.value[file.key]], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
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

        <div class="cg-files">
          <section
            v-for="file in files"
            :key="file.key"
            class="cg-file"
            :aria-labelledby="`cg-file-${file.key}`">
            <div class="cg-file-header">
              <h2
                :id="`cg-file-${file.key}`"
                class="cg-file-name">
                <span
                  v-if="file.dir"
                  class="cg-file-dir"
                  >{{ file.dir }}</span
                >{{ file.name }}
              </h2>
              <div class="cg-actions">
                <button
                  type="button"
                  class="cg-btn"
                  :aria-label="`Copy ${file.name}`"
                  @click="copyFile(file)">
                  {{ copiedKey === file.key ? 'Copied' : 'Copy' }}
                </button>
                <button
                  type="button"
                  class="cg-btn"
                  :aria-label="`Download ${file.name}`"
                  @click="downloadFile(file)">
                  Download
                </button>
              </div>
            </div>
            <!-- One block span per line, each ending in its newline, so a
                 changed line can be highlighted edge to edge and selecting
                 the text still copies plain lines. -->
            <pre class="cg-code"><code :key="revision[file.key]"><span
                v-for="(line, i) in splitLines(contents[file.key])"
                :key="i"
                class="cg-line"
                :class="{ 'is-changed': changed[file.key][i] }">{{ line + '\n' }}</span></code></pre>
          </section>
        </div>
        <span
          class="cg-sr-only"
          aria-live="polite"
          >{{ copiedName ? `${copiedName} copied to clipboard` : '' }}</span
        >

        <p class="cg-note">
          The <code>.env</code> file lists the secrets and connection details
          your selections need, left blank: fill them in on the server, never
          in a shared link. Your selections are kept in the page URL, so you
          can bookmark or share a setup.
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
  /* Side by side once the content column can hold both comfortably. The
     three files together run about as long as the options, so the output
     scrolls with the page rather than sticking. */
  @container (min-width: 50rem) {
    .cg-grid {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      align-items: start;
      gap: 2.5rem;
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
  .cg-files {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .cg-file {
    border: 1px solid var(--sl-color-gray-5);
    border-radius: 0.5rem;
    background: var(--sl-color-gray-7, var(--sl-color-gray-6));
    overflow: hidden;
  }
  .cg-file-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.375rem 0.5rem 0.375rem 1.125rem;
    border-bottom: 1px solid var(--sl-color-gray-5);
    background: var(--sl-color-bg-sidebar);
  }
  .cg-file-name {
    margin: 0;
    min-width: 0;
    overflow-wrap: anywhere;
    font-family: var(--__sl-font-mono);
    font-size: var(--sl-text-xs);
    font-weight: 600;
    line-height: 1.5;
    color: var(--sl-color-white);
  }
  .cg-file-dir {
    font-weight: 400;
    color: var(--sl-color-gray-3);
  }
  .cg-actions {
    display: flex;
    flex: none;
    gap: 0.375rem;
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
  /* The padding sits on the lines, not the block, so a highlight runs to
     the card's edges. Long lines (the .env header comments on a phone)
     wrap rather than hide behind a sideways scroll; Copy and Download
     still give the exact text. */
  .cg-code {
    margin: 0;
    padding: 0.75rem 0;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    font-family: var(--__sl-font-mono);
    font-size: var(--sl-text-xs);
    line-height: 1.6;
    color: var(--sl-color-text);
    background: transparent;
  }
  .cg-code code {
    display: block;
    font: inherit;
  }
  /* Hanging indent: a wrapped line continues 2ch in, so it does not read
     as a line of its own. */
  .cg-line {
    display: block;
    padding: 0 1.125rem 0 calc(1.125rem + 2ch);
    text-indent: -2ch;
  }
  /* Marks what the last change wrote, then fades. A tint of the accent
     rather than accent-low, which is a saturated block in dark mode. A
     color change, not motion, so it stays on under prefers-reduced-motion. */
  .cg-line.is-changed {
    animation: cg-changed 2.4s ease-out;
  }
  @keyframes cg-changed {
    0%,
    35% {
      background-color: color-mix(in srgb, var(--sl-color-accent) 16%, transparent);
      box-shadow: inset 3px 0 0 var(--sl-color-accent);
    }
    100% {
      background-color: transparent;
      box-shadow: inset 3px 0 0 transparent;
    }
  }
  .cg-note {
    margin: 0.875rem 0 0;
    font-size: var(--sl-text-sm);
    line-height: 1.6;
    color: var(--sl-color-gray-3);
  }
  .cg-note code {
    padding: 0.0625rem 0.3125rem;
    border-radius: 0.25rem;
    background: var(--sl-color-bg-inline-code);
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
