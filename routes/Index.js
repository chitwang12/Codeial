const express = require('express');

const router = express.Router();
const homeController = require('../Controllers/home_controller');

console.log("Router loaded");

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));



// for any further routes , access from here
// router .use ('/routerName' , require('./routerfile'));

module.exports = router;