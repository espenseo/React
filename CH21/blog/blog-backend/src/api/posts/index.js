const Router = require('koa-router');
const postsCtrl = require('./posts.ctrl');

const posts = new Router();



posts.get('/', printInfo);
posts.post('/', printInfo);
posts.get('/:id', printInfo);
posts.delete('/:id', printInfo);
posts.put('/:id', printInfo);
posts.patch('/:id', printInfo);
module.exports = posts;