import type { ReactNode } from 'react';

interface GlassCardProps {
  title: string | ReactNode;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export const GlassCard = ({ title, subtitle, actions, children }: GlassCardProps) => (
  <section className="glass-card">
    <header className="glass-card__head">
      <div>
        <h2 className="glass-card__title">{title}</h2>
        {subtitle ? <p className="glass-card__subtitle">{subtitle}</p> : null}
      </div>
      {actions && <div className="glass-card__actions">{actions}</div>}
    </header>
    <div className="glass-card__body">{children}</div>
  </section>
);