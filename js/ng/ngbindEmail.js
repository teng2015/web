$(function (){
	function guid() {
	    function S4() {
	       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	    }
	    return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
	}

	function init(){
	    $("#ssid").val(guid());
	    loadImageCode();
	}

	init();

	function loadImageCode(){
	    var ssid = $("#ssid").val();
	    
	    $.post("/sec/captcha/",{id:ssid},function (repJson,status) { 
	        $("#imageCode").html('<img src="data:image/png;base64,' + repJson + '" />');
	    });
	   
	}
	$('.yzm_a').click(function (){

		loadImageCode();

	});
	/*邮箱失去焦点判断*/

	$('#emailName').focus(function (){
		$('.showTxt').html("请输入邮箱");
	});

	$('#emailName').blur(function (){
		var sText = $('#emailName').val();
		
		var reMail =/^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$/;
		
		if(!reMail.test(sText)){

			$('.showTxt').html("请正确填写邮箱");
			
		}else{
			$('.showTxt').html("邮箱正确");
		}
	}); 

	/*$('.secEmailTxt').html($('#emailName').val());*/

	/*点击提交*/

	$('.sub').click(function (){
		//console.log(2);
		var json = {
			emailadd:$('#emailName').val()
			/*authCode: $('#yzmimg').val()*/
		};
		var token = localStorage.token;
		console.log(json);
		$.ajax({
			
	        url: "/sec/email/link/",
	        data:json,
	        type: "POST",
	        contentType: "application/json; charset=UTF-8",
	        async:false,
	        Authorization:token,
	        success:function (res){

	        },
	      	error: function (data) {
	              alert("系统错误，请稍后重试!");
	      	}
  		});

	});
})
