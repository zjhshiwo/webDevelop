const express = require('express');
//创建管理页面路由
const admin = express.Router();
//倒入用户集合构造函数
const {User,validateUser} = require('../model/user.js')
const {Article} = require('../model/article.js')
const bcrypt = require('bcrypt');
const formidable = require('formidable');
const path = require('path');
const pagination = require('mongoose-sex-page')

admin.get('/login',(req,res) => { 
	res.render('admin/login')  //渲染模版
})
//用户中心路由
admin.get('/user',async (req,res) => {
	//侧边栏选定
	req.app.locals.currentLink = 'user';
	//接受客户端传递过来的当前页参数
	let page = req.query.page || 1;
	let pagesize = 10;  //每页显示的数据条数
	let count =await User.countDocuments({});  //数据总数
	let total = Math.ceil(count / pagesize);  //总页数
	let start = (page-1)*pagesize
	//将用户信息从数据库查询出来
	let users = await User.find({}).limit(pagesize).skip(start)
	//渲染用户列表模块
	res.render('admin/user',{
		users:users,
		page:page,
		total:total
	})  
})
//删除用户
admin.get('/delete',async(req,res)=>{
	await User.findOneAndDelete({_id: req.query.id});
	res.redirect('/admin/user');
	
})
//删除文章
admin.get('/delete_a',async(req,res)=>{
	await Article.findOneAndDelete({_id: req.query.id});
	res.redirect('/admin/article');
	
})

//实现登录功能
admin.post('/login',async(req,res) => {
	const{email,password} = req.body;
	if(email.trim().length == 0 || password.trim().length == 0){
		return res.status(400).render('admin/error',{msg:'邮箱或密码错误,3s后跳转登录'});
	}
	//根据邮箱地址查询用户信息
	//如果查询到了用户user变量的值是对象类型 对象中存储的是用户信息
	//如果没有查询到用户 user变量的值为空
	let user = await User.findOne({email:email});
	if(user){
		//将客户端传递的密码和用户信息的密码进行比对
		let isValid = await bcrypt.compare(password,user.password);//返回一个布尔值，比对成功true
		if(isValid){
			//将用户名存储在请求对象中
			req.session.username = user.username;
			//将用户角色存储在session对象中
			req.session.role = user.role;
			req.app.locals.userInfo = user;
			//判断用户角色
			if(user.role == 'admin'){
				res.redirect('/admin/user'); //express提供的重定向到用户中心
			}else{
				//普通角色前往首页
				res.redirect('/home/');
			}
			
		}else{
			res.status(400).render('admin/error',{msg:'邮箱或密码错误,3s后跳转登录'});
		}
	}else{
		res.status(400).render('admin/error',{msg:'邮箱或密码错误,3s后跳转登录'});
	}
});

//退出登录
admin.get('/logout',(req,res) => {
	req.session.destroy(function(){
		res.clearCookie('connect.sid');
		res.redirect('/admin/login');
		//清除模版中的用户信息
		req.app.locals.userInfo = null;
	});
});
//新增用户页面路由
admin.get('/user-edit',async(req,res) =>{
	//获取地址栏id参数，有就是修改，没就是新增
	req.app.locals.currentLink = 'user';
	const {message,id} = req.query;
	if(id){
		let user =await User.findOne({_id:id});
		res.render('admin/user-edit',{
			message:message,
			user:user,
			link:'/admin/user-modify?id='+id,
			button:'修改'
		});
	}else{
		res.render('admin/user-edit',{
			message:message,
			link:'/admin/user-edit',
			button:'添加'
		});
	}
	
})
admin.post('/user-modify',async(req,res,next)=>{
	const body = req.body;
	const id = req.query.id;
	let user =await User.findOne({_id:id});
	const isValid = await bcrypt.compare(req.body.password,user.password);
	if(isValid){
		//更新数据
		await User.updateOne({_id:id},{
			username:req.body.username,
			email:req.body.email,
			role:req.body.role,
			state:req.body.state
		});
		res.redirect('/admin/user')
	}else{
		let obj = {path:'/admin/user-edit',message:'密码错误不能修改',id:id};
		next(JSON.stringify(obj))
	}
})
//新增用户功能路由
admin.post('/user-edit',async (req,res,next) => {
	
	try{
		await validateUser(req.body)
		
	}catch(e){
		// return res.redirect(`/admin/user-edit?message=${e.message}` )
		//将对象转换成字符串
		return next(JSON.stringify({path:'/admin/user-edit',message:e.message}))
	}
	
	//根据邮箱地址查询用户是否存在
	let user = await User.findOne({email:req.body.email});
	//如果查询出来说明已经被注册
	if(user){
		// return res.redirect('/admin/user-edit?message=邮箱地址已经被占用')
		return next(JSON.stringify({path:'/admin/user-edit',message:'邮箱地址已经被占用'}))
	}
	//都正常就对密码进行加密
	const salt = await bcrypt.genSalt();
	const password = await bcrypt.hash(req.body.password,salt);
	req.body.password = password;
	//加入数据库
	await User.create(req.body);
	res.redirect('/admin/user');
})
//文章列表
admin.get('/article',async(req,res)=>{
	//接收客户端传递的页码
	const page = req.query.page;
	//标识，标识当前访问的是文章管理页面（侧边栏）
	req.app.locals.currentLink = 'article';
	//查询所有文章数据
	
	let articles = await pagination(Article).find().page(page).size(2).display(3).populate('author').exec();
	
	res.render('admin/article',{
		articles:articles
	});
});
//文章编辑
admin.get('/article-edit',(req,res)=>{
	req.app.locals.currentLink = 'article';
	res.render('admin/article-edit');
});
//文章添加
admin.post('/article-add',(req,res)=>{
	//创建表单对象
	const form = new formidable.IncomingForm();
	form.uploadDir=path.join(__dirname,'../','public','uploads');
	//保留后缀
	form.keepExtensions = true;
	form.parse(req,async(err,fields,files)=>{
		await Article.create({
			title:fields.title,
			author:fields.author,
			publishDate:fields.publishDate,
			cover:files.cover.path.split('public')[1],
			content:fields.content
		});
		res.redirect('/admin/article');
	})
})

//暴露路由
module.exports = admin;
