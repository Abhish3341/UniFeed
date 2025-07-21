import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NewsArticle, NewsCategory, ApiResponse, SearchFilters } from '@/types';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/news',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['News', 'Headlines', 'Bookmarks'],
  endpoints: (builder) => ({
    getLatestNews: builder.query<ApiResponse<NewsArticle[]>, { category?: NewsCategory; limit?: number; page?: number }>({
      query: ({ category = 'general', limit = 20, page = 1 }) => 
        `latest?category=${category}&limit=${limit}&page=${page}`,
      providesTags: (result, error, { category }) => [
        { type: 'News', id: category },
        'Headlines',
      ],
      keepUnusedDataFor: 300, // 5 minutes
    }),
    searchNews: builder.query<ApiResponse<NewsArticle[]>, SearchFilters & { page?: number; limit?: number }>({
      query: ({ query, category, dateFrom, dateTo, sortBy, sortOrder, page = 1, limit = 20 }) => {
        const params = new URLSearchParams();
        if (query) params.append('q', query);
        if (category) params.append('category', category);
        if (dateFrom) params.append('from', dateFrom);
        if (dateTo) params.append('to', dateTo);
        if (sortBy) params.append('sortBy', sortBy);
        if (sortOrder) params.append('sortOrder', sortOrder);
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        return `search?${params.toString()}`;
      },
      keepUnusedDataFor: 600, // 10 minutes
    }),
    getArticleById: builder.query<ApiResponse<NewsArticle>, string>({
      query: (id) => `article/${id}`,
      keepUnusedDataFor: 3600, // 1 hour
    }),
    getTopHeadlines: builder.query<ApiResponse<NewsArticle[]>, { country?: string; category?: NewsCategory }>({
      query: ({ country = 'us', category }) => {
        const params = new URLSearchParams();
        params.append('country', country);
        if (category) params.append('category', category);
        return `headlines?${params.toString()}`;
      },
      providesTags: ['Headlines'],
      keepUnusedDataFor: 180, // 3 minutes
    }),
    getTrendingTopics: builder.query<ApiResponse<Array<{ topic: string; count: number; trend: 'up' | 'down' | 'stable' }>>, void>({
      query: () => 'trending',
      keepUnusedDataFor: 900, // 15 minutes
    }),
    getNewsBySource: builder.query<ApiResponse<NewsArticle[]>, { source: string; page?: number; limit?: number }>({
      query: ({ source, page = 1, limit = 20 }) => 
        `source/${source}?page=${page}&limit=${limit}`,
      keepUnusedDataFor: 600,
    }),
    bookmarkArticle: builder.mutation<ApiResponse<void>, string>({
      query: (articleId) => ({
        url: `bookmark/${articleId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Bookmarks'],
    }),
    removeBookmark: builder.mutation<ApiResponse<void>, string>({
      query: (articleId) => ({
        url: `bookmark/${articleId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Bookmarks'],
    }),
    getBookmarks: builder.query<ApiResponse<NewsArticle[]>, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 20 }) => `bookmarks?page=${page}&limit=${limit}`,
      providesTags: ['Bookmarks'],
      keepUnusedDataFor: 300,
    }),
  }),
});

export const {
  useGetLatestNewsQuery,
  useSearchNewsQuery,
  useGetArticleByIdQuery,
  useGetTopHeadlinesQuery,
  useGetTrendingTopicsQuery,
  useGetNewsBySourceQuery,
  useBookmarkArticleMutation,
  useRemoveBookmarkMutation,
  useGetBookmarksQuery,
  useLazySearchNewsQuery,
  useLazyGetLatestNewsQuery,
} = newsApi;