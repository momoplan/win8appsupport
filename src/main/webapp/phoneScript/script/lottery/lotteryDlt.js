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
	var lotno = "T01001",callBack = "";
	
	
	function init(){
		getLottery();
		
	}
	
	function showSsq(data){
		var _data = data.result;
		$("lotTitle").innerHTML = "大乐透-开奖";
		getSsqDetal(_data[0].batchCode);
		for(var i=0;i<_data.length;i++){
			var html = "";
			var li = document.createElement("li");
			var winCode = _data[i].winCode;
			var _red = (winCode.split("+"))[0].split(" ");
			var blue = (winCode.split("+"))[1].split(" ");
			html += "<div class=\"lotListDate\">"
+ "                                            第" + _data[i].batchCode +"期&nbsp;&nbsp;开奖日期："+ _data[i].openTime +""
+ "                                        </div>"
+ "                                        <div class=\"lotteryBall\">";
			for(var j=0;j<_red.length;j++){
				html += "<p>" + _red[j] + "</p>";	
			}
			for(var k=0;k<blue.length;k++){
				html+="<p class=\"blue\">"+blue[k]+"</p>";
			}
			html+= "</div>";
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
		var _red = (winCode.split("+"))[0].split(" ");
		var blue = (winCode.split("+"))[1].split(" ");
		
		var html= "<div class=\"logDetailed\">"
+ "                                    <div class=\"detTitle\">"
+ "                                        开奖详情"
+ "                                    </div>"
+ "                                    <div class=\"detCont\">"
+ "                                        <div class=\"detTop\">"
+ "                                            <h2>第" + _data.batchCode + "期</h2>"
+ "                                            <p>开奖日期："+_data.openTime+"</p>"
+ "                                            <div class=\"lotBall\">";
		for(var j=0;j<_red.length;j++){
			html += "<p>" + _red[j] + "</p>";	
		}
		for(var k=0;k<blue.length;k++){
				html+="<p class=\"blue\">"+blue[k]+"</p>";
		}
		html+= "</div>"
+ "                                        </div>"
+ "                                        <div class=\"lotBtm\">"
+ "                                            <p>本期销量："+ _data.sellTotalAmount +"元</p>"
+ "                                            <p>奖池滚存："+_data.prizePoolTotalAmount+"元</p>"
+ "                                        </div>"
+ "                                        "
+ "                                    </div>"
+ "                                </div>"
+ "                                <div class=\"lotDetail\">"
+ "                                    <div class=\"detailTit\">开奖详细</div>"
+ "                                    <table cellpadding=\"0\" cellspacing=\"0\">"
+ "                                        <tr class=\"title\">"
+ "                                            <td>奖项</td>"
+ "                                            <td>中奖注数（注）</td>"
+ "                                            <td>单注金额（元）</td>"
+ "                                        </tr>"
+ "                                        <tr>"
+ "                                            <td>一等奖</td>"
+ "                                            <td>"+_data.onePrizeNum+"</td>"
+ "                                            <td>"+_data.onePrizeAmt+"</td>"
+ "                                        </tr>"
+ "                                        <tr>"
+ "                                            <td>二等奖</td>"
+ "                                            <td>"+_data.twoPrizeNum+"</td>"
+ "                                            <td>"+_data.twoPrizeAmt+"</td>"
+ "                                        </tr>"
+ "                                        <tr>"
+ "                                            <td>三等奖</td>"
+ "                                            <td>"+_data.threePrizeNum+"</td>"
+ "                                            <td>"+_data.threePrizeAmt+"</td>"
+ "                                        </tr>"
+ "                                        <tr>"
+ "                                            <td>四等奖</td>"
+ "                                            <td>"+_data.fourPrizeNum+"</td>"
+ "                                            <td>"+_data.fourPrizeAmt+"</td>"
+ "                                        </tr>"
+ "                                        <tr>"
+ "                                            <td>五等奖</td>"
+ "                                            <td>"+_data.fivePrizeNum+"</td>"
+ "                                            <td>"+_data.fivePrizeAmt+"</td>"
+ "                                        </tr>"
+ "                                        <tr>"
+ "                                            <td>六等奖</td>"
+ "                                            <td>"+_data.sixPrizeNum+"</td>"
+ "                                            <td>"+_data.sixPrizeAmt+"</td>"
+ "                                        </tr>"
+ "                                        <tr>"
+ "                                            <td>七等奖</td>"
+ "                                            <td>"+_data.sevenPrizeNum+"</td>"
+ "                                            <td>"+_data.sevenPrizeAmt+"</td>"
+ "                                        </tr>"
+ "                                        <tr>"
+ "                                            <td>八等奖</td>"
+ "                                            <td>"+_data.eightPrizeNum+"</td>"
+ "                                            <td>"+_data.eightPrizeAmt+"</td>"
+ "                                        </tr>"
+ "                                        <tr>"
+ "                                            <td>12选2</td>"
+ "                                            <td>"+_data.twelveSelect2PrizeNum+"</td>"
+ "                                            <td>"+_data.twelveSelect2PrizeAmt+"</td>"
+ "                                        </tr>"
+ "                                    </table>"
+ "                                </div>";

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