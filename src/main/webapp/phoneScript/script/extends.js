/*
	@class Extends
	@program
	@Author by Tim.wang
*/

function argumentNames(fn) {
    var names = fn.toString().match(/^[\s\(]*function[^(]*\(([^\)]*)\)/)[1].replace(/\s+/g, '').split(',');
	return names.length == 1 && !names[0] ? [] : names;
}
/*
	@Author by tim.wang
	@ function Extends 
	@Author by tim.wang
*/
function extends(baseClass,prop){
	//接收唯一参数时
	if(typeof(baseClass) === "object"){
		prop = baseClass;
		bassClass = null;
	};
	
	function parentInit(){
		if(baseClass){
			this.baseprototype = baseClass.prototype;
		}
		this.init.apply(this.arguments);
	}
	if(baseClass){
		//代理函数，如此类需要扩展
		var proxy = function(){}
		proxy.prototype = baseClass.prototype; 
		parentInit.prototype = new proxy();
		parentInit.prototype.constructor = parentInit;
	}
	//继承并覆盖父级同名函数
	for(var name in prop){
		if(prop.hasOwnProperty(name)){
			if(baseClass && typeof(baseClass[name]) == "function" && argumentNames(prop[name])[0] == "superFn"){
				parentInit[name].prototype = (function(name,fn){
					var that = this;
					superFn = function(){
						return baseClass.prototype[name].apply(that,arguments);
					};
					return fn.apply(this,Array.prototype.concat.apply(superFn,argumengs));
													   })(name,prop[name]);	
			}else{
				parentInit[name] = prop[name];
			}
		}
	}
	return parentInit;
}