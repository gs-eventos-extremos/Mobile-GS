export interface EmergencyContactResponseDto {
  id: number;
  name: string;
  phoneNumber: string;
  countryCode: string;
  relationship?: string;
  isPrimary: boolean;
  createdAt: string;
  links: {
    [key: string]: any;
  };
}

export interface CreateEmergencyContactDto {
  name: string;
  phoneNumber: string;
  country: string;
  relationship?: string;
  isPrimary: boolean;
}

// Tipo para contatos padrão do sistema
export interface DefaultEmergencyContact {
  id: string;
  name: string;
  phoneNumber: string;
  description?: string;
  isDefault: true;
}