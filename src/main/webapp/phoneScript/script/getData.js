/**
	*@getData对象 负责跨域数据交互以及回调
	*@Author by tim.wang
*/
(function (){
	var getData = function(data,callBack){
		this.data = data;
	}
	
	getData.prototype = {
		proxyData:function(){
			if(document.getElementById("dataProxy")){
				var jsct = document.getElementById("dataProxy");
				jsct.parentNode.removeChild(jsct);
			}
			var sct = document.createElement("script");
			sct.setAttribute("id","dataProxy");
			sct.src = 'http://192.168.0.118:8080/lotserver/SendRequestServlet?parameter='+this.data+'&callBackMethod='+this.callBack+'';
			document.getElementsByTagName("body")[0].appendChild(sct);
		}
	}
	
	window.getData = getData;
})()