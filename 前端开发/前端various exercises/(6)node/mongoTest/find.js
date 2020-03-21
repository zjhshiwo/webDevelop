const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/demon',{ useUnifiedTopology: true,useNewUrlParser: true })
	.then(() => console.log('数据库连接成功'))
	.catch(err => console.log(err,'数据库连接失败'))
	
 const userSchema = new mongoose.Schema({
	name:String,
	age:Number,
	email:String,
	password:String,
	hobbies:[String]
}) //创建集合规则

//使用规则创建集合,集合名称，集合规则
const User = mongoose.model('User',userSchema);  //courses
User.findOne({name:'李四'}).then(res => console.log(res));