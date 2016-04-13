/*
	*** angular Spa ***
	*** wuhao 2016/4/13 ***
*/
var ngCom = {
	ngAjax : function(options){
		options.url = options.url;  
		options.method = options.method || 'get'; //请求方式
		options.data = options.data || {}; 
		options.success = options.success || function(data,status){}; 
		options.errfn = options.errfn || function(status){}; 
		options.ngHttp = options.ngHttp; //*** 传入$http(控制器注入) 必传项
		if(options.method.toLowerCase() == 'get')
		{
			options.data = {params: options.data}; //get方式 -> url:options.url ? options.data;
		}
		else
		{
			options.data = options.data; //post以及其他方式 xhr.send(options.data);
		}
		options.ngHttp({
			url:options.url,
			method:options.method,
			data:options.data	
		}).success(options.success).error(
			// 状态码403做特殊处理
			function(status)
			{
				if(status == 403)
				{
					delete localStorage.token;
					window.location.href = "/index.html" ;
				}
				else
				{
					options.errfn();
				}
			}	
		);
	}	
};
angular.module('app',[
    'ngRoute',
    'welcome',
	'rishSearch',
	'riskHistory',
	'userInfo',
	'changePass',
	'aboutUs',
	'address'
])
	.config(['$routeProvider','$httpProvider',function($routeProvider,$httpProvider){
		$httpProvider.defaults.headers.common['Authorization'] = localStorage.token;
		$routeProvider.otherwise({
			redirectTo:'/welcome'
		});
	}]);

angular.module('welcome',['ngRoute'])
	.controller('welcomePage',function($scope,$http){		
		ngCom.ngAjax({
			url:'/sec/userHis/get',
			method:'get',
			ngHttp:$http,
			success:function(data,status){
				$scope.loginAcc = data.currLoginNumber;
				$scope.lastTime = data.lastLoginTime;
			},
			
		});
		
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
	
angular.module('address',['ngRoute'])
	.controller('addressPage',function($scope){
		
		
	})
	.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/address',{
			templateUrl:'address.html',
			controller:'addressPage'
		});
			
	}]);

