export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface UserResponseDto {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  isActive: boolean;
  links: {
    [key: string]: any;
  };
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
  expiresAt: string;
  user: UserResponseDto;
}