// services/authService.ts
import { 
  LoginRequest, 
  RegisterRequest, 
  LoginResponse, 
  User, 
  tokenStorage 
} from '../config/api';
import apiClient, { ApiError } from './apiClient';

class AuthService {
  // Registrar novo usuário
  async register(data: RegisterRequest): Promise<User> {
    try {
      const response = await apiClient.post<User>('/auth/register', data);
      console.log('👤 Usuário registrado com sucesso:', response.email);
      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        // Tratar erros específicos de registro
        if (error.isValidationError) {
          throw new Error(error.message || 'Dados inválidos para registro');
        }
        if (error.message.includes('Email já cadastrado')) {
          throw new Error('Este email já está em uso');
        }
      }
      throw new Error('Erro ao criar conta. Tente novamente.');
    }
  }

  // Fazer login
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
      
      // Salvar token e dados do usuário
      await tokenStorage.saveToken(response.token);
      await tokenStorage.saveUser(response.user);
      
      console.log('🔐 Login realizado com sucesso:', response.user.email);
      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.isAuthError || error.status === 401) {
          throw new Error('Email ou senha incorretos');
        }
        if (error.isValidationError) {
          throw new Error('Email ou senha inválidos');
        }
      }
      throw new Error('Erro ao fazer login. Tente novamente.');
    }
  }

  // Atualizar senha
  async updatePassword(email: string, newPassword: string): Promise<boolean> {
    try {
      await apiClient.put('/auth/update-password', {
        email,
        newPassword
      });
      
      console.log('🔑 Senha atualizada com sucesso');
      return true;
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.isNotFoundError) {
          throw new Error('Usuário não encontrado');
        }
        if (error.isValidationError) {
          throw new Error('Nova senha não atende aos critérios de segurança');
        }
      }
      throw new Error('Erro ao atualizar senha. Tente novamente.');
    }
  }

  // Fazer logout
  async logout(): Promise<void> {
    try {
      // Limpar dados locais
      await tokenStorage.clearAll();
      console.log('👋 Logout realizado');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      // Mesmo com erro, limpar dados locais
      await tokenStorage.clearAll();
    }
  }

  // Verificar se usuário está logado
  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await tokenStorage.getToken();
      const user = await tokenStorage.getUser();
      
      if (!token || !user) {
        return false;
      }

      // TODO: Verificar se o token não expirou
      // Por enquanto, apenas verificar se existe
      return true;
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      return false;
    }
  }

  // Obter usuário atual
  async getCurrentUser(): Promise<User | null> {
    try {
      return await tokenStorage.getUser();
    } catch (error) {
      console.error('Erro ao obter usuário atual:', error);
      return null;
    }
  }

  // Obter token atual
  async getCurrentToken(): Promise<string | null> {
    try {
      return await tokenStorage.getToken();
    } catch (error) {
      console.error('Erro ao obter token:', error);
      return null;
    }
  }

  // Verificar se token está válido (chamada para a API)
  async validateToken(): Promise<boolean> {
    try {
      const user = await tokenStorage.getUser();
      if (!user) return false;

      // Tentar buscar dados do usuário na API
      await apiClient.get(`/users/${user.id}`);
      return true;
    } catch (error) {
      if (error instanceof ApiError && error.isAuthError) {
        // Token inválido, fazer logout
        await this.logout();
        return false;
      }
      // Outros erros podem ser temporários
      console.warn('Erro ao validar token:', error);
      return true; // Assumir que token é válido em caso de erro de rede
    }
  }

  // Atualizar dados do usuário logado
  async updateCurrentUser(userId: number, data: { name?: string; email?: string }): Promise<User> {
    try {
      const response = await apiClient.put<User>(`/users/${userId}`, data);
      
      // Atualizar dados salvos localmente
      await tokenStorage.saveUser(response);
      
      console.log('👤 Dados do usuário atualizados');
      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.isValidationError) {
          throw new Error('Dados inválidos para atualização');
        }
        if (error.isNotFoundError) {
          throw new Error('Usuário não encontrado');
        }
        if (error.message.includes('Email já está em uso')) {
          throw new Error('Este email já está sendo usado');
        }
      }
      throw new Error('Erro ao atualizar dados. Tente novamente.');
    }
  }

  // Deletar conta
  async deleteAccount(userId: number): Promise<boolean> {
    try {
      await apiClient.delete(`/users/${userId}`);
      
      // Fazer logout após deletar conta
      await this.logout();
      
      console.log('🗑️ Conta deletada com sucesso');
      return true;
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.isNotFoundError) {
          throw new Error('Usuário não encontrado');
        }
        if (error.isAuthError) {
          throw new Error('Sem permissão para deletar esta conta');
        }
      }
      throw new Error('Erro ao deletar conta. Tente novamente.');
    }
  }
}

// Instância singleton do serviço de autenticação
export const authService = new AuthService();
export default authService;