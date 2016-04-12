$(function (){

	var $menuLi= $('#menu').find('.menu_li');
	$menuLi.click(function (){
		
		$('.menu_ul').hide();
		$(this).next('.menu_ul').css('display','block');
		
	});
});