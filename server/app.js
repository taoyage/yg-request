const Koa = require('koa');
const parser = require('koa-bodyparser');
const InitManager = require('./init');

const app = new Koa();
const port = 3001;

app.use(parser());

InitManager.initCore(app);

app.listen(port, () => {
  console.log(`listening to ${port}`);
});
