// JavaScript Document
(function(){
	/*
	 **
	 * 双色球业务逻辑模块
	 **
	*/
	
	var allPayRed=[],allPayBlue=[],redBalls = [],blueBalls = [],red_dm=[],red_tm=[],allDmArr=[],allTmArr=[],allDtBlue=[],betMoney=[],redBall,blueBall,redList,blueList,betNumber,allBetNum=0,tarRandBlue,tarRandRed,prizeend=0;
	var betList = $("betList");
	var pickm = new pickAlgorithm();
	var _root = window.Root;
	var isDtBet = false,isDtDm = true;
	var batchcode,chaseNum=1,lotmulti=1;
	var isChase = false,isStartcase=false,isHandsel=false;//是否追期，合买，赠送
	var buyAmt=0,minAmt=0,safeAmte=0,commisionRation=0,isvisibility=0;//合买保底
	var toPhone="",toMessage="";
		

	
	function init(){
		getBatchcode();
		redBall = $("redBall");
		blueBall = $("blueBall");
		redBall.addEventListener("click",getRed,false);
		blueBall.addEventListener("click",getBlue,false);
		
		var addList = $("addToList");
		addList.addEventListener("click",addToList,false);
		
		var randNum = $("randNum");
		randNum.addEventListener("click",showRedRandom,false);
		$("randNumBlue").addEventListener("click",showBlueRandom,false);
		$("redRandom").addEventListener("click",randomRed,false);
		$("blueRandom").addEventListener("click",randomBlue,false);
		$("bet_zx").addEventListener("click",chose_zx,false);
		$("bet_dt").addEventListener("click",chose_dt,false);
		$("betTit").addEventListener("click",choseBetSty,false);
		$("chose_dm").addEventListener("click",chose_dm,false);
		$("chose_tm").addEventListener("click",chose_tm,false);
		$("showChase").addEventListener("click",showChase,false);
		$("payBtn").addEventListener("click",payList,false);
		$("restChose").addEventListener("click",resetBall,false);
		$("multBox").addEventListener("click",multFocus,false);
		$("lotmulti").addEventListener("change",reNumberPay,false);
		$("startcase").addEventListener("click",startcase,false);
		$("toGift").addEventListener("click",showGift,false);
	}
	
	function getRed(evt){
		var $target = evt.target;
		if($target.tagName.toLowerCase() == "a"){
			//$target.className = ($target.className == "")?"":"chedcked";
			if($target.className == "unable"){return};
			
			if($target.className == ""){
				
				if(!isDtBet){
					redBalls.push(Number($target.innerHTML));
					redBalls.sort(sortNumber);
				}else{
					if(isDtDm){
						if(red_dm.length>=5){
							$("bettingInfo").innerHTML = "最多选择5个胆码";
							return;	
						}
						red_dm.push(Number($target.innerHTML));
						red_dm.sort(sortNumber);
					}else{
						red_tm.push(Number($target.innerHTML));
						red_tm.sort(sortNumber);
					}
				}
				$target.className = "checked";
			}else{
				$target.className = "";
				if(!isDtBet){
					delBalls(redBalls,Number($target.innerHTML));
				}else{
					if(isDtDm){
						delBalls(red_dm,Number($target.innerHTML));
					}else{
						delBalls(red_tm,Number($target.innerHTML));
					}
				}
			}
			setBetInfo();
		}
	}
	function getBlue(evt){
		var $target = evt.target;
		if($target.tagName.toLowerCase() == "a"){
			if($target.className == ""){
				$target.className = "checked";
				blueBalls.push(Number($target.innerHTML));
				blueBalls.sort(sortNumber);
			}else{
				$target.className = "";
				delBalls(blueBalls,Number($target.innerHTML));
			}
			setBetInfo();
		}
	}
	
	function addToList(){
		if(isDtBet){
			if(betNumber<1){
				$("bettingInfo").innerHTML = "请选择足够的号码！";
				return;
			}
			var html= "<div class=\"numLeft\">"
				+ "<div>"
				+ "<span class=\"redNums\">"+ red_dm +"</span>"
				+ "<span class=\"redNums\">"+ red_tm +"</span>"
				+ "<span class=\"blueNums\">"+ blueBalls +"</span>"
				+ "</div>"
				+ "<div>" + betNumber + "注，" + betNumber*2 +"元</div>"
				+ "</div>"
				+ "<div class=\"numRight\">"
				+ "<img sva=" + betNumber + " class=\"removeList\" src=\"../images/icon/close.png\" />"
				+ "</div>"
				+ "<div class=\"clear\"></div>";
				allDmArr.push(red_dm);
				allTmArr.push(red_tm);
				allDtBlue.push(blueBalls);
		}else{
			if(redBalls.length<6){
				$("bettingInfo").innerHTML = "红球个数不足！";
				return;
			}else if(blueBalls.length<1){
				$("bettingInfo").innerHTML = "蓝球个数不足！";
				return;
				
			}
			var html= "<div class=\"numLeft\">"
				+ "<div>"
				+ "<span class=\"redNums\">"+ redBalls +"</span>"
				+ "<span class=\"blueNums\">"+ blueBalls +"</span>"
				+ "</div>"
				+ "<div>" + betNumber + "注，" + betNumber*2 +"元</div>"
				+ "</div>"
				+ "<div class=\"numRight\">"
				+ "<img sva=" + betNumber + " class=\"removeList\" src=\"../images/icon/close.png\" />"
				+ "</div>"
				+ "<div class=\"clear\"></div>";
				allPayRed.push(redBalls);
				allPayBlue.push(blueBalls);
		}
		var li = document.createElement("li");
		li.innerHTML = html;
		li.addEventListener("click",removeList,false);
		betList.appendChild(li);
		allBetNum += betNumber;

		resetBall();
		betMoney.push(allBetNum*2);
		setPayNum();
	}

	function removeList(evt){
		var $target = evt.target;
		
		if($target.tagName.toLowerCase() == "img"){
			allBetNum -= $target.getAttribute("sva");
			var allLis = betList.getElementsByTagName("li");
			for(var i=0;i<allLis.length;i++){
				if(allLis[i] == $target.parentNode.parentNode){
					allPayRed.splice(i,1);
					allPayBlue.splice(i,1);
					betMoney.splice(i,1);
					console.log(allPayRed);
				}
			}
			betList.removeChild($target.parentNode.parentNode);
			setPayNum();
		}
	}
	function delBalls(arr,num){
		for (var i=0;i<arr.length;i++){
			if(arr[i] == num){
				arr.splice(i,1);
			}	
		}
	}
	function setBetInfo(){
		if(!isDtBet){
			var r = redBalls.length,b = blueBalls.length;
			betNumber = pickm.ssqGetLottery(r,b);
			$("bettingInfo").innerHTML = "您当前选中了" + betNumber + "注，共" + betNumber*2 + "元";
		}else{
			var r = red_dm.length,g=red_tm.length,b = blueBalls.length;
			betNumber = pickm.ssqdtGetLottery(r,g,b);
			$("bettingInfo").innerHTML = "您当前选中了" + betNumber + "注，共" + betNumber*2 + "元";
		}
	}
	function resetBall(){
		resetRedBall();
		resetBlueBall();
		if(tarRandRed){tarRandRed.className = ""}
		if(tarRandBlue){tarRandBlue.className = ""}
		redBalls = [];
		blueBalls = [];
		red_dm=[];
		red_tm=[],
		setBetInfo();
	}
	function resetRedBall(){
		var redbolus = redBall.getElementsByTagName("a");
		for(var m=0;m<redbolus.length;m++){
			redbolus[m].className = "";
		}
		
	}
	function resetBlueBall(){
		var bluebolus = blueBall.getElementsByTagName("a");
		for(var n=0;n<bluebolus.length;n++){
			bluebolus[n].className = "";	
		}
	}
	function setPayNum(){
		$("payNum").innerHTML = "共" + allBetNum +"注，" + allBetNum*2*lotmulti*chaseNum +"元";
	}
	
	function showRedRandom(evt){
		$("redRandom").style.display = ($("redRandom").style.display == "block")?"none":"block";
	}
	function showBlueRandom(){
		$("blueRandom").style.display = ($("blueRandom").style.display == "block")?"none":"block";
	}
	function randomRed(evt){
		if(tarRandRed){tarRandRed.className = ""}
		
		var $target = evt.target;
		
		if($target.tagName.toLowerCase() == "p"){
			tarRandRed = $target;
			var redbolus = redBall.getElementsByTagName("a");
			for(var m=0;m<redbolus.length;m++){
				redbolus[m].className = "";
			}
			
			var _num = Number($target.innerHTML);
			var _arr = _root.getArray(_num,1,33);
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
	function randomBlue(evt){
		if(tarRandBlue){tarRandBlue.className = ""}
		var $target = evt.target;
		
		if($target.tagName.toLowerCase() == "p"){
			tarRandBlue = $target;
			var bluebolus = blueBall.getElementsByTagName("a");			
			for(var n=0;n<bluebolus.length;n++){
				bluebolus[n].className = "";	
			}
			
			var _num = Number($target.innerHTML);
			var _arr = _root.getArray(_num,1,16);
			blueBalls = _arr.sort(sortNumber);
			$("randNumBlue").innerHTML = _num + "个";
			
			$target.className = "randomCheck";
			
			for(var i=0;i<_arr.length;i++){
				var k = _arr[i]-1;
				bluebolus[k].className = "checked";	
			}
		}
			$("blueRandom").style.display = "none";	
		setBetInfo();
	}
	function choseBetSty(){
		$("choseBet").style.display = "block";	
	}
	function chose_zx(evt){
		isDtBet = false;
		resetBall();
		setBetInfo();
		$("bet_zx").className = "active";
		$("bet_dt").className = "";
		$("randRed").style.display = "block";
		$("randBlue").style.display = "block";
		$("show_Dm").style.display = "none";
		$("choseBet").style.display = "none";
		$("betitText").innerHTML = "至少选择6个红球";
		$("betTit").innerHTML = "双色球-直选";
	}
	function chose_dt(){
		isDtBet = true;
		resetBall();
		setBetInfo();
		$("bet_zx").className = "";
		$("bet_dt").className = "active";
		$("randRed").style.display = "none";
		$("randBlue").style.display = "none";
		$("show_Dm").style.display = "block";
		$("choseBet").style.display = "none";
		$("betitText").innerHTML = "至少选择1个胆码，最多选择5个";
		$("betTit").innerHTML = "双色球-胆拖";
	}
	function chose_dm(){
		$("chose_dm").className = "active";
		$("chose_tm").className = "";
		isDtDm = true;
		setUable();
		$("betitText").innerHTML = "至少选择1个胆码，最多选择5个";
	}
	function chose_tm(){
		isDtDm = false;
		$("chose_dm").className = "";
		$("chose_tm").className = "active";
		setUable();
		$("betitText").innerHTML = "至少选择2个拖码";
	}
	function setUable(){
		if(!isDtDm){
			
			var dmArr = redBall.getElementsByTagName("a");
			for(var i=0;i<red_dm.length;i++){
				var m = red_dm[i]-1;
				dmArr[m].className = "unable";
			}
			for(var j=0;j<red_tm.length;j++){
				var n = red_tm[j] - 1;
				dmArr[n].className = "checked";
			}	
		}else{
			var dmArr = redBall.getElementsByTagName("a");
			for(var i=0;i<red_dm.length;i++){
				var m = red_dm[i]-1;
				dmArr[m].className = "checked";
			}
			for(var j=0;j<red_tm.length;j++){
				var n = red_tm[j] - 1;
				dmArr[n].className = "unable";
			}
		}
	}
	function showChase(){
		if(isStartcase || isHandsel){return;}
		var l = (chaseNum ==1)?5:chaseNum;
		var html= "    <div class=\"dialogDetail\">"
+ "        <div class=\"logTit\">"
+ "            <div class=\"titLeft\">"
+ "                <a onClick=\"closeDialog()\" class=\"diaBtn\" href=\"javascript:\">关闭</a>    "
+ "            </div>"
+ "            <div class=\"titRight\">"
+ "                <a id=\"saveCase\" class=\"diaBtn\" href=\"javascript:\">保存</a>    "
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
			chaseList(chaseNum)
		}else{
			chaseList(5);
		}
		$("chaseNumber").addEventListener("blur",checkMenu,false);
		$("isChaseStop").addEventListener("click",switchCtrl,false);
		$("chaseDel").addEventListener("click",delChaseList,false);
		$("chaseAdd").addEventListener("click",addChaseList,false);
		$("saveCase").addEventListener("click",saveChase,false);
	}
	function startcase(){
		if(isChase || isHandsel){return;}
				var html= "    <div class=\"dialogDetail\">"
+ "        <div class=\"logTit\">"
+ "            <div class=\"titLeft\">"
+ "                <a onClick=\"closeDialog()\" class=\"diaBtn\" href=\"#\">关闭</a>    "
+ "            </div>"
+ "            <div class=\"titRight\">"
+ "                <a id=\"saveCase\" class=\"diaBtn\" href=\"javascript:;\">保存</a>    "
+ "            </div>"
+ "            <div class=\"titMidd\">发起合买</div>"
+ "        </div>"
+ "        <div class=\"logCont\">"
+ "            <div class=\"chaseBox\">"
+ "                <div class=\"chaseMidd caseBox\">    "
+ "                    <ul class=\"startcase\">"
+ "						   <li><p class=\"caseLeft\">我要认购</p><p class=\"caseMidd\"><input id=\"myPay\" type=\"input\" value=\"1\" /></p><p class=\"caseRight\" id=\"myOwn\"></p></li>"
+ "						   <li><p class=\"caseLeft\">最低跟单</p><p class=\"caseMidd\"><input id=\"minPay\" type=\"text\" value=\"1\" /></p></li>"
+ "						   <li><p class=\"caseLeft\">我要保底</p><p class=\"caseMidd\"><input id=\"allMyPay\" type=\"text\" value=\"1\" /></p><p class=\"caseRight\" id=\"myOwnPay\"></p></li>"
+ "						   <li><p class=\"caseLeft\">提成比例</p><p class=\"caseMidd\"><input id=\"commisionRation\" type=\"text\" value=\"10\" />%</p><p class=\"caseRight\">最高提成10%</p></li>"
+ "						   <li><p class=\"caseLeft\">是否可见</p><p class=\"caseMidd\"><span id=\"caseVisibility\" class=\"onoff\"><label><i></i></label></span></p></li>"
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
+ "    </div>";
		
		var diaJson = {
			width:850,
			height:335,
			isMask:true
		}
		_root.dialog(html,diaJson);
		$("myPay").addEventListener("change",setNumPay,false);
		$("allMyPay").addEventListener("change",setAllPay,false);
		$("minPay").addEventListener("change",minAmtClass,false);
		$("commisionRation").addEventListener("change",minAmtCom,false);
		$("saveCase").addEventListener("click",saveCase,false);
		$("caseVisibility").addEventListener("click",switchCtrl,false);
	}
	function showGift(){
		if(isChase || isStartcase){return;}
				var html= "    <div class=\"dialogDetail\">"
+ "        <div class=\"logTit\">"
+ "            <div class=\"titLeft\">"
+ "                <a onClick=\"closeDialog()\" class=\"diaBtn\" href=\"#\">关闭</a>    "
+ "            </div>"
+ "            <div class=\"titRight\">"
+ "                <a id=\"saveCase\" class=\"diaBtn\" href=\"javascript:;\">保存</a>    "
+ "            </div>"
+ "            <div class=\"titMidd\">发起合买</div>"
+ "        </div>"
+ "        <div class=\"logCont\">"
+ "            <div class=\"chaseBox\">"
+ "                <div class=\"chaseMidd gift caseBox\">    "
+ "                    <ul class=\"startcase\">"
+ "						   <li><p class=\"caseLeft\">手机号码</p><p class=\"caseMidd\"><input id=\"toPhone\" type=\"input\" value=\"1\" /></p><p class=\"caseRight\" id=\"myOwn\"></p></li>"
+ "						   <li><p class=\"caseLeft\">赠送寄语</p><p class=\"caseMidd\"><textarea id=\"toMessage\"></textarea></p></li>"
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
+ "    </div>";
		var diaJson = {
			width:850,
			height:335,
			isMask:true
		}
		_root.dialog(html,diaJson);
		$("saveCase").addEventListener("click",saveGift,false);
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
		//_root.getData(json,"callBack");
	}
	function minAmtClass(){
		var n = this.value;
		var re = /^[1-9]\d*$/;
		if(n==0 || !re.test(n)){
			this.value = 1;
		}
	}
	function minAmtCom(){
		var n = this.value;
		var re = /^[1-9]\d*$/;
		if(n==0 || !re.test(n)){
			this.value = 1;
		}
		if(n>10){
			this.value = 10;	
		}
	}
	function setNumPay(){
		var n = this.value;
		var re = /^[1-9]\d*$/;
		if(n==0 || !re.test(n)){
			this.value = 1;
		}
		if(allBetNum ==0){return}
		var pm = Number($("lotmulti").value);
		var mp = Number($("myPay").value);
		var t = (mp*100)/(pm*allBetNum*2);
		
		t = t.toFixed(1);
		$("myOwn").innerHTML = "占总额的" + t + "%";
	}
	function setAllPay(){		
		var pm = Number($("lotmulti").value);
		var mp = Number($("allMyPay").value);
		var re = /^[1-9]\d*$/;
		if(mp==0 || !re.test(mp)){
			this.value = 1;
			mp = 1;
		}
		if(allBetNum ==0){return}
		var t = (mp*100)/(pm*allBetNum*2);
		t = t.toFixed(1);
		$("myOwnPay").innerHTML = "占总额的" + t + "%";
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
		if(isChase){
			$("toGift").className = "grey";
			$("startcase").className = "grey";
		}else{
			$("toGift").className = "";
			$("startcase").className = "";
		}
		setPayNum();
	}
	function saveCase(){
		buyAmt = $("myPay").value;
		minAmt = $("minPay").value;
		safeAmt = $("allMyPay").value;
		commisionRation = $("commisionRation").value;
		var t = $("caseVisibility").className;
		if(t == "onoff"){
			isvisibility = 0;	
		}else{
			isvisibility = 1;
		}
		buyAmt *= 100,safeAmt*=100,minAmt*=100;
		closeDialog();
		isStartcase = true;
		$("toGift").className = "grey";
		$("showChase").className = "grey";
	}
	function saveGift(){
		isHandsel = true;
		toPhone = $("toPhone").value;
		toMessage = $("toMessage").value;
		closeDialog();
		$("startcase").className = "grey";
		$("showChase").className = "grey";
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
	
	
	function getBatchcode(){
		var json = {
			"command":"QueryLot",
			"type":"highFrequency",
			"lotno":"F47104"
		}
		_root.getData(json,"setBatchcode");
		
	}
	function setBatchcode(result){
		//console.log(result);																														
		batchcode = result.batchcode;
		$("batchCode").innerHTML = batchcode;
		$("endTime").innerHTML = result.endtime;
		var date = new Date();
		var d = date.getDay();
		if(d==0 || d==2 || d==4){
			$("isLottery").style.display = "block";
		}
	}
	window.setBatchcode = setBatchcode;
	
	function payList(){
		alert("1");
		if(!sessionStorage.getItem("sessionid")){
			$("logBtn").click();
			return;
		}
		alert("2");
		if(allBetNum<1){
			$("payNum").innerHTML = "请将您选择的号码加入到号码栏！";
			return;
		}
		if(document.getElementById("saveCase")){
			document.getElementById("saveCase").click();
		}
		alert("3");
		lotmulti = Number($("lotmulti").value);
		var betCode = "";
		var amount = 0;
		for(var i=0;i<allPayRed.length;i++){
			var r = allPayRed[i].length,b=allPayBlue[i].length;
			var v = pickm.ssqGetLottery(r,b);
			var m = (v*200);
			amount += m;
			var rc="",bc="";
			for(var l=0;l<r;l++){
				if(Number(allPayRed[i][l])<10){
					rc += "0" + allPayRed[i][l];	
				}else{
					rc += allPayRed[i][l];	
				}
			}
			for(var o=0;o<b;o++){
				if(Number(allPayBlue[i][o])<10){
					bc += "0" + allPayBlue[i][o];	
				}else{
					bc += allPayBlue[i][o];	
				}
			}
			if(r ==6 && b == 1){
				betCode += "!0001" + rc + "~" + bc + "^_" + lotmulti + "_200_" + m;
			}else if(r > 6 && b == 1){
				betCode += "!1001*" + rc + "~" + bc + "^_" + lotmulti + "_200_" + m; 
			}else if(r ==6 && b>1){
				betCode += "!2001*" + rc + "~" + bc + "^_" + lotmulti + "_200_" + m; 
			}else{
				betCode += "!3001*" + rc + "~" + bc + "^_" + lotmulti + "_200_" + m; 
			}
		}
		for(var j=0;j<allDmArr.length;j++){
			var r = allDmArr[j].length,g=allTmArr[j].length,b=allDtBlue[j].length;
			var v = pickm.ssqdtGetLottery(r,g,b);
			var m = v*200;
			amount += m;
			var rc="",bc="",gc="";
			for(var q=0;q<r;q++){
				if(Number(allDmArr[j][q])<10){
					rc += "0" + allDmArr[i][q];	
				}else{
					rc += allDmArr[j][q];	
				}
			}
			for(var w=0;w<g;w++){
				if(Number(allTmArr[j][w])<10){
					gc += "0" + allTmArr[j][w];	
				}else{
					gc += allTmArr[j][w];	
				}
			}
			for(var e=0;e<b;e++){
				if(Number(allDtBlue[j][e])<10){
					bc += "0" + allDtBlue[j][e];	
				}else{
					bc += allDtBlue[j][e];	
				}
			}
			if(b == 1){
				betCode += "!4001" + rc + "*" + gc + "~" + bc + "^_" + lotmulti + "_200_" + m; 
			}else{
				betCode += "!5001" + rc + "*" + gc + "~" + bc + "^_" + lotmulti + "_200_" + m; 
			}
		}
		var bet_code = betCode.replace("!","");
		amount*=lotmulti;
		if(commisionRation){commisionRation}
		var json;
		
		if(isStartcase){
			json = {
				"command":"betLot",
				"bettype":"startcase",
				"userno":sessionStorage.getItem("userno"),
				"bet_code":bet_code,
				"batchnum":chaseNum,
				"batchcode":batchcode,
				"lotno":"F47104",
				"lotmulti":lotmulti,
				"amount":amount,
				"prizeend":prizeend,
				"oneAmount":"200",
				"isSellWays":"1",
				"safeAmt":safeAmt,
				"buyAmt":buyAmt,
				"minAmt":minAmt,
				"commisionRation":commisionRation,
				"visibility":isvisibility
			}
		}else if(isHandsel){
			json = {
				"command":"betLot",
				"bettype":"gift",
				"userno":sessionStorage.getItem("userno"),
				"bet_code":bet_code,
				"batchnum":chaseNum,
				"batchcode":batchcode,
				"lotno":"F47104",
				"lotmulti":lotmulti,
				"amount":amount,
				"prizeend":prizeend,
				"oneAmount":"200",
				"isSellWays":"1",
				"to_mobile_code":toPhone,
				"blessing":toMessage
			}
		}else{
			json = {
				"command":"betLot",
				"bettype":"bet",
				"userno":sessionStorage.getItem("userno"),
				"bet_code":bet_code,
				"batchnum":chaseNum,
				"batchcode":batchcode,
				"lotno":"F47104",
				"lotmulti":lotmulti,
				"amount":amount,
				"prizeend":prizeend,
				"oneAmount":"200",
				"isSellWays":"1"
			};
		}
		console.log(json);
		var bets = util.stringify(json);
		sessionStorage.setItem("bet",bets);
		$("dialog").style.display = "none";
		_root.getData(json,"betResult");
	}
	function betResult(res){
		var _data = res;
		return;
		if(_data.error_code == "0000"){
			window.location.href = "result/success.html?Ssq";	
		}else{
			sessionStorage.setItem("res",_data.message);
			window.location.href = "result/fail.html?Ssq";
		}
	}
	window.betResult = betResult;
	
	function reNumberPay(){
		var pm = Number($("lotmulti").value);
		lotmulti = pm;
		var re = /^[1-9]\d*$/;
		if(pm ==0 || !re.test(pm)){
			pm = 1;
			this.value = 1;
		}else if(pm>200){
			this.value = 200;
		}
		setPayNum();
	}
	function multFocus(){
		$("lotmulti").focus();
	}
	function sortNumber(a,b){
		return a-b;	
	}
	function $(id){
		return document.getElementById(id) || new Object;
	}
	init();
})()