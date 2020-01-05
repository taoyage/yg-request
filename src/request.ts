import { RequestInstance, RequestConfig } from './types';
import Core from './core/core';
import { extend } from './helpers/utils';
import defaults from './defaults';

function createInstance(config: RequestConfig): RequestInstance {
  const context = new Core(config);
  const instance = Core.prototype.request.bind(context);

  extend(instance, context);

  return instance as RequestInstance;
}

const request = createInstance(defaults);

export default request;
