export const Loader = () => (
  <section className="state state--loading" aria-busy="true" aria-live="polite">
    <div className="spinner" aria-hidden="true" />
    <p className="state__title">Loading Pokémon data...</p>
    <p className="state__title">⚡ Catch 'em all! ⚡</p>
    <p className="state__hint">Fetching data from PokéAPI...</p>
  </section>
);