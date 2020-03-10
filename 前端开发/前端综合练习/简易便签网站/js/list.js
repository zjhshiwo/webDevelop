$(function(){
	load();
	$("#title").on("keydown",function(e){
		if(e.keyCode === 13){
			if($(this).val() == ''){
				alert("请输入内容");
			}else{
				var local = getData();
				//更新数据
				local.push({title: $(this).val(),done:false});
				saveData(local);
				load();
				$(this).val("");
			}
		}
	})
	//删除对应数据
	$("ol,ul").on("click","a",function(){
		var data = getData();
		var index = $(this).attr("id");//获取索引号
		data.splice(index,1); //删除对应数据
		saveData(data);
		load(data);
	})
	$("ul,ol").on("click","input",function(){
		var data = getData();
		var index = $(this).siblings("a").attr("id");  //获取input兄弟a的索引号
		data[index].done = $(this).prop("checked"); //把复选框状态给数据done
		saveData(data);
		load();
	})
	//读取本地数据
	function getData(){
		var data = localStorage.getItem("doing");
		if(data !== null){
			return JSON.parse(data);
		}else{
			return [];
		}
	}
	//保存本地数据
	function saveData(local){
		localStorage.setItem("doing",JSON.stringify(local));
	}
	
	//加载渲染数据，创建li
	function load(){
		var data = getData();
		var todoNum = 0;
		var doneNum = 0;
		$("ol,ul").empty();
		$.each(data,function(i,e){
        if(e.done){
			$("ul").prepend("<li><input type='checkbox' checked = 'checked'></input><p></p>"+ e.title +"<a href='javascript:;' id="+ i +"></a></li>");
			//给每条数据设置索引号
			doneNum++;
		}else if(e == null){
			var todoNum = 0;
		}else{
			$("ol").prepend("<li><input type='checkbox'></input><p></p>"+ e.title +"<a href='javascript:;' id="+ i +"></a></li>");
			//给每条数据设置索引号
			todoNum++;
		}
		$("#todocount").text(todoNum);
		$("#donecount").text(doneNum);
		})
		
	}
})