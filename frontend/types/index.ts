export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'es';
  notifications: NotificationSettings;
  dashboard: DashboardSettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  weather: boolean;
  finance: boolean;
  news: boolean;
}

export interface DashboardSettings {
  layout: WidgetLayout[];
  refreshInterval: number;
  defaultView: 'grid' | 'list';
}

export interface WidgetLayout {
  id: string;
  type: WidgetType;
  position: { x: number; y: number };
  size: { width: number; height: number };
  visible: boolean;
}

export type WidgetType = 'weather' | 'finance' | 'news' | 'analytics' | 'custom';

export interface WeatherData {
  id: string;
  location: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  current: {
    temperature: number;
    feelsLike: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    windDirection: number;
    visibility: number;
    uvIndex: number;
    condition: string;
    icon: string;
  };
  forecast: WeatherForecast[];
  alerts: WeatherAlert[];
  timestamp: string;
}

export interface WeatherForecast {
  date: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  precipitation: number;
  humidity: number;
  windSpeed: number;
}

export interface WeatherAlert {
  id: string;
  title: string;
  description: string;
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  start: string;
  end: string;
}

export interface FinanceData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  high52Week: number;
  low52Week: number;
  peRatio?: number;
  dividend?: number;
  beta?: number;
  timestamp: string;
}

export interface MarketIndex {
  id: string;
  name: string;
  symbol: string;
  value: number;
  change: number;
  changePercent: number;
  timestamp: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  source: NewsSource;
  url: string;
  imageUrl?: string;
  publishedAt: string;
  category: NewsCategory;
  sentiment: 'positive' | 'negative' | 'neutral';
  tags: string[];
  readTime: number;
}

export interface NewsSource {
  id: string;
  name: string;
  url: string;
  logo?: string;
  reliability: number;
}

export type NewsCategory = 
  | 'general'
  | 'business'
  | 'technology'
  | 'science'
  | 'health'
  | 'sports'
  | 'entertainment'
  | 'politics';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
  pagination?: PaginationInfo;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: 'relevance' | 'date' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

export interface DashboardState {
  isLoading: boolean;
  error: string | null;
  lastUpdated: string;
  widgets: WidgetState[];
  filters: SearchFilters;
  view: 'grid' | 'list';
}

export interface WidgetState {
  id: string;
  type: WidgetType;
  isLoading: boolean;
  error: string | null;
  data: unknown;
  lastUpdated: string;
}

export interface ThemeConfig {
  mode: 'light' | 'dark' | 'system';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  animations: boolean;
}

export interface NotificationData {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  id: string;
  label: string;
  action: () => void;
  variant: 'primary' | 'secondary' | 'danger';
}

export interface ChartData {
  id: string;
  name: string;
  data: ChartDataPoint[];
  type: 'line' | 'bar' | 'area' | 'pie' | 'scatter';
  color: string;
}

export interface ChartDataPoint {
  x: string | number;
  y: number;
  label?: string;
  color?: string;
}

export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
  repeat?: boolean;
}

export interface LoadingState {
  isLoading: boolean;
  progress?: number;
  message?: string;
}

export interface ErrorState {
  hasError: boolean;
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'radio';
  required: boolean;
  validation?: ValidationRule[];
  options?: SelectOption[];
  placeholder?: string;
  helpText?: string;
}

export interface ValidationRule {
  type: 'required' | 'email' | 'min' | 'max' | 'pattern';
  value?: string | number;
  message: string;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// WebSocket types
export interface WebSocketMessage {
  type: string;
  payload: unknown;
  timestamp: string;
}

export interface RealTimeUpdate {
  type: 'weather' | 'finance' | 'news';
  data: unknown;
  timestamp: string;
}