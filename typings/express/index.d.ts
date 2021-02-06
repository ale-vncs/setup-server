
interface Locals {
  token: string;
  refreshToken: string;
}

declare module 'express' {
  export interface Response {
    locals: Locals;
  }
}
