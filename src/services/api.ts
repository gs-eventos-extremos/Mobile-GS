import AsyncStorage from '@react-native-async-storage/async-storage';

// Para emulador Android
const API_BASE_URL = 'http://10.0.2.2:5165';

// Para dispositivo físico, use o IP da sua máquina:
// const API_BASE_URL = 'http://192.168.1.100:5165';

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async getHeaders(authenticated: boolean = false): Promise<HeadersInit> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (authenticated) {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  async post<T>(endpoint: string, data: any, authenticated: boolean = false): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: await this.getHeaders(authenticated),
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Erro na requisição');
      }

      return responseData;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async get<T>(endpoint: string, authenticated: boolean = true): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: await this.getHeaders(authenticated),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Erro na requisição');
      }

      return responseData;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Outros métodos (PUT, DELETE) serão adicionados conforme necessário
}

export default new ApiService();