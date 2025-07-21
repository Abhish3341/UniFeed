import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/query';

// API slices
import { weatherApi } from './api/weatherApi';
import { financeApi } from './api/financeApi';
import { newsApi } from './api/newsApi';
import { authApi } from './api/authApi';

// Regular slices
import authSlice from './slices/authSlice';
import dashboardSlice from './slices/dashboardSlice';
import themeSlice from './slices/themeSlice';
import notificationSlice from './slices/notificationSlice';
import uiSlice from './slices/uiSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'theme', 'dashboard'],
  blacklist: ['ui', 'notifications'],
};

const rootReducer = combineReducers({
  // API reducers
  [weatherApi.reducerPath]: weatherApi.reducer,
  [financeApi.reducerPath]: financeApi.reducer,
  [newsApi.reducerPath]: newsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  
  // Regular reducers
  auth: authSlice,
  dashboard: dashboardSlice,
  theme: themeSlice,
  notifications: notificationSlice,
  ui: uiSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(
      weatherApi.middleware,
      financeApi.middleware,
      newsApi.middleware,
      authApi.middleware
    ),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

// Setup listeners for refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;