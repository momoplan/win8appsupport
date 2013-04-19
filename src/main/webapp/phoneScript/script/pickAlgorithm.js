// JavaScript Document

(function(){
	var pickAlgorithm = function(){}
	pickAlgorithm.prototype = {
		ssqGetLottery:function(r,b){
			return (r*b*(r-1)*(r-2)*(r-3)*(r-4)*(r-5)/720);
		},
		ssqdtGetLottery:function(n,m,v){
			if(n+m<7){return 0;}
			if(n<1){return 0}
			var j=1,k=1,x = m-5+n;
			for(var i=x;i<=m;i++){
				j *= i;	
			}
			for(var l=1;l<=(6-n);l++){
				k*=l;
			}
			return v*j/k;
		},
		qlcGetLottery:function(num){
			if(num<7){return 0;}
			var j=1,k=1;
			for(var i=8;i<=num;i++){
				j *=i;
			}
			for(var l=1;l<=(num-7);l++){
				k *= l;
			}
			return j/k;
		},
		dltGetLottery:function(r,b){
			if(r<5 || b<2){return 0}
			var j=1,k,l=r-4;
			for(var i=l;i<=r;i++){
				j*=i;
			}
			j = j/120;
			k = (b * (b-1))/2;
			
			return j*k;
		},
		dddGetLottery:function(r,g,b){
			return r*g*b;
		}
	}
	window.pickAlgorithm = pickAlgorithm
})()