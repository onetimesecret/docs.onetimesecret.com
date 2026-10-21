const key = 'docs:textprov';

export function initTextProv(document: Document, storage?: Storage) {
  const controls = document.querySelectorAll<HTMLButtonElement>('[data-textprov-toggle]');
  let shown = false;
  try { shown = storage?.getItem(key) === 'shown'; } catch { /* Storage is optional. */ }
  function apply() {
    document.documentElement.dataset.textprov = shown ? 'shown' : 'hidden';
    controls.forEach(control => control.setAttribute('aria-pressed', String(shown)));
  }
  apply();
  controls.forEach(control => {
    control.hidden = false;
    control.onclick = () => {
      shown = !shown;
      apply();
      try { storage?.setItem(key, shown ? 'shown' : 'hidden'); } catch { /* Keep this page's choice. */ }
    };
  });
}
