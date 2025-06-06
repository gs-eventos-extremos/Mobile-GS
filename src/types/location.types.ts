export interface LocationResponseDto {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  city?: string;
  state?: string;
  country?: string;
  isFavorite: boolean;
  createdAt: string;
  links: {
    [key: string]: any;
  };
}

export interface CreateLocationByAddressDto {
  name: string;
  city: string;
  state: string;
  country: string;
  isFavorite: boolean;
}

export interface UpdateLocationDto {
  name?: string;
  latitude?: number;
  longitude?: number;
  city?: string;
  state?: string;
  country?: string;
  isFavorite?: boolean;
}