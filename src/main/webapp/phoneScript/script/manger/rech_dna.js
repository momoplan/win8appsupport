(function(){var f=window.Root,b=sessionStorage.getItem("userno"),j=sessionStorage.getItem("userName"),c,i;function l(){if(sessionStorage.getItem("sessionid")){k()}else{e("logBtn").click();window.fratsh=true}}function k(){var m={command:"AllQuery",type:"dna",userno:b};f.getData(m,"setDna")}function a(){var r,q,p,t,n,m,o;if(c.name){r=c.name;q=c.bankname;p=c.bankcardno;t=c.certid;n=c.addressname;m=c.bankaddress}else{o="bor";r='<input id="name" type="text" />';q='<select id="bankName">                                                <option>请选择开卡银行</option>                                                <option>中国工商银行</option>                                                <option>中国农业银行</option>                                                <option>中国建设银行</option>                                                <option>招商银行</option>                                                <option>中国邮政储蓄银行</option>                                                <option>华夏银行</option>                                                <option>兴业银行</option>                                                <option>中信银行</option>                                                <option>中国光大银行</option>                                                <option>广东发展银行</option>                                                <option>上海浦东发展银行</option>                                                <option>深圳发展银行</option>                                            </select>';p='<input id="bankNum" type="text" />';t='<input id="perno" type="text" />';n='<input id="address" type="text" />';m='<input id="place" type="text" />'}var s='                            <li>                                        <div class="recLeft">持卡人姓名： </div>                                        <div class="recRight '+o+'">'+r+'</div>                                    </li>                                    <li>                                        <div class="recLeft">开卡银行： </div>                                        <div class="recRight '+o+'">'+q+'</div>                                    </li>                                    <li>                                        <div class="recLeft">银行卡号：</div>                                        <div class="recRight '+o+'">'+p+'</div>                                    </li>                                    <li>                                        <div class="recLeft">身份证号： </div>                                        <div class="recRight '+o+'">'+t+'</div>                                    </li>                                    <li>                                        <div class="recLeft">户籍所在地：</div>                                        <div class="recRight '+o+'">'+n+'</div>                                    </li>                                    <li>                                        <div class="recLeft">卡开户地： </div>                                        <div class="recRight '+o+'">'+m+'</div>                                    </li>                                    <li>                                        <div class="recLeft">充值金额：</div>                                        <div class="recRight bor">                                            <input id="payNumber" class="red" type="text" />                                        </div>                                    </li>                                    <li>                                        <div class="recLeft">手机号码：</div>                                        <div class="recRight bor">                                            <input id="phone" type="text" />                                        </div>                                    </li>';e("recharge").innerHTML=s;e("submit").addEventListener("click",d,false)}function d(){var m,r,u,q,t,o,s,p;if(c.bindstate==1){m=c.name,r=c.bankname,u=c.bankcardno,q=c.certid,t=c.addressname,o=c.bankaddress}else{var n=e("bankName");r=n.options[n.selectedIndex].value;m=e("name").value,u=e("bankNum").value,q=e("perno").value,t=e("address").value,o=e("place").value}s=e("phone").value,p=e("payNumber").value;var v={command:"recharge",rechargetype:"01",userno:b,cardno:u,cardtype:"0101",certid:q,bankaddress:o,addressname:t,iswhite:"false",phonenum:s,amount:p};console.log(v);f.getData(v,"setresult")}function h(m){c=m;a()}function g(m){console.log(m);sessionStorage.setItem("result",m.message);if(m.error_code=="0000"){window.location.href="rech_suc.html"}else{window.location.href="rech_fail.html"}}window.setresult=g;window.setDna=h;function e(m){return document.getElementById(m)}l()})();