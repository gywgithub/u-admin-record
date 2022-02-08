/*!
 * zKeter JavaScript Library v0.2.0
 * https://www.youmias.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://zketer.org/license (Alpha)
 *
 * Date: 2021-06-27T18:00Z
 */

import algor from "./modules/algorithm";      // eslint-disable-line
import ds from "./modules/dataStructure";     // eslint-disable-line
import dp from "./modules/designPattern";     // eslint-disable-line

/**
 * @Description 原生js方法库 - zKeter库
 * @PermissionRange 柚询科技有限公司（https://www.youmias.com/）
 * @Author  zpw
 * @Link    9000@icbf.com.cn  010-67011648  1297416879@qq.com
 * @CreateTime 2021-06-01 18:00
 */
(function(undefined) {         // eslint-disable-line

	"use strict";

	var _global;               // eslint-disable-line

	//将插件对象暴露给全局对象
	_global = (function () {
		return this || (0, eval)("this");
	})();

	if (typeof global === "undefined") {
		window.zKeter = window.$_ = zKeter;
		_global = window;
	}

	//避免 document 之类的全局变量被其他插件修改
	var document = _global.document,
		navigator = _global.navigator,  // eslint-disable-line
		location = _global.location;    // eslint-disable-line

	var zKeter,
		init,
		arr = [],
		classTools = {};

	//节省查找内存地址时间，提高效率
	var slice = arr.slice,                  // eslint-disable-line
		concat = arr.concat,                // eslint-disable-line
		push = arr.push,                    // eslint-disable-line
		indexOf = arr.indexOf,              // eslint-disable-line
		toString = classTools.toString,     // eslint-disable-line
		hasOwn = classTools.hasOwnProperty; // eslint-disable-line

	//将 Date 转化为指定格式的String
	// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
	// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
	// 例子：
	// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
	// (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
	Date.prototype.Format = function (fmt) {
		var o = {
			"M+": this.getMonth() + 1, //月份
			"d+": this.getDate(), //日
			"h+": this.getHours(), //小时
			"m+": this.getMinutes(), //分
			"s+": this.getSeconds(), //秒
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度
			S: this.getMilliseconds(), //毫秒
		};
		if (/(y+)/.test(fmt))
			fmt = fmt.replace(
				RegExp.$1,
				(this.getFullYear() + "").substr(4 - RegExp.$1.length)
			);
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(
					RegExp.$1,
					RegExp.$1.length == 1
						? o[k]
						: ("00" + o[k]).substr(("" + o[k]).length)
				);
		return fmt;
	};

	//将 String中的占位符 转化为指定字符
	// 例子：
	// "hello {0}".format("world"); //log   hello world
	// "我叫{0},性别{1}".format("张三", "男"); //log 我叫张三,性别男
	String.prototype.formatPlaceholder = function () {
		if (arguments.length == 0) return this;
		var param = arguments[0];
		var s = this;
		if (typeof param == "object") {
			for (var key in param)
				s = s.replace(new RegExp("\\{" + key + "\\}", "g"), param[key]);
			return s;
		} else {
			for (var i = 0; i < arguments.length; i++)
				s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
			return s;
		}
	};

	zKeter = function (selector, context) {
		return new zKeter.fn.init(selector);
	};

	zKeter.fn = zKeter.prototype = {
		version: "0.2.0",
		constructor: zKeter,
		ready: function (fn) {
			// Mozilla、Opera和webkit 525+内核支持DOMContentLoaded事件
			if (document.addEventListener) {
				document.addEventListener(
					"DOMContentLoaded",
					function () {
						document.removeEventListener(
							"DOMContentLoaded",
							arguments.callee,
							false
						);
						fn();
					},
					false
				);
			}
			//IE
			else if (document.attachEvent) {
				// 确保当页面是在iframe中加载时，事件依旧会被安全触发
				document.attachEvent("onreadystatechange", function () {
					if (document.readyState == "complete") {
						document.detachEvent(
							"onreadystatechange",
							arguments.callee
						);
						fn();
					}
				});

				// 如果是IE且页面不在iframe中时，轮询调用doScroll 方法检测DOM是否加载完毕
				if (
					document.documentElement.doScroll &&
					typeof _global.frameElement === "undefined"
				) {
					try {
						document.documentElement.doScroll("left");
					} catch (error) {
						return setTimeout(arguments.callee, 20);
					}
					fn();
				}
			}
			return this;
		},
	};

	init = zKeter.fn.init = function (selector) {
		var elem, length;

		//$(""), $(null), $(undefined), $(false)
		if (!selector) {
			return this;
		}

		//判断selector是否为字符串
		if (typeof selector === "string") {
			//Class选择器
			if (selector.indexOf(".") > -1) {
				elem = document.querySelectorAll(selector);
				for (var i = 0, len = elem.length; i < len; i++) {
					this[i] = elem[i];
				}
				length = len;
			}
			//ID选择器
			else if (selector.indexOf("#") > -1) {
				elem = document.querySelector(selector);
				this[0] = elem;
				length = 1;
			}
			//HTML标签
			else {
				elem = document.querySelectorAll(selector);
				for (var i = 0, len = elem.length; i < len; i++) { // eslint-disable-line
					this[i] = elem[i];
				}
				length = len;
			}
		}
		//判断selector是否为DOMElement
		else if (selector.nodeType) {
			elem = selector;
			length = 1;
		}

		this.length = length;
		this.context = document;
		this.selector = selector;
		return this;
	};

	init.prototype = zKeter.fn;

	//扩展合并函数
	zKeter.extend = zKeter.fn.extend = function () {
		var key,
			target = this,
			source = arguments[0] || {};

		for (key in source) {
			if (hasOwn.call(source, key)) {
				if (typeof source[key] === "object") {
					target[key] = source[key].constructor === Array ? [] : {};
					arguments.callee(source[key], target[key]);
				} else {
					target[key] = source[key];
				}
			}
		}
		return target;
	};

	//扩展静态方法
	zKeter.extend({
		version: "0.2.0",
		//生成Hash值  只有数字，规则和java的hashcode规则相同
		generateHashCode: function (str) {
			var h = 0;
			var len = str.length;
			var t = 2147483648;
			for (var i = 0; i < len; i++) {
				h = 31 * h + str.charCodeAt(i);
				if (h > 2147483647) h %= t; //java int溢出则取模
			}
			return h;
		},
		//生成小写字母随机组合
		//时间戳来自客户端，精确到毫秒，但仍旧有可能在在多线程下有并发，
		//尤其hash化后，毫秒数前面的几位都不变化，导致不同日期hash化的值有可能存在相同，
		//因此使用下面的随机数函数，在时间戳上加随机数，保证hash化的结果差异会比较大
		/*
		 ** randomWord 产生任意长度随机字母数字组合
		 ** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
		 ** 用法  randomWord(false,6);规定位数 flash
		 *      randomWord(true,3，6);长度不定，true
		 * arr变量可以把其他字符加入，如以后需要小写字母，直接加入即可
		 */
		randomWord: function (randomFlag, min, max) {
			var str = "",
				range = min,
				pos = 0,
				arr = [
					"a",
					"b",
					"c",
					"d",
					"e",
					"f",
					"g",
					"h",
					"i",
					"j",
					"k",
					"l",
					"m",
					"n",
					"o",
					"p",
					"q",
					"r",
					"s",
					"t",
					"u",
					"v",
					"w",
					"x",
					"y",
					"z",
				];
			// 随机产生
			if (randomFlag) {
				range = Math.round(Math.random() * (max - min)) + min;
			}
			for (var i = 0; i < range; i++) {
				pos = Math.round(Math.random() * (arr.length - 1));
				str += arr[pos];
			}
			return str;
		},
		//生成Hash值  多线程下，保证hashCode的精准度
		gethashcode() {
			//定义一个时间戳，计算与1970年相差的毫秒数  用来获得唯一时间
			// var timestamp = new Date().valueOf();
			// var myRandom = zKeter.randomWord(false, 6);
			// var hashcode = zKeter.generateHashCode(
			// 	myRandom + timestamp.toString()
			// );
			// return hashcode;
			var myRandom = zKeter.randomWord(false, 32);
			return myRandom;
		},
		//数组对象去重
		/*
		 ** arr 要去重的数组
		 ** idKey 去重时比对的唯一标识符
		 ** 示例： var selfArray = [{"name":1},{"name":2},{"name":2},{"name":3},{"name":3}];
		 **		   var unrepeat = unDuplication(arr,name);
		 **	输出：console.log(unrepeat); //[{"name":1},{"name":2},{"name":3}]
		 */
		unDuplication(arr, idKey) {
			let result = {};
			let finalResult = [];
			for (let i = 0; i < arr.length; i++) {
				result[arr[i][idKey]] = arr[i];
			}
			for (let item in result) {
				finalResult.push(result[item]);
			}
			return finalResult;
		},
		//检测类名是否存在
		hasClass: function (ele, cls) {
			return !!ele.className.match(
				new RegExp("(\\s|^)" + cls + "(\\s|$)")
			);
		},
		//移除类名
		removeClass: function (ele, cls) {
			if (zKeter.hasClass(ele, cls)) {
				var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
				ele.className = ele.className.replace(reg, " ");
			}
		},
		//添加类名
		addClass: function (ele, cls) {
			if (!zKeter.hasClass(ele, cls)) ele.className += " " + cls;
		},
		//快速排序
		quickSort: function (arr) {
			if (arr.length <= 1) return arr;
			var mid = ~~(arr.length / 2),
				midVal = arr.splice(mid, 1)[0],
				left = [],
				right = [];
			arr.forEach(function (item) {
				item > midVal ? right.push(item) : left.push(item);
			});
			return zKeter
				.quickSort(left)
				.concat(midVal, zKeter.quickSort(right));
		},
		/**
		 * @Author zpw
		 * @Describe 替换任意HTML标签中任意属性的值 (ES6 之前版本不支持)
		 * @version 1.0.0
		 * @Date 2021/09/01 15:00
		 * @Params tagName : HTML标签名称
		 * 		   sourceString : 被替换的字符串
		 * 		   propertyName : 被替换的属性名称
		 * 		   targetString : 目标字符串（默认替换为空字符串）
		 * 		   primitive : 获取更多正则表达式原始匹配信息
		 *
		 * @Example    var s1 = '<p data-date="helloWorld" style="color:red;">hello world</p>'
		 * @Use		   replaceHtmlAnyProperty("p",s1,"data-date",'hello');
		 * 			   replaceHtmlAnyProperty("p",s1,"style",'font-size:14px;');
		 *
		 * @Example	   var s2 = '<img src="helloWorld" alt="helloWorld">hello world />'
		 * @Use		   replaceHtmlAnyProperty("img",s2,"src",'hello');
		 * 			   replaceHtmlAnyProperty("img",s2,"alt",'world');
		 */
		replaceHtmlAnyProperty: function (
			tagName,
			sourceString,
			propertyName,
			targetString,
			primitive
		) {
			let source = sourceString,
				split = "",
				result = [],
				reg = new RegExp(
					`(.*?)<${tagName}.+?${propertyName}=('|")(.*?)\\2.*?>([^<]*)`,
					"gi"
				);
			while ((split = reg.exec(source))) {
				sourceString = sourceString.replace(
					split[3],
					targetString ? targetString : ""
				);
				result = split;
			}
			return primitive ? result : sourceString;
		},
		//深拷贝
		deepClone: function (
			origin,
			target
		) /*origin是被克隆对象，target是目标对象*/ {
			var target = target || {};  // eslint-disable-line
			for (var key in origin) {
				if (origin.hasOwnProperty(key)) {  // eslint-disable-line
					if (Array.isArray(origin[key])) {
						//如果是数组
						target[key] = [];
						zKeter.deepClone(origin[key], target[key]);
					} else if (
						typeof origin[key] === "object" &&
						origin[key] !== null
					) {
						target[key] = {};
						zKeter.deepClone(origin[key], target[key]);
					} else {
						target[key] = origin[key];
					}
				}
			}
			return target;
		},
		print: function () {
			return {
				success: function (str) {
					console.log(`%c${str}`, "color:#67c23a");
				},
				warring: function (str) {
					console.warn(`%c${str}`, "color:#E6A23C");
				},
				error: function (str) {
					console.error(`%c${str}`, "color:#F56C6C");
				},
				info: function (str) {
					console.info(`%c${str}`, "color:#66b1ff");
				},
			};
		},
		check: function (chinese, value) {
			// str.replace(/\s*/g, '') //去掉所有空格，包括首尾、中间
			// str.replace(/\ +/g, ""); // 去除 空格
			// str.replace(/[\r\n]/g, ""); // 去除 换行符
			// str.trim(); //去掉首尾空格
			// str.replace(" ",""); //去除所有空格，包括首尾、中间
			// str.replaceAll(" ", ""); //去掉所有空格，包括首尾、中间
			// str.replaceAll(" +","");  //去掉所有空格，包括首尾、中间
			// str.replaceAll("\\s*", ""); //可以替换大部分空白字符， 不限于空格

			/**
			 *	^-?[1-9]\d*$//匹配整数
			 *	/^\d+(?=\.{0,1}\d+$|$)/ 大于等于0的正数
			 *  /^(0|[1-9][0-9]*)$/ 大于等于0的正整数
			 *	^[1-9]\d*|0$//匹配非负整数（正整数 + 0）
			 *	^-[1-9]\d*|0$//匹配非正整数（负整数 + 0）
			 *	^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$//匹配正浮点数
			 *	^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$//匹配负浮点数
			 *	^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$//匹配浮点数
			 *	^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$//匹配非负浮点数（正浮点数 + 0）
			 *	^(-([1-9]\d*\.\d*|0\.\d*[1-9]\d*))|0?\.0+|0$//匹配非正浮点数（负浮点数 + 0）
			 */
			zKeter
				.print()
				.info(
					"https://zketer.org/license (Alpha) 正则的使用请移步至 ~/src/utils/native/index.js"
				);
			switch (chinese) {
				case "正整数":
					return /^([1-9][0-9]*)$/.test(value); //匹配正整数
				case "正整数含零":
					return /^([1-9]\d*|[0]{1,1})$/.test(value); //匹配正整数含零
				case "负整数":
					return /^-[1-9]\d*$/.test(value); //匹配负整数
				case "空格":
					return /^\s+$/g.test(value); //匹配空格
				case "网址":
					return /^(?:(http|https|ftp):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i.test(
						value
					);
				default:
					console.log(
						`Sorry, Please see ~/src/utils/native/index.js`
					);
			}
		},
	});

	//扩展实例方法
	zKeter.fn.extend({});

	//是否存在模块加载器,譬如：require、seajs，
	//如果存在加载器，我们就使用加载器; 如果不存在加载器。我们就使用顶级域对象
	if (typeof module !== "undefined" && module.exports) {
		module.exports = zKeter;
	} else if (typeof define === "function" && define.amd) {  // eslint-disable-line
		define(function() {                                   // eslint-disable-line
			return zKeter;
		});
	} else {
		!("zKeter" in _global) && (_global.zKeter = _global.$_z = zKeter);
	}
})();
