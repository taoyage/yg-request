export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH';

export interface RequestConfig {
  url?: string;
  method?: Method;
  data?: any;
  params?: any;
  headers?: any;
  responseType?: XMLHttpRequestResponseType;
  timeout?: number;

  [propName: string]: any;
}

export interface Response<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: RequestConfig;
  request: any;
}

export interface ResponsePromise<T = any> extends Promise<Response<T>> {}

export interface ResponseError extends Error {
  config: RequestConfig;
  code?: string | null;
  request?: any;
  response?: Response;
}

export interface RequestMethod {
  defaults: RequestConfig;
  interceptors: {
    request: InterceptorManager<RequestConfig>;
    response: InterceptorManager<Response>;
  };
  get<T = any>(url: string, config?: RequestConfig): ResponsePromise<T>;
  delete<T = any>(url: string, config?: RequestConfig): ResponsePromise<T>;
  head<T = any>(url: string, config?: RequestConfig): ResponsePromise<T>;
  options<T = any>(url: string, config?: RequestConfig): ResponsePromise<T>;

  post<T = any>(url: string, data: any, config?: RequestConfig): ResponsePromise<T>;
  put<T = any>(url: string, data: any, config?: RequestConfig): ResponsePromise<T>;
  patch<T = any>(url: string, data: any, config?: RequestConfig): ResponsePromise<T>;
}

export interface RequestInstance extends RequestMethod {
  <T = any>(config: RequestConfig): ResponsePromise<T>;
  <T = any>(url: string, config?: RequestConfig): ResponsePromise<T>;
}

export interface InterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number;

  eject(id: number): void;
}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>;
}

export interface RejectedFn {
  (error: any): any;
}
