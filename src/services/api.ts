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

  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
    
    if (!response.ok) {
      let errorMessage = 'Erro na requisição';
      
      try {
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || `Erro ${response.status}`;
        } else {
          errorMessage = await response.text() || `Erro ${response.status}`;
        }
      } catch (parseError) {
        errorMessage = `Erro ${response.status}: ${response.statusText}`;
      }

      // Se for erro 401, o token pode ter expirado
      if (response.status === 401) {
        await AsyncStorage.multiRemove(['token', 'user', 'tokenExpiration']);
        throw new Error('Sessão expirada. Faça login novamente.');
      }

      throw new Error(errorMessage);
    }

    // Verificar se a resposta tem conteúdo
    if (response.status === 204) {
      return {} as T; // No content
    }

    try {
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        // Se não for JSON, retornar como texto
        const text = await response.text();
        return text as unknown as T;
      }
    } catch (parseError) {
      console.error('Erro ao fazer parse da resposta:', parseError);
      throw new Error('Erro ao processar resposta do servidor');
    }
  }

  async post<T>(endpoint: string, data: any, authenticated: boolean = false): Promise<T> {
    try {
      console.log(`Making POST request to: ${this.baseUrl}${endpoint}`);
      console.log('Request data:', JSON.stringify(data, null, 2));

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: await this.getHeaders(authenticated),
        body: JSON.stringify(data),
      });

      console.log(`Response status: ${response.status}`);
      
      return await this.handleResponse<T>(response);
    } catch (error) {
      console.error('API POST Error:', error);
      throw error;
    }
  }

  async get<T>(endpoint: string, authenticated: boolean = true): Promise<T> {
    try {
      console.log(`Making GET request to: ${this.baseUrl}${endpoint}`);

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: await this.getHeaders(authenticated),
      });

      console.log(`Response status: ${response.status}`);
      
      return await this.handleResponse<T>(response);
    } catch (error) {
      console.error('API GET Error:', error);
      throw error;
    }
  }

  async put<T>(endpoint: string, data: any, authenticated: boolean = true): Promise<T> {
    try {
      console.log(`Making PUT request to: ${this.baseUrl}${endpoint}`);
      console.log('Request data:', JSON.stringify(data, null, 2));

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: await this.getHeaders(authenticated),
        body: JSON.stringify(data),
      });

      console.log(`Response status: ${response.status}`);
      
      return await this.handleResponse<T>(response);
    } catch (error) {
      console.error('API PUT Error:', error);
      throw error;
    }
  }

  async delete<T>(endpoint: string, authenticated: boolean = true): Promise<T> {
    try {
      console.log(`Making DELETE request to: ${this.baseUrl}${endpoint}`);

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: await this.getHeaders(authenticated),
      });

      console.log(`Response status: ${response.status}`);
      
      return await this.handleResponse<T>(response);
    } catch (error) {
      console.error('API DELETE Error:', error);
      throw error;
    }
  }

  // Método para testar conectividade
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/health`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      return response.ok;
    } catch (error) {
      console.error('Erro de conexão com a API:', error);
      return false;
    }
  }
}

export default new ApiService();