$(function(){
	var fixTop = $(".recommend").offset().top;
	var flag = true;
	appearTool();
	function appearTool(){
		if($(document).scrollTop() >= fixTop){
			$(".fixtool").fadeIn();
		}else{
			$(".fixtool").fadeOut();
		}
	}
	$(window).scroll(function(){
	    appearTool();
		//页面滚动到哪里电梯导航显示哪个模块
		if(flag){
			$(".floor .w").each(function(i,e){
				if($(document).scrollTop() >= $(e).offset().top){
					$(".fixtool li").eq(i).addClass("now").siblings().removeClass("now");
				}
			})
		}
	});
	$(".back").click(function(){
		$("html,body").stop().animate({
			scrollTop: 0
		});
	})
	$(".fixtool li").click(function(){
		flag =false;
		var current = $(".floor .w").eq($(this).index()).offset().top;
		$("html,body").stop().animate({
			scrollTop:current
		},function(){
			flag=true;
		});
		$(this).addClass("now").siblings().removeClass("now");
	});
})