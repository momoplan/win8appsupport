(function(){var e=window.Root;var b,h;var f=0;var i=function(){if(sessionStorage.getItem("sessionid")){b=sessionStorage.getItem("userno");h=sessionStorage.getItem("userName");g()}else{d("logBtn").click();window.frash=true}d("zxType").addEventListener("click",a,false)};function a(l){var k=l.target;if(k.tagName.toLowerCase()=="a"){var j=this.getElementsByTagName("a");for(var m=0;m<j.length;m++){j[m].className="";if(k==j[m]){f=m}}g();k.className="active"}}function g(){var j={command:"accountdetail",type:"new",userno:b,pageindex:0,maxresult:10,transactiontype:f,phonenum:h};e.getData(j,"setAcct")}function c(p){var q=p.result;var k=q.length;var o="";for(var n=0;n<k;n++){var j=(q.amt>0)?"-"+q[n].amt:"+"+q[n].amt;var m=(q.amt>0)?"red":"gren";o+='<li>                                    <p class="accLeft">'+q[n].memo+'</p>                                    <p class="accCent '+m+'">'+j+'元</p>                                    <p class="accRigh">'+q[n].platTime+"</p>                                </li>"}d("account").innerHTML=o;console.log(q)}window.setAcct=c;function d(j){return document.getElementById(j)||Object}i()})();