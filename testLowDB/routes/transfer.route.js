const express= require('express');

const controller=require('../controller/transfer.controller.js');

const router= express.Router(); // khoi tao khi su dung route

router.get('/create', controller.create);
router.post('/create', controller.postCreate);

module.exports= router; // luon luon di kem