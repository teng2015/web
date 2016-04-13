$(function (){
	var $menuLi= $('#menu').find('.menu_li');
	var $menuLiChild= $('#menu').find('.menu_child');

	$menuLi.click(function (){
		
		$('.menu_ul').hide();

		if($(this).next('.menu_ul')){

			$(this).next('.menu_ul').css('display','block');	

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


angular.module('app',[
    'ngRoute',
    'welcome',
	'rishSearch',
	'riskHistory',
	'userInfo',
	'changePass',
	'aboutUs'
])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.otherwise({
            redirectTo:'/welcome'
        });
    }]);





(function(){
	angular.module('welcome',['ngRoute'])
		.controller('welcomePage',function($scope){
			
		})
		
		.config(['$routeProvider',function($routeProvider){
			$routeProvider.when('/welcome',{
                templateUrl:'welcome.html',
                controller:'welcomePage'
            });
			
		}]);
		
	angular.module('rishSearch',['ngRoute'])
		.controller('riskSearchPage',function($scope){
			
			
		})
		.config(['$routeProvider',function($routeProvider){
			$routeProvider.when('/riskSearch',{
                templateUrl:'riskSearch.html',
                controller:'riskSearchPage'
            });
				
		}]);
		
		
	angular.module('riskHistory',['ngRoute'])
		.controller('riskHistoryPage',function($scope){
			
			
		})
		.config(['$routeProvider',function($routeProvider){
			$routeProvider.when('/riskHistory',{
                templateUrl:'riskHistory.html',
                controller:'riskHistoryPage'
            });
				
		}]);
	
	angular.module('userInfo',['ngRoute'])
		.controller('userInfoPage',function($scope){
			
			
		})
		.config(['$routeProvider',function($routeProvider){
			$routeProvider.when('/userInfo',{
                templateUrl:'userInfo.html',
                controller:'userInfoPage'
            });
				
		}]);
		
	angular.module('changePass',['ngRoute'])
		.controller('changePassPage',function($scope){
			
			
		})
		.config(['$routeProvider',function($routeProvider){
			$routeProvider.when('/changePass',{
                templateUrl:'changePass.html',
                controller:'changePassPage'
            });
				
		}]);
		
	angular.module('aboutUs',['ngRoute'])
		.controller('aboutUsPage',function($scope){
			
			
		})
		.config(['$routeProvider',function($routeProvider){
			$routeProvider.when('/aboutUs',{
                templateUrl:'aboutUs.html',
                controller:'aboutUsPage'
            });
				
		}]);
		
	
		
	
	
		
	
	
	
})();