(function(){
	/**
	*@root对象 持有所有内容模块
	*@Author by tim.wang
	*/

	/**
	 * @function dialog 弹出层
	 * @param {domText} 弹出层内容DOM
	 * @prarm {json} 携带对象，宽，高，是否模态窗口，是否显示title
	 */
	 
	var init = function (){
		var bro = navigator.userAgent.toLowerCase(),
		ismatch = bro.match(/iPad/i);
		if(ismatch != "ipad"){
			//window.location.href = "http://www.ruyicai.com";
		}
	}
	init();
	var dialog = function(domText,diaJson){
		var doc = document;
		var dialogs = util.dom("dialog");
		var dialogBox = util.dom("dialogBox");
		dialogs.style.width = doc.documentElement.clientWidth + "px";
		dialogs.style.height = doc.documentElement.clientHeight + "px";
		dialogs.style.display = "block";
		var contBox = doc.getElementById("dialogBox");
		contBox.innerHTML = domText;
		if(diaJson.width){
			contBox.style.left = (doc.documentElement.clientWidth - diaJson.width)/2 + "px";
		}
		if(diaJson.height){
			contBox.style.top = (doc.documentElement.clientHeight - diaJson.height)/2 + "px";
		}
		if(!diaJson.isMask){
			util.dom("overlayId").style.display = "none";
		}
	}
	/*
		
	*/
	
	
	
	/*随机选号Start*/
		
	function getArray(num,minNum,maxNum){
		var arr = [],curNum;
		do{
			curNum = Math.floor(Math.random()*maxNum) + minNum;	
			if(!searchArr(arr,curNum)){
				arr.push(curNum);	
			}
		}while(arr.length<num)
		return arr;
	}
	function searchArr(_arr,num){
		for(var i=0;i<_arr.length;i++){
			if(_arr[i] == num){
				return true;	
			}	
		}
		return false;
	}
	
	
	/*随机选号End*/
	function getDataClass(){
		var ifr = document.getElementById('ifr');
		//setTimeout(function(){ifr.contentWindow.postMessage('I was there!', targetOrigin);},0);
		
	}
	
	function getData(data,callBack) {
		data = util.stringify(data);
			console.log(data);
			if(document.getElementById("dataProxy")){
				var jsct = document.getElementById("dataProxy");
				jsct.parentNode.removeChild(jsct);
			}
			var sct = document.createElement("script");
			sct.setAttribute("id","dataProxy");
			sct.src = 'http://192.168.0.118:8080/lotserver/SendRequestServlet?parameter='+data+'&callBackMethod='+callBack+'';
			document.getElementsByTagName("body")[0].appendChild(sct);
	}
	
	
	
	//将Root挂在 window.cnPoynt下
	var Root = {
		dialog:dialog,
		getData:getData,
		getArray:getArray,
		getData:getData
	}
	
	window.Root = Root;
})()	