const shortid=require('shortid');

const db= require('../db.js');

module.exports.index=function(req,res){
	res.render('users/index',{
		users: db.get('users').value()
	});
};

module.exports.search=function(req,res){
	const input= req.query.name;
	var users=db.get('users').value();
	let listUsers=users.filter(function(user){
		return user.name.toLowerCase().indexOf(input.toLowerCase())!==-1;
	});
	res.render('users/index',{
		users:listUsers
	});
};

module.exports.getCreate=function(req,res){
	res.render('users/create');
}

module.exports.postCreate=function(req,res){
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
	req.body.id=shortid.generate();
	db.get("users").push(req.body).write();
	res.redirect("/users");
}

module.exports.view=function(req,res){
	const id=req.params.id;
	const user=db.get('users').find({id:id}).value();
	res.render('users/view',{
		user:user
	});
}

module.exports.update=function(req,res){
	const id=req.params.id;
	const newName= req.body.name;
	const newPhone=req.body.phone;
	db.get('users').find({id:id}).assign({name:newName,phone:newPhone}).write();
	res.redirect('/users');
}

module.exports.delete=function(req,res){
	const id=req.params.id;
	db.get("users").remove({id:id}).write();
	res.redirect("/users");
}