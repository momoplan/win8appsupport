(function(){
	
	var util = window.util,
	_root = window.Root;
	
	
	var init = function(){
		getLottery();
	}
	function getLottery(){
		var json = {
			"command":"QueryLot",
			"type":"winInfo"
		}
		_root.getData(json,"setLottery");
	}
	
	//data handler
	function setLottery(result){
		var _data = result;
		console.log(_data);
		if(!isEmpey(_data)){
			setSsqcode(_data.ssq);
			setDltcode(_data.dlt);
			setDddcode(_data.ddd);
			setSsccode(_data.ssc);
		}
	}
	
	window.setLottery = setLottery;
	//data handler end
	
	//build Ui
	function setSsqcode(ssq){
		var winCode = ssq.winCode,
		red = winCode.slice(0,winCode.length-2),
		blue = winCode.slice(-2),
		_red = getArr(red);
		_red = _red.reverse();
		var html= "<dl class=\"lotteryDl\">"
+ "                <dt>"
+ "                    <a href=\"#\"><img src=\"../images/icon/kjssq.png\" width=\"44\" height=\"44\"><p>双色球</p></a>"
+ "                </dt>"
+ "                <dd class=\"lotteryDdGon\"><img src=\"../images/image/kjgop .png\" width=\"14\" height=\"20\"></dd>"
+ "                <dd class=\"lotteryDd\"><span class=\"fLeft\">第"+ssq.batchCode+"期</span><span class=\"fRight\">开奖日期："+ssq.openTime+"</span></dd>"
+ "                <dd class=\"lotteryDd\">"
+ "                  <div class=\"lotteryBall lotteryBlue\">22</div>";
					for(var i=0;i<_red.length;i++){
						html += "<div class=\"lotteryBall lotteryRed\">"+_red[i]+"</div>";
					}
html+ "                </dd>"
+ "            </dl>";
		
		$("lottery").innerHTML += html;
	} 
	function setDltcode(dlt){
		var winCode = dlt.winCode,
		red = (winCode.split("+"))[0].split(" "),
		blue = (winCode.split("+"))[1].split(" ");
		red = red.reverse();
		blue = blue.reverse();
		var html= "<dl class=\"lotteryDl\">"
+ "                <dt>"
+ "                    <a href=\"#\">"
+ "                        <img src=\"../images/icon/kjDlt.png\"> "
+ "                        <p>大乐透</p>"
+ "                    </a>"
+ "                </dt>"
+ "                <dd class=\"lotteryDdGon\"><a href=\"#\"><img src=\"../images/image/kjgop .png\" width=\"14\" height=\"20\"></a></dd>"
+ "                <dd class=\"lotteryDd\"><span class=\"fLeft\">第"+dlt.batchCode+"期</span><span class=\"fRight\">开奖日期："+dlt.openTime+"</span></dd>"
+ "              <dd class=\"lotteryDd\">";
		for(var j=0;j<blue.length;j++){
			html += "<div class=\"lotteryBall lotteryBlue\">"+blue[j]+"</div>";
		}
		for(var k=0;k<red.length;k++){
			html += "<div class=\"lotteryBall lotteryRed\">"+red[k]+"</div>";
		}
html+= "              </dd>"
+ "            </dl>";
		$("lottery").innerHTML += html;
	}
	function setDddcode(ddd){
		code = getArr(ddd.winCode),
		trycode = getArr(ddd.tryCode);
		trycode.join(",");
		var html= "<dl class=\"lotteryDl\">"
+ "                <dt>"
+ "                    <a href=\"#\">"
+ "                        <img src=\"../images/icon/kjDdd.png\"> "
+ "                        <p>福彩3D</p>"
+ "                    </a>"
+ "                </dt>"
+ "                <dd class=\"lotteryDdGon\"><a href=\"#\"><img src=\"../images/image/kjgop .png\" width=\"14\" height=\"20\"></a></dd>"
+ "                <dd class=\"lotteryDd\"><span class=\"fLeft\">第"+ddd.batchCode+"期</span><span class=\"fRight\">开奖日期："+ddd.openTime+"</span></dd>"
+ "              <dd class=\"lotteryDd\">"
+ "                  <div class=\"flSpan\">试机号："+trycode+"</div>";
		for(var i=0;i<code.length;i++){
			html += "<div class=\"lotteryBall lotteryRed\">"+code[i]+"</div>";
		}
html+= "              </dd>"
+ "            </dl>"
		$("lottery").innerHTML += html;
	}
	function setSsccode(ssc){
		var winCode = ssc.winCode,
		bit = winCode.slice(-1),
		ten = winCode.slice(-2,-1),
		code = [];
		for(var i=0;i<winCode.length;i++){
			code.push(winCode.slice(i, (i + 1)));	
		}
		
		var a = (ten>4)?"大":"小", 
		b = ((ten%2) == 0)?"双":"单",
		c = (bit>4)?"大":"小", 
		d = ((bit%2) == 0)?"双":"单";
		var html= "<dl class=\"lotteryDl\">"
+ "                <dt>"
+ "                    <a href=\"#\">"
+ "                        <img src=\"../images/icon/kjssc.png\"> "
+ "                        <p>时时彩</p>"
+ "                    </a>"
+ "                </dt>"
+ "                <dd class=\"lotteryDdGon\"><a href=\"#\"><img src=\"../images/image/kjgop .png\" width=\"14\" height=\"20\"></a></dd>"
+ "                <dd class=\"lotteryDd\"><span class=\"fLeft\">第"+ssc.batchCode+"期</span><span class=\"fRight\">开奖日期："+ssc.openTime+"</span></dd>"
+ "              <dd class=\"lotteryDd\">"
+ "                  <a href=\"#\" class=\"fRight\">"
+ "                    <span class=\"single\">"+a+b+"</span>"
+ "                    <span class=\"double\">"+c+d+"</span>"
+ "                </a>";
		for(var k=0;k<code.length;k++){
			html += "<div class=\"lotteryBall lotteryRed\">"+code[k]+"</div>";
		}
html+= "              </dd>"
+ "            </dl>";
		
		$("lottery").innerHTML += html;
	}
	
	//build ui end
	
	
	function getArr(str){
		var _arr = [];
		for(var i=0;i<str.length/2;i++){
			_arr.push(str.slice(i * 2, (i + 1) * 2));	
		}
		return _arr;
	}
	function isEmpey(obj){
		for(var i in obj){
			return false;
		}
		return true;
	}
	function $ (name){
		return document.getElementById(name) || Object;
	}
	init();
})();
