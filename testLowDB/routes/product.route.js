const express= require('express');

const controller=require('../controller/product.controller.js');

const router= express.Router();

router.get('/',controller.index);
// router.get('/search',controller.search);

module.exports= router;