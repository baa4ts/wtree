export interface LoginData {
  username: string;
  password: string;
  tokenExpo: string;
}

export interface RegisterData extends LoginData {
  gmail: string;
}

export interface UserInformation {
  message: string;
  usuario: Usuario;
  token: string;
}

export interface Usuario {
  id: number;
  username: string;
  gmail: string;
  createdAt: Date;
}
