const path = require('path');
const requireDirectory = require('require-directory');
const Router = require('koa-router');
const webpack = require('webpack');
const koaWebpack = require('koa-webpack');
const webpackConfig = require('./webpack.config');

class InitManager {
  static initCore(app) {
    this.app = app;
    this.initLoadRouters();
    this.initWebpack();
  }

  static initLoadRouters() {
    const apiDirectory = process.cwd() + '/api';

    requireDirectory(module, apiDirectory, {
      visit: whenloadModule
    });

    function whenloadModule(obj) {
      console.log(obj);
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes());
      }
    }
  }

  static async initWebpack() {
    const compiler = webpack(webpackConfig);
    try {
      const middleware = await koaWebpack({ compiler });
      InitManager.app.use(middleware);

      InitManager.app.use(async ctx => {
        const filename = path.resolve(webpackConfig.output.path, 'index.html');
        ctx.response.type = 'html';
        ctx.response.body = middleware.devMiddleware.fileSystem.createReadStream(filename);
      });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = InitManager;
