export function pageVisit(page, params = {}) {
  if (process.env.NODE_ENV !== 'production') return;
  ym(61169230, 'hit', page, {params}); // eslint-disable-line no-undef
}
