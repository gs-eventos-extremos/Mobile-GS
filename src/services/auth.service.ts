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
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await AsyncStorage.getItem('token');
    return !!token;
  }

  async getCurrentUser(): Promise<UserResponseDto | null> {
    const userStr = await AsyncStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}

export default new AuthService();