// Inline scripts ship in every page, so their comment lines and indentation
// are dropped. The sources keep them; they hold no `//` inside strings.
export const compactScript = (source: string) =>
  source
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('//'))
    .join('\n');
