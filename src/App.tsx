import { Route, Routes } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Header } from '@/components/layout/Header';
import { ThemeToggle } from '@/components/widgets/ThemeToggle';
import { useAppSelector } from '@/store/hooks';
import { selectTheme } from '@/store/selectors';
import { usePokemonFetcher } from '@/hooks/usePokemonFetcher';
import { MainPage } from '@/pages/MainPage';
import { PokemonDetailsPage } from '@/pages/PokemonDetailsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ROUTES } from '@/consts';

export default function App() {
  const theme = useAppSelector(selectTheme);
  usePokemonFetcher();

  return (
    <DashboardLayout
      theme={theme}
      header={
        <Header title="⚡ Pokémon Battle Arena" subtitle="Choose your fighters and battle!">
          <ThemeToggle />
        </Header>
      }
    >
      <Routes>
        <Route path={ROUTES.HOME} element={<MainPage />} />
        <Route path={ROUTES.POKEMON_DETAILS} element={<PokemonDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </DashboardLayout>
  );
}
