const express= require('express');
var multer  = require('multer'); // tạo middleware upload avatar

var upload = multer({ dest: './public/uploads/' }); //tao duong dan luu file avata vao uploads

const controller=require('../controller/user.controller.js');
const validate=require('../validate/user.validate.js');

const router= express.Router(); // khoi tao khi su dung route

router.get('/',controller.index);
router.get('/search',controller.search);
router.get('/create',controller.getCreate);
router.post('/create', 
	upload.single('avatar'), //xử lý middleware upload avatar trước khi create user
	validate.postCreate, // xử lý trường dữ liệu trống
	controller.postCreate);
router.get('/:id',controller.view);
router.post('/:id/update',validate.postUpdate , controller.update);
router.get('/:id/delete',controller.delete);

module.exports= router; // luon luon di kem