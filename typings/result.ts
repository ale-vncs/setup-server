import { messages } from '@utils/translate'

export const statusCode = {
  OK: 200,
  Created: 201,
  Accepted: 202,
  'No Content': 204,
  'Bad Request': 400,
  Unauthorized: 401,
  Forbidden: 403,
  'Not Found': 404,
  'Unprocessable Entity': 422,
  'Internal Server Error': 500,
  'Service Unavailable': 503
}

export interface ResultData {
  status: keyof typeof statusCode;
  msg: messages;
  body?: unknown;
  keyConnection?: string;
  error?: unknown;
  token?: string;
  refreshToken?: string;
}
