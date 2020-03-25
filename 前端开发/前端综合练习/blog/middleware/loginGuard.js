const guard = (req,res,next) => {
	//判断用户是否登录
	if(req.url != '/login' && !req.session.username){
		res.redirect('/admin/login');  //没有登录就回到登录页面
	}else{
		//如果是普通用户跳转到首页
		if(req.session.role == 'normal'){
			res.redirect('/home/')
		}
		next();  //登录状态就放行
	}
}
module.exports = guard;