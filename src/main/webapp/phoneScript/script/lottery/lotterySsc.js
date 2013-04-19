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
	var pageindex = 1;
	var lotno = "T01007",callBack = "";
	
	
	function init(){
		getLottery();
		
	}
	
	function showSsq(data){
		var _data = data.result;
		$("lotTitle").innerHTML = "双色球-开奖";
		getSsqDetal(_data[0].batchCode);
		for(var i=0;i<_data.length;i++){
			var html = "";
			var li = document.createElement("li");
			var winCode = _data[i].winCode;
			html += "<div class=\"lotListDate\">"
+ "                                            第" + _data[i].batchCode +"期&nbsp;&nbsp;开奖日期："+ _data[i].openTime +""
+ "                                        </div>"
+ "                                        <div class=\"lotteryBall\"><span>"+winCode+"</span>"
+ "                                        </div>";
			li.innerHTML = html;
			li.setAttribute("batchCode",_data[i].batchCode);
			li.addEventListener("click",setSsqDetail,false);
			$("lotList").appendChild(li);
		}
		$("moreLot").addEventListener("click",getMoreLot,false);
		
	}
	window.showSsq = showSsq;
	
	//for Event Handler
	
	function setSsqDetail(){
		var al = $("lotList").getElementsByTagName("li");
		for(var i=0;i<al.length;i++){
			al[i].className = "";
		}
		this.className = "active";
		var batchCode = this.getAttribute("batchCode");
		getSsqDetal(batchCode);
	}
	
	//event Handler End
	function getSsqDetal(batchCode){
		var json = {
			"command":"AllQuery",
			"type":"winInfoDetail",
			"lotno":lotno,
			"batchcode":batchCode
		}
		console.log(json);
		_root.getData(json,"showSsqDetal");
	}
	function showSsqDetal(res){
		var _data = res;
		var winCode = _data.winNo;
		console.log(_data);
		
		var html= "<div class=\"logDetailed\">"
+ "                                    <div class=\"detTitle\">"
+ "                                        开奖详情"
+ "                                    </div>"
+ "                                    <div class=\"detCont\">"
+ "                                        <div class=\"detTop\">"
+ "                                            <h2>第" + _data.batchCode + "期</h2>"
+ "                                            <p>开奖日期："+_data.openTime+"</p>"
+ "                                            <div class=\"lotBall\"><span>"+winCode+"</span>"
+ "                                            </div>"
+ "                                        </div>"
+ "                                        "
+ "                                    </div>"
+ "                                </div>"

		$("lotInfo").innerHTML = html;
	}
	window.showSsqDetal = showSsqDetal;
	//
	function getArr(str){
		var _arr = [];
		for(var i=0;i<str.length/2;i++){
			_arr.push(str.slice(i * 2, (i + 1) * 2));	
		}
		return _arr;
	}
	
	
	function getMoreLot(){
		pageindex ++;
		getLottery();
		$("moreLot").removeEventListener("click",getMoreLot,false);
	}
	function getLottery(){
		
		var json = {
			"command":"QueryLot",
			"type":"winInfoList",
			"pageindex":pageindex,
			"maxresult":7,
			"lotno":lotno
		}
		_root.getData(json,"showSsq");
	}
	
	function showLottery(res){
		var _data = res;
		showSsq(_data.result);
		console.log(_data);
	}
	function $(name){
		return document.getElementById(name) || new Object;	
	}
	window.showLottery = showLottery;
	init();
})()