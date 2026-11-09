import type { RootState } from '../index';

export const selectTheme = (state: RootState) => state.ui.theme;
export const selectIsDark = (state: RootState) => state.ui.theme === 'dark';
export const selectChartType = (state: RootState) => state.ui.chartType;
export const selectSelectedMetric = (state: RootState) => state.ui.selectedMetric;