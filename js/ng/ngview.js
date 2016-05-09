angular.module('viewApp',['ngRoute'])
	.controller('viewController',function($scope,$http){

		function getUrlParam(name)
			{
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
			var r = window.location.search.substr(1).match(reg);  //匹配目标参数
			if (r!=null) return unescape(r[2]); return null; //返回参数值
			} 

		var id = getUrlParam('id');
		$scope.id =id;

		var csCifId = getUrlParam('csCifId');
		var isHistory = getUrlParam('isHistory');
		var nextCsCifId = getUrlParam('nextCsCifId');
		var appId = getUrlParam("appId");
	    var cifUrl,indvUrl,emplymtUrl,addrUrl,facUrl;
		if (isHistory == 'Y') {
			facUrl = "/col/csfac_chrg/list?csCifId="+csCifId+"&mtTenantId=1&appId="+appId;
			cifUrl = "/cif/cs_cifs/"+csCifId+"&mtTenantId=1";
			indvUrl = "/cif/cs_cif_addrs?cs_cif_id="+csCifId+"&mtTenantId=1";
			emplymtUrl = "/cif/cs_cif_emps?cs_cif_id="+csCifId+"&mtTenantId=1";
			addrUrl = "/cif/cs_cif_emps?cs_cif_id="+csCifId+"&mtTenantId=1";
		} else {
			facUrl = "/col/facChrgs/list?cifId="+id+"&mtTenantId=1";
			cifUrl = "/cif/cifs/"+id+"?mtTenantId=1";
			indvUrl = "/cif/indvs/?cif_id="+id+"&mtTenantId=1";
			emplymtUrl = "/cif/emps/?cif_id="+id+"&mtTenantId=1";
			addrUrl = "/cif/addrs/detail/"+id+"?mtTenantId=1";
		}
		/*姓名 身份证*/
		ngCom.ngAjax({
			url:"/cif/cifs/"+id+"?mtTenantId=1",
			method:'get',
			ngHttp:$http,
			success:function(response){
				
				$scope.idNo = response.idNo;
				$scope.nm= response.nm;
				$scope.age= response.age;
				
			},
			error:function (error_data){
				console.log(error_data);
			}
		
		});

		/*信息成功率*/

		ngCom.ngAjax({
			
			url:"/col/facChrgs/list?cifId="+id+"&mtTenantId=1",
			method:'get',
			ngHttp:$http,
			success:function(response){	
				$scope.resJson = response.facList;;
				$scope.resColl = response.collList;
				$scope.resAcct = response.acctList;

			},
			error:function (error_data){
				console.log(error_data);
			}
			
		});

		/*获取客户地址信息*/
		ngCom.ngAjax({
			url:addrUrl,
			method:'get',
			ngHttp:$http,
			success:function(response){
				$scope.mtStateCdDscp = response[0].mtStateCdDscp;
				$scope.mtCountyCdDscp= response[0].mtCountyCdDscp;
			
				
			},
			error:function (error_data){
				console.log(error_data);
			}
		
		});
		
		
		/*客户职业信息资源*/
		ngCom.ngAjax({
			url:emplymtUrl,
			method:'get',
			ngHttp:$http,
			success:function(response){
				  
				$scope.mtPosHeldCd = response.mtPosHeldCdDscp;
				$scope.employerCifNm= response.employerCifNm;
				
			},
			error:function (error_data){
				console.log(error_data);
			}
		
		});

		/*居住地址*/
		/*ngCom.ngAjax({
		url:"/cif/addrs/?cif_id="+id+"&mtTenantId=1",
		method:'get',
		ngHttp:$http,
		success:function(response){
			
			
			
		},
		error:function (error_data){
			console.log(error_data);
		}
		
		});*/

		/*客户信息*/

		ngCom.ngAjax({
			url:indvUrl,
			method:'get',
			ngHttp:$http,
			success:function(response){
				$scope.mtMaritalStsCdDscp = response.mtMaritalStsCdDscp;
				$scope.monthlyIncAmt= response.monthlyIncAmt;
				$scope.mtGenderCdDscp= response.mtGenderCdDscp;
				$scope.mtEduLvlCdDscp= response.mtEduLvlCdDscp;
				$scope.householdFixAssetAmt= response.householdFixAssetAmt;
				
			},
			error:function (error_data){
				console.log(error_data);
			}
			
		});

		/*担保信息*/
		ngCom.ngAjax({
			url:"/col/coll/list?cifId="+id+"&mtTenantId=1",
			method:'get',
			ngHttp:$http,
			success:function(response){	
				$scope.collList = response;
			},
			error:function (error_data){
				console.log(error_data);
			}
			
		});
		/*业务信息*/
		//业务信息
		$('.next').click(function (){
			if(isHistory == 'Y'){
				window.location.href="infoBusiness.html?csCifId="+csCifId+"&appId="+appId+"&isHistory=Y";
			}else{
				window.location.href="infoBusiness.html?id="+id;
			}
		});

		ngCom.ngAjax({
			
			url:facUrl,
			method:'get',
			ngHttp:$http,
			success:function(response){	
				$scope.resJson = response.facList;;
				$scope.resColl = response.collList;
				$scope.resAcct = response.acctList;

			},
			error:function (error_data){
				console.log(error_data);
			}
			
		});
		$scope.toggle = function(dis) {
			  if ($scope.display!=dis) {
				  $scope.display=dis;
			  }else{
				$scope.display=-1;
			  }
			};
		if (isHistory == 'Y') {
		
		
		//获取风险冲突提示
					ngCom.ngAjax({
							url:"/cif/conflict/cs_cif_summary?current_cs_cif_id="+csCifId+"&next_cs_cif_id="+nextCsCifId+"&mtTenantId=1",
							method:'get',
							ngHttp:$http,
							success:function(response){
				
							/*姓名 身份证*/
									$scope.idNoStatus = response.idNo;
									$scope.nmStatus= response.nm;
									$scope.ageStatus= response.age;

							/*获取客户地址信息*/
									$scope.mtStateCdDscpStatus = response.mtStateCdDscp;
									$scope.mtCountyCdDscpStatus= response.mtCountyCdDscp;
				
							/*客户信息*/
									$scope.mtMaritalStsCdDscpStatus = response.mtMaritalStsCdDscp;
									$scope.monthlyIncAmtStatus = response.monthlyIncAmt;
									$scope.mtGenderCdDscpStatus = response.mtGenderCdDscp;
									$scope.mtEduLvlCdDscpStatus = response.mtEduLvlCdDscp;
									$scope.householdFixAssetAmtStatus = response.householdFixAssetAmt;
									
									/*客户职业信息资源*/
									$scope.mtPosHeldCdStatus = response.mtPosHeldCdDscp;
									$scope.employerCifNmStatus = response.employerCifNm;
				
									},
									error:function (error_data){
										console.log(error_data);
									}
									
								});
	}else{
		//保存快照

		
		ngCom.ngAjax({
			url:"/cif/cs_cifs/csCifs/",
			data:{cifId:id,mtTenantId:"1",appId:"1"},
			method:'POST',
			ngHttp:$http,
			success:function(response){
			
			ngCom.ngAjax({
					url:"/col/cs_colls/csColls",
					data:{cifId:response.cifId,mtTenantId:"1",appId:response.appId},
					method:'POST',
					ngHttp:$http,
					success:function(response){
				
					//获取风险冲突提示
					ngCom.ngAjax({
							url:"/cif/conflict/cif_summary?cifId="+id+"&mtTenantId=1",
							method:'get',
							ngHttp:$http,
							success:function(response){
				
							/*姓名 身份证*/
									$scope.idNoStatus = response.idNo;
									$scope.nmStatus= response.nm;
									$scope.ageStatus= response.age;

							/*获取客户地址信息*/
									$scope.mtStateCdDscpStatus = response.mtStateCdDscp;
									$scope.mtCountyCdDscpStatus= response.mtCountyCdDscp;
				
							/*客户信息*/
									$scope.mtMaritalStsCdDscpStatus = response.mtMaritalStsCdDscp;
									$scope.monthlyIncAmtStatus = response.monthlyIncAmt;
									$scope.mtGenderCdDscpStatus = response.mtGenderCdDscp;
									$scope.mtEduLvlCdDscpStatus = response.mtEduLvlCdDscp;
									$scope.householdFixAssetAmtStatus = response.householdFixAssetAmt;
									
									/*客户职业信息资源*/
									$scope.mtPosHeldCdStatus = response.mtPosHeldCdDscp;
									$scope.employerCifNmStatus = response.employerCifNm;
				
									},
									error:function (error_data){
										console.log(error_data);
									}
									
								});
					
				
				
					},
					error:function (error_data){
						console.log(error_data);
					}
			
					});
				
				
			},
			error:function (error_data){
				console.log(error_data);
			}
			
		});
				
	}
		
	/*名词解释2*/
		//$scope._index=0;

		$scope.isActivemc=function(index){
			return $scope._index==index;
			console.log($scope._index);
		}
		$scope.showPhotomc=function(index){
			return $scope._index=index;
			console.log($scope._index);
		}	
		$scope.showPhotomcout=function(index){
			return $scope._index=null;
			console.log($scope._index);
		}

		/*点击担保链接金额弹出div*/
		$('.col').toggle(function (){
			
			$('.this_div').hide();
			$(this).parents('.business_line').next('.this_div').show();
		},function (){
			$('.this_div').hide();
			$(this).parents('.business_line').next('.this_div').hide();
		});
		

		/*点击账户余额*/
		$('.acc').toggle(function (){
			$('.this_div').hide();
			$(this).parents('.business_line').next('.this_div').next('.this_div').show();
		},function (){
			$('.this_div').hide();
			$(this).parents('.business_line').next('.this_div').next('.this_div').hide();
		});

		/*业务信息*/

		ngCom.ngAjax({
			
			url:"/col/facChrgs/list?cifId="+id+"&mtTenantId=1",
			method:'get',
			ngHttp:$http,
			success:function(response){	
				$scope.resJson = response.facList;;
				$scope.resColl = response.collList;
				$scope.resAcct = response.acctList;
				//隔行变色
				
					
				/*var $line_a = $('.busInfo').find('.business_line');
				console.log($line_a);
				$line_a.each(function (i,ele){
					
					if(i%2==0){
						$('.business_line').eq(i).addClass("two");
					
					}else{
						
						$('.business_line').eq(i).addClass("one");
						
					}

				});*/
					

			},
			error:function (error_data){
				console.log(error_data);
			}
			
		});
		$scope.toggle = function(dis) {
			  if ($scope.display!=dis) {
				  $scope.display=dis;
			  }else{
				$scope.display=-1;
			  }
			};

		/*名词字典*/
		var $explainLi =  $('.explainUl').find('.explainFirst');
		var $explainCon=document.getElementById('explainCon');

		var $explainConTwo=document.getElementById('explainConTwo');

		var $explainFirstLiTwo=document.getElementById('explainFirstLiTwo');
		

		$scope.explainFirst=function (){

			if($explainCon.style.display=='block'){
				
				$explainCon.style.display='none';

			}else{
				$explainCon.style.display='block';

				
			}

			ngCom.ngAjax({
				url:"/maint/mtni/",
				method:'get',
				ngHttp:$http,
				success:function(data){
					
					$scope.resList = data;
					
				},
				error:function (error_data){
					console.log(error_data);
				}
			
			});
		}
		

		
        
      
	


		/*回到顶部*/

		$('.scrollTop').click(function (){
			var sc=$(window).scrollTop();
   			$('body,html').animate({scrollTop:0},500);
		});

		/*进度条*/

		var barSumWidth = $('.progressBar').width();
		
		var barWidth = barSumWidth*0.7;
		var interval = setInterval(increment,10);
		var current = 0;
		
		function increment(){
		    current++;
		    if(current<=barWidth){
		    	$('.bar').width(current);
		    }
		  
		}

	})
	.config(['$routeProvider','$httpProvider',function($routeProvider,$httpProvider){
		$httpProvider.defaults.headers.common['Authorization'] = localStorage.token; //注入 httpProvider 设置请求头token
		
	}]);

