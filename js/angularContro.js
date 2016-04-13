

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
		
	angular.module('address',['ngRoute'])
		.controller('addressPage',function($scope){
			
			
		})
		.config(['$routeProvider',function($routeProvider){
			$routeProvider.when('/address',{
                templateUrl:'address.html',
                controller:'addressPage'
            });
				
		}]);
	
})();