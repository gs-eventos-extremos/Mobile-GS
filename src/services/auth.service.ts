// src/services/auth.service.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';
import { CreateUserDto, UserResponseDto, LoginUserDto, LoginResponseDto } from '../types/auth.types';

class AuthService {
  async register(data: CreateUserDto): Promise<UserResponseDto> {
    try {
      const response = await api.post<UserResponseDto>('/api/auth/register', data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async login(data: LoginUserDto): Promise<LoginResponseDto> {
    try {
      const response = await api.post<LoginResponseDto>('/api/auth/login', data);
      
      // Salvar token e dados do usuário
      await AsyncStorage.setItem('token', response.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.user));
      await AsyncStorage.setItem('tokenExpiration', response.expiresAt);
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    await AsyncStorage.multiRemove(['token', 'user', 'tokenExpiration']);
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem('token');
      const tokenExpiration = await AsyncStorage.getItem('tokenExpiration');
      
      if (!token || !tokenExpiration) {
        return false;
      }

      // Verificar se o token não expirou
      const expirationDate = new Date(tokenExpiration);
      const now = new Date();
      
      if (now >= expirationDate) {
        // Token expirado, fazer logout
        await this.logout();
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      return false;
    }
  }

  async getCurrentUser(): Promise<UserResponseDto | null> {
    try {
      const userStr = await AsyncStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Erro ao obter usuário atual:', error);
      return null;
    }
  }

  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('token');
    } catch (error) {
      console.error('Erro ao obter token:', error);
      return null;
    }
  }

  // ✅ CORREÇÃO: Alterar de POST para PUT
  async updatePassword(email: string, newPassword: string): Promise<void> {
    try {
      await api.put('/api/auth/update-password', {
        email,
        newPassword
      }, true); // ✅ Mudança aqui: POST → PUT
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();