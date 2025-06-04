// config/api.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuração base da API
export const API_CONFIG = {
  // Altere para o IP da sua máquina quando testar em dispositivo físico
  BASE_URL: 'http://localhost:5165/api', // ou https://localhost:7013/api
  TIMEOUT: 10000, // 10 segundos
  RETRY_ATTEMPTS: 3,
};

// Chaves para AsyncStorage
export const STORAGE_KEYS = {
  TOKEN: '@WeatherApp:token',
  USER: '@WeatherApp:user',
  REFRESH_TOKEN: '@WeatherApp:refreshToken',
} as const;

// Tipos base da API
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  details?: string;
  timestamp?: string;
  path?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  isActive: boolean;
  links: Record<string, any>;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiresAt: string;
  user: User;
}

export interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  city?: string;
  state?: string;
  country?: string;
  isFavorite: boolean;
  createdAt: string;
  links: Record<string, any>;
}

export interface CreateLocationRequest {
  name: string;
  latitude: number;
  longitude: number;
  city?: string;
  state?: string;
  country?: string;
  isFavorite?: boolean;
}

export interface CreateLocationByAddressRequest {
  name: string;
  city: string;
  state: string;
  country: string;
  isFavorite?: boolean;
}

export interface EmergencyContact {
  id: number;
  name: string;
  phoneNumber: string;
  countryCode: string;
  relationship?: string;
  isPrimary: boolean;
  createdAt: string;
  links: Record<string, any>;
}

export interface CreateEmergencyContactRequest {
  name: string;
  phoneNumber: string;
  country: string;
  relationship?: string;
  isPrimary?: boolean;
}

export interface WeatherRequest {
  latitude: number;
  longitude: number;
}

export interface CurrentWeather {
  city: string;
  state: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  description: string;
  icon: string;
  updatedAt: string;
  links: Record<string, any>;
}

export interface WeatherForecast {
  date: string;
  temperatureMin: number;
  temperatureMax: number;
  description: string;
  icon: string;
  chanceOfRain: number;
}

export interface WeatherAlert {
  id: string;
  type: string;
  severity: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  affectedAreas: string[];
}

export interface WeatherResponse {
  current: CurrentWeather;
  forecast: WeatherForecast[];
  alerts: WeatherAlert[];
  links: Record<string, any>;
}

export interface DisasterPredictionRequest {
  temperature: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  precipitation: number;
}

export interface DisasterPredictionResponse {
  hasHighRisk: boolean;
  riskProbability: number;
  riskLevel: string;
  recommendation: string;
  potentialHazards: string[];
  predictionTime: string;
  links: Record<string, any>;
}

// Funções utilitárias para AsyncStorage
export const tokenStorage = {
  async saveToken(token: string): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token);
  },

  async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  async removeToken(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
  },

  async saveUser(user: User): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  async getUser(): Promise<User | null> {
    const userStr = await AsyncStorage.getItem(STORAGE_KEYS.USER);
    return userStr ? JSON.parse(userStr) : null;
  },

  async removeUser(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER);
  },

  async clearAll(): Promise<void> {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.TOKEN,
      STORAGE_KEYS.USER,
      STORAGE_KEYS.REFRESH_TOKEN,
    ]);
  },
};