import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { contentAPI } from '../../services/api';

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  url?: string;
  category: string;
  type: 'news' | 'movie' | 'social';
  publishedAt: string;
  source: string;
  author?: string;
  rating?: number;
}

interface ContentState {
  news: ContentItem[];
  movies: ContentItem[];
  socialPosts: ContentItem[];
  trending: ContentItem[];
  searchResults: ContentItem[];
  loading: {
    news: boolean;
    movies: boolean;
    social: boolean;
    search: boolean;
    trending: boolean;
  };
  error: string | null;
  searchQuery: string;
  currentPage: {
    news: number;
    movies: number;
    social: number;
    search: number;
    trending: number;
  };
  hasMore: {
    news: boolean;
    movies: boolean;
    social: boolean;
    search: boolean;
    trending: boolean;
  };
}

const initialState: ContentState = {
  news: [],
  movies: [],
  socialPosts: [],
  trending: [],
  searchResults: [],
  loading: {
    news: false,
    movies: false,
    social: false,
    search: false,
    trending: false,
  },
  error: null,
  searchQuery: '',
  currentPage: {
    news: 1,
    movies: 1,
    social: 1,
    search: 1,
    trending: 1,
  },
  hasMore: {
    news: true,
    movies: true,
    social: true,
    search: true,
    trending: true,
  },
};

export const fetchNewsContent = createAsyncThunk(
  'content/fetchNews',
  async ({ categories, page = 1, search }: { categories: string[]; page?: number; search?: string }) => {
    const response = await contentAPI.getNews(categories, page, 20, search);
    return { ...response.data, page };
  }
);

export const fetchMoviesContent = createAsyncThunk(
  'content/fetchMovies',
  async ({ page = 1, search }: { page?: number; search?: string } = {}) => {
    const response = await contentAPI.getMovies(page, 20, search);
    return { ...response.data, page };
  }
);

export const fetchSocialContent = createAsyncThunk(
  'content/fetchSocial',
  async ({ hashtags = ['trending'], page = 1, search }: { hashtags?: string[]; page?: number; search?: string } = {}) => {
    const response = await contentAPI.getSocial(hashtags, page, 20, search);
    return { ...response.data, page };
  }
);

export const searchContent = createAsyncThunk(
  'content/search',
  async ({ query, page = 1 }: { query: string; page?: number }) => {
    const response = await contentAPI.search(query, page, 20);
    return { ...response.data, page };
  }
);

export const fetchTrendingContent = createAsyncThunk(
  'content/fetchTrending',
  async ({ page = 1 }: { page?: number } = {}) => {
    const response = await contentAPI.getTrending(page, 20);
    return { ...response.data, page };
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchQuery = '';
      state.currentPage.search = 1;
      state.hasMore.search = true;
    },
    reorderContent: (state, action: PayloadAction<{ type: string; items: ContentItem[] }>) => {
      const { type, items } = action.payload;
      switch (type) {
        case 'news':
          state.news = items;
          break;
        case 'movies':
          state.movies = items;
          break;
        case 'social':
          state.socialPosts = items;
          break;
      }
    },
    updateRealTimeContent: (state, action: PayloadAction<{ news?: ContentItem[]; movies?: ContentItem[]; social?: ContentItem[] }>) => {
      const { news, movies, social } = action.payload;
      if (news) state.news = [...news, ...state.news].slice(0, 100); // Keep only latest 100
      if (movies) state.movies = [...movies, ...state.movies].slice(0, 100);
      if (social) state.socialPosts = [...social, ...state.socialPosts].slice(0, 100);
    },
    updateTrendingContent: (state, action: PayloadAction<ContentItem[]>) => {
      state.trending = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // News
      .addCase(fetchNewsContent.pending, (state) => {
        state.loading.news = true;
        state.error = null;
      })
      .addCase(fetchNewsContent.fulfilled, (state, action) => {
        state.loading.news = false;
        const { items, page, hasMore } = action.payload;
        if (page === 1) {
          state.news = items;
        } else {
          state.news = [...state.news, ...items];
        }
        state.currentPage.news = page;
        state.hasMore.news = hasMore;
      })
      .addCase(fetchNewsContent.rejected, (state, action) => {
        state.loading.news = false;
        state.error = action.error.message || 'Failed to fetch news';
      })
      // Movies
      .addCase(fetchMoviesContent.pending, (state) => {
        state.loading.movies = true;
        state.error = null;
      })
      .addCase(fetchMoviesContent.fulfilled, (state, action) => {
        state.loading.movies = false;
        const { items, page, hasMore } = action.payload;
        if (page === 1) {
          state.movies = items;
        } else {
          state.movies = [...state.movies, ...items];
        }
        state.currentPage.movies = page;
        state.hasMore.movies = hasMore;
      })
      .addCase(fetchMoviesContent.rejected, (state, action) => {
        state.loading.movies = false;
        state.error = action.error.message || 'Failed to fetch movies';
      })
      // Social
      .addCase(fetchSocialContent.pending, (state) => {
        state.loading.social = true;
        state.error = null;
      })
      .addCase(fetchSocialContent.fulfilled, (state, action) => {
        state.loading.social = false;
        const { items, page, hasMore } = action.payload;
        if (page === 1) {
          state.socialPosts = items;
        } else {
          state.socialPosts = [...state.socialPosts, ...items];
        }
        state.currentPage.social = page;
        state.hasMore.social = hasMore;
      })
      .addCase(fetchSocialContent.rejected, (state, action) => {
        state.loading.social = false;
        state.error = action.error.message || 'Failed to fetch social content';
      })
      // Search
      .addCase(searchContent.pending, (state) => {
        state.loading.search = true;
        state.error = null;
      })
      .addCase(searchContent.fulfilled, (state, action) => {
        state.loading.search = false;
        const { items, page, hasMore } = action.payload;
        if (page === 1) {
          state.searchResults = items;
        } else {
          state.searchResults = [...state.searchResults, ...items];
        }
        state.currentPage.search = page;
        state.hasMore.search = hasMore;
      })
      .addCase(searchContent.rejected, (state, action) => {
        state.loading.search = false;
        state.error = action.error.message || 'Search failed';
      })
      // Trending
      .addCase(fetchTrendingContent.pending, (state) => {
        state.loading.trending = true;
        state.error = null;
      })
      .addCase(fetchTrendingContent.fulfilled, (state, action) => {
        state.loading.trending = false;
        const { items, page, hasMore } = action.payload;
        if (page === 1) {
          state.trending = items;
        } else {
          state.trending = [...state.trending, ...items];
        }
        state.currentPage.trending = page;
        state.hasMore.trending = hasMore;
      })
      .addCase(fetchTrendingContent.rejected, (state, action) => {
        state.loading.trending = false;
        state.error = action.error.message || 'Failed to fetch trending content';
      });
  },
});

export const {
  setSearchQuery,
  clearSearchResults,
  reorderContent,
  updateRealTimeContent,
  updateTrendingContent,
  clearError,
} = contentSlice.actions;

export default contentSlice.reducer;