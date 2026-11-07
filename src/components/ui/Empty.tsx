export const Empty = () => (
  <section className="state state--empty">
    <span className="state__icon" aria-hidden="true">∅</span>
    <p className="state__title">No Pokémon found</p>
    <p className="state__hint">The API returned empty data. Maybe try a different generation?</p>
  </section>
);