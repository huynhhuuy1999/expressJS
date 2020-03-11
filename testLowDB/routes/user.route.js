const express= require('express');

const controller=require('../controller/user.controller.js');
const validate=require('../validate/user.validate.js');

const router= express.Router();

router.get('/',controller.index);
router.get('/search',controller.search);
router.get('/create',controller.getCreate);
router.post('/create', validate.postCreate, controller.postCreate);
router.get('/:id',controller.view);
router.post('/:id/update',validate.postUpdate , controller.update);
router.get('/:id/delete',controller.delete);

module.exports= router;