import Router from 'koa-router';

const router = new Router();

//Index page route
router.get('/', require('../containers/index.js').index);
//404 page route
router.get('/user', require('../containers/user.js').index);
//User page route
router.get('/404', require('../containers/404.js').index);

//Callback route module
module.exports = router.routes();
