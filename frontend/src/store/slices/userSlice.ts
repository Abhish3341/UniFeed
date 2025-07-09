import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authAPI, userAPI } from '../../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface UserPreferences {
  categories: string[];
  darkMode: boolean;
  language: string;
  notifications: boolean;
}

interface UserState {
  user: User | null;
  preferences: UserPreferences;
  isAuthenticated: boolean;
  favorites: string[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  preferences: {
    categories: ['technology', 'sports', 'entertainment'],
    darkMode: false,
    language: 'en',
    notifications: true,
  },
  isAuthenticated: false,
  favorites: [],
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await authAPI.login(email, password);
    if (response.success) {
      localStorage.setItem('authToken', response.data.token);
      return response.data;
    }
    throw new Error(response.error || 'Login failed');
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ name, email, password }: { name: string; email: string; password: string }) => {
    const response = await authAPI.register(name, email, password);
    if (response.success) {
      localStorage.setItem('authToken', response.data.token);
      return response.data;
    }
    throw new Error(response.error || 'Registration failed');
  }
);

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async () => {
    const response = await userAPI.getProfile();
    if (response.success) {
      return response.data;
    }
    throw new Error(response.error || 'Failed to fetch profile');
  }
);

export const updateUserPreferences = createAsyncThunk(
  'user/updatePreferences',
  async (preferences: Partial<UserPreferences>) => {
    const response = await userAPI.updatePreferences(preferences);
    if (response.success) {
      return response.data.preferences;
    }
    throw new Error(response.error || 'Failed to update preferences');
  }
);

export const addToFavorites = createAsyncThunk(
  'user/addToFavorites',
  async (contentId: string) => {
    const response = await userAPI.addToFavorites(contentId);
    if (response.success) {
      return response.data.favorites;
    }
    throw new Error(response.error || 'Failed to add to favorites');
  }
);

export const removeFromFavorites = createAsyncThunk(
  'user/removeFromFavorites',
  async (contentId: string) => {
    const response = await userAPI.removeFromFavorites(contentId);
    if (response.success) {
      return response.data.favorites;
    }
    throw new Error(response.error || 'Failed to remove from favorites');
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.favorites = [];
      localStorage.removeItem('authToken');
    },
    toggleDarkMode: (state) => {
      state.preferences.darkMode = !state.preferences.darkMode;
    },
    updateCategories: (state, action: PayloadAction<string[]>) => {
      state.preferences.categories = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    // Auto-login for demo
    setDemoUser: (state) => {
      state.user = {
        id: '1',
        name: 'Demo User',
        email: 'demo@example.com',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
      };
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        if (action.payload.user.preferences) {
          state.preferences = action.payload.user.preferences;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        if (action.payload.user.preferences) {
          state.preferences = action.payload.user.preferences;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
      })
      // Fetch Profile
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.favorites = action.payload.favorites || [];
        if (action.payload.user.preferences) {
          state.preferences = action.payload.user.preferences;
        }
      })
      // Update Preferences
      .addCase(updateUserPreferences.fulfilled, (state, action) => {
        state.preferences = { ...state.preferences, ...action.payload };
      })
      // Favorites
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      });
  },
});

export const {
  logout,
  toggleDarkMode,
  updateCategories,
  clearError,
  setDemoUser,
} = userSlice.actions;

export default userSlice.reducer;