// JavaScript Document
(function(){
	/*
	 **
	 * 双色球业务逻辑模块
	 **
	*/
	var red = [],
	blue = [],
	allRed = [],
	allBlue = [],
	dm = [],
	tm = [],
	pickNum=0,//当前注数
	betNum = 0,//号码栏个数
	randRed=6,//随机选号红色
	randBlue = 1,
	dblue = [],//胆拖蓝色球
	isDt = false,
	ismore = false,
	util = window.util,
	_root = window.Root,
	pickm = new pickAlgorithm();
	
	
	function init(){
		getBatchcode();
		$("red").addEventListener("click",addRed,false);
		$("blue").addEventListener("click",addRed,false);
		$("jrandomRed").addEventListener("click",setredNum,false);
		//$("setDt").addEventListener("click",setDt,false);
		//$("setSim").addEventListener("click",setSim,false);
	}

	
	
	//event handler
	function addRed(evt){
		var $target = evt.target;
		if($target.parentNode.id == "red"){
			if($target.className == "ball"){
				$target.className = "ball ballRed";
				red.push($target.innerHTML);
				red.sort();
			}else{
				$target.className = "ball";
				delBalls(red,$target.innerHTML);
			}
			setNum();
			return;
		}
		if($target.parentNode.id == "blue"){
			if($target.className == "ball"){
				$target.className = "ball ballBlue";
				blue.push($target.innerHTML);
				blue.sort();
			}else{
				$target.className = "ball";
				delBalls(blue,$target.innerHTML);
			}
			setNum();
			return;
		}
		
	}
	function setredNum(evt){
		var $target = evt.target;
		if($target.parentNode.className == "numBox"){
			randRed = $target.innerHTML;
		}
		if($target.className == "numBox"){
			var a = $target.getElementsByTagName("a");
			randRed = a[0].innerHtML;
		}
		var arr = _root.getArray(randRed,0,32),
		_reds = $("red").getElementsByTagName("div"),
		j=arr.length;
		arr.sort(sortNumber);
		resetRed();
		console.log(arr);
		for(var i=0;i<j;i++){
			_reds[arr[i]].className = "ball ballRed";
		}
		red = arr;
	}
	
	//
	function resetRed(){
		var _reds = $("red").getElementsByTagName("div");
		for(var i=0;i<_reds.length;i++){
			_reds[i].className = "ball";
		}
		red = [];
	}
	function setNum(){
		if(!isDt){
			var r = red.length,
			b = blue.length;
			pickNum = pickm.ssqGetLottery(r,b);
			$("setNum").innerHTML = "已选：共"+pickNum+"注，"+pickNum*2+"元";
		}
	}
	//for jsonp code
	function getBatchcode(){
		var json = {
			"command":"QueryLot",
			"type":"highFrequency",
			"lotno":"F47104"
		}
		_root.getData(json,"setBatchcode");
	}
	function setBatchcode(result){
		
	}	
	function betResult(result){
		
	}
	
	
	window.betResult = betResult;
	window.setBatchcode = setBatchcode;
	function $(id){
		return document.getElementById(id) || new Object;
	}
	function delBalls(arr,num){
		for (var i=0;i<arr.length;i++){
			if(arr[i] == num){
				arr.splice(i,1);
			}	
		}
	}
	function sortNumber(a,b){
		return a-b;	
	}
	function hasOwnClass(el,classs){
		var _class = el.className.split(" ");
		for(var i=0;i<_class.length;i++){
			if(_class[i] == classs){
				return true;
			}
		}
		return false;
	}
	init();
})()