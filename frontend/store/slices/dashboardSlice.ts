import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';
import { DashboardState, WidgetLayout, WidgetType, SearchFilters } from '@/types';

const initialState: DashboardState = {
  isLoading: false,
  error: null,
  lastUpdated: new Date().toISOString(),
  widgets: [
    {
      id: 'weather-1',
      type: 'weather',
      isLoading: false,
      error: null,
      data: null,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'finance-1',
      type: 'finance',
      isLoading: false,
      error: null,
      data: null,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'news-1',
      type: 'news',
      isLoading: false,
      error: null,
      data: null,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'analytics-1',
      type: 'analytics',
      isLoading: false,
      error: null,
      data: null,
      lastUpdated: new Date().toISOString(),
    },
  ],
  filters: {
    query: '',
    category: '',
    sortBy: 'relevance',
    sortOrder: 'desc',
  },
  view: 'grid',
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    updateLastUpdated: (state) => {
      state.lastUpdated = new Date().toISOString();
    },
    updateWidgetData: (
      state,
      action: PayloadAction<{ id: string; data: unknown; error?: string | null }>
    ) => {
      const widget = state.widgets.find((w) => w.id === action.payload.id);
      if (widget) {
        widget.data = action.payload.data;
        widget.error = action.payload.error || null;
        widget.lastUpdated = new Date().toISOString();
        widget.isLoading = false;
      }
    },
    setWidgetLoading: (state, action: PayloadAction<{ id: string; isLoading: boolean }>) => {
      const widget = state.widgets.find((w) => w.id === action.payload.id);
      if (widget) {
        widget.isLoading = action.payload.isLoading;
      }
    },
    setWidgetError: (state, action: PayloadAction<{ id: string; error: string | null }>) => {
      const widget = state.widgets.find((w) => w.id === action.payload.id);
      if (widget) {
        widget.error = action.payload.error;
        widget.isLoading = false;
      }
    },
    addWidget: (state, action: PayloadAction<{ type: WidgetType; id?: string }>) => {
      const id = action.payload.id || `${action.payload.type}-${Date.now()}`;
      state.widgets.push({
        id,
        type: action.payload.type,
        isLoading: false,
        error: null,
        data: null,
        lastUpdated: new Date().toISOString(),
      });
    },
    removeWidget: (state, action: PayloadAction<string>) => {
      state.widgets = state.widgets.filter((w) => w.id !== action.payload);
    },
    reorderWidgets: (state, action: PayloadAction<string[]>) => {
      const orderedWidgets = action.payload
        .map((id) => state.widgets.find((w) => w.id === id))
        .filter(Boolean) as typeof state.widgets;
      state.widgets = orderedWidgets;
    },
    updateFilters: (state, action: PayloadAction<Partial<SearchFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setView: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.view = action.payload;
    },
    resetDashboard: (state) => {
      return { ...initialState, widgets: state.widgets };
    },
  },
});

export const {
  setLoading,
  setError,
  updateLastUpdated,
  updateWidgetData,
  setWidgetLoading,
  setWidgetError,
  addWidget,
  removeWidget,
  reorderWidgets,
  updateFilters,
  setView,
  resetDashboard,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;

// Selectors with memoization
export const selectDashboard = (state: { dashboard: DashboardState }) => state.dashboard;

export const selectWidgets = createSelector(
  [selectDashboard],
  (dashboard) => dashboard.widgets
);

export const selectWidgetById = createSelector(
  [selectWidgets, (_, id: string) => id],
  (widgets, id) => widgets.find((widget) => widget.id === id)
);

export const selectWidgetsByType = createSelector(
  [selectWidgets, (_, type: WidgetType) => type],
  (widgets, type) => widgets.filter((widget) => widget.type === type)
);

export const selectIsAnyWidgetLoading = createSelector(
  [selectWidgets],
  (widgets) => widgets.some((widget) => widget.isLoading)
);

export const selectDashboardFilters = createSelector(
  [selectDashboard],
  (dashboard) => dashboard.filters
);

export const selectDashboardView = createSelector(
  [selectDashboard],
  (dashboard) => dashboard.view
);