(function(){var h=window.Root,d=sessionStorage.getItem("userno"),m=sessionStorage.getItem("userName"),e,k,l=1;function q(){if(sessionStorage.getItem("sessionid")){o()}else{f("logBtn").click();window.frash=true}}function b(){l=1;this.className="active";f("toZfb").className="";c()}function a(){l=2;this.className="active";f("toBank").className="";c()}function o(){var r={command:"AllQuery",type:"dna",userno:d};h.getData(r,"setDna")}function n(){var r={command:"AllQuery",type:"balance",userno:d,phonenum:m};h.getData(r,"setBanc")}function c(){var v,u,t,s,r;if(l==1){s="银行卡号";if(e.name){v=e.name;u=e.bankname;t=e.bankcardno}else{r="bor";v='<input id="name" type="text" />';u='<select id="bankName">                                                <option>请选择开卡银行</option>                                                <option>中国工商银行</option>                                                <option>中国农业银行</option>                                                <option>中国建设银行</option>                                                <option>中国民生银行</option>                                                <option>招商银行</option>                                                <option>中国邮政储蓄银行</option>                                                <option>交通银行</option>                                                <option>兴业银行</option>                                                <option>中信银行</option>                                                <option>中国光大银行</option>                                                <option>广东发展银行</option>                                                <option>上海浦东发展银行</option>                                                <option>深圳发展银行</option>                                                <option>杭州银行</option>                                            </select>';t='<input id="bankNum" type="text" />'}}else{s="支付宝账号";r="bor";v='<input id="name" type="text" />';t='<input id="bankNum" type="text" />'}var w='                            <li>                                        <div class="recLeft">持卡人姓名： </div>                                        <div class="recRight '+r+'">'+v+"</div>                                    </li>";if(l==1){w+='                                    <li>                                        <div class="recLeft">开卡银行： </div>                                        <div class="recRight '+r+'">'+u+"</div>                                    </li>"}w+='                                    <li>                                        <div class="recLeft">'+s+'：</div>                                        <div class="recRight '+r+'">'+t+'</div>                                    </li>                                    <li>                                        <div class="recLeft">&nbsp; </div>                                        <div class="recRight">                                            <p>可提现金额：<span class="red">'+k.drawbalance+'</span></p>                                        </div>                                    </li>                                    <li>                                        <div class="recLeft">提现金额：</div>                                        <div class="recRight bor">                                            <input id="getMoney" class="red" type="text" />                                        </div>                                    </li>';f("recharge").innerHTML=w;f("gotopPay").addEventListener("click",p,false)}function p(){var w,r,v;if(l==1){if(e.name){r=e.name;bank=e.bankname;bankNum=e.bankcardno}else{r=f("name").value;var u=f("bankName");bank=u.options[u.selectedIndex].value;bankNum=f("bankNum").value}}else{r=f("name").value;bankNum=f("bankNum").value}var t=f("getMoney").value;var s={command:"getCash",cashtype:"cash",userno:d,bankcardno:bankNum,name:r,amount:t,type:l};if(l==1){s.bankname=bank}console.log(s);h.getData(s,"getResult")}function i(r){e=r;n()}function g(u){k=u;f("toBank").addEventListener("click",b,false);f("toZfb").addEventListener("click",a,false);c();var r=window.location.href;var s=r.split("?");if(s[1]=="zfb"){f("toZfb").click()}else{if(s[1]=="bank"){f("toBank").click()}}}function j(r){console.log(r);sessionStorage.setItem("result",r.message);if(r.error_code=="0000"){window.location.href="rech_suc.html"}else{window.location.href="rech_fail.html"}}window.getResult=j;window.setBanc=g;window.setDna=i;function f(r){return document.getElementById(r)}q()})();