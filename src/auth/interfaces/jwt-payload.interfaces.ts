export interface JwtPayload {
  id: string;
  username?: string;
}

export interface RefreshTokenPayload {
  id: string;
}
