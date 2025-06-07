import api from './api';
import { EmergencyContactResponseDto, CreateEmergencyContactDto } from '../types/emergencyContact.types';

class EmergencyContactService {
  async getUserContacts(userId: number): Promise<EmergencyContactResponseDto[]> {
    try {
      const response = await api.get<EmergencyContactResponseDto[]>(`/api/users/${userId}/emergency-contacts`, true);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getContactById(userId: number, contactId: number): Promise<EmergencyContactResponseDto> {
    try {
      const response = await api.get<EmergencyContactResponseDto>(`/api/users/${userId}/emergency-contacts/${contactId}`, true);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createContact(userId: number, data: CreateEmergencyContactDto): Promise<EmergencyContactResponseDto> {
    try {
      const response = await api.post<EmergencyContactResponseDto>(`/api/users/${userId}/emergency-contacts`, data, true);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateContact(userId: number, contactId: number, data: CreateEmergencyContactDto): Promise<EmergencyContactResponseDto> {
    try {
      const response = await api.put<EmergencyContactResponseDto>(`/api/users/${userId}/emergency-contacts/${contactId}`, data, true);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteContact(userId: number, contactId: number): Promise<void> {
    try {
      await api.delete(`/api/users/${userId}/emergency-contacts/${contactId}`, true);
    } catch (error) {
      throw error;
    }
  }
}

export default new EmergencyContactService();