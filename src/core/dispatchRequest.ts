import { RequestConfig, ResponsePromise, Response } from '../types';
import xhr from './xhr';
import { buildURL } from '../helpers/url';
import { transformRequest, transformResponse } from '../helpers/data';
import { processHeaders, flattenHeaders } from '../helpers/headers';

const dispatchRequest = (config: RequestConfig): ResponsePromise => {
  processConfig(config);
  return xhr(config).then(res => {
    return transformResponseData(res);
  });
};

const processConfig = (config: RequestConfig): void => {
  config.headers = transformHeaders(config);
  config.url = transformURL(config);
  config.data = transformRequestData(config);
  config.headers = flattenHeaders(config.headers, config.method!);
};

const transformURL = (config: RequestConfig): string => {
  const { url, params } = config;
  return buildURL(url!, params);
};

const transformRequestData = (config: RequestConfig): any => {
  return transformRequest(config.data);
};

const transformHeaders = (config: RequestConfig): any => {
  const { headers = {}, data } = config;
  return processHeaders(headers, data);
};

const transformResponseData = (res: Response): Response => {
  res.data = transformResponse(res.data);
  return res;
};

export default dispatchRequest;
