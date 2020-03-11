const db= require('../db.js');

module.exports.postCreate=function(req,res,next){
	let errors=[];
	if(!req.body.name)
		errors.push("Name is required");
	if(!req.body.phone)	
		errors.push("Phone is required");
	if(errors.length){
		res.render("users/create",{
			errors:errors,
			values:req.body
		});
		return;
	}
	next();
}

module.exports.postUpdate=function(req,res,next){
	let errors=[];
	let id= req.params.id;
	let user= db.get('users').find({id:id}).value();
	if(!req.body.name)
		errors.push("Name is required");
	if(!req.body.phone)	
		errors.push("Phone is required");
	if(errors.length){
		res.render('users/view',{
			errors:errors,
			user:user
		});
		return;
	}
	next();
}