import { RequestConfig, Response } from '../types';

export class ResponseError extends Error {
  config: RequestConfig;
  code?: string | null;
  request?: any;
  response?: Response;

  constructor(
    message: string,
    config: RequestConfig,
    code?: string | null,
    request?: any,
    response?: Response
  ) {
    super(message);

    this.config = config;
    this.code = code;
    this.request = request;
    this.response = response;

    Object.setPrototypeOf(this, ResponseError.prototype);
  }
}

export function createError(
  message: string,
  config: RequestConfig,
  code?: string | null,
  request?: any,
  response?: Response,
) {
  const error = new ResponseError(message, config, code, request, response);
  return error;
}
