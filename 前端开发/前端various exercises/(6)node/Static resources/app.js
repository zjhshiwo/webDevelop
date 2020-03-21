const http = require('http');
const url = require('url');
const path = require('path');
const mime = require('mime');
const fs =require('fs'); //文件读取模块
const app=http.createServer();//返回一个服务器对象
app.on('request',(req,res) => {
	let pathname = url.parse(req.url).pathname; //获得请求路径
	pathname=pathname == '/' ? '/default.html' : pathname;
	let realPath = path.join(__dirname,'public'+pathname);//路径拼接，物理路径
	let type = mime.getType(realPath);   //getType:识别文件类型的方法
	
	fs.readFile(realPath,(err,result) => {
		if(err != null){
			res.writeHead(404,{
			'content-type':'text/html;charset=utf8'
			 })
			res.end('路径有误')
			return;
		}
		res.writeHead(200,{
			'content-type':type    //识别各种文件类型
		})
		res.end(result);
	});
	
});
//端口监听
app.listen(1313);
console.log('启动成功');