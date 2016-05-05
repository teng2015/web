/**
 * @description angualr ajax
 * @author		wuhao
 * @createDate  2016-4-13
*/

var ngCom = {
	ngAjax : function(options){
		options.url = options.url;  
		options.method = options.method || 'get'; //请求方式
		options.data = options.data || {}; 
		options.success = options.success || function(data,status){}; 
		options.errfn = options.errfn || function(status){}; 
		options.ngHttp = options.ngHttp; // 传入$http(控制器注入) 必传项
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
			data:options.data,
		}).success(options.success).error(
			// 状态码403做特殊处理
			function(status)
			{
				if(status == 403)
				{
					delete localStorage.token;
					window.location.href = "/index.html" ;
				}
				else{
					options.errfn();
				}
			}	
		);
	}	
};


