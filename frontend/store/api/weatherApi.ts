import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { WeatherData, ApiResponse } from '@/types';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/weather',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Weather', 'WeatherForecast', 'WeatherAlerts'],
  endpoints: (builder) => ({
    getCurrentWeather: builder.query<ApiResponse<WeatherData>, { location?: string; coords?: { lat: number; lon: number } }>({
      query: ({ location, coords }) => {
        const params = new URLSearchParams();
        if (location) params.append('location', location);
        if (coords) {
          params.append('lat', coords.lat.toString());
          params.append('lon', coords.lon.toString());
        }
        return `current?${params.toString()}`;
      },
      providesTags: ['Weather'],
      keepUnusedDataFor: 300, // 5 minutes
    }),
    getWeatherForecast: builder.query<ApiResponse<WeatherData>, { location?: string; days?: number }>({
      query: ({ location = 'london', days = 7 }) => `forecast?location=${location}&days=${days}`,
      providesTags: ['WeatherForecast'],
      keepUnusedDataFor: 600, // 10 minutes
    }),
    getWeatherAlerts: builder.query<ApiResponse<WeatherData['alerts']>, string>({
      query: (location) => `alerts?location=${location}`,
      providesTags: ['WeatherAlerts'],
      keepUnusedDataFor: 180, // 3 minutes
    }),
    searchLocations: builder.query<ApiResponse<Array<{ name: string; country: string; lat: number; lon: number }>>, string>({
      query: (query) => `search?q=${encodeURIComponent(query)}`,
      keepUnusedDataFor: 3600, // 1 hour
    }),
  }),
});

export const {
  useGetCurrentWeatherQuery,
  useGetWeatherForecastQuery,
  useGetWeatherAlertsQuery,
  useSearchLocationsQuery,
  useLazyGetCurrentWeatherQuery,
  useLazyGetWeatherForecastQuery,
} = weatherApi;