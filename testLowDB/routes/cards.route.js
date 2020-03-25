const express= require('express');

const controller=require('../controller/card.controller.js');

const router= express.Router();

router.get('/add/:productId',controller.addToCard);

module.exports= router;