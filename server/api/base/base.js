const Router = require('koa-router');

const router = new Router({
  prefix: '/base'
});

router.get('/', async ctx => {
  ctx.body = ctx.query;
});

router.post('/', async ctx => {
  ctx.body = ctx.request.body;
});

module.exports = router;
