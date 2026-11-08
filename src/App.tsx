import { Route, Routes } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Header } from '@/components/layout/Header';
import { useTheme } from '@/context';
import { PokemonProvider } from '@/context/PokemonContext';
import { usePokemonFilters } from '@/hooks/usePokemonFilters';
import { MainPage } from '@/pages/MainPage';
import { PokemonDetailsPage } from '@/pages/PokemonDetailsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ROUTES } from '@/consts';
import { ThemeToggle } from './components/widgets/ThemeToggle';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { control, errors, isDirty, reset, appliedFilters } = usePokemonFilters();

  return (
    <DashboardLayout
      theme={theme}
      header={
        <Header 
          title="⚡ Pokémon Battle Arena"
          subtitle="Choose your fighters and battle!"
        >
          <ThemeToggle isDark={theme === 'dark'} onToggle={toggleTheme} />
        </Header>
      }
    >
      <PokemonProvider filters={appliedFilters}>
        <Routes>
          <Route 
            path={ROUTES.HOME} 
            element={
              <MainPage 
                filters={appliedFilters}
                control={control}
                errors={errors}
                isDirty={isDirty}
                reset={reset}
              /> 
            } 
          />
          <Route path={ROUTES.POKEMON_DETAILS} element={<PokemonDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PokemonProvider>
    </DashboardLayout>
  );
}