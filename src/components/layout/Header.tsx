import type { ReactNode } from 'react';

interface HeaderProps {
  title: string;
  subtitle: string;
  children?: ReactNode;
}

export const Header = ({ title, subtitle, children }: HeaderProps) => (
  <header className="header">
    <div className="header__content">
      <h1 className="header__title">{title}</h1>
      <p className="header__subtitle">{subtitle}</p>
    </div>
    <div className="header__controls">
      {children}
    </div>
  </header>
);