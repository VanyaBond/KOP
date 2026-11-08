import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/ui/GlassCard';
import { ROUTES } from '@/consts';

export function NotFoundPage() {
  return (
    <GlassCard title="404" subtitle="Page not found">
      <div className="not-found">
        <span className="not-found__icon" aria-hidden="true">
          😵
        </span>
        <p className="not-found__title">This route doesn't exist.</p>
        <p className="not-found__hint">
          Head back to the overview to continue your Pokémon journeeey
        </p>
        <Link to={ROUTES.HOME} className="back-link">
          ← Back to overview
        </Link>
      </div>
    </GlassCard>
  );
}