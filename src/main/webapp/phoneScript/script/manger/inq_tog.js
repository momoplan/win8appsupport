(function(){var f=window.Root;var c,o,j;var k=0,i=0,p=[];var q=function(){if(sessionStorage.getItem("sessionid")){c=sessionStorage.getItem("userno");o=sessionStorage.getItem("userName");n();m()}else{e("logBtn").click();window.frash=true}};function n(){var r={command:"QueryLot",type:"caselot",userno:c,pageindex:i,maxresult:5,phonenum:o,};f.getData(r,"setAcct")}function m(){var r={command:"updateUserInfo",type:"userCenter",userno:c,phonenum:o};f.getData(r,"setme")}function a(){i++;n();e("more").className="inq_more grey";e("more").addEventListener("click",a,false)}function h(r){j=r.nickName;console.log(j)}window.setme=h;function l(x){var w=x.target;if(w.tagName.toLowerCase()!="img"){return}var y=e("inquiry").getElementsByTagName("li"),r=y.length;for(var s=0;s<r;s++){y[s].className="";if(this==y[s]){if(w.className=="showMore"){this.className="active";var u=(p[s].totalAmt/100)-p[s].amt;var t='<div class="title">订单详情</div>                                <ul>                                    <li class="bn">                                        <p class="tit">彩种：</p>                                        <p class="text">'+p[s].lotName+'</p>                                    </li>                                    <li>                                        <p class="tit">方案金额：</p>                                        <p class="text">'+(p[s].totalAmt/100)+'</p>                                    </li>                                    <li>                                        <p class="tit">方案编号：</p>                                        <p class="text">'+p[s].caseLotId+'</p>                                    </li>                                    <li>                                        <p class="tit">认购金额：</p>                                        <p class="text">'+p[s].amt+'</p>                                    </li>                                    <li>                                        <p class="tit">保底金额：</p>                                        <p class="text">'+p[s].safeAmt+'</p>                                    </li>                                    <li>                                        <p class="tit">方案进度：</p>                                        <p class="text">'+(p[s].progress*100)+'%</p>                                    </li>                                    <li>                                        <p class="tit">方案状态：</p>                                        <p class="text">'+p[s].displayStateMemo+'</p>                                    </li>                                    <li>                                        <p class="tit">剩余金额：</p>                                        <p class="text">'+u+'</p>                                    </li>                                    <li class="">                                        <p class="tit">发起人：</p>                                        <p class="text">'+p[s].starter+'</p>                                    </li>                                    <li class="">                                        <p class="tit">发起人提成：</p>                                        <p class="text">'+p[s].commisionRatio+'%</p>                                    </li>                                </ul>                                <div class="title">方案详细</div>                                <div class="inqText">'+p[s].contentHtml+'</div>									<img id="inq_close" src="../../images/btn/inq_close.png" />';e("inq_info").innerHTML=t;e("inq_info").style.right=0;e("inq_close").style.display="block";e("inq_close").addEventListener("click",b,false)}else{if(w.className=="stop_tog_en"){var v="";if(j==p[s].starter){v="cancelCaselot"}else{v="cancelCaselotbuy"}var z={command:"betLot",bettype:v,userno:c,caseid:p[s].caseLotId};f.getData(z,"stopchas")}}}}}function g(r){if(r.error_code=="0000"){window.location.reload()}else{alert(r.message)}}window.stopchas=g;function b(){e("inq_close").style.display="none";e("inq_info").style.right="-323px"}function d(w){var x=w.result;var s=x.length;console.log(x);for(var v=0;v<s;v++){var y,t;if(x[v].displayState==1){t="stop_tog_en"}else{t="stop_tog_un"}var r=document.createElement("li");var u='<div class="inqLeft">                                        <p><b>'+x[v].lotName+"</b>（"+x[v].displayStateMemo+"）</p>										   <p>发起时间："+x[v].buyTime+'</p>                                    </div>                                    <div class="inqMidd">                                        <p>编号：<span>'+x[v].caseLotId+"</span></p>                                        <p>认购金额：<span>"+x[v].amt+'</span></p>                                    </div>                                    <div class="inqRigh"><img class="showMore" src="../../images/btn/showMore.png" /><img class="'+t+'" src="../../images/btn/'+t+'.png" /></div>';r.innerHTML=u;r.addEventListener("click",l,false);e("inquiry").appendChild(r);p.push(x[v])}if(i<w.totalPage){e("more").className="inq_more";e("more").addEventListener("click",a,false)}}window.setAcct=d;function e(r){return document.getElementById(r)||Object}q()})();