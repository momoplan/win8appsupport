(function(){
	var orderBy="progress",
	orderDir="DESC",
	pageindex=0,
	lotno = "",
	tarlo = "",
	isGet = false,//是否为更多加载
	_root = window.Root,
	util = window.util;
	
	var init = function(){
		getList();
		$("order").addEventListener("click",setOrder,false);
		$("setOrder").addEventListener("click",showOrder,false);
		$("orderDir").addEventListener("click",orderDirhand,false);
	}
	function getList(){
		if(isGet){
			return;
		}
		var json = {
			"command":"QueryLot",
			"type":"querycaselot",
			"pageindex":pageindex,
			"orderBy":orderBy,
			"orderDir":orderDir,
			"maxresult":5
		}
		if(lotno){
			json.lotno = lotno;
		}
		_root.getData(json,"buildui");
	}
	function buildui(_result){
		if(!isGet){
			$("top").innerHTML = "";
			$("down").innerHTML = "";
		}

		if(_result.error_code == "0000"){
			var _data = _result.result,
			j = _data.length;
			for(var i=0;i<j;i++){
				var obj = _data[i].displayIcon,
				iconText = "",
				li = document.createElement("li"),
				t = Math.floor(Number(_data[i].progress)/10),
				html = "";
				if(t<1){t=1}
				t = t*10;
				
				if(!isEmpey(obj)){
					if(obj.crown>0){
						iconText+= "<img src=\"../images/icon/crown.png\" />"+obj.crown;
					}
					if(obj.cup >0){
						iconText+= "<img src=\"../images/icon/cup.png\" />"+obj.cup;
					}
					if(obj.diamond >0){
						iconText+= "<img src=\"../images/icon/diamond.png\" />"+obj.diamond;
					}
					if(obj.goldStar >0){
						iconText+= "<img src=\"../images/icon/goldStar.png\" />"+obj.goldStar;
					}
				}
				
				html= "<div class=\"right\">"
+ "                            "
+ "                        </div>"
+ "                        <div class=\"left\">"
+ "                            <div class=\"top\">"
+ "                                <div class=\"title\">"+_data[i].lotName+"</div>"
+ "                                <div class=\"author\">"
+ "                                    <div class=\"name\">发起人："+_data[i].starter+"</div>"
+ "                                    <div class=\"level\">"
+  iconText
+ "                                    </div>"
+ "                                </div>"
+ "                            </div>"
+ "                            <div class=\"down\">"
+ "                                <div class=\"betInfo\">"
+ "                                    <p>方案总额</p>"
+ "                                    <p class=\"red\">"+_data[i].totalAmt+"元</p>"
+ "                                </div>"
+ "                                <div class=\"betInfo\">"
+ "                                    <p>进度</p>"
+ "                                    <p class=\"red\">"+_data[i].progress+"%+(保"+_data[i].safeRate+"%)</p>"
+ "                                </div>"
+ "                                <div class=\"betInfo \">"
+ "                                    <p>参与合买</p>"
+ "                                    <p>定制跟单</p>"
+ "                                </div>"
+ "                            </div>"
+ "                        </div>";
			
			if(_data[i].isTop == "true"){
				html +="<img class=\"totop\" src=\"../images/icon/top.png\" />";
				li.innerHTML = html;
				$("top").appendChild(li);
				li.addEventListener("click",showMore,false);
				return;
			}
			li.innerHTML = html;
			$("down").appendChild(li);
			li.addEventListener("click",showMore,false);
			}
			isGet = false;
		}
	}
	
	
	//Event Handler
	function showMore(evt){
		console.log(evt.target);
	}
	function setOrder(evt){
		var $target = evt.target,
		_t = $target.tagName.toLowerCase(),
		_p = $target.parentNode.tagName.toLowerCase();
		if(_t == "li" || _p == "li"){
			var _name = $target.getAttribute("id") || $target.parentNode.getAttribute("id");
			var li = this.getElementsByTagName("li");
			for(var i=0;i<li.length;i++){
				li[i].className = "";
			}
			$target.parentNode.className = "act";
			orderBy = _name;
			pageindex = 0;
			getList();
		} 
	}
	function showOrder(evt){
		$("dialog").style.top = 0;
		$("prep").addEventListener("click",frashorder,false);
		$("next").addEventListener("click",frashorder,false);
		//$("lotnohand").addEventListener("click",lotnohand,false);
	}
	function lotnohand(evt){
		var $target = evt.target;
		if($target.tagName.toLowerCase() == "li"){
			tarlo = $target.getAttribute("lotno");
			console.log($target.getAttribute("lotno"));
		}
	}
	function frashorder(evt){
		console.log(this);
		$("dialog").style.top = "-200%";
		if(this.getAttribute("id") == "next"){
			lotno = tarlo;
			pageindex = 0;
			getList();
		}
	}
	function orderDirhand(){
		
		if(orderDir =="DESC"){
			orderDir = "ASC";
			this.src = "../images/button/order_asc.png";
			console.log(this.src);
		}else{
			orderDir = "DESC";
			this.src = "../images/button/order_dsc.png";
		}
		getList();
	}
	
	
	window.buildui = buildui;
	init();
	function isEmpey(obj){
		for(var i in obj){
			return false;
		}
		return true;
	}
	
	function $ (name){
		return document.getElementById(name) || Object;
	}
})();
