import { RequestConfig, ResponsePromise, Response } from '../types';
import { parseHeaders } from '../helpers/headers';
import { createError } from '../helpers/error';

const xhr = (config: RequestConfig): ResponsePromise => {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config;
    const request = new XMLHttpRequest();

    if (responseType) {
      request.responseType = responseType;
    }

    if (timeout) {
      request.timeout = timeout;
    }

    request.open(method.toUpperCase(), url!, true);

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 0) {
        return;
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders());
      const responseData = responseType !== 'text' ? request.response : request.responseText;

      const response: Response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };

      handleResponse(response);
    };

    request.onerror = function handleError() {
      reject(createError('Network Error', config, 'ECONNABORTED', request));
    };

    request.ontimeout = function handleTimeout() {
      reject(new Error(`Timeout of ${timeout} ms exceeded`));
    };

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name];
      } else {
        request.setRequestHeader(name, headers[name]);
      }
    });

    request.send(data);

    const handleResponse = (response: Response): void => {
      if (response.status >= 200 && response.status < 300) {
        resolve(response);
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        );
      }
    };
  });
};

export default xhr;
