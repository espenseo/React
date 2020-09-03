const Router = require('koa-router');
cconst posts = require('./posts');


const api = new Router();



api.use('/posts', posts.routes());



// 라우터를 내보냅니다.
module.exports = api;