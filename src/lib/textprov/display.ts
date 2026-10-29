const key = 'docs:textprov';
const displayKey = 'docs:textprov:display';

export function initTextProv(document: Document, storage?: Storage) {
  const controls = document.querySelectorAll<HTMLButtonElement>('[data-textprov-toggle]');
  // The script is bundled for every docs page; only enrolled pages render a toggle.
  if (!controls.length) return;
  const modes = document.querySelectorAll<HTMLSelectElement>('[data-textprov-display-control]');
  let display = 'passage';
  try { if (storage?.getItem(displayKey) === 'exact') display = 'exact'; } catch { /* Storage is optional. */ }
  function applyDisplay() {
    document.documentElement.dataset.textprovDisplay = display;
    modes.forEach(mode => { mode.value = display; });
  }
  applyDisplay();
  modes.forEach(mode => {
    mode.onchange = () => {
      display = mode.value === 'exact' ? 'exact' : 'passage';
      applyDisplay();
      try { storage?.setItem(displayKey, display); } catch { /* Keep this page's choice. */ }
    };
  });
  let shown = false;
  try { shown = storage?.getItem(key) === 'shown'; } catch { /* Storage is optional. */ }
  function apply() {
    document.documentElement.dataset.textprov = shown ? 'shown' : 'hidden';
    modes.forEach(mode => { mode.disabled = !shown; });
    controls.forEach(control => control.setAttribute('aria-checked', String(shown)));
  }
  apply();
  controls.forEach(control => {
    control.onclick = () => {
      shown = !shown;
      apply();
      try { storage?.setItem(key, shown ? 'shown' : 'hidden'); } catch { /* Keep this page's choice. */ }
    };
  });
}
