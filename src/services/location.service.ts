import api from './api';
import { LocationResponseDto, CreateLocationByAddressDto, UpdateLocationDto } from '../types/location.types';

class LocationService {
  async getUserLocations(userId: number): Promise<LocationResponseDto[]> {
    try {
      const response = await api.get<LocationResponseDto[]>(`/api/users/${userId}/locations`, true);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createLocationByAddress(userId: number, data: CreateLocationByAddressDto): Promise<LocationResponseDto> {
    try {
      const response = await api.post<LocationResponseDto>(`/api/users/${userId}/locations/by-address`, data, true);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateLocation(userId: number, locationId: number, data: UpdateLocationDto): Promise<LocationResponseDto> {
    try {
      const response = await api.put<LocationResponseDto>(`/api/users/${userId}/locations/${locationId}`, data, true);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteLocation(userId: number, locationId: number): Promise<void> {
    try {
      await api.delete(`/api/users/${userId}/locations/${locationId}`, true);
    } catch (error) {
      throw error;
    }
  }

  async getFavoriteLocations(userId: number): Promise<LocationResponseDto[]> {
    try {
      const response = await api.get<LocationResponseDto[]>(`/api/users/${userId}/locations/favorites`, true);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async validateAddress(city: string, state: string, country: string): Promise<any> {
    try {
      const response = await api.post(`/api/users/0/locations/validate-address`, {
        city,
        state,
        country
      }, true);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new LocationService();