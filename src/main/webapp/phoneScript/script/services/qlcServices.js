(function(){
	/*
	 **
	 * 七乐彩业务逻辑模块
	 **
	*/
	
	//betNumber 当前所选注数 tarRandRed随机选号标志，用来添加到号码栏删除索引,allPayRed红色区域列表,allBetNum,所有选号注数
	//chaseNum追号期数
	var redBalls = [],allPayRed=[],tarRandRed;
	var betNumber=0,allBetNum=0,chaseNum=1,prizeend=0;
	var isDtBet=false,isChase = false,isStartcase=false,isHandsel=false;;
	var pickm = new pickAlgorithm();
	var _root = window.Root;


	function init(){
		getBatchcode();
		redBall = $("redBall");
		redBall.addEventListener("click",getRed,false);
		
		var addList = $("addToList");
		addList.addEventListener("click",addToList,false);
		
		var randNum = $("randNum");
		randNum.addEventListener("click",showRedRandom,false);
		$("redRandom").addEventListener("click",randomRed,false);
		
		
		$("bet_zx").addEventListener("click",chose_zx,false);
		$("bet_dt").addEventListener("click",chose_dt,false);
		//$("betTit").addEventListener("click",choseBetSty,false);
		
		
		$("chose_dm").addEventListener("click",chose_dm,false);
		$("chose_tm").addEventListener("click",chose_tm,false);
		$("showChase").addEventListener("click",showChase,false);
		$("payBtn").addEventListener("click",payList,false);
		$("restChose").addEventListener("click",resetBall,false);
		$("multBox").addEventListener("click",multFocus,false);
		$("lotmulti").addEventListener("change",reNumberPay,false);
		$("startcase").addEventListener("click",startcase,false);
	}
	
	function getRed(evt){
		var $target = evt.target;
		if($target.tagName.toLowerCase() == "a"){
			//$target.className = ($target.className == "")?"":"chedcked";
			if($target.className == "unable"){return};
			
			if($target.className == ""){
				redBalls.push($target.innerHTML);
				redBalls.sort();
				$target.className = "checked";
				if(redBalls.length>=15){
					var allA = this.getElementsByTagName("a");
					for(var i=0;i<allA.length;i++){
						if(allA[i].className == "" ){
							allA[i].className = "unable";
						}
					}
				}
			}else{
				$target.className = "";
				delBalls(redBalls,$target.innerHTML);
				if(redBalls.length == 14){
					var allA = this.getElementsByTagName("a");
					for(var i=0;i<allA.length;i++){
						if(allA[i].className == "unable" ){
							allA[i].className = "";
						}
					}
				}
			}
			setBetInfo();
		}
	}
	
	function addToList(){
		if(isDtBet){
		}else{
			if(redBalls.length<7){
				$("bettingInfo").innerHTML = "请选择7-15个号码！";
				return;
			}
			var html= "<div class=\"numLeft\">"
				+ "<div>"
				+ "<span class=\"redNums\">"+ redBalls +"</span>"
				+ "</div>"
				+ "<div>" + betNumber + "注，" + betNumber*2 +"元</div>"
				+ "</div>"
				+ "<div class=\"numRight\">"
				+ "<img sva=" + betNumber + " class=\"removeList\" src=\"../images/icon/close.png\" />"
				+ "</div>"
				+ "<div class=\"clear\"></div>";
				allPayRed.push(redBalls);
		}
		
		var li = document.createElement("li");
		li.innerHTML = html;
		li.addEventListener("click",removeList,false);
		betList.appendChild(li);
		allBetNum += betNumber;

		resetBall();
		$("payNum").innerHTML = "共" + allBetNum +"注，" + allBetNum*2 +"元";

	}

	function removeList(evt){
		var $target = evt.target;
		if($target.tagName.toLowerCase() == "img"){
			allBetNum -= $target.getAttribute("sva");
			var allLis = betList.getElementsByTagName("li");
			for(var i=0;i<allLis.length;i++){
				if(allLis[i] == $target.parentNode.parentNode){
					allPayRed.splice(i,1);
				}
			}
			betList.removeChild($target.parentNode.parentNode);
			$("payNum").innerHTML = "共" + allBetNum +"注，" + allBetNum*2 +"元";
		}
	}
	function delBalls(arr,num){
		for (var i=0;i<arr.length;i++){
			if(arr[i] == num){
				arr.splice(i,1);
			}	
		}
	}
	//更新当前注数方法
	function setBetInfo(){
		if(!isDtBet){
			var r = redBalls.length;
			betNumber = pickm.qlcGetLottery(r);
			$("bettingInfo").innerHTML = "您当前选中了" + betNumber + "注，共" + betNumber*2 + "元";
		}
	}
	
	function resetBall(){
		resetRedBall();
		if(tarRandRed){tarRandRed.className = ""}
		redBalls = [];
		setBetInfo();
	}
	function resetRedBall(){
		var redbolus = redBall.getElementsByTagName("a");
		for(var m=0;m<redbolus.length;m++){
			redbolus[m].className = "";
		}
	}
	function showRedRandom(evt){
		$("redRandom").style.display = ($("redRandom").style.display == "block")?"none":"block";
	}
	function randomRed(evt){
		var $target = evt.target;
		
		if($target.tagName.toLowerCase() == "p"){
			if(tarRandRed){tarRandRed.className = ""}
			tarRandRed = $target;
			var redbolus = redBall.getElementsByTagName("a");
			for(var m=0;m<redbolus.length;m++){
				redbolus[m].className = "";
			}
			
			var _num = Number($target.innerHTML);
			var _arr = _root.getArray(_num,1,30);
			redBalls = _arr.sort(sortNumber);
			$("randNum").innerHTML = _num + "个";
			
			$target.className = "randomCheck";
			
			for(var i=0;i<_arr.length;i++){
				var k = _arr[i]-1;
				redbolus[k].className = "checked";	
			}
		}
		$("redRandom").style.display = "none";	
		setBetInfo();
	}
	function choseBetSty(){
	}
	function chose_zx(evt){
	}
	function chose_dt(){
	}
	function chose_dm(){
	}
	function chose_tm(){
	}
	function setUable(){
	}
	function showChase(){
		if(isStartcase || isHandsel){return;}
		var l = (chaseNum ==1)?5:chaseNum;
		
		
		var html= "    <div class=\"dialogDetail\">"
+ "        <div class=\"logTit\">"
+ "            <div class=\"titLeft\">"
+ "                <a onClick=\"closeDialog()\" class=\"diaBtn\" href=\"#\">关闭</a>    "
+ "            </div>"
+ "            <div class=\"titRight\">"
+ "                <a id=\"saveCh\" class=\"diaBtn\" href=\"javascript:;\">保存</a>    "
+ "            </div>"
+ "            <div class=\"titMidd\">设置追期</div>"
+ "        </div>"
+ "        <div class=\"logCont\">"
+ "            <div class=\"chaseBox\">"
+ "                <div class=\"chaseTop\">"
+ "                    <div class=\"chaseTopLeft\">"
+ "                        <p class=\"fl\">追期数：</p>"
+ "                        <div class=\"chaseCtrl\">"
+ "                            <img id=\"chaseDel\" src=\"../images/btn/chaseDel.png\" />"
+ "                            <div class=\"chaseInput\">"
+ "                                <input id=\"chaseNumber\" value=\"5\" type=\"text\" />"
+ "                            </div>"
+ "                            <img id=\"chaseAdd\" src=\"../images/btn/chaseAdd.png\" />"
+ "                        </div>"
+ "                    </div>"
+ "                    <div class=\"chaseTopRight\">    "
+ "                        <p class=\"fl\">中奖后停止追期:</p>"
+ "                        <div class=\"closeBtn\">"
+ "                            <span id=\"isChaseStop\" class=\"onoff\"><label><i></i></label></span>"
+ "                        </div>"
+ "                    </div>"
+ "                </div>"
+ "                <div class=\"chaseMidd\">    "
+ "                    <ul id=\"chaseMidd\">"
+ "                    </ul>"
+ "                </div>"
+ "                <div class=\"clear\"></div>"
+ "                <div class=\"chaseBtm\">"
+ "                    <a id=\"newPpayBtn\" class=\"addToList\" href=\"javascript:\"><p>立即购买</p></a>"
+"				   </div>"
+ "                <div class=\"clear h18\"></div>"
+ "            </div>"
+ "            "
+ "        </div>"
+ "    </div>"
		
		var diaJson = {
			width:850,
			height:450,
			isMask:true
		}
		_root.dialog(html,diaJson);
		if(chaseNum>1){
			chaseList(chaseNum);
			$("chaseNumber").value = l;
		}else{
			chaseList(5);
		}
		$("newPpayBtn").addEventListener("click",payList,false);
		$("chaseNumber").addEventListener("blur",checkMenu,false);
		$("isChaseStop").addEventListener("click",switchCtrl,false);
		$("chaseDel").addEventListener("click",delChaseList,false);
		$("chaseAdd").addEventListener("click",addChaseList,false);
		$("saveCh").addEventListener("click",saveChase,false);
	}
	function startcase(){
	}
	
	
	function checkMenu(){
		var n = this.value;
		var re = /^[1-9]\d*$/;
		if(n==0 || !re.test(n)){
			this.value = 1;
			chaseList(1);
			return;
		}
		chaseList(n);
	}
	function setNumPay(){
	}
	function setAllPay(){
	}
	function delChaseList(){
		var _list = $("chaseMidd").getElementsByTagName("li");
		var t = _list.length -1;
		if(t<1){return;}
		$("chaseMidd").removeChild(_list[t]);
		$("chaseNumber").value -=1;
	}
	function addChaseList(){
		var t = Number($("chaseNumber").value);
		var xhtml = "                        <li>"
+ "                            <p class=\"chaseNum fl\">"
+ "                                "+(Number(batchcode) + t) +"期"
+ "                            </p>"
+ "                            <p class=\"chasePrice\">"
+ "                                    <span>"+ allBetNum*2 +"</span>元"
+ "                            </p>"
+ "                        </li>";
		$("chaseMidd").innerHTML += xhtml;
		$("chaseNumber").value = t + 1;	
	}
	function chaseList(n){
		var xhtml = "";
		for(var i=0;i<n;i++){
			xhtml += "                        <li>"
+ "                            <p class=\"chaseNum fl\">"
+ "                                "+(Number(batchcode) + i) +"期"
+ "                            </p>"
+ "                            <p class=\"chasePrice\">"
+ "                                    <span>"+ allBetNum*2 +"</span>元"
+ "                            </p>"
+ "                        </li>";

		}
		$("chaseMidd").innerHTML = xhtml;
	}
	function saveChase(){
		chaseNum = Number($("chaseNumber").value);
		closeDialog();
		$("curChase").innerHTML = chaseNum;
		isChase = (chaseNum != 1)?true:false;
		$("payNum").innerHTML = "共" + allBetNum +"注，" + allBetNum*chaseNum*2 +"元";
		
	}
	function saveCase(){
	}
	function switchCtrl(){
		if(this.className == "onoff"){
			this.className = "onoff onoff-on";
			prizeend = 1;
		}else{
			prizeend = 0;
			this.className = "onoff";
		}
	}
	function reNumberPay(){
		var pm = Number($("lotmulti").value);
		var re = /^[1-9]\d*$/;
		if(pm ==0 || !re.test(pm)){
			pm = 1;
			this.value = 1;
		}else if(pm>200){
			this.value = 200;
		}
		$("payNum").innerHTML = "共" + allBetNum +"注，" + allBetNum*2*pm +"元";
	}
	
	
	
	
	function payList(){
		if(!sessionStorage.getItem("sessionid")){
			$("logBtn").click();
			return;
		}
		var lotmulti = Number($("lotmulti").value);
		var betCode = "";
		var amount = 0;
		
		for(var i=0;i<allPayRed.length;i++){
			var r = allPayRed[i].length;
			var v = pickm.qlcGetLottery(r);
			var m = (v*200);
			amount += m;
			var rc="";
			for(var l=0;l<r;l++){
				rc += allPayRed[i][l];	
			}
			if(r ==5 && b == 2){
				betCode += "!0001" + rc + "^_" + lotmulti + "_200_" + m;
			}else if(r > 5 || b > 2){
				betCode += "!1001*" + rc + "^_" + lotmulti + "_200_" + m;
			}
		}
		var bet_code = betCode.replace("!","");
		amount*=lotmulti;
		var json = {
				"command":"betLot",
				"bettype":"bet",
				"userno":sessionStorage.getItem("userno"),
				"bet_code":bet_code,
				"batchnum":chaseNum,
				"batchcode":"2013020",
				"lotno":"F47102",
				"lotmulti":lotmulti,
				"amount":amount,
				"prizeend":prizeend,
				"oneAmount":"200",
				"isSellWays":"1"
			};
			
		console.log(json);
		$("dialog").style.display = "none";
		_root.getData(json,"betResult");
	}
	function betResult(res){
		console.log(res);
	}
	window.betResult = betResult;
	
	
	function multFocus(){
		$("lotmulti").focus();
	}
	
	function getBatchcode(){
		var json = {
			"command":"QueryLot",
			"type":"highFrequency",
			"lotno":"F47102"
		}
		_root.getData(json,"setBatchcode");
	}
	function setBatchcode(result){
		batchcode = result.batchcode;
		$("batchCode").innerHTML = batchcode;
		$("endTime").innerHTML = result.endtime;
		var date = new Date();
		var d = date.getDay();
		if(d==3 || d==1 || d==6){
			$("isLottery").style.display = "block";
		}
	}
	window.setBatchcode = setBatchcode;
	
	
	function sortNumber(a,b){
		return a-b;	
	}
	function $(id){
		return document.getElementById(id) || new Object;
	}
	init();
})()