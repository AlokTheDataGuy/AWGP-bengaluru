const pad = (n) => String(n).padStart(2, '0');

/** Highlight photo filenames follow `<id>/<id>-01.jpg`, `<id>-02.jpg`, … */
export function imagesOf(h) {
  const count = h.imageCount || 1;
  return Array.from({ length: count }, (_, i) => `/assets/highlights/${h.id}/${h.id}-${pad(i + 1)}.jpg`);
}

export function coverOf(h, images) {
  return images[(h.coverIndex || 1) - 1];
}

export function sortByDateDesc(highlights) {
  return [...highlights].sort((a, b) => new Date(b.date) - new Date(a.date));
}
