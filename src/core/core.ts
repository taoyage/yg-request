import { RequestConfig, ResponsePromise, Method, Response, ResolvedFn, RejectedFn } from '../types';
import dispatchRequest from './dispatchRequest';
import InterceptorManager from './InterceptorManager';
import mergeConfig from './mergeConfig';

interface Interceptors {
  request: InterceptorManager<RequestConfig>;
  response: InterceptorManager<Response>;
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: RequestConfig) => ResponsePromise);
  rejected?: RejectedFn;
}

export default class Core {
  defaults: RequestConfig;
  interceptors: Interceptors;

  constructor(initConfig: RequestConfig) {
    this.defaults = initConfig;
    this.interceptors = {
      request: new InterceptorManager<RequestConfig>(),
      response: new InterceptorManager<Response>()
    };
  }

  request(url: any, config?: any): ResponsePromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {};
      }
      config.url = url;
    } else {
      config = url;
    }

    config = mergeConfig(this.defaults, config);

    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ];

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor);
    });

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor);
    });

    let promise = Promise.resolve(config);

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!;
      promise = promise.then(resolved, rejected);
    }

    return promise;
  }

  get(url: string, config?: RequestConfig): ResponsePromise {
    return this.requestMethodWithoutData('get', url, config);
  }

  delete(url: string, config?: RequestConfig): ResponsePromise {
    return this.requestMethodWithoutData('delete', url, config);
  }

  head(url: string, config?: RequestConfig): ResponsePromise {
    return this.requestMethodWithoutData('head', url, config);
  }

  options(url: string, config?: RequestConfig): ResponsePromise {
    return this.requestMethodWithoutData('options', url, config);
  }

  post(url: string, data?: any, config?: RequestConfig) {
    return this.requestMethodWithData('post', url, data, config);
  }

  put(url: string, data?: any, config?: RequestConfig) {
    return this.requestMethodWithData('put', url, data, config);
  }

  patch(url: string, data?: any, config?: RequestConfig) {
    return this.requestMethodWithData('patch', url, data, config);
  }

  private requestMethodWithoutData(method: Method, url: string, config?: RequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    );
  }

  private requestMethodWithData(method: Method, url: string, data?: any, config?: RequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    );
  }
}
