//引用express框架
const express = require('express');
//引入路径模块
const path = require('path');
//创建网站服务器
const app = express();
//引入body-parser模块用来处理post请求参数
const bodyParser = require('body-parser');
//引入session
const session = require('express-session');
//引入模版引擎
const template = require('art-template');
//引入时间处理第三方模块
const dateFormat = require('dateformat')
//引入数据库连接模块
require('./model/connect.js');
//处理post请求参数
app.use(bodyParser.urlencoded({extended:false}))
//配置session
app.use(session({
	secret:'secret.key',
	saveUninitialized:false,
	// cookie:{
	// 	maxAge:24*60*60*1000
	// }  设置cookie过期时间为一天
}));


//告诉express框架模版路径
app.set('views',path.join(__dirname,'views'));
//告诉express框架模版后缀
app.set('view engine','art');
//使用的模版引擎是什么
app.engine('art',require('express-art-template'));

//静态页面路径拼接
app.use(express.static(path.join(__dirname,'public')))

//向模版内部引入dateFormat变量
template.defaults.imports.dateFormat = dateFormat;

//引入自己的路由模块
const home = require('./route/home.js');
const admin = require('./route/admin.js');

//拦截请判断登录状态
app.use('/admin',require('./middleware/loginGuard.js'));

//匹配对应请求路径
app.use('/home',home);
app.use('/admin',admin);
//错误处理中间件
app.use((err,req,res,next) => {
	//将字符串转换成对象
	const result = JSON.parse(err);
	let params =[];
	for(let attr in result){
		if(attr != 'path'){
			params.push(attr + '=' + result[attr]);
		}
	}
	res.redirect(`${result.path}?${params.join('&')}`);
})

//监听端口
app.listen(80);
console.log('服务器启动成功...请访问localhost');