(function(){var e=window.Root;var a,g;var i=function(){if(sessionStorage.getItem("sessionid")){a=sessionStorage.getItem("userno");g=sessionStorage.getItem("userName");d("zfb_cz").addEventListener("click",c,false);d("banck_renc").addEventListener("click",j,false)}else{d("logBtn").click();window.frash=true}};function c(){var k='<div class="dialogDetail">        <div class="logTit">            <div class="titLeft">                <a onClick="closeDialog()" class="diaBtn" href="javascript:;">返回</a>            </div>            <div class="titRight"></div>            <div class="titMidd">支付宝充值</div>        </div>        <div class="logCont jzf">            <div class="logInputs" style="width:auto; padding:20px 75px 0 75px;">            <div class="czBox"><p>请输入您要充值的金额：</p><input id="pay_cz" type="text" /></div>			       <div id="nickNotice"></div>                <div class="clear h18"></div>                <div class="">                <div class="subBtm ">                    <a id="submit" href="javascript:;">确定</a>                </div>				   </div>                <div class="clear h40"></div>            </div><dl><dt>提示</dt><dd>1.使用支付宝前，请确认您已经是支付宝会员，如果不是，请登录www.alipay.com支付宝网站注册。</dd><dd>2.手机支付宝支付金额每日最高500元，支付宝客服热线：0571-88156688</dd></dl>        </div>    </div>';var l={width:570,height:430,isMask:true};e.dialog(k,l);d("submit").addEventListener("click",h,false)}function j(){var k='<div class="dialogDetail">        <div class="logTit">            <div class="titLeft">                <a onClick="closeDialog()" class="diaBtn" href="javascript:;">返回</a>            </div>            <div class="titRight"></div>            <div class="titMidd">支付宝充值</div>        </div>        <div class="logCont jzf">			    <div class="bankToryc"><p>通过银行柜台、ATM或者网上银行转帐到以下账户，转账后通知客服（电话：400-665-1000）办理资金入账</p><p>账户名称：北京金软瑞彩科技有限公司</p><p>开  户  行：工行四季青支行</p><p>账　　号：0200 2453 1920 1093 515</p><p><b>温馨提示：</b></p><p>转账时请务必注明用户名，并请设置零头，比如137.01元，便于客服快速核对处理；</p><p>为了节省转帐手续费，请尽量选择同行转帐；</p><p>转帐后请及时通知客服办理资金入账，客服电话：400-665-1000；</p><p><b>北京用户可带现金到公司入账</b></p><p>公司名称：北京金软瑞彩科技有限公司</p><p>公司地址：北京市海淀区颐和园路福缘门甲1号汇缘阁</p><p></p>		   		</div>        </div>    </div>';var l={width:500,height:424,isMask:true};e.dialog(k,l);d("submit").addEventListener("click",h,false)}function h(){var k=d("pay_cz").value;if(k==""){return}var l={command:"recharge",rechargetype:"05",cardtype:"0300",amount:k,userno:a,phonenum:g,bankAccount:"3"};e.getData(l,"getresult",false);f()}function f(){var k='<div class="dialogDetail">        <div class="logTit">            <div class="titLeft">                <a onClick="closeDialog()" class="diaBtn" style="display:none;" href="javascript:;">返回</a>            </div>            <div class="titRight"></div>            <div class="titMidd">支付宝充值</div>        </div>        <div class="logCont">            <div class="logInputs" style="width:auto; padding:20px 40px 0 40px;">			       <div id="nickNotice"></div>                <div class="clear h18"></div>                <div class="uc_sub" style="width:300px;">                <div class="subBtm">                    <a onClick="closeDialog()" href="javascript:;">关闭</a>                </div>                <div class="subBtm fr">                    <a onClick="closeDialog()" href="javascript:;">完成充值</a>                </div>				   </div>                <div class="clear h25"></div>            </div>        </div>    </div>';var l={width:395,height:250,isMask:true};e.dialog(k,l)}function b(k){if(k.error_code=="0000"){window.open(k.return_url)}}window.getresult=b;function d(k){return document.getElementById(k)||Object}i()})();