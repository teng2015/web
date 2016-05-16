angular.module('viewApp',['ngRoute'])
	.controller('viewController',function($scope,$http){

		function getUrlParam(name)
		{
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
			var r = window.location.search.substr(1).match(reg);  //匹配目标参数
			if (r!=null) return unescape(r[2]); return null; //返回参数值
		} 

		function formatMoney(num) {
			var tail = ".00";
		    var num = (num || 0).toString();
			var result = '';
		    while (num.length > 3) {
		        result = ',' + num.slice(-3) + result;
		        num = num.slice(0, num.length - 3);
				  //循环末尾的三个数字，每匹配一次，就把逗号和匹配到的内容插入到结果字符串的开头
		    }
		    if (num) { result = num + result + tail; }    
		    return result;
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
			cifUrl = "/cif/cs_cifs/"+csCifId+"?mtTenantId=1";
			indvUrl = "/cif/cs_cif_indvs/?cs_cif_id="+csCifId+"&mtTenantId=1";
			emplymtUrl = "/cif/cs_cif_emps/?cs_cif_Id="+csCifId+"&mtTenantId=1";
			addrUrl = "/cif/cs_cif_addrs/?cs_cif_id="+csCifId+"&mtTenantId=1";
			collUrl = "/col/cs_colls/cs_cif/"+appId+"?mtTenantId=1";
			ratingUrl = "/cif/cs_cif_ratings/?cs_cif_id="+csCifId+"&mtTenantId=1";
		} else {
			facUrl = "/col/facChrgs/list?cifId="+id+"&mtTenantId=1";
			cifUrl = "/cif/cifs/"+id+"?mtTenantId=1";
			indvUrl = "/cif/indvs/?cif_id="+id+"&mtTenantId=1";
			emplymtUrl = "/cif/emps/?cif_id="+id+"&mtTenantId=1";
			addrUrl = "/cif/addrs/"+id+"?mtTenantId=1";
			collUrl = "/col/coll/list?cifId="+id+"&mtTenantId=1";
			ratingUrl = "/cif/ratings/?cif_id="+id+"&mtTenantId=1";
		}
		/*姓名 身份证*/
		ngCom.ngAjax({
			url:cifUrl,
			method:'get',
			ngHttp:$http,
			success:function(response){
				
				$scope.idNo = response.idNo;
				$scope.nm= response.nm;
				$scope.age= response.age;
				$scope.mtCifIdTypCdDscp= response.mtCifIdTypCdDscp;
				
				
			},
			error:function (error_data){
				console.log(error_data);
			}
		
		});

		/*信息成功率*/

		ngCom.ngAjax({
			
			url:"/cif/inteRates/"+id+"/1",
			method:'get',
			ngHttp:$http,
			success:function(response){	
				/*$scope.resJson = response;*/
				console.log(response);
				var totalrate = response.totalRate;/*总*/
				var factotalrate = response.facTotalRate;/*业务*/
				var ciftotalrate = response.cifTotalRate;/*客户*/
				var colltotalrate = response.collTotalRate;/*担保*/

				$('.total').html(parseInt(totalrate*100)+'%');
				$('.factotalrate').html(parseInt(factotalrate*100)+'%');
				$('.ciftotalrate').html(parseInt(ciftotalrate*100)+'%');
				$('.colltotalrate').html(parseInt(colltotalrate*100)+'%');

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
				$scope.mtStateCdDscp = response.mtStateCdDscp;
				$scope.mtCountyCdDscp= response.mtCountyCdDscp;
			
				
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

		/*客户信息详情*/
		$('.Customer_information').click(function (){

			if(isHistory == 'Y'){
				window.open("infoAccount.html?csCifId="+csCifId+"&appId="+appId+"&isHistory=Y",'_blank');
			}else{
				window.open("infoAccount.html?id="+id,'_blank');
			}
		});

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
				$scope.householdMonthlyIncAmt= response.householdMonthlyIncAmt;
				
				
			},
			error:function (error_data){
				console.log(error_data);
			}
			
		});

		/*担保信息*/
		var collTr = '';
		var collTxtTr = '<tr class="colInfo_title">'+
                    '<td class="guarantee_number">担保编号</td>'+
                    '<td class="guarantee_type">担保类型</td>'+
                    '<td class="guarantee_types">担保种类</td>'+
                    '<td class="id_num">唯一识别号码</td>'+
                    '<td class="guaranteed_discount">担保品折扣系数</td>'+
                    '<td class="collateral_value">担保品价值</td>'+
                    '<td class="residual_value">担保品可用价值</td>'+
                    '<td class="owner">所有者</td>'+
                	'</tr>';
		ngCom.ngAjax({
			url:collUrl,
			method:'get',
			ngHttp:$http,
			success:function(response){	
				
				/*$scope.collList = response;*/
				
				$.each(response,function (i,ele){
					collTr+='<tr class="colInfo_title_val">'+
                    '<td class="guarantee_number">'+ele.no+'</td>'+
                    '<td class="guarantee_type">'+ele.mtCollTypDscp+'</td>'+
                    '<td  class="guarantee_types">'+ele.mtCollCatDscp+'</td>'+
                    '<td class="id_num">'+ele.colIdNo+'</td>'+
                    '<td class="guaranteed_discount">'+ele.safetyFactor+'%</td>'+
                    '<td class="collateral_value">'+ele.collValue+'</td>'+
                    '<td class="residual_value">'+ele.remainValue+'</td>'+
                    '<td class="owner">'+ele.ownerCifNm+'</td>'+
                '</tr>';
				});
				
               
                var trHtml=collTxtTr+collTr;
                
                $('.collTbody').html(trHtml);

                

               //隔行换色
					
			  var $tables = $('.collTbody').find('.colInfo_title_val'); //遍历文档中的所有table
			  for(var i=0; i<$tables.length; i++) {
			   
			    if(i%2) {
					
			     $tables.eq(i).addClass("evenLine");
			     
			    }else { 
			    	
		     		$tables.eq(i).addClass("oddLine");
				} 
			  }
				

				
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
		/*业务信息*/
		
		$('.next').click(function (){
			if(isHistory == 'Y'){
				window.open("infoBusiness.html?csCifId="+csCifId+"&appId="+appId+"&isHistory=Y",'_blank');
			}else{
				window.open("infoBusiness.html?id="+id,'_blank');
			}
		});
		//业务信息
		ngCom.ngAjax({
			
			url:facUrl,
			method:'get',
			ngHttp:$http,
			success:function(response){	
				$scope.resJson = response.facList;;
				$scope.resColl = response.collList;
				$scope.resAcct = response.acctList;
				//信贷总额度
				var summarylmtApprAllAmt = 0;
				//账户总余额
				var summaryOutstdAmtAll = 0;
				//担保连接总金额
				var summaryChargeValue = 0;
				//
				var summaryCollValue = 0;
				//
				var summaryRemainValue = 0;
				
				angular.forEach($scope.resJson, function(data){
				
				summarylmtApprAllAmt += parseInt(data.lmtAppr);
				$scope.summarylmtApprAllAmt = summarylmtApprAllAmt;
				
				});
				angular.forEach($scope.resAcct, function(data){
				
				summaryOutstdAmtAll += parseInt(data.outstdAmt);
				$scope.summaryOutstdAmtAll = summaryOutstdAmtAll;
				
				});
				angular.forEach($scope.resColl, function(data){
				
				summaryChargeValue += parseInt(data.chargeValue);
				$scope.summaryChargeValue = summaryChargeValue;
				
				});
				angular.forEach($scope.resColl, function(data){
				
				summaryCollValue += parseInt(data.collValue);
				$scope.summaryCollValue = summaryCollValue;
				
				});
				angular.forEach($scope.resColl, function(data){
				
				summaryRemainValue += parseInt(data.remainValue);
				$scope.summaryRemainValue = summaryRemainValue;
				
				});

				//隔行换色
				/*console.log(222);
				$scope.isActive=function (index){
					console.log(index);
					return $scope._index = index;
					console.log($scope._index);
				}*/
					
			  /*var $tables = $('.line_a'); //遍历文档中的所有table
			  console.log($tables.length);
			  for(var i=0; i<$tables.length; i++) {
			   console.log(111);
			    if(i%2) {
					
			     $tables.eq(i).find('.business_line').addClass("evenLine");
			     
			    }else { 
			    	
		     		$tables.eq(i).find('.business_line').addClass("oddLine");
				} 
			  }*/
				
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
									if(response.idNo == "goUp" || response.idNo == "goDown" || response.mtCifIdTypCdDscp == "textChange"){
										$scope.idNoStatus = "textChange";
									}
									$scope.nmStatus= response.nm;
									if(response.age == "goUp" || response.age == "goDown"){
										$scope.ageStatus = "textChange";
									}

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
									$scope.householdMonthlyIncAmtStatus= response.householdMonthlyIncAmt;
				
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
									if(response.idNo == "goUp" || response.idNo == "goDown" || response.mtCifIdTypCdDscp == "textChange"){
										$scope.idNoStatus = "textChange";
									}
									$scope.nmStatus= response.nm;
									if(response.age == "goUp" || response.age == "goDown"){
										$scope.ageStatus = "textChange";
									}

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
									$scope.householdMonthlyIncAmtStatus= response.householdMonthlyIncAmt;
				
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

		

		/* 担保信息 详情5.9*/
			$('.collMore').click(function (){
			if(isHistory == 'Y'){
				window.open("infoGuarantee.html?csCifId="+csCifId+"&appId="+appId+"&isHistory=Y",'_blank');
			}else{
				window.open("infoGuarantee.html?id="+id,'_blank');

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
		if(localStorage.token){
			$httpProvider.defaults.headers.common['Authorization'] = localStorage.token; //注入 httpProvider 设置请求头token
		}else{
			window.location.href="/index.html";
		}

		
		
	}]);

