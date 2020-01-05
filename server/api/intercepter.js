const Router = require('koa-router');

const router = new Router({
  prefix: '/intercepter'
});

router.get('/', async ctx => {
  ctx.body = 'intercepter';
});

module.exports = router;
