window.addEventListener('load',function(){
	var focus = document.querySelector('.focus');
	var ul = focus.children[0];
	var ol = focus.children[1];
	var index = 0;
	var w = focus.offsetWidth;
	var time1 = setInterval(function(){
		index++;
		var move = -index * w;
		ul.style.transition = 'all .4s';
		ul.style.transform = 'translateX('+ move +'px)';
	},3000);
	//过渡完成之后再判断有没有到最后一张
	ul.addEventListener('transitionend',function(){
		if(index >= 3){
			index = 0;
			var move = -index * w;  //重新计算
			ul.style.transition = 'none'; //快速到第一张
			ul.style.transform = 'translateX('+ move +'px)';
		}else if(index < 0){  //往前滑时回到最后一张
			index = 2;
			var move = -index * w;  
			ul.style.transition = 'none'; 
			ul.style.transform = 'translateX('+ move +'px)';
		}
		//小圆点跟随变化
		//移除ol中li的current类
		ol.querySelector('.current').classList.remove('current');
		//给当前的添加curret类
		ol.children[index].classList.add('current');
		
		
	});
	//手指滑动轮播图
	var startX = 0;
	var moveX = 0;
	var flag = false;
	ul.addEventListener('touchstart',function(e){
		startX = e.targetTouches[0].pageX;
		//用户触摸时停止计时器
		clearInterval(time1);
	})
	ul.addEventListener('touchmove',function(e){
		moveX = e.targetTouches[0].pageX - startX;
		var ulx = -index * w + moveX;
		ul.style.transition = 'none';
		ul.style.transform = 'translateX('+ ulx +'px)';
		flag = true;
		e.preventDefault();
	})
	//根据滑动距离来判断播放下一张或者上一张 ，手指离开时判断
	ul.addEventListener('touchend',function(e){
		if(flag){
			if(Math.abs(moveX) > 50){  //绝对值大于50时播放下一张
				if(moveX > 0){  //右滑移动movex大于0
					index--;
				}else{
					index++;
				}  
				var ulx = -index * w;
				ul.style.transition = 'all .4s';
				ul.style.transform = 'translateX('+ ulx +'px)';
			}
			else{
				var ulx = -index * w;
				ul.style.transition = 'all .1s';
				ul.style.transform = 'translateX('+ ulx +'px)';
			}
		}
		clearInterval(time1);
		time1 = setInterval(function(){
			index++;
			var move = -index * w;
			ul.style.transition = 'all .4s';
			ul.style.transform = 'translateX('+ move +'px)';
		},3000);
	});
	
	//返回顶部按钮
	var back = document.querySelector('.back');
	var nav = document.querySelector('nav');
	window.addEventListener('scroll',function(){
		if(window.pageYOffset > nav.offsetTop){
			back.style.display = 'block';
		}else{
			back.style.display = 'none';
		}
	})
	back.addEventListener('click',function(){
		window.scroll(0,0);

	})
})