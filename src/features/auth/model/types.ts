export interface LoginRequest  {
    username: string,
    password: string,
    remember: boolean
}


export interface AuthResponse {
  id: string,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  gender: string,
  image: string,
  accessToken: string,
  refreshToken: string,
}