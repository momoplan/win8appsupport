// JavaScript Document
(function(){
	/*
	 **
	 * 开奖公告
	 **
	*/
	var _root = window.Root;
	var util = window.util;
	
	var _date = new Date();
	var _day = _date.getDay();
	
	var lot = "";
	
	function init(){
		getLottery();
	}
	
	function setSsq(data){
		var _data = data;
		var li = document.createElement("li");
		var winCode = _data.winCode;
		var red = winCode.slice(0,winCode.length-2);
		var blue = winCode.slice(-2);
		var _red = getArr(red);
		
		
		
		var html= "<div class=\"lottLeft\"> "
+ "                                        <img src=\"../../images/icon/cirSsq.png\" />"
+ "                                        双色球"
+ "                                    </div>"
+ "                                    <div class=\"lottMidd\">"
+ "                                        <div class=\"lotteryText\">第" + _data.batchCode +"期&nbsp;&nbsp;开奖日期："+ _data.openTime +"</div>"
+ "                                        <div class=\"lotteryBall\">";
		for(var i=0;i<_red.length;i++){
			html+="<p>" + _red[i] + "</p>";
		}
		html+="<p class=\"blue\">" + blue + "</p>";
		html+= "</div>"
+ "                                    </div>"
+ "                                    <div class=\"lottRight\">"
+ "                                        <div class=\"lotteryText\">每周二、四、六开奖</div>";
		if(_day == 2 || _day == 4 || _day == 6){
			html +=	"<div class=\"lotteryBall\"><img src=\"../../images/icon/lottery.png\" /></div>"
		}
		html+= "                                    </div>";
		
		li.className = "ssq";
		li.innerHTML = html;
		$("lotteryList").appendChild(li);
		li.addEventListener("click",toSsqList,false);
	}
	function setDlt(data){
		var _data = data;
		var winCode = _data.winCode;
		var _red = (winCode.split("+"))[0].split(" ");
		var blue = (winCode.split("+"))[1].split(" ");
		
				var html= "<div class=\"lottLeft\"> "
+ "                                        <img src=\"../../images/icon/cirDlt.png\" />"
+ "                                        大乐透"
+ "                                    </div>"
+ "                                    <div class=\"lottMidd\">"
+ "                                        <div class=\"lotteryText\">第" + _data.batchCode +"期&nbsp;&nbsp;开奖日期："+ _data.openTime +"</div>"
+ "                                        <div class=\"lotteryBall\">";
		for(var i=0;i<_red.length;i++){
			html+="<p>" + _red[i] + "</p>";
		}
		for(var j=0;j<blue.length;j++){
			html+="<p class=\"blue\">" + blue[j] + "</p>";
		}
		
		html+= "</div>"
+ "                                    </div>"
+ "                                    <div class=\"lottRight\">"
+ "                                        <div class=\"lotteryText\">每周一、三、六开奖</div>";
		html+= "                                    </div>";
		if(_day == 1 || _day == 3 || _day == 6){
			html +=	"<div class=\"lotteryBall\"><img src=\"../../images/icon/lottery.png\" /></div>"
		}
		var li = document.createElement("li");
		li.className = "dlt";
		li.innerHTML = html;
		$("lotteryList").appendChild(li);
		li.addEventListener("click",toSsqList,false);
	}
	function setDdd(data){
		var _data = data;
		var winCode = _data.winCode;
		var _red = getArr(winCode);
		
				var html= "<div class=\"lottLeft\"> "
+ "                                        <img src=\"../../images/icon/cirDdd.png\" />"
+ "                                        福彩3D"
+ "                                    </div>"
+ "                                    <div class=\"lottMidd\">"
+ "                                        <div class=\"lotteryText\">第" + _data.batchCode +"期&nbsp;&nbsp;开奖日期："+ _data.openTime +"</div>"
+ "                                        <div class=\"lotteryBall\">";
		for(var i=0;i<_red.length;i++){
			html+="<p>" + _red[i] + "</p>";
		}
		
		html+= "</div>"
+ "                                    </div>"
+ "                                    <div class=\"lottRight\">"
+ "                                        <div class=\"lotteryText\">每天开奖</div>";
		html+= "                                    </div>";
		if(_day == 1 || _day == 3 || _day == 6){
			html +=	"<div class=\"lotteryBall\"><img src=\"../../images/icon/lottery.png\" /></div>"
		}
		var li = document.createElement("li");
		li.className = "ddd";
		li.innerHTML = html;
		$("lotteryList").appendChild(li);
		li.addEventListener("click",toSsqList,false);
	}
	function setSsc(data){
		var _data = data;
		var winCode = _data.winCode;
		var _red = winCode.slice();
		
				var html= "<div class=\"lottLeft\"> "
+ "                                        <img src=\"../../images/icon/cirSsc.png\" />"
+ "                                        时时彩"
+ "                                    </div>"
+ "                                    <div class=\"lottMidd\">"
+ "                                        <div class=\"lotteryText\">第" + _data.batchCode +"期&nbsp;&nbsp;开奖日期："+ _data.openTime +"</div>"
+ "                                        <div class=\"lotteryBall\">";
		for(var i=0;i<_red.length;i++){
			html+="<p>" + _red[i] + "</p>";
		}
		
		html+= "</div>"
+ "                                    </div>"
+ "                                    <div class=\"lottRight\">"
+ "                                        <div class=\"lotteryText\">每天10/5分钟</div>";
		html+= "                                    </div>";
		if(_day == 1 || _day == 3 || _day == 6){
			html +=	"<div class=\"lotteryBall\"><img src=\"../../images/icon/lottery.png\" /></div>"
		}
		var li = document.createElement("li");
		li.className = "ssc";
		li.innerHTML = html;
		$("lotteryList").appendChild(li);
		li.addEventListener("click",toSsqList,false);
	}
	
	function toSsqList(evt){
		window.location = "lottery"+this.className+".html";
	}
	
	function getArr(str){
		var _arr = [];
		for(var i=0;i<str.length/2;i++){
			_arr.push(str.slice(i * 2, (i + 1) * 2));	
		}
		return _arr;
	}
	
	function getLottery(){
		var json = {
			"command":"QueryLot",
			"type":"winInfo"
		}
		_root.getData(json,"showLottery");
	}
	
	function showLottery(res){
		var _data = res;
		setSsq(_data.ssq);
		setDlt(_data.dlt);
		setDdd(_data.ddd);
		setSsc(_data.ssc);
		console.log(_data);
	}
	function $(name){
		return document.getElementById(name) || new Object;	
	}
	window.showLottery = showLottery;
	init();
})()