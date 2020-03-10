$(function(){
    //全选与全不选，使用prop()获取checked再赋值
    $('.checkall').change(function(){
        $('.j-checkbox,.checkall').prop('checked',$(this).prop('checked'));
        if($(".checkall").prop("checked")){
            $(".cart-item").addClass("check-cart-item");
        }else{
            $(".cart-item").removeClass("check-cart-item");
        }
    })
    //判断子选框全选中，全选也勾选  :checked(查找选中的复选框)
    $('.j-checkbox').change(function(){
        if($('.j-checkbox:checked').length === $('.j-checkbox').length){
            $('.checkall').prop('checked',true);
        }else{
            $('.checkall').prop('checked',false);
        }
        if($(this).prop("checked")){
            $(this).parents(".cart-item").addClass("check-cart-item");
        }else{
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    })

    //购物车增减 先定义一个变量得到文本框中的数量值,小计=单价 x 个数
    $(".increment").click(function () { 
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);
        $(".decrement").css("color","black");  
        var p = $(this).parent().parent().siblings(".p-price").html();
        p = p.substr(1);
        $(this).parent().parent().siblings(".p-sum").html("¥"+(p * n).toFixed(2));
        total();
    });
    //减号到1判断，不能再减
    $(".decrement").click(function(){
        var n = $(this).siblings(".itxt").val();
        if(n == 1){
            $(this).css("color","#ccc")
            return false
        }else{
            $(this).css("color","black")
        }
        
        n--;
        $(this).siblings(".itxt").val(n);
        var p = $(this).parent().parent().siblings(".p-price").html();
        p = p.substr(1);
        $(this).parent().parent().siblings(".p-sum").html("¥"+(p * n).toFixed(2));
        total();
    })
    //文本框数量变化时，小计也要变
    $(".itxt").change(function(){
        var n = $(this).val();
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").html("¥"+(p * n).toFixed(2));
        total();
    })
    
    //结算 计算总计和总额，因为加减或更改表单数量都会改变数字所以封装一个函数
    total(); //打开页面先调用一遍
    function total(){
        var sum = 0;
        var count = 0;
        $(".itxt").each(function(i,e){
            sum += parseInt($(e).val());
            $(".amount-sum em").html(sum);
        })
        $(".p-sum").each(function(i,e){
            count += parseFloat($(e).html().substr(1));
            $(".price-sum em").html("¥" + count.toFixed(2));
        })
    }

    //删除商品模块,删除后要重新计算总计总额
    $(".p-action a").click(function(){  //点击删除按钮移除相应模块
        $(this).parents(".cart-item").remove();
        total();
    })
    $(".remove-batch").click(function(){  //删除选中商品
        $(".j-checkbox:checked").parents(".cart-item").remove();  //选择器:checked选择选中的
        total();
    })
    $(".clear-all").click(function(){
        $(".cart-item").remove();
        total();
    })

})