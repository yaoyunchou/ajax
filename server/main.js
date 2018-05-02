const Koa = require('koa');
const koaBody = require('koa-body');
const http = require('http');
var Router = require('koa-router');
const koalog4js = require('koa-log4');
const app = new Koa();
//引入api
const router = new Router();

app.use(koaBody({
    multipart: true
}));
//TODO 引入http的监控  是否后面可以自己弄一个类似的,信息可以再完整一点
app.use(koalog4js.koaLogger(koalog4js.getLogger('http'), {
    level: 'auto'
}));



router.get('/ajaxserver/getjson', (ctx, next) => {
    var callback = this.query["callback"];
    if (!callback) return
    this.type = 'text/javascript'
    startChunk =  callback + '('
    endChunk = ');'
    //this.body =  startChunk + JSON.stringify(this.body) + endChunk;
    ctx.body = 'json';
});


app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});
app.use(router.routes());

app.use(router.allowedMethods());

// export default app.listen(8070);
module.exports = app.listen(8070, () => {
    console.log('Koa is listening in 8070');
});