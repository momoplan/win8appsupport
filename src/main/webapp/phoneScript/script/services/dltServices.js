(function(){var K=[],w=[],ai=[],e=[],b,Z;var y=0,X=0,W=1,T=0,t=1;var Y=false,g=false,q=false,F=false;var ah=new pickAlgorithm();var C=window.Root;var I="",m="";var ag=0,J=0,d;function ad(){v();redBall=N("redBall");blueBall=N("blueBall");redBall.addEventListener("click",Q,false);blueBall.addEventListener("click",aj,false);var ap=N("addToList");ap.addEventListener("click",V,false);var ao=N("randNum");ao.addEventListener("click",ae,false);N("randNumBlue").addEventListener("click",R,false);N("redRandom").addEventListener("click",af,false);N("blueRandom").addEventListener("click",S,false);N("bet_zx").addEventListener("click",j,false);N("bet_dt").addEventListener("click",x,false);N("chose_dm").addEventListener("click",B,false);N("chose_tm").addEventListener("click",n,false);N("showChase").addEventListener("click",u,false);N("payBtn").addEventListener("click",D,false);N("restChose").addEventListener("click",L,false);N("multBox").addEventListener("click",o,false);N("lotmulti").addEventListener("change",al,false);N("startcase").addEventListener("click",k,false);N("toGift").addEventListener("click",A,false)}function Q(ap){var ao=ap.target;if(ao.tagName.toLowerCase()=="a"){if(ao.className=="unable"){return}if(ao.className==""){K.push(ao.innerHTML);K.sort();ao.className="checked";if(K.length>=18){var ar=this.getElementsByTagName("a");for(var aq=0;aq<ar.length;aq++){if(ar[aq].className==""){ar[aq].className="unable"}}}}else{ao.className="";P(K,ao.innerHTML);if(K.length<18){var ar=this.getElementsByTagName("a");for(var aq=0;aq<ar.length;aq++){if(ar[aq].className=="unable"){ar[aq].className=""}}}}p()}}function aj(ap){var ao=ap.target;if(ao.tagName.toLowerCase()=="a"){if(ao.className==""){if(w.length>=12){N("bettingInfo").innerHTML="请最多选择12个号码！";return}ao.className="checked";w.push(ao.innerHTML);w.sort(ab)}else{ao.className="";P(w,ao.innerHTML)}p()}}function V(){if(Y){}else{if(K.length<5){N("bettingInfo").innerHTML="前区号码不足！";return}else{if(w.length<2){N("bettingInfo").innerHTML="后区号码不足！";return}else{if(K.length>18){N("bettingInfo").innerHTML="前区最多为18个号码！";return}}}var ap='<div class="numLeft"><div><span class="redNums">'+K+'</span><span class="blueNums">'+w+"</span></div><div>"+y+"注，"+y*2+'元</div></div><div class="numRight"><img sva='+y+' class="removeList" src="../images/icon/close.png" /></div><div class="clear"></div>';ai.push(K);e.push(w)}var ao=document.createElement("li");ao.innerHTML=ap;ao.addEventListener("click",c,false);betList.appendChild(ao);X+=y;L();l()}function c(ap){var ao=ap.target;if(ao.tagName.toLowerCase()=="img"){X-=ao.getAttribute("sva");var ar=betList.getElementsByTagName("li");for(var aq=0;aq<ar.length;aq++){if(ar[aq]==ao.parentNode.parentNode){ai.splice(aq,1);e.splice(aq,1);console.log(ai)}}betList.removeChild(ao.parentNode.parentNode);l()}}function P(ao,ap){for(var aq=0;aq<ao.length;aq++){if(ao[aq]==ap){ao.splice(aq,1)}}}function p(){if(!Y){var ap=K.length,ao=w.length;y=ah.dltGetLottery(ap,ao);N("bettingInfo").innerHTML="您当前选中了"+y+"注，共"+y*2+"元"}}function L(){ak();M();if(b){b.className=""}if(Z){Z.className=""}K=[];w=[];p()}function ak(){var ap=redBall.getElementsByTagName("a");for(var ao=0;ao<ap.length;ao++){ap[ao].className=""}}function M(){var ao=blueBall.getElementsByTagName("a");for(var ap=0;ap<ao.length;ap++){ao[ap].className=""}}function ae(ao){N("redRandom").style.display=(N("redRandom").style.display=="block")?"none":"block"}function R(){N("blueRandom").style.display=(N("blueRandom").style.display=="block")?"none":"block"}function af(ar){var ap=ar.target;if(ap.tagName.toLowerCase()=="p"){if(b){b.className=""}b=ap;var aw=redBall.getElementsByTagName("a");for(var ao=0;ao<aw.length;ao++){aw[ao].className=""}var av=Number(ap.innerHTML);var aq=C.getArray(av,1,35);K=aq.sort(ab);N("randNum").innerHTML=av+"个";ap.className="randomCheck";for(var au=0;au<aq.length;au++){var at=aq[au]-1;aw[at].className="checked"}}N("redRandom").style.display="none";p()}function S(aq){if(Z){Z.className=""}var ao=aq.target;if(ao.tagName.toLowerCase()=="p"){Z=ao;var av=blueBall.getElementsByTagName("a");for(var aw=0;aw<av.length;aw++){av[aw].className=""}var au=Number(ao.innerHTML);var ap=C.getArray(au,1,12);w=ap.sort(ab);N("randNumBlue").innerHTML=au+"个";ao.className="randomCheck";for(var at=0;at<ap.length;at++){var ar=ap[at]-1;av[ar].className="checked"}}N("blueRandom").style.display="none";p()}function U(){}function j(ao){}function x(){}function B(){}function n(){}function a(){}function u(){if(q||F){return}var ao=(W==1)?5:W;var aq='    <div class="dialogDetail">        <div class="logTit">            <div class="titLeft">                <a onClick="closeDialog()" class="diaBtn" href="#">关闭</a>                </div>            <div class="titRight">                <a id="saveCh" class="diaBtn" href="javascript:;">保存</a>                </div>            <div class="titMidd">设置追期</div>        </div>        <div class="logCont">            <div class="chaseBox">                <div class="chaseTop">                    <div class="chaseTopLeft">                        <p class="fl">追期数：</p>                        <div class="chaseCtrl">                            <img id="chaseDel" src="../images/btn/chaseDel.png" />                            <div class="chaseInput">                                <input id="chaseNumber" value="5" type="text" />                            </div>                            <img id="chaseAdd" src="../images/btn/chaseAdd.png" />                        </div>                    </div>                    <div class="chaseTopRight">                            <p class="fl">中奖后停止追期:</p>                        <div class="closeBtn">                            <span id="isChaseStop" class="onoff"><label><i></i></label></span>                        </div>                    </div>                </div>                <div class="chaseMidd">                        <ul id="chaseMidd">                    </ul>                </div>                <div class="clear"></div>                <div class="chaseBtm">                    <a id="newPpayBtn" class="addToList" href="javascript:"><p>立即购买</p></a>				   </div>                <div class="clear h18"></div>            </div>                    </div>    </div>';var ap={width:850,height:450,isMask:true};C.dialog(aq,ap);if(W>1){H(W);N("chaseNumber").value=ao}else{H(5)}N("newPpayBtn").addEventListener("click",D,false);N("chaseNumber").addEventListener("blur",h,false);N("isChaseStop").addEventListener("click",z,false);N("chaseDel").addEventListener("click",s,false);N("chaseAdd").addEventListener("click",O,false);N("saveCh").addEventListener("click",G,false)}function k(){if(g||F){return}var ap='    <div class="dialogDetail">        <div class="logTit">            <div class="titLeft">                <a onClick="closeDialog()" class="diaBtn" href="#">关闭</a>                </div>            <div class="titRight">                <a id="saveCase" class="diaBtn" href="#">保存</a>                </div>            <div class="titMidd">发起合买</div>        </div>        <div class="logCont">            <div class="chaseBox">                <div class="chaseMidd caseBox">                        <ul class="startcase">						   <li><p class="caseLeft">我要认购</p><p class="caseMidd"><input id="myPay" type="input" value="1" /></p><p class="caseRight" id="myOwn"></p></li>						   <li><p class="caseLeft">最低跟单</p><p class="caseMidd"><input id="minPay" type="text" value="1" /></p></li>						   <li><p class="caseLeft">我要保底</p><p class="caseMidd"><input id="allMyPay" type="text" value="1" /></p><p class="caseRight" id="myOwnPay"></p></li>						   <li><p class="caseLeft">提成比例</p><p class="caseMidd"><input id="commisionRation" type="text" value="10" />%</p><p class="caseRight">最高提成10%</p></li>						   <li><p class="caseLeft">是否可见</p><p class="caseMidd"><span id="caseVisibility" class="onoff"><label><i></i></label></span></p></li>                    </ul>                </div>                <div class="clear"></div>                <div class="chaseBtm">                    <a id="newPpayBtn" class="addToList" href="javascript:"><p>立即购买</p></a>				   </div>                <div class="clear h18"></div>            </div>                    </div>    </div>';var ao={width:850,height:335,isMask:true};C.dialog(ap,ao);N("myPay").addEventListener("change",am,false);N("allMyPay").addEventListener("change",r,false);N("minPay").addEventListener("change",E,false);N("commisionRation").addEventListener("change",f,false);N("saveCase").addEventListener("click",i,false);N("newPpayBtn").addEventListener("click",D,false);N("caseVisibility").addEventListener("click",z,false)}function A(){if(g||q){return}var ap='    <div class="dialogDetail">        <div class="logTit">            <div class="titLeft">                <a onClick="closeDialog()" class="diaBtn" href="#">关闭</a>                </div>            <div class="titRight">                <a id="saveCase" class="diaBtn" href="#">保存</a>                </div>            <div class="titMidd">发起合买</div>        </div>        <div class="logCont">            <div class="chaseBox">                <div class="chaseMidd gift caseBox">                        <ul class="startcase">						   <li><p class="caseLeft">手机号码</p><p class="caseMidd"><input id="toPhone" type="input" value="1" /></p><p class="caseRight" id="myOwn"></p></li>						   <li><p class="caseLeft">赠送寄语</p><p class="caseMidd"><textarea id="toMessage"></textarea></p></li>                    </ul>                </div>                <div class="clear"></div>                <div class="chaseBtm">                    <a id="newPpayBtn" class="addToList" href="javascript:"><p>立即购买</p></a>				   </div>                <div class="clear h18"></div>            </div>                    </div>    </div>';var ao={width:850,height:335,isMask:true};C.dialog(ap,ao);N("saveCase").addEventListener("click",an,false);N("newPpayBtn").addEventListener("click",D,false)}function h(){var ap=this.value;var ao=/^[1-9]\d*$/;if(ap==0||!ao.test(ap)){this.value=1;H(1);return}H(ap)}function E(){var ap=this.value;var ao=/^[1-9]\d*$/;if(ap==0||!ao.test(ap)){this.value=1}}function f(){var ap=this.value;var ao=/^[1-9]\d*$/;if(ap==0||!ao.test(ap)){this.value=1}if(ap>10){this.value=10}}function l(){N("payNum").innerHTML="共"+X+"注，"+X*2*t*W+"元"}function am(){var at=this.value;var aq=/^[1-9]\d*$/;if(at==0||!aq.test(at)){this.value=1}if(X==0){return}var ap=Number(N("lotmulti").value);var ar=Number(N("myPay").value);var ao=(ar*100)/(ap*X*2);ao=ao.toFixed(1);N("myOwn").innerHTML="占总额的"+ao+"%"}function r(){var ap=Number(N("lotmulti").value);var ar=Number(N("allMyPay").value);var aq=/^[1-9]\d*$/;if(ar==0||!aq.test(ar)){this.value=1;ar=1}if(X==0){return}var ao=(ar*100)/(ap*X*2);ao=ao.toFixed(1);N("myOwnPay").innerHTML="占总额的"+ao+"%"}function s(){var ap=N("chaseMidd").getElementsByTagName("li");var ao=ap.length-1;if(ao<1){return}N("chaseMidd").removeChild(ap[ao]);N("chaseNumber").value-=1}function O(){var ao=Number(N("chaseNumber").value);var ap='                        <li>                            <p class="chaseNum fl">                                '+(Number(batchcode)+ao)+'期                            </p>                            <p class="chasePrice">                                    <span>'+X*2+"</span>元                            </p>                        </li>";N("chaseMidd").innerHTML+=ap;N("chaseNumber").value=ao+1}function H(aq){var ap="";for(var ao=0;ao<aq;ao++){ap+='                        <li>                            <p class="chaseNum fl">                                '+(Number(batchcode)+ao)+'期                            </p>                            <p class="chasePrice">                                    <span>'+X*2+"</span>元                            </p>                        </li>"}N("chaseMidd").innerHTML=ap}function G(){W=Number(N("chaseNumber").value);closeDialog();N("curChase").innerHTML=W;g=(W!=1)?true:false;if(g){N("toGift").className="grey";N("startcase").className="grey"}else{N("toGift").className="";N("startcase").className=""}l()}function i(){ag=N("myPay").value;minAmt=N("minPay").value;J=N("allMyPay").value;commisionRation=N("commisionRation").value;var ao=N("caseVisibility").className;if(ao=="onoff"){isvisibility=0}else{isvisibility=1}ag*=100,J*=100,minAmt*=100;closeDialog();q=true;N("toGift").className="grey";N("showChase").className="grey"}function an(){F=true;I=N("toPhone").value;m=N("toMessage").value;closeDialog();N("startcase").className="grey";N("showChase").className="grey"}function z(){if(this.className=="onoff"){this.className="onoff onoff-on";T=1}else{T=0;this.className="onoff"}}function al(){var ao=Number(N("lotmulti").value);t=ao;var ap=/^[1-9]\d*$/;if(ao==0||!ap.test(ao)){ao=1;this.value=1}else{if(ao>200){this.value=200}}l()}function D(){if(!sessionStorage.getItem("sessionid")){N("logBtn").click();return}if(X<1){N("payNum").innerHTML="请将您选择的号码加入到号码栏！";return}if(document.getElementById("saveCase")){document.getElementById("saveCase").click()}t=Number(N("lotmulti").value);var av="";var ax=0;for(var aw=0;aw<ai.length;aw++){var aq=ai[aw].length,aA=e[aw].length;var aB=ah.dltGetLottery(aq,aA);var at=(aB*200);ax+=at;var ap="",az="";for(var au=0;au<aq;au++){ap+=" "+ai[aw][au]}for(var ar=0;ar<aA;ar++){az+=" "+e[aw][ar]}ap=ap.replace(" ","");az=az.replace(" ","");if(aq==5&&aA==2){av+="!"+ap+"-"+az+"_"+t+"_200_"+at}else{if(aq>5||aA>2){av+="!"+ap+"-"+az+"_"+t+"_200_"+at}}}var ay=av.replace("!","");ax*=t;var aC;if(q){aC={command:"betLot",bettype:"startcase",userno:sessionStorage.getItem("userno"),bet_code:ay,batchcode:batchcode,lotno:"T01001",lotmulti:t,amount:ax,prizeend:T,oneAmount:"200",isSellWays:"1",buyAmt:ag,minAmt:minAmt,safeAmt:J,commisionRation:commisionRation,visibility:isvisibility}}else{if(F){aC={command:"betLot",bettype:"gift",userno:sessionStorage.getItem("userno"),bet_code:ay,batchnum:W,batchcode:batchcode,lotno:"T01001",lotmulti:t,amount:ax,prizeend:T,oneAmount:"200",isSellWays:"1",to_mobile_code:I,blessing:m}}else{aC={command:"betLot",bettype:"bet",userno:sessionStorage.getItem("userno"),bet_code:ay,batchnum:W,batchcode:batchcode,lotno:"T01001",lotmulti:t,amount:ax,prizeend:T,oneAmount:"200",isSellWays:"1"}}}var ao=util.stringify(aC);sessionStorage.setItem("bet",ao);N("dialog").style.display="none";C.getData(aC,"betResult")}function aa(ao){var ap=ao;if(ap.error_code=="0000"){window.location.href="result/success.html?Dlt"}else{sessionStorage.setItem("res",ap.message);window.location.href="result/fail.html?Dlt"}}window.betResult=aa;function o(){N("lotmulti").focus()}function v(){var ao={command:"QueryLot",type:"highFrequency",lotno:"T01001"};C.getData(ao,"setBatchcode")}function ac(ao){batchcode=ao.batchcode;N("batchCode").innerHTML=batchcode;N("endTime").innerHTML=ao.endtime;var ap=new Date();var aq=ap.getDay();if(aq==3||aq==1||aq==6){N("isLottery").style.display="block"}}window.setBatchcode=ac;function ab(ap,ao){return ap-ao}function N(ao){return document.getElementById(ao)||new Object}ad()})();