const Koa = require('koa');
const koaBody = require('koa-body');
var Router = require('koa-router');
const koalog4js = require('koa-log4');
const app = new Koa();
//引入api
const router = new Router();

app.use(koaBody({
    multipart: true
}));

app.use( (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', '*');
    ctx.set('Access-Control-Allow-Methods', '*');
    next();
});
//TODO 引入http的监控  是否后面可以自己弄一个类似的,信息可以再完整一点
app.use(koalog4js.koaLogger(koalog4js.getLogger('http'), {
    level: 'auto'
}));


/**
 * 用于测试xhr的请求出现的情况
 * 
 */
router.get('/ajaxserver/getjson', (ctx, next) => {
    ctx.body = 'json';
});

router.post('/ajaxserver/postJson', (ctx, next) => {
    ctx.body = {
        "data" : "postJson xiaofengqing"
    };
});

router.get('/ajaxserver/get1', (ctx, next) => {
    let callbackName = ctx.query.callback || 'callback'
    let backData =  `;${callbackName}(${JSON.stringify({"data" : "get1 ok"})})`
    ctx.body = backData;

    //
});



app.use(router.routes());
app.use(router.allowedMethods());

// export default app.listen(8070);
app.listen(8070, () => {
    console.log('Koa is listening in 8070');
});