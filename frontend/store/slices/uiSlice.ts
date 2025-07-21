import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  searchOpen: boolean;
  settingsOpen: boolean;
  profileMenuOpen: boolean;
  notificationsPanelOpen: boolean;
  currentModal: string | null;
  loading: {
    global: boolean;
    components: Record<string, boolean>;
  };
  errors: {
    global: string | null;
    components: Record<string, string | null>;
  };
  breadcrumbs: Array<{
    label: string;
    href?: string;
  }>;
  pageTitle: string;
  searchQuery: string;
  draggedItem: {
    id: string;
    type: string;
  } | null;
}

const initialState: UIState = {
  sidebarOpen: true,
  sidebarCollapsed: false,
  searchOpen: false,
  settingsOpen: false,
  profileMenuOpen: false,
  notificationsPanelOpen: false,
  currentModal: null,
  loading: {
    global: false,
    components: {},
  },
  errors: {
    global: null,
    components: {},
  },
  breadcrumbs: [
    { label: 'Dashboard', href: '/' },
  ],
  pageTitle: 'Dashboard',
  searchQuery: '',
  draggedItem: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    toggleSidebarCollapsed: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
    toggleSearch: (state) => {
      state.searchOpen = !state.searchOpen;
    },
    setSearchOpen: (state, action: PayloadAction<boolean>) => {
      state.searchOpen = action.payload;
    },
    toggleSettings: (state) => {
      state.settingsOpen = !state.settingsOpen;
    },
    setSettingsOpen: (state, action: PayloadAction<boolean>) => {
      state.settingsOpen = action.payload;
    },
    toggleProfileMenu: (state) => {
      state.profileMenuOpen = !state.profileMenuOpen;
    },
    setProfileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.profileMenuOpen = action.payload;
    },
    toggleNotificationsPanel: (state) => {
      state.notificationsPanelOpen = !state.notificationsPanelOpen;
    },
    setNotificationsPanelOpen: (state, action: PayloadAction<boolean>) => {
      state.notificationsPanelOpen = action.payload;
    },
    openModal: (state, action: PayloadAction<string>) => {
      state.currentModal = action.payload;
    },
    closeModal: (state) => {
      state.currentModal = null;
    },
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.global = action.payload;
    },
    setComponentLoading: (state, action: PayloadAction<{ component: string; loading: boolean }>) => {
      state.loading.components[action.payload.component] = action.payload.loading;
    },
    setGlobalError: (state, action: PayloadAction<string | null>) => {
      state.errors.global = action.payload;
    },
    setComponentError: (state, action: PayloadAction<{ component: string; error: string | null }>) => {
      state.errors.components[action.payload.component] = action.payload.error;
    },
    setBreadcrumbs: (state, action: PayloadAction<Array<{ label: string; href?: string }>>) => {
      state.breadcrumbs = action.payload;
    },
    setPageTitle: (state, action: PayloadAction<string>) => {
      state.pageTitle = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setDraggedItem: (state, action: PayloadAction<{ id: string; type: string } | null>) => {
      state.draggedItem = action.payload;
    },
    clearErrors: (state) => {
      state.errors.global = null;
      state.errors.components = {};
    },
    resetUI: () => initialState,
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleSidebarCollapsed,
  setSidebarCollapsed,
  toggleSearch,
  setSearchOpen,
  toggleSettings,
  setSettingsOpen,
  toggleProfileMenu,
  setProfileMenuOpen,
  toggleNotificationsPanel,
  setNotificationsPanelOpen,
  openModal,
  closeModal,
  setGlobalLoading,
  setComponentLoading,
  setGlobalError,
  setComponentError,
  setBreadcrumbs,
  setPageTitle,
  setSearchQuery,
  setDraggedItem,
  clearErrors,
  resetUI,
} = uiSlice.actions;

export default uiSlice.reducer;

// Selectors
export const selectUI = (state: { ui: UIState }) => state.ui;
export const selectSidebarState = (state: { ui: UIState }) => ({
  open: state.ui.sidebarOpen,
  collapsed: state.ui.sidebarCollapsed,
});
export const selectCurrentModal = (state: { ui: UIState }) => state.ui.currentModal;
export const selectGlobalLoading = (state: { ui: UIState }) => state.ui.loading.global;
export const selectComponentLoading = (component: string) => (state: { ui: UIState }) => 
  state.ui.loading.components[component] || false;
export const selectGlobalError = (state: { ui: UIState }) => state.ui.errors.global;
export const selectComponentError = (component: string) => (state: { ui: UIState }) => 
  state.ui.errors.components[component] || null;
export const selectBreadcrumbs = (state: { ui: UIState }) => state.ui.breadcrumbs;
export const selectPageTitle = (state: { ui: UIState }) => state.ui.pageTitle;
export const selectSearchQuery = (state: { ui: UIState }) => state.ui.searchQuery;
export const selectDraggedItem = (state: { ui: UIState }) => state.ui.draggedItem;