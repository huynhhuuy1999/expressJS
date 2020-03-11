const md5= require('md5');

const db=require('../db.js');

module.exports.login=function(req,res){
	res.render('auth/login');
}

module.exports.postLogin=function(req,res){
	let email= req.body.email;
	let password=req.body.password;
	let user=db.get('users').find({email:email}).value();
	if(!user){
		res.render('auth/login',{
			errors:["User does not exist."]
		});
		return;
	}
	if(user.password!==md5(password)){
		res.render('auth/login',{
			errors:["Password correct."]
		});
		return;
	}

	res.cookie('userId',user.id,{
		signed: true
	});
	res.redirect('/users');
}