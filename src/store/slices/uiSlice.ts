import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ChartType, Metric, UiState } from '@/types';

const initialState: UiState = {
  theme: 'light',
  chartType: 'bar',
  selectedMetric: 'hp',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    setChartType(state, action: PayloadAction<ChartType>) {
      state.chartType = action.payload;
    },
    setSelectedMetric(state, action: PayloadAction<Metric>) {
      state.selectedMetric = action.payload;
    },
  },
});

export const { toggleTheme, setChartType, setSelectedMetric } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;