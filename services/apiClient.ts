// services/apiClient.ts
import { API_CONFIG, ApiResponse, tokenStorage } from '../config/api';

class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  // Método base para fazer requisições HTTP
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    // Headers padrão
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    // Adicionar token de autenticação se existir
    const token = await tokenStorage.getToken();
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    // Combinar headers
    const headers = {
      ...defaultHeaders,
      ...options.headers,
    };

    // Configuração da requisição
    const config: RequestInit = {   
      ...options,
      headers,
      timeout: this.timeout,
    };

    console.log(`🌐 API Request: ${options.method || 'GET'} ${url}`);
    
    try {
      const response = await fetch(url, config);

      // Log da resposta
      console.log(`📡 API Response: ${response.status} ${response.statusText}`);

      // Verificar se a resposta é JSON
      const contentType = response.headers.get('content-type');
      const isJson = contentType?.includes('application/json');

      let data: any;
      if (isJson) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      // Se a resposta não é ok, lançar erro
      if (!response.ok) {
        const error = data?.error || data?.message || `HTTP ${response.status}`;
        const details = data?.details || response.statusText;
        
        console.error(`❌ API Error: ${error}`, details);
        
        throw new ApiError(
          error,
          response.status,
          details,
          data
        );
      }

      console.log('✅ API Success:', data);
      return data;

    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      // Erros de rede ou timeout
      console.error('💥 Network Error:', error);
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new ApiError(
          'Erro de conexão. Verifique sua internet.',
          0,
          'Network Error'
        );
      }

      throw new ApiError(
        'Erro inesperado. Tente novamente.',
        0,
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }

  // Métodos HTTP
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    let url = endpoint;
    
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      
      if (searchParams.toString()) {
        url += `?${searchParams.toString()}`;
      }
    }

    return this.request<T>(url, {
      method: 'GET',
    });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }

  // Método para configurar nova URL base (útil para desenvolvimento)
  setBaseURL(url: string): void {
    this.baseURL = url;
    console.log(`🔧 API Base URL alterada para: ${url}`);
  }

  // Método para testar conectividade
  async testConnection(): Promise<boolean> {
    try {
      await this.get('/health');
      return true;
    } catch (error) {
      console.error('🚫 API não está acessível:', error);
      return false;
    }
  }
}

// Classe customizada para erros da API
export class ApiError extends Error {
  public status: number;
  public details?: string;
  public response?: any;

  constructor(
    message: string,
    status: number,
    details?: string,
    response?: any
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
    this.response = response;
  }

  // Verificar se é erro de autenticação
  get isAuthError(): boolean {
    return this.status === 401 || this.status === 403;
  }

  // Verificar se é erro de validação
  get isValidationError(): boolean {
    return this.status === 400;
  }

  // Verificar se é erro de não encontrado
  get isNotFoundError(): boolean {
    return this.status === 404;
  }

  // Verificar se é erro de rate limit
  get isRateLimitError(): boolean {
    return this.status === 429;
  }

  // Verificar se é erro do servidor
  get isServerError(): boolean {
    return this.status >= 500;
  }

  // Verificar se é erro de rede
  get isNetworkError(): boolean {
    return this.status === 0;
  }
}

// Instância singleton do cliente API
export const apiClient = new ApiClient();

export default apiClient;