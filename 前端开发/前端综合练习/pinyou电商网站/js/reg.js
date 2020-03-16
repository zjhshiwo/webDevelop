window.addEventListener('load',function(){
	var tel = document.querySelector('#tel');
	var email = document.querySelector('#mail');
	var name =document.querySelector('#uname');
	var pass =document.querySelector('#pass');
	var re_tel = /^1[3|4|5|7|8]\d{9}$/;
	var re_email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	var re_name = /^[a-zA-Z0-9_-]{4,12}$/;
	var re_pass = /^[a-zA-Z0-9]{6,20}$/;
	function idea(ele,re){
		ele.addEventListener('blur',function(){
			if(re.test(this.value)){
				this.nextElementSibling.className = 'success';
				this.nextElementSibling.innerHTML = '<i class="success_icon"></i>输入正确';
			}else{
				this.nextElementSibling.className = 'error';
				this.nextElementSibling.innerHTML = '<i class="error_icon"></i>格式不正确';
			}
		})
	}
	var pass_con = document.querySelector('.passcon');
	pass_con.addEventListener('blur',function(){
		if(this.value == pass.value){
			this.nextElementSibling.className = 'success';
			this.nextElementSibling.innerHTML = '<i class="success_icon"></i>输入正确';
		}else{
			this.nextElementSibling.className = 'error';
			this.nextElementSibling.innerHTML = '<i class="error_icon"></i>两次输入不一致';
		}
	})
	idea(tel,re_tel);
	idea(email,re_email);
	idea(name,re_name);
	idea(pass,re_pass);
})