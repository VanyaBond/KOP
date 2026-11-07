import type { ReactNode } from 'react';
import type { Theme } from '@/types/dashboard';

export const DashboardLayout = ({ theme, sidebar, header, children }: { theme: Theme; sidebar: ReactNode; header: ReactNode; children: ReactNode }) => (
  <div className="app-shell" data-theme={theme}>
    {sidebar}
    <div className="app-shell__main">
      {header}
      <main className="app-shell__content">{children}</main>
    </div>
  </div>
);