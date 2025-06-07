export interface WeatherRequestDto {
  latitude: number;
  longitude: number;
}

export interface CurrentWeatherDto {
  city: string;
  state: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  description: string;
  icon: string;
  updatedAt: string;
  links: {
    [key: string]: any;
  };
}

export interface WeatherForecastDto {
  date: string;
  temperatureMin: number;
  temperatureMax: number;
  description: string;
  icon: string;
  chanceOfRain: number;
}

export interface WeatherAlertDto {
  id: string;
  type: string;
  severity: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  affectedAreas: string[];
}

export interface WeatherResponseDto {
  current: CurrentWeatherDto;
  forecast: WeatherForecastDto[];
  alerts: WeatherAlertDto[];
  links: {
    [key: string]: any;
  };
}

// Tipos para alertas de risco ambiental
export interface EnvironmentalRisk {
  id: string;
  name: string;
  level: 'baixo' | 'moderado' | 'alto' | 'crítico';
  icon: string;
  description: string;
}