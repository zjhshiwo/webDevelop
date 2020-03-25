//数据库连接
const mongoose = require('mongoose');
//账号登录
mongoose.connect('mongodb://itcast:itcast@localhost:27017/blog',{ useNewUrlParser: true ,useUnifiedTopology: true})
	.then(() => console.log('数据库连接成功'))
	.catch(() => console.log('数据库连接失败'))