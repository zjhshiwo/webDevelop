const http = require('http');

const template = require('art-template');
const path = require('path');
const serveStatic = require('serve-static')
const router = require('./route/index.js');
const dateformat =require('dateformat');
require('./model/connect.js');

 //创建服务器
const app = http.createServer();

//获取路由对象


//实现静态资源访问
const serve = serveStatic(path.join(__dirname,'public'));

//配置模版根目录
template.defaults.root = path.join(__dirname,'views');
//处理日期格式
template.defaults.imports.dateformat = dateformat;


app.on('request',(req,res) => {
	router(req,res,() =>{  })//三个参数
	serve(req,res,() => {})
})
app.listen(80);
console.log('服务器启动成功')