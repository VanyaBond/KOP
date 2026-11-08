import type { ReactNode } from 'react';
import type { Theme } from '@/types/pokemon';

interface DashboardLayoutProps {
  theme: Theme;
  header: ReactNode;
  children: ReactNode;
}

export const DashboardLayout = ({ 
  theme, 
  header, 
  children 
}: DashboardLayoutProps) => (
  <div className="app-shell" data-theme={theme}>
    <div className="app-shell__main">
      {header}
      <main className="app-shell__content">{children}</main>
    </div>
  </div>
);