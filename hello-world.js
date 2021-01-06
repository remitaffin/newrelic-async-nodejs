'use strict';
const koa = require('koa')
const koaRouter = require('koa-router')
const mongo = require('koa-mongo')

const app = new koa()
const router = new koaRouter()

app.use(mongo({
  host: 'mongo',
  port: 27017,
  user: '',
  pass: '',
  db: 'test',
  authSource: 'admin',
  max: 100,
  min: 1
}))

router.get('/', async (ctx) => {
  const result = await ctx.db.collection('users').insert({ name: 'haha' })
  const userId = result.ops[0]._id.toString()
  ctx.body = await ctx.db.collection('users').find().toArray()
  ctx.db.collection('users').remove({
    _id: mongo.ObjectId(userId)
  })
})

const returnInstant200 = async (ctx, next) => {
  console.log('instant 200');
  next()
  ctx.status = 200;
};

router.get('/background', returnInstant200, async (ctx) => {
  for (var i = 1; i < 1000; i++) {
    console.log(i);
    const result = await ctx.db.collection('users').insert({ name: 'haha' })
    const userId = result.ops[0]._id.toString()
    setTimeout(async function () {
      ctx.body = await ctx.db.collection('users').find().toArray()
      ctx.db.collection('users').remove({
        _id: mongo.ObjectId(userId)
      })
      console.log(ctx.body);
    }, 1000);

  }
  ctx.status = 200;
})

app.use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, () => {
  console.log('listening on port 3000')
})
