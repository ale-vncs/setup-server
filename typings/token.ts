export interface generateToken {
  token: string;
  refreshToken: string;
}

export interface JwtObj {
  key: string;
  iat?: number;
  exp?: number;
}

export interface TokenArray {
  id: string;
  token?: string;
  type: 'USER' | 'ADMIN';
}

export type checkTokenResponse = {
  id: string;
  type: TokenArray['type'];
} & generateToken
