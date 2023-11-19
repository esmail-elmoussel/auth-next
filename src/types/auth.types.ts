export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export type RegisterResponseDto = User;

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  accessToken: string;
}
