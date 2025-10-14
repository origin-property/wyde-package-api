export interface JwtPayload {
  id: string;
  username?: string;
  securityCount?: number;
}

export interface RefreshTokenPayload {
  id: string;
  securityCount?: number;
}
