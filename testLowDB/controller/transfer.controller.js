const shortId= require('shortid');

const db= require('../db.js');

module.exports.create= function(req,res, next){
	res.render('transfer/create',{
		csrfToken: req.csrfToken()
	});
	// res.render('transfer/create');
	// next();
}

module.exports.postCreate=function(req,res){
	let data= {
		id: shortId.generate(),
		userId: req.signedCookies.userId,
		amount: parseInt(req.body.amount),
		accountId: req.body.accountId
	};
	db.get('transfers').push(data).write();
	res.redirect('/transfer/create');
}