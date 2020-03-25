//创建用户集合规则
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
	username:{
		type:String,
		required:true,
		minlength:2,
		maxlength:20
	},
	email:{
		type:String,
		unique:true //唯一性
	},
	password:{
		type:String,
		unique:true
	},
	//admin 管理员
	//normal 普通用户
	role:{
		type:String,
		required:true,
	},
	state:{
		type:Number,
		default:0  //0为启用1为禁用
	}
});


const User = mongoose.model('User',userSchema);  //返回集合的构造函数

async function createUser(){
	//生成随机字符串
	const salt = await bcrypt.genSalt();//数值越大字符串越复杂，默认为10
	//对密码进行加密
	//1.要进行加密的原文
	//2.随机字符串
	//返回一个加密后的密码
	const pass = await bcrypt.hash('123456',salt);
	
	//创建管理员
	const user = await User.create({
		username:'admin',
		email:'admin@163.com',
		password:pass,
		role:'admin',
		state:0
	});
}
createUser();

//验证用户信息
const validateUser = user =>{
	const schema = {
			username:Joi.string().min(2).max(12).required().error(new Error('用户名不符合规则')),
			email:Joi.string().email().required().error(new Error('邮箱格式不符合规则')),
			password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合规则')),
			role:Joi.string().valid('normal','admin').required(),
			state:Joi.number().valid(0,1).required()
		};
		return Joi.validate(user,schema);
}


module.exports = {  //可能会有多个，所以用对象
	User,
	validateUser
}