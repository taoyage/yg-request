const Router = require('koa-router');

const router = new Router({
  prefix: '/error'
});

router.get('/', async ctx => {
  if (Math.random() > 0.5) {
    ctx.body = { msg: 'success' };
  } else {
    ctx.body = {};
    ctx.status = 500;
  }
});

router.get('/timeout', async ctx => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 4000);
  }).then(() => {
    ctx.body = 'timeout';
  });
});

module.exports = router;
