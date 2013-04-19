(function(){
	
	var util = window.util,
	_root = window.Root,
	user,password;
	
	var login = function(){
		showLogBox();
	}
	
	function showLogBox(){
		var html= "<div class=\"loginBody\">"
+ "    <div class=\"logBox\">    "
+ "        <!--header start-->"
+ "        <header class=\"header\">"
+ "            <div class=\"logBtn\" id=\"reg\">注册</div>"
+ "            <div class=\"title\">"
+ "                用户登录"
+ "            </div>"
+ "        </header>"
+ "        <!--header stop-->"
+ "        <div class=\"body\">"
+ "            <ul>"
+ "                <li class=\"top\"><span class=\"name\">用户名：</span><span class=\"login\"><input id=\"userName\" name=\"\" type=\"text\" placeholder=\"用户名/手机号/邮箱\"></span></li>"
+ "                <li><span class=\"name\">密码：</span><span class=\"login\"><input name=\"\" id=\"userPwd\" type=\"password\" placeholder=\"密码\"></span></li>"
+ "                <li><span class=\"reme\"><input name=\"\" type=\"checkbox\" value=\"\"></span><span> 记住我的状态</span><span class=\"forget\"><a href=\"#\">忘记密码？</a></span></li>"
+ "            </ul>    "
+ "            <div class=\"logButn\">"
+ "                <input id=\"close\" name=\"\" type=\"submit\" value=\"返 回\">"
+ "                <input name=\"\" id=\"logbtn\" type=\"submit\" value=\"登 录\">"
+ "            </div>"
+ "        </div>"
+ "    </div>"
+ "</div>";
		$("dialog").innerHTML = html;
		$("dialog").style.top = 0;
		$("reg").addEventListener("click",showreg);
		$("close").addEventListener("click",closeLog,false);
		$("logbtn").addEventListener("click",subLogin,false);
	}
	login();
	function showreg(){
		var html= "<div class=\"loginBody\">"
+ "    <!--用户注册 start-->"
+ "    <div class=\"regBox\">"
+ "        <!--header start-->"
+ "        <header class=\"header\">"
+ "            <div id=\"reguest\" class=\"logBtn\">确定</div>"
+ "            <div class=\"title\">"
+ "                用户注册"
+ "            </div>"
+ "        </header>"
+ "        <!--header stop-->"
+ "        <div class=\"body\">"
+ "            <ul class=\"register\">"
+ "                <li class=\"top\"><span class=\"name\">用户名：</span><span class=\"login\"><input id=\"userName\" type=\"text\" placeholder=\"请输入您的手机号\"></span></li>"
+ "            </ul>    "
+ "            <ul class=\"register\">"
+ "                <li class=\"top\"><span class=\"name\">登录密码：</span><span class=\"login\"><input id=\"userPwd\" type=\"password\" placeholder=\"6-16个字母、数字组成\"></span></li>"
+ "                <li><span class=\"name\">确认密码：</span><span class=\"login\"><input id=\"repassWord\" type=\"password\" placeholder=\"重新输入密码\"></span></li>"
+ "            </ul>"
+ "            <div class=\"regTtitle\">"
+ "                <span>是否绑定身份证</span>"
+ "                <span class=\"fRight\"><span id=\"isBind\" class=\"onoff onoff-on\"><label><i></i></label></span></span>    "
+ "            </div>"
+ "            <ul id=\"userCard\" class=\"register\">"
+ "                <li class=\"top\"><span class=\"name\">真实姓名：</span><span class=\"login\"><input id=\"trueName\" type=\"text\" placeholder=\"真实姓名\"></span></li>"
+ "                <li><span class=\"name\">身份证号：</span><span class=\"login\"><input id=\"perNum\" type=\"text\" placeholder=\"身份证号码\"></span></li>"
+ "            </ul>"
+ "        </div>"
+ "        <div class=\"regBottom\">"
+ "            <div class=\"readAgree\">《阅读并同意用户服务协议》</div>"
+ "            <div class=\"hint\">手机号码、身份证信息是彩票兑奖的重要依据，建议您认真填写并核对信息</div>"
+ "        </div>"
+ "    </div>"
+ "    </div>";
		
		$("dialog").style.top = "-100%";
		$("dialog").innerHTML = html;
		setTimeout(function(){
			
			$("dialog").style.top = 0;
			$("isBind").addEventListener("click",switchcase,false);
			$("reguest").addEventListener("click",reguest,false);
		},500);
		$("")
		
	}
	function closeLog(){
		$("dialog").style.top = "-200%";
	}
	function subLogin(){
		var userName = $("userName").value || user,
		userPwd = $("userPwd").value || password;
		if(userName == "" || userPwd == ""){
			alert("用户名密码不能为空");
			return;
		}
		var logInfo = {
			"command":"login",
			"phonenum":userName,
			"password":userPwd,
			"isAutoLogin":0
		}
		_root.getData(logInfo,"logResult");
	}
	function reguest(){
		
		var userName = $("userName").value,
		userPwd = $("userPwd").value,
		repassWord = $("repassWord").value,
		trueName = $("trueName").value,
		perNum = $("perNum").value,
		isBind = ($("isBind").className=="onoff onoff-on")?true:false;
		reg_mail = /^\w{1,15}(?:@(?!-))(?:(?:[a-z0-9-]*)(?:[a-z0-9](?!-))(?:\.(?!-)))+[a-z]{2,4}$/,
		reg_phone = /^1[3|4|5|8][0-9]\d{4,8}$/,
		regName = /[^\u4e00-\u9fa5]/,
		isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/,
		isIDCard2=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
		
		if(!reg_mail.test(userName) && !reg_phone.test(userName)){
			alert("请您输入合法的邮箱或手机号码");
			return;
		}
		if(userPwd != repassWord){
			alert("确认密码与密码不一致");
			return;
		}
		
		
		var json = {
			"command":"register",
			"phonenum":userName,
			"password":userPwd,
		}
		if(isBind){
			if(regName.test(trueName)){
				alert("请出入合法的中文名字");
				return;
			}
			if(!isIDCard1.test(perNum) && !isIDCard2.test(perNum)){
				alert("请输入合法的身份证号码");
				return;
			}
			json.certid = perNum;
			json.name = regName;
			
		}
		user = userName;
		password = userPwd;
		_root.getData(json,"regResult");
		
	}
	
	//data handler
	function logResult(result){
		console.log(result);
		if(result.error_code == "0000"){
			var _data = util.stringify(result);
			sessionStorage.setItem("userInfo",_data);
			if(document.getElementById("close")){
				$("close").click();
			}
			
		}else{
			alert(result.message);
		}
	}
	function regResult(result){
		if(result.error_code == "0000"){
			subLogin();
			$("dialog").style.top = "-200%";
		}else{
			alert(result.message);
		}
	}
	
	window.regResult = regResult;
	window.logResult = logResult;
	//data handler end
	
	
	
	function switchcase(){
		var _class = this.className;
		if(_class == "onoff onoff-on"){
			this.className = "onoff";
			$("userCard").style.display = "none";
		}else{
			this.className = "onoff onoff-on";
			$("userCard").style.display = "";
		}
		
	}
	function $(id){
		return document.getElementById(id) || new Object;
	}
	window.login = login;
})()