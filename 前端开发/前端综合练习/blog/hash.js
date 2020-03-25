//加密
const bcrypt = require('bcrypt');
 
async function run(){
	//生成随机字符串
	const salt = await bcrypt.genSalt();//数值越大字符串越复杂，默认为10
	//对密码进行加密
	//1.要进行加密的原文
	//2.随机字符串
	//返回一个加密后的密码
	const result = await bcrypt.hash('12345',salt);
	console.log(result);
}
run();