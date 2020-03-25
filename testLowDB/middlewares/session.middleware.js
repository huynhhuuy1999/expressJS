const shortId= require('shortid');

const db= require('../db.js');

module.exports= function(req,res,next){
	if(!req.signedCookies.sessionId){
		let sessionId= shortId.generate();
		res.cookie('sessionId', sessionId,{
			signed: true // tăng độ bảo mật cookie
		});

		db.get('sessions').push({
			id: sessionId
		}).write();
	}
	next();
}