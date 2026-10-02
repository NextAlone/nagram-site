// The groups for the detected system are flagged inline before the first
// paint; this script reflects that in the switcher and handles switching.
const root = document.querySelector<HTMLElement>('[data-shots]');

if (root) {
  const groups = [...root.querySelectorAll<HTMLElement>('[data-shot-group]')];
  const tabs = [...root.querySelectorAll<HTMLAnchorElement>('[data-shot-tab]')];

  const select = (ids: string[]) => {
    for (const tab of tabs) {
      if (ids.includes(tab.dataset.shotTab!)) tab.setAttribute('aria-current', 'true');
      else tab.removeAttribute('aria-current');
    }
  };

  const show = (id: string) => {
    root.dataset.show = id;
    for (const group of groups) group.hidden = group.dataset.shotGroup !== id;
    select([id]);
  };

  const linked = location.hash.match(/^#shots-(.+)$/)?.[1];
  if (linked && groups.some((g) => g.dataset.shotGroup === linked)) show(linked);
  else select(groups.filter((g) => g.hasAttribute('data-detected')).map((g) => g.dataset.shotGroup!));

  for (const tab of tabs) {
    tab.addEventListener('click', (event) => {
      event.preventDefault();
      show(tab.dataset.shotTab!);
    });
  }
}
