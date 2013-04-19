(function(){
	var util = {};//nameSpace
	var dom = function(s){
        return document.getElementById(s)
	}
	//for DOMObject CSS controler
	dom.cssName = function (name){
		var prefixes = ['', '-ms-','-moz-', '-webkit-', '-khtml-', '-o-'],
        rcap = /-([a-z])/g,capfn = function($0,$1){
			return $1.toUpperCase();
        };
        dom.cssName = function(name, target, test){
			target = target || document.documentElement.style;
			for (var i=0, l=prefixes.length; i < l; i++) {
				test = (prefixes[i] + name).replace(rcap,capfn);
				if(test in target){
					return test;
				}
			}
			return null;
		}
        return dom.cssName(name);
	}
	
	
	var parse = function(data){
		 return (new Function("return (" + data + ")"))();
	}

	var stringify = (function () {
     
		var escapeMap = {
			"\b": '\\b',
			"\t": '\\t',
			"\n": '\\n',
			"\f": '\\f',
			"\r": '\\r',
			'"' : '\\"',
			"\\": '\\\\'
		};
		 
		function encodeString(source) {
			if (/["\\\x00-\x1f]/.test(source)) {
				source = source.replace(
					/["\\\x00-\x1f]/g, 
					function (match) {
						var c = escapeMap[match];
						if (c) {
							return c;
						}
						c = match.charCodeAt();
						return "\\u00"
								+ Math.floor(c / 16).toString(16) 
								+ (c % 16).toString(16);
					});
			}
			return '"' + source + '"';
		}
		 
		function encodeArray(source) {
			var result = ["["], 
				l = source.length,
				preComma, i, item;
				 
			for (i = 0; i < l; i++) {
				item = source[i];
				 
				switch (typeof item) {
				case "undefined":
				case "function":
				case "unknown":
					break;
				default:
					if(preComma) {
						result.push(',');
					}
					result.push(stringify(item));
					preComma = 1;
				}
			}
			result.push("]");
			return result.join("");
		}
		 
		function pad(source) {
			return source < 10 ? '0' + source : source;
		}
		 
		function encodeDate(source){
			return '"' + source.getFullYear() + "-" 
					+ pad(source.getMonth() + 1) + "-" 
					+ pad(source.getDate()) + "T" 
					+ pad(source.getHours()) + ":" 
					+ pad(source.getMinutes()) + ":" 
					+ pad(source.getSeconds()) + '"';
		}
		
		return function (value) {
			switch (typeof value) {
			case 'undefined':
				return 'undefined';
				 
			case 'number':
				return isFinite(value) ? String(value) : "null";
				 
			case 'string':
				return encodeString(value);
				 
			case 'boolean':
				return String(value);
				 
			default:
				if (value === null) {
					return 'null';
				} else {
					var result = ['{'],
						encode = stringify,
						preComma,
						item;
						 
					for (var key in value) {
						if (Object.prototype.hasOwnProperty.call(value, key)) {
							item = value[key];
							switch (typeof item) {
							case 'undefined':
							case 'unknown':
							case 'function':
								break;
							default:
								if (preComma) {
									result.push(',');
								}
								preComma = 1;
								result.push(encode(key) + ':' + encode(item));
							}
						}
					}
					result.push('}');
					return result.join('');
				}
			}
		};
	})();
	/**
		 * @function tween 动画补间
		 * @param {domEle} DomElement 事件类型
		 * @prarm {obj} json 回调方法引用
	*/
	var tween = function(domEle,obj,times){
		var start = null,
		timer = 500;
		
		function slideDown(domEle) {
			start = new Date().getTime();
			slide(domEle);
		}
		
		function slide(domEle) {
			
			var now = new Date().getTime() - start;
			if(now > timer) {
				if(obj.width || obj.width==0){
					domEle.style.height = obj.width + "px";
				}
				if(obj.height || obj.height==0){
					domEle.style.width  = obj.height + "px";
				}
				if(obj.left || obj.left==0){
					if(obj.direction == "right"){
						domEle.style.left = 0 + "px";
					}else{
						domEle.style.left = obj.left + "px";
					}
				}
				if(obj.top || obj.top==0){
					domEle.style.top  = obj.top + "px";
				}
				return; 
			}
			var step = (1 - Math.cos(now / timer * Math.PI))/2;
			if(obj.width || obj.width==0){
				domEle.style.height = step * obj.width + "px";
			}
			if(obj.height || obj.height==0){
				domEle.style.width  = step * obj.height + "px";
			}
			if(obj.left || obj.left==0){
				if(obj.direction == "right"){
					step = 1-step;
				}
				domEle.style.left = step * obj.left + "px";
			}
			if(obj.top || obj.top==0){
				domEle.style.top  = step * obj.top + "px";
			}
			
			setTimeout(function(){slide(domEle);}, 50);
		}
		slideDown(domEle);
	}
	var getElementsByClassName = function (searchClass, node,tag) {
		if(document.getElementsByClassName){
			return document.getElementsByClassName(searchClass);
		}
		node = node || document;
		tag = tag || "*";
		var classes = searchClass.split(" "),
		elements = node.getElementsByTagName(tag),
		patterns = [],
		returnElements = [],
		current,
		match;
		var i = classes.length;
		while(--i >= 0){
			patterns.push(new RegExp("(^|\\s)" + classes[i] + "(\\s|$)"));
		}
		var j = elements.length;
		while(--j >= 0){
			current = elements[j];
			match = false;
			for(var k=0, kl=patterns.length; k<kl; k++){
				match = patterns[k].test(current.className);
				if (!match)  break;
			}
			if (match)  returnElements.push(current);
		}
		return returnElements;
	}
	
	
	util = {
		stringify:stringify,
		parse:parse,
		dom:dom,
		tween:tween,
		getElementsByClassName:getElementsByClassName
	}
	window.util = util;
})()