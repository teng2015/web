$(function (){
	var $menuLi= $('#menu').find('.menu_li');
	var $menuLiChild= $('#menu').find('.menu_child');

	$menuLi.click(function (){
		
		$('.menu_ul').hide();

		if($(this).next('.menu_ul')){

			$(this).next('.menu_ul').show();	

		}else{

			$('.menu_ul').hide();
		}
		
	});
	
	
	
	$menuLiChild.click(function (){
		
		
		if($(this).parents('.menu_ul').html()){

			var rightParentName=$(this).parents('li').find('.menu_li').eq(0).html();
			var rightNameTxt = $(this).html();
			$('.right_name').html(rightParentName+" "+rightNameTxt);
			$('.span-12').hide();
			if(rightNameTxt=='调用历史'){
				$('.span-12').show();
			}else{
				$('.span-12').hide();
				
			}
			$('.title-2').html(rightNameTxt);
		}else{

			$('.right_name').html('首页');
			$('.title-2').html('首页');
		}

	});
	
	
	
	
});


