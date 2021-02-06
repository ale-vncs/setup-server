import { TokenArray } from '@typings/token'

export interface DataKeyDecrypt {
  key: string;
  type: TokenArray['type'];
}

export interface DataTypeReconnect {
  id: string;
  type: 'USER' | 'ADMIN';
  body: any;
}
