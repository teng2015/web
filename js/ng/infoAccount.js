angular.module('infoApp',['ngRoute'])
	.controller('infoController',function($scope,$http){

		function getUrlParam(name)
			{
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
			var r = window.location.search.substr(1).match(reg);  //匹配目标参数
			if (r!=null) return unescape(r[2]); return null; //返回参数值
			} 
		var id = getUrlParam('id');
		var isHistory = getUrlParam('isHistory');
		var appId = getUrlParam("appId");
		var csCifId = getUrlParam("csCifId");
		var cifUrl,indvUrl,emplymtUrl,addrUrl,facUrl,collUrl,ratingUrl,conflictUrl;
		if(isHistory == 'Y'){
			cifUrl = "/cif/cs_cifs/detail/"+csCifId+"?mtTenantId=1";
			emplymtUrl = "/cif/cs_cif_emps/detail/"+ csCifId +"/"+appId;
			addrUrl = "/cif/cs_cif_addrs/detail/"+ appId;
			indvUrl = "/cif/cs_cif_indvs/detail?cifId="+ csCifId +"&appId="+appId;
			ratingUrl = "/cif/cs_cif_ratings/?cifId="+ csCifId +"&appId="+appId;
			conflictUrl = "/cif/conflict/cs_cif_detail?id="+csCifId+"&appId="+appId+"&mtTenantId=1";
		}else{
			cifUrl = "/cif/cifs/detail/"+id+"?mtTenantId=1";
			emplymtUrl = "/cif/emps/detail/"+id;
			addrUrl = "/cif/addrs/detail/"+id;
			indvUrl = "/cif/indvs/detail?cifId="+id;
			ratingUrl = "/cif/ratings/?cifId="+id;
			conflictUrl = "/cif/conflict/cif_detail?id="+id+"&mtTenantId=1";
		}


		/*姓名 身份证*/
		ngCom.ngAjax({
			url:cifUrl,
			method:'get',
			ngHttp:$http,
			success:function(response){

				$scope.nm = response.nm;
				$scope.mtCifIdTypCdDscp = response.mtCifIdTypCdDscp;
				$scope.idNo = response.idNo;
				$scope.age = response.age;
				$scope.dtCreated = response.dtCreated;
				
				
				$scope.dtRegistered = response.dtRegistered.substr(0,10);
				
				$scope.mtIndTypCdDscp = response.mtIndTypCdDscp;
				$scope.mtIndCatCdDscp = response.mtIndCatCdDscp;
				$scope.mtIndCdDscp= response.mtIndCdDscp;
				$scope.mtIndDetailCdDscp= response.mtIndDetailCdDscp;
				
				
			},
			error:function (error_data){
				console.log(error_data);
			}
		
		});
		/*用户联系电话、教育程度  mtGenderCdDscp*/
		ngCom.ngAjax({
			url:indvUrl,
			method:'get',
			ngHttp:$http,
			success:function(response){

				$scope.loanFixedYear = response.loanFixedYear;

				$scope.mtIndvMobileUsageStsCdDscp = response.mtIndvMobileUsageStsCdDscp;
				
				
				$scope.mtIndvPaymentStsCdDscp = response.mtIndvPaymentStsCdDscp;
				
				  
				$scope.mtIndvTaxStsCdDscp = response.mtIndvTaxStsCdDscp;
				
				$scope.mtIndvRepymtStsCdDscp = response.mtIndvRepymtStsCdDscp;
				

				$scope.currentTotal = response.currentTotal;
				
				
				$scope.averageInc = response.averageInc;
				
				var v = response.isLegalRep;
				if(v=='Y'){
					$scope.isLegalRep = "是";
				}else if(v=='N'){
					$scope.isLegalRep = "否";
				}else{
					$scope.isLegalRep = "";
				}
				
				$scope.mtBizCapitalCdDscp = response.mtBizCapitalCdDscp;
				
				$scope.mtBizLandOwnerCdDscp = response.mtBizLandOwnerCdDscp;
				
				
				$scope.mtBizTypCdDscp = response.mtBizTypCdDscp;
				
				$scope.bizAddr = response.bizAddr;
				
				$scope.householdDebtAmt = response.householdDebtAmt;
				
				$scope.householdFixAssetAmt = response.householdFixAssetAmt;
				
				$scope.monthlyIncAmt = response.monthlyIncAmt;
				
				
				
				
				$scope.mtResidenceStsCdDscp = response.mtResidenceStsCdDscp;
				
				$scope.mtCardUsageCdDscp = response.mtCardUsageCdDscp;
				
				$scope.noOfDependentChild = response.noOfDependentChild;
				
				$scope.householdMonthlyIncAmt = response.householdMonthlyIncAmt;
			
				$scope.mobileNo = response.mobileNo;
				
				$scope.email = response.email;
				
				
				
				
				
				$scope.mtGenderCdDscp = response.mtGenderCdDscp;
				
				$scope.mtEduLvlCdDscp = response.mtEduLvlCdDscp;
				
				$scope.mtMaritalStsCd = response.mtMaritalStsCd;
				
				$scope.mtMaritalStsCdDscp = response.mtMaritalStsCdDscp;
				
				
				
				$scope.householdMonthlyIncAmt= response.householdMonthlyIncAmt;
				
				
			},
			error:function (error_data){
				console.log(error_data);
			}
		
		});
		/*获取客户职位信息*/
		ngCom.ngAjax({
			
			url:emplymtUrl,
			method:'get',
			ngHttp:$http,
			success:function(response){
				
				$scope.employerCifNm= response.employerCifNm;
				$scope.mtPosHeldCdDscp= response.mtPosHeldCdDscp;
				$scope.mtEmplymtTypCdDscp= response.mtEmplymtTypCdDscp;
				$scope.mtIndvCdtRatingCdDscp= response.mtIndvCdtRatingCdDscp;
				 				
			},
			error:function (error_data){
				console.log(error_data);
			}
		
		});

		
		
		/*用户评级*/
		ngCom.ngAjax({
			
			url:ratingUrl,
			method:'get',
			ngHttp:$http,
			success:function(response){
				
			$scope.score= response.score;
			$scope.dtRated= response.dtRated.substr(0,10);
			$scope.rating= response.rating;

				
			},
			error:function (error_data){
				console.log(error_data);
			}
		
		});
		
		/*获取cif详细信息冲突状态*/
		ngCom.ngAjax({
			
			url:conflictUrl,
			method:'get',
			ngHttp:$http,
			success:function(response){
				if(response.idNo == "goUp" || response.idNo == "goDown" || response.mtCifIdTypCdDscp == "textChange" || response.nm == "textChange"){
						$scope.idNoConflict = "textChange";
				}else{
					$scope.idNoConflict = response.idNo;
				}
				if(response.age == "goUp" || response.age == "goDown"){
						$scope.ageConflict = "textChange";
				}else{
					$scope.ageConflict = response.age;
				}
				
				
				$scope.dtCreatedConflict = response.dtCreated;
				$scope.dtRegisteredConflict = response.dtRegistered;
				$scope.mtIndTypCdDscpConflict = response.mtIndTypCdDscp;
				$scope.mtIndCatCdDscpConflict = response.mtIndCatCdDscp;
				$scope.mtIndCdDscpConflict= response.mtIndCdDscp;
				$scope.mtIndDetailCdDscpConflict= response.mtIndDetailCdDscp;


				$scope.loanFixedYearConflict= response.loanFixedYear;
			
				$scope.mtIndvMobileUsageStsCdDscpConflict = response.mtIndvMobileUsageStsCdDscp;
				$scope.mtIndvPaymentStsCdDscpConflict = response.mtIndvPaymentStsCdDscp;
				$scope.mtIndvTaxStsCdDscpConflict = response.mtIndvTaxStsCdDscp;
				$scope.mtIndvRepymtStsCdDscpConflict = response.mtIndvRepymtStsCdDscp;
				$scope.currentTotalConflict = response.currentTotal;
				$scope.averageIncConflict = response.averageInc;
				$scope.isLegalRepConflict = response.isLegalRep;
				$scope.mtBizCapitalCdDscpConflict = response.mtBizCapitalCdDscp;
				$scope.mtBizLandOwnerCdDscpConflict = response.mtBizLandOwnerCdDscp;
				$scope.mtBizTypCdDscpConflict = response.mtBizTypCdDscp;
				$scope.bizAddrConflict = response.bizAddr;
				$scope.householdDebtAmtConflict = response.householdDebtAmt;
				$scope.householdFixAssetAmtConflict = response.householdFixAssetAmt;
				$scope.monthlyIncAmtConflict = response.monthlyIncAmt;
				$scope.mtResidenceStsCdDscpConflict = response.mtResidenceStsCdDscp;
				$scope.mtCardUsageCdDscpConflict = response.mtCardUsageCdDscp;
				$scope.noOfDependentChildConflict = response.noOfDependentChild;
				$scope.householdMonthlyIncAmtConflict = response.householdMonthlyIncAmt;
				$scope.mobileNoConflict = response.mobileNo;
				$scope.emailConflict = response.email;
				$scope.mtGenderCdDscpConflict = response.mtGenderCdDscp;
				$scope.mtEduLvlCdDscpConflict = response.mtEduLvlCdDscp;
				$scope.mtMaritalStsCdConflict = response.mtMaritalStsCd;
				$scope.mtMaritalStsCdDscpConflict = response.mtMaritalStsCdDscp;
				$scope.householdMonthlyIncAmtConflict= response.householdMonthlyIncAmt;
				
				
				$scope.employerCifNmConflict= response.employerCifNm;
				$scope.mtPosHeldCdDscpConflict= response.mtPosHeldCdDscp;
				$scope.mtEmplymtTypCdDscpConflict= response.mtEmplymtTypCdDscp;
				$scope.mtIndvCdtRatingCdDscpConflict= response.mtIndvCdtRatingCdDscp;


				var addrs =eval(response.address);
				$scope.mtCtryCdDscpConflict= addrs[0].mtCtryCdDscp;
				$scope.mtStateCdDscpConflict= addrs[0].mtStateCdDscp;
				$scope.mtCityCdDscpConflict= addrs[0].mtCityCdDscp;
				//mtCityCdDscp + mtCountyCdDscp
				//postcd
				$scope.mtResidenceTypCdDscpConflict = addrs[0].mtResidenceTypCdDscp;
				$scope.postcdConflict= addrs[0].postcd;
				

				
				$scope.scoreConflict= response.score;
				$scope.dtRatedConflict= response.dtRated;
				$scope.ratingConflict= response.rating;

				var addressConflictJson = response.address;




				/*获取客户地址信息*/
				/*mtTenantId都是1  暂时写死*/
				ngCom.ngAjax({

					url:addrUrl,
					method:'get',
					ngHttp:$http,
					success:function(response){
						$scope.addResJson= response;

						$scope.mtCtryCdDscp= response[0].mtCtryCdDscp;
						$scope.mtStateCdDscp= response[0].mtStateCdDscp;
						$scope.mtCityCdDscp= response[0].mtCityCdDscp;

						//mtCityCdDscp + mtCountyCdDscp
						//postcd
						$scope.mtResidenceTypCdDscp = response[0].mtResidenceTypCdDscp;
						$scope.postcd= response[0].postcd;

						var addressObj =eval(response);
						var addressConflictObj=eval(addressConflictJson);

						for(var i=0;i<addressObj.length;i++){
							addressObj[i].mtCityCdDscpConflict =  addressConflictObj[i].mtCityCdDscp;
							addressObj[i].mtCountyCdDscpConflict =  addressConflictObj[i].mtCountyCdDscp;
							addressObj[i].postcdConflict =  addressConflictObj[i].postcd;

						}


						$scope.addressMessageConflictJson = addressObj;



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
		

		

		

		

	})
	.config(['$routeProvider','$httpProvider',function($routeProvider,$httpProvider){
		if(localStorage.token){
			$httpProvider.defaults.headers.common['Authorization'] = localStorage.token; //注入 httpProvider 设置请求头token
		}else{
			window.location.href="/index.html";
		}
		
	}]);

/*$(function (){

	var $explainLi =  $('.explainUl').find('.explainFirst');

	$explainLi.click(function (){
		$('.explainCon').hide();
		$(this).next('.explainCon').show();
		
	});
	var $explainSec = $('.explainList').find('li');

	$explainSec.mouseover(function (){

		$('.explainListCon').hide();
		$(this).find('.explainListCon').show();
	});

	$explainSec.mouseout(function (){

		$('.explainListCon').hide();
		
	});
});*/