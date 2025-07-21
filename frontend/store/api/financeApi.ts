import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FinanceData, MarketIndex, ApiResponse } from '@/types';

export const financeApi = createApi({
  reducerPath: 'financeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/finance',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Stock', 'MarketIndex', 'Portfolio', 'Watchlist'],
  endpoints: (builder) => ({
    getStockQuote: builder.query<ApiResponse<FinanceData>, string>({
      query: (symbol) => `quote/${symbol.toUpperCase()}`,
      providesTags: (result, error, symbol) => [{ type: 'Stock', id: symbol }],
      keepUnusedDataFor: 60, // 1 minute for real-time data
    }),
    getMultipleStocks: builder.query<ApiResponse<FinanceData[]>, string[]>({
      query: (symbols) => `quotes?symbols=${symbols.map(s => s.toUpperCase()).join(',')}`,
      providesTags: (result, error, symbols) => 
        symbols.map(symbol => ({ type: 'Stock' as const, id: symbol })),
      keepUnusedDataFor: 60,
    }),
    getMarketIndices: builder.query<ApiResponse<MarketIndex[]>, void>({
      query: () => 'indices',
      providesTags: ['MarketIndex'],
      keepUnusedDataFor: 300, // 5 minutes
    }),
    getStockHistory: builder.query<ApiResponse<Array<{ date: string; price: number; volume: number }>>, { symbol: string; period: string }>({
      query: ({ symbol, period }) => `history/${symbol.toUpperCase()}?period=${period}`,
      keepUnusedDataFor: 600, // 10 minutes
    }),
    searchStocks: builder.query<ApiResponse<Array<{ symbol: string; name: string; exchange: string }>>, string>({
      query: (query) => `search?q=${encodeURIComponent(query)}`,
      keepUnusedDataFor: 3600, // 1 hour
    }),
    getPortfolio: builder.query<ApiResponse<{ stocks: FinanceData[]; totalValue: number; totalChange: number }>, void>({
      query: () => 'portfolio',
      providesTags: ['Portfolio'],
      keepUnusedDataFor: 300,
    }),
    addToWatchlist: builder.mutation<ApiResponse<void>, string>({
      query: (symbol) => ({
        url: `watchlist/${symbol.toUpperCase()}`,
        method: 'POST',
      }),
      invalidatesTags: ['Watchlist'],
    }),
    removeFromWatchlist: builder.mutation<ApiResponse<void>, string>({
      query: (symbol) => ({
        url: `watchlist/${symbol.toUpperCase()}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Watchlist'],
    }),
    getWatchlist: builder.query<ApiResponse<FinanceData[]>, void>({
      query: () => 'watchlist',
      providesTags: ['Watchlist'],
      keepUnusedDataFor: 300,
    }),
  }),
});

export const {
  useGetStockQuoteQuery,
  useGetMultipleStocksQuery,
  useGetMarketIndicesQuery,
  useGetStockHistoryQuery,
  useSearchStocksQuery,
  useGetPortfolioQuery,
  useAddToWatchlistMutation,
  useRemoveFromWatchlistMutation,
  useGetWatchlistQuery,
  useLazyGetStockQuoteQuery,
  useLazySearchStocksQuery,
} = financeApi;