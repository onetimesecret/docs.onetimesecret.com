const key = 'docs:textprov';

export function initTextProv(document: Document, storage?: Storage) {
  const controls = document.querySelectorAll<HTMLButtonElement>('[data-textprov-toggle]');
  // The script is bundled for every docs page; pages without a table of
  // contents render no switch. A page can render more than one (sidebar panel
  // and mobile bar); they share one state.
  if (!controls.length) return;
  let shown = false;
  try { shown = storage?.getItem(key) === 'shown'; } catch { /* Storage is optional. */ }
  function apply() {
    document.documentElement.dataset.textprov = shown ? 'shown' : 'hidden';
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
