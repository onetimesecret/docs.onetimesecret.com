<!-- src/components/config-generator/ConfigGenerator.vue -->
<!--
  Configuration Generator — a self-contained, client-side tool that turns a
  handful of preset choices into ready-to-use etc/config.yaml / etc/auth.yaml
  override fragments plus a companion .env starter.

  It runs entirely in the browser inside the docs site: the vendored config JSON
  schemas (src/components/config-generator/schemas) provide field defaults and constraints, a
  small preset manifest (presets.ts) supplies the curation and ENV mapping, and
  the YAML is generated locally (generate.ts). No dependency on the running
  application.

  Selections are mirrored into the URL query string, so a configured link is
  shareable and bookmarkable. Secrets are only ever shown as empty .env
  placeholders — nothing sensitive is baked into the output.
-->

<script setup lang="ts">
  import { computed, onMounted, reactive, ref, watch } from 'vue';
  import { OPTIONS, type OptionSpec } from './presets';
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

  const outputs = [
    { key: 'configYaml' as const, label: 'config.yaml', filename: 'config.yaml' },
    { key: 'authYaml' as const, label: 'auth.yaml', filename: 'auth.yaml' },
    { key: 'envSnippet' as const, label: '.env', filename: '.env' },
  ];
  const activeOutput = ref<(typeof outputs)[number]['key']>('configYaml');
  const copied = ref(false);

  const result = computed(() => generate({ ...selections }));

  const activeMeta = computed(
    () => outputs.find((o) => o.key === activeOutput.value) ?? outputs[0]
  );
  const activeContent = computed(() => {
    const content = result.value[activeOutput.value];
    return content && content.length ? content : '# (defaults — nothing to override)\n';
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
        return `${depOpt?.label ?? dep}: ${choice?.label ?? val}`;
      })
      .join(', ');
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
  });

  // ── Copy / download ─────────────────────────────────────────────────
  async function copyActive() {
    try {
      await navigator.clipboard.writeText(activeContent.value);
      copied.value = true;
      setTimeout(() => (copied.value = false), 1500);
    } catch {
      /* clipboard unavailable — user can still select the text */
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
  <div class="cg">
    <div class="cg-grid">
      <!-- ── Options ── -->
      <section
        class="cg-options"
        aria-label="Configuration options">
        <div
          v-for="opt in OPTIONS"
          :key="opt.key"
          class="cg-option">
          <div class="cg-option-head">
            <label
              :for="`cg-${opt.key}`"
              class="cg-option-label"
              >{{ opt.label }}</label
            >

            <button
              v-if="opt.type === 'boolean'"
              :id="`cg-${opt.key}`"
              type="button"
              role="switch"
              :aria-checked="selections[opt.key] === true"
              :disabled="!requirementMet(opt)"
              class="cg-switch"
              :class="{ on: selections[opt.key], off: !selections[opt.key] }"
              @click="selections[opt.key] = !selections[opt.key]">
              <span class="cg-knob" />
            </button>
          </div>

          <p
            v-if="opt.description"
            class="cg-option-desc">
            {{ opt.description }}
          </p>
          <p
            v-if="opt.requires && !requirementMet(opt)"
            class="cg-option-req">
            Requires {{ requirementHint(opt) }}
          </p>

          <select
            v-if="opt.type === 'select'"
            :id="`cg-${opt.key}`"
            v-model="selections[opt.key]"
            class="cg-select">
            <option
              v-for="choice in choicesFor(opt)"
              :key="String(choice.value)"
              :value="choice.value">
              {{ choice.label }}
            </option>
          </select>
        </div>
      </section>

      <!-- ── Output ── -->
      <section
        class="cg-output"
        aria-label="Generated configuration">
        <ul
          v-if="result.warnings.length"
          class="cg-warnings">
          <li
            v-for="(w, i) in result.warnings"
            :key="i">
            {{ w }}
          </li>
        </ul>

        <div class="cg-tabs">
          <div
            class="cg-tablist"
            role="group"
            aria-label="Generated file">
            <button
              v-for="output in outputs"
              :key="output.key"
              type="button"
              :aria-pressed="activeOutput === output.key"
              class="cg-tab"
              :class="{ active: activeOutput === output.key }"
              @click="activeOutput = output.key">
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
          </div>
        </div>

        <pre
          class="cg-preview"
          tabindex="0"
          :aria-label="`${activeMeta.label} preview`"><code>{{ activeContent }}</code></pre>

        <p class="cg-note">
          These fragments contain the options you selected above and layer on
          top of the shipped defaults. Copy <code>config.yaml</code> /
          <code>auth.yaml</code> into your <code>etc/</code> directory. Secrets
          (<code>SECRET</code>, database URLs, credentials) appear only as empty
          placeholders in the <code>.env</code> tab — set those yourself, and
          never paste them into a shared link.
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped>
  /* Uses Starlight's CSS custom properties so the tool is theme-aware
     (light/dark) and matches the surrounding docs chrome. */
  .cg {
    margin: 1.5rem 0;
  }
  .cg-grid {
    display: grid;
    gap: 2rem;
  }
  @media (min-width: 60rem) {
    .cg-grid {
      grid-template-columns: 1fr 1fr;
      align-items: start;
    }
  }
  /* Prevent long preview lines from blowing out the grid column: min-width:0
     lets the column shrink so the <pre> scrolls internally instead. */
  .cg-options,
  .cg-output {
    min-width: 0;
  }

  .cg-options {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .cg-option {
    border: 1px solid var(--sl-color-hairline, var(--sl-color-gray-5));
    border-radius: 0.5rem;
    padding: 0.85rem 1rem;
    background: var(--sl-color-bg-sidebar, transparent);
  }
  .cg-option-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }
  .cg-option-label {
    font-weight: 600;
    color: var(--sl-color-text);
  }
  .cg-option-desc {
    margin: 0.4rem 0 0;
    font-size: 0.8125rem;
    color: var(--sl-color-gray-3);
  }
  .cg-option-req {
    margin: 0.35rem 0 0;
    font-size: 0.8125rem;
    font-style: italic;
    color: var(--sl-color-orange-high, #b45309);
  }
  .cg-select {
    margin-top: 0.6rem;
    width: 100%;
    padding: 0.45rem 0.6rem;
    border-radius: 0.375rem;
    border: 1px solid var(--sl-color-gray-5);
    background: var(--sl-color-bg);
    color: var(--sl-color-text);
    font: inherit;
  }

  /* Toggle switch */
  .cg-switch {
    position: relative;
    flex: none;
    width: 2.75rem;
    height: 1.5rem;
    border-radius: 9999px;
    border: none;
    cursor: pointer;
    transition: background-color 0.15s;
    padding: 0;
  }
  .cg-switch.on {
    background: var(--sl-color-accent);
  }
  .cg-switch.off {
    background: var(--sl-color-gray-5);
  }
  .cg-switch:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  .cg-knob {
    position: absolute;
    top: 0.185rem;
    left: 0.185rem;
    width: 1.13rem;
    height: 1.13rem;
    border-radius: 9999px;
    background: #fff;
    transition: transform 0.15s;
  }
  .cg-switch.on .cg-knob {
    transform: translateX(1.25rem);
  }

  /* Output */
  .cg-warnings {
    margin: 0 0 1rem;
    padding: 0.6rem 0.9rem 0.6rem 2rem;
    border: 1px solid var(--sl-color-orange, #d97706);
    border-radius: 0.5rem;
    background: var(--sl-color-orange-low, #fef3c7);
    color: var(--sl-color-orange-high, #92400e);
    font-size: 0.85rem;
  }
  .cg-tabs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    border-bottom: 1px solid var(--sl-color-hairline, var(--sl-color-gray-5));
    flex-wrap: wrap;
  }
  .cg-tablist {
    display: flex;
  }
  .cg-tab {
    padding: 0.4rem 0.85rem;
    border: none;
    border-bottom: 2px solid transparent;
    background: none;
    cursor: pointer;
    font-family: var(--__sl-font-mono, monospace);
    font-size: 0.85rem;
    color: var(--sl-color-gray-2);
  }
  .cg-tab.active {
    color: var(--sl-color-text);
    border-bottom-color: var(--sl-color-accent);
  }
  .cg-actions {
    display: flex;
    gap: 0.35rem;
  }
  .cg-btn {
    padding: 0.25rem 0.7rem;
    border: 1px solid var(--sl-color-gray-5);
    border-radius: 0.375rem;
    background: var(--sl-color-bg);
    color: var(--sl-color-text);
    font-size: 0.8rem;
    cursor: pointer;
  }
  .cg-btn:hover {
    background: var(--sl-color-gray-6);
  }
  .cg-preview {
    margin: 0.75rem 0 0;
    max-height: 60vh;
    overflow: auto;
    border: 1px solid var(--sl-color-gray-5);
    border-radius: 0.5rem;
    padding: 0.9rem 1rem;
    background: var(--sl-color-gray-7, #0d1117);
    font-size: 0.82rem;
    line-height: 1.5;
  }
  .cg-note {
    margin-top: 0.75rem;
    font-size: 0.8rem;
    color: var(--sl-color-gray-3);
  }
</style>
