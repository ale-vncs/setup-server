import httpContext from 'express-http-context'

export interface contextKeys {
  req: {
    method: string;
    host: string;
    originalUrl: string;
    requestId: string;
  };
  gender: number[];
}

export const setHttpContext = <K extends keyof contextKeys>(key: K, data: contextKeys[K]): void => {
  httpContext.set(key, data)
}

export const getHttpContext = <K extends keyof contextKeys>(key: K): contextKeys[K] | undefined => {
  return httpContext.get(key)
}
