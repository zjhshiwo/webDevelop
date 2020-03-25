const express = require('express');
//导入分页模块
const pagination = require('mongoose-sex-page');
//导入文章,评论集合
const{Article} = require('../model/article');
const{Comment} = require('../model/comment');
//创建主页路由
const home = express.Router();

home.get('/',async(req,res) => {
	const page = req.query.page;
	//多集合联合查询,从数据库中查询数据
	let result = await pagination(Article).page(page).size(4).display(5).find().populate('author').exec();
	//渲染模版和数据
	res.render('home/default',{
		result:result
	})
})
//详情页面
home.get('/article',async(req,res)=>{
	//接收客户端传递的id
	const id = req.query.id;
	//根据id查询文章信息
	let article = await Article.findOne({_id:id}).populate('author');
	//查询当前文章对应的评论
	let comments = await Comment.find({aid:id}).populate('uid')
	
	res.render('home/article',{
		article:article,
		comments:comments
	})
})
//评论功能路由
home.post('/comment',async(req,res)=>{
	//解构请求
	const {content,uid,aid}=req.body;
	//将评论信息存储到评论集合中
	await Comment.create({
		content:content,
		uid:uid,
		aid:aid,
		time:new Date()
	})
	//重定向回文章页面
	res.redirect('/home/article?id='+aid);
})
//暴露路由
module.exports = home;