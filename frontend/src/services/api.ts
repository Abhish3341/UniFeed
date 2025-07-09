import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },
};

// Content API
export const contentAPI = {
  getNews: async (categories: string[], page = 1, limit = 20, search?: string) => {
    const params = new URLSearchParams({
      categories: categories.join(','),
      page: page.toString(),
      limit: limit.toString(),
    });
    if (search) params.append('search', search);
    
    const response = await api.get(`/content/news?${params}`);
    return response.data;
  },
  
  getMovies: async (page = 1, limit = 20, search?: string) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (search) params.append('search', search);
    
    const response = await api.get(`/content/movies?${params}`);
    return response.data;
  },
  
  getSocial: async (hashtags: string[], page = 1, limit = 20, search?: string) => {
    const params = new URLSearchParams({
      hashtags: hashtags.join(','),
      page: page.toString(),
      limit: limit.toString(),
    });
    if (search) params.append('search', search);
    
    const response = await api.get(`/content/social?${params}`);
    return response.data;
  },
  
  search: async (query: string, page = 1, limit = 20) => {
    const params = new URLSearchParams({
      q: query,
      page: page.toString(),
      limit: limit.toString(),
    });
    
    const response = await api.get(`/content/search?${params}`);
    return response.data;
  },
  
  getTrending: async (page = 1, limit = 20) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    const response = await api.get(`/content/trending?${params}`);
    return response.data;
  },
};

// User API
export const userAPI = {
  getProfile: async () => {
    const response = await api.get('/user/profile');
    return response.data;
  },
  
  updatePreferences: async (preferences: any) => {
    const response = await api.put('/user/preferences', preferences);
    return response.data;
  },
  
  addToFavorites: async (contentId: string) => {
    const response = await api.post(`/user/favorites/${contentId}`);
    return response.data;
  },
  
  removeFromFavorites: async (contentId: string) => {
    const response = await api.delete(`/user/favorites/${contentId}`);
    return response.data;
  },
  
  getFavorites: async () => {
    const response = await api.get('/user/favorites');
    return response.data;
  },
};

export default api;