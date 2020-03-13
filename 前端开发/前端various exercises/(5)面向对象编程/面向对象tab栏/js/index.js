var that;
class tab{
	constructor(id) {
		that = this;
	    this.main = document.querySelector(id);
		this.add = this.main.querySelector('.tabadd');
		this.ul = this.main.querySelector('.fisrstnav ul');
		this.fsce = this.main.querySelector('.tabscon');
		this.init();
	}
	//初始化
	init(){
		this.refresh();
		this.add.onclick = this.addTab;
		for(var i = 0;i < this.lis.length;i++){
			this.lis[i].index = i;
			this.lis[i].onclick = this.toggleTab;  //不能加括号否则立即执行
			this.close[i].onclick = this.del;
			this.spans[i].ondblclick = this.revise;
			this.sections[i].ondblclick = this.revise;
		}
	}
	//切换
	toggleTab(){
		that.clear();
		this.className ='liactive';
		that.sections[this.index].className = 'conactive';
	}
	clear(){
		for(var i = 0;i < this.lis.length;i++){
			this.lis[i].className = '';
			this.sections[i].className = '';
		}
	}
	//添加
	addTab(){
		that.clear();
		
		//创建li
		var li = '<li class="liactive"><span>new</span><span class="iconfont icon-cha"></span></li>';
		var section = '<section class="conactive">测试new</section>';
		//添加li
		that.ul.insertAdjacentHTML('beforeend',li);
		that.fsce.insertAdjacentHTML('beforeend',section);
		that.init();
	}
	refresh(){  //刷新动态添加的新元素
		this.lis = this.main.querySelectorAll('li');
		this.sections = this.main.querySelectorAll('section');
		this.close = this.main.querySelectorAll('.icon-cha');
		this.spans = this.main.querySelectorAll('.fisrstnav ul span:first-child');
	}
	//删除
	del(e){
		e.stopPropagation(); //阻止冒泡防止父元素触发点击
		var i = this.parentNode.index;
		console.log(i);
		that.lis[i].remove();
		that.sections[i].remove();
		that.init();
		if(document.querySelector('.liactive')) return;
		i--;  //删除一个li，让前面的li手动调用click被选中
		that.lis[i]&&that.lis[i].click(); //i为负时没有-1的li，为假，则不调用click
	}
	//修改
	revise(){
		//禁止双击选定状态
		var str = this.innerHTML;
		window.getSelection?window.getSelection().removeAllRanges():document.selection.empty();
		this.innerHTML='<input type="text"/>';
		var input = this.children[0];
		input.value = str;
		input.select();
		input.onblur = function(){
			input.parentNode.innerHTML = input.value;
		}
		input.onkeyup = function(e){
			if(e.keyCode === 13){
				input.onblur();
			}
		}
		
	}
}
new tab("#tab")