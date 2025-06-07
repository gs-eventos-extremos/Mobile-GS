import api from './api';
import { 
  WeatherRequestDto, 
  CurrentWeatherDto, 
  WeatherForecastDto, 
  WeatherAlertDto, 
  WeatherResponseDto,
  EnvironmentalRisk
} from '../types/weather.types';

class WeatherService {
  async getCurrentWeather(latitude: number, longitude: number): Promise<CurrentWeatherDto> {
    try {
      const request: WeatherRequestDto = { latitude, longitude };
      const response = await api.post<CurrentWeatherDto>('/api/weather/current', request, false);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getWeatherForecast(latitude: number, longitude: number): Promise<WeatherForecastDto[]> {
    try {
      const request: WeatherRequestDto = { latitude, longitude };
      const response = await api.post<WeatherForecastDto[]>('/api/weather/forecast', request, false);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getWeatherAlerts(latitude: number, longitude: number): Promise<WeatherAlertDto[]> {
    try {
      const request: WeatherRequestDto = { latitude, longitude };
      const response = await api.post<WeatherAlertDto[]>('/api/weather/alerts', request, false);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getCompleteWeatherInfo(latitude: number, longitude: number): Promise<WeatherResponseDto> {
    try {
      const request: WeatherRequestDto = { latitude, longitude };
      const response = await api.post<WeatherResponseDto>('/api/weather', request, false);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getWeatherByLocationId(locationId: number): Promise<CurrentWeatherDto> {
    try {
      const response = await api.get<CurrentWeatherDto>(`/api/weather/location/${locationId}`, true);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Função para determinar riscos ambientais baseado no clima
  getEnvironmentalRisks(weather: CurrentWeatherDto, alerts: WeatherAlertDto[]): EnvironmentalRisk[] {
    const risks: EnvironmentalRisk[] = [];

    // Chuva forte (usar alagamento.png)
    if (weather.humidity > 80) {
      risks.push({
        id: 'chuva-forte',
        name: 'chuva forte',
        level: weather.humidity > 90 ? 'alto' : 'moderado',
        icon: 'alagamento',
        description: 'Possibilidade de chuvas intensas'
      });
    }

    // Alagamento (usar alagamento.png)
    if (weather.humidity > 85) {
      risks.push({
        id: 'alagamento',
        name: 'Alagamento',
        level: weather.humidity > 95 ? 'alto' : 'moderado',
        icon: 'alagamento',
        description: 'Risco de alagamentos em áreas baixas'
      });
    }

    // Calor extremo / Queimada (usar queimada.png)
    if (weather.temperature > 35) {
      risks.push({
        id: 'calor-extremo',
        name: 'Calor extremo',
        level: weather.temperature > 40 ? 'crítico' : 'alto',
        icon: 'queimada',
        description: 'Temperaturas perigosas - risco de queimadas'
      });
    }

    // Seca (usar seca.png)
    if (weather.humidity < 30 && weather.temperature > 30) {
      risks.push({
        id: 'seca',
        name: 'Seca',
        level: weather.humidity < 20 ? 'alto' : 'moderado',
        icon: 'seca',
        description: 'Baixa umidade - risco de seca'
      });
    }

    // Frio intenso (usar deslizamento.png para representar condições adversas)
    if (weather.temperature < 10) {
      risks.push({
        id: 'frio-intenso',
        name: 'Frio intenso',
        level: weather.temperature < 5 ? 'alto' : 'moderado',
        icon: 'deslizamento',
        description: 'Temperaturas muito baixas'
      });
    }

    // Verificar alertas da API para outros riscos
    alerts.forEach(alert => {
      if (alert.type.toLowerCase().includes('vento') || alert.type.toLowerCase().includes('tornado')) {
        risks.push({
          id: 'ventania',
          name: 'Ventania',
          level: alert.severity.toLowerCase() === 'high' ? 'alto' : 'moderado',
          icon: 'tornado',
          description: 'Ventos fortes - risco de tornado'
        });
      }

      if (alert.type.toLowerCase().includes('deslizamento') || alert.type.toLowerCase().includes('landslide')) {
        risks.push({
          id: 'deslizamento',
          name: 'Deslizamento',
          level: alert.severity.toLowerCase() === 'high' ? 'alto' : 'moderado',
          icon: 'deslizamento',
          description: 'Risco de deslizamento de terra'
        });
      }
    });

    // Remover duplicatas
    const uniqueRisks = risks.filter((risk, index, self) => 
      index === self.findIndex(r => r.id === risk.id)
    );

    return uniqueRisks;
  }
}

export default new WeatherService();