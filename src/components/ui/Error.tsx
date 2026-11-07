interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const Error = ({ message, onRetry }: ErrorStateProps) => (
  <section className="state state--error" role="alert">
    <span className="state__icon" aria-hidden="true">⚠</span>
    <p className="state__title">Failed to load Pokémon!</p>
    <p className="state__hint">{message}</p>
    <button type="button" className="state__retry" onClick={onRetry}>
      Try Again
    </button>
  </section>
);