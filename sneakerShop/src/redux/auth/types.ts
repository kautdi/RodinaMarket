
export interface RegistrationParams {
  email: string;
  password: string;
}

export interface AuthData {
  iduser: number;
  idcompany: number;
  email: string;
  accessToken: string;
  refreshToken: string;
  role: string;
  isAuth: boolean;
}
export interface RefreshTokenUser {
  idUser: number;
  refreshToken: string;
}
export interface RefreshTokenCompany {
  idcompany?: number;
  refreshToken: string;
}
export interface RefreshTokenData {
  idcompany: number;
  email:string;
  iduser: number;
  accessToken: string;
  refreshToken: string;
}