//Entry point to all the routes 
const express = require('express');

const router = express.Router();
const homeController= require('../controllers/home_controller');

console.log('Router loaded !!!');


router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));


// from any further routes , access from Here
// router.use('/routerName',require('./routerfile'));

module.exports = router;
