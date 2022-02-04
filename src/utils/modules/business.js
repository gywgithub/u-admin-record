/**
 * @Description zKeter库 - 业务
 * @PermissionRange 华睿智（北京）科技有限公司（https://www.icbf.com.cn/）
 * @Author  zpw
 * @Link    9000@icbf.com.cn  010-67011648  1297416879@qq.com
 * @CreateTime 2021-06-28 09:00
 */
import { Message, Loading } from "element-ui";
import "../native";

/**
 * @Desc 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes 前端要对比的路由数组
 * @param diffRouter 和前端路由数组【routes】进行对比的后端数据
 */
const filterAsyncRouter = (routes, data) => {
	/**
	 * 通过meta.title判断是否与当前用户权限匹配
	 * @param rearData  后端的全部数据
	 * @param currRoute  递归的当前前端路由
	 */
	function hasPermissionFn(rearData, currRoute) {
		return rearData.some((element, index, array) => {
			return element.name == currRoute.meta.title;
		});
	}

	for (let i = 0; i < routes.length; i++) {
		const tmpRoute = routes[i];
		const tmpData = data[i];
		if (!hasPermissionFn(data, tmpRoute)) {
			routes.splice(i, 1);
			i--;
		} else {
			if (tmpRoute.children) {
				tmpRoute.children = filterAsyncRouter(
					tmpRoute.children,
					tmpData.children
				);
			}
		}
	}
	return routes;
};

/**
 * @Desc 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes 前端路由数组
 * @param diffRouter 和前端路由数组对比的后端数据
 * @param diffDataProperty   要和后端返回的那个字段做对比 默认值：name
 * @param diffRouteProperty  前端要用那个字段和后端的字段对比 默认值：title
 */
const filterMenuRouter = (
	routes,
	data,
	diffDataProperty = "name",
	diffRouteProperty = "title"
) => {
	/**
	 * 通过meta.title判断是否与当前用户权限匹配
	 * @param rearData  后端的全部数据
	 * @param currRoute  递归的当前前端路由
	 */
	function hasPermissionFn(rearData, currRoute) {
		return rearData.some((element, index, array) => {
			return element[diffDataProperty] == currRoute[diffRouteProperty];
		});
	}

	for (let i = 0; i < routes.length; i++) {
		const tmpRoute = routes[i];
		const tmpData = data[i];
		if (!hasPermissionFn(data, tmpRoute)) {
			routes.splice(i, 1);
			i--;
		} else {
			if (tmpRoute.children) {
				tmpRoute.children = filterMenuRouter(
					tmpRoute.children,
					tmpData.Children,
					diffDataProperty,
					diffRouteProperty
				);
			}
		}
	}
	return routes;
};

const isExternal = (path) => {
	return /^(https?:|mailto:|tel:)/.test(path);
};
/**
 * @Desc 查询权限,支持验证多个权限
 * @param ctrlPath 功能对应接口的全路径
 */
const queryPermission = function queryPermission(ctrlPath) {
	let browserStorage = localStorage.getItem("zebraGuard").split(","),
		argData = Array.prototype.slice.apply(arguments), // eslint-disable-line
		argLen = arguments.length, // eslint-disable-line
		count = 0;
	if (browserStorage && argLen != 0) {
		if (argLen == 1) {
			return browserStorage.some((item) => {
				return item === ctrlPath;
			});
		} else {
			browserStorage.forEach((item) => {
				argData.forEach(function (argItem) {
					if (item === argItem) {
						count++;
					}
				});
			});
			return argLen == count;
		}
	} else {
		return { message: "验证权限异常" };
	}
};

const infoMsg = (message) => {
	Message({
		message: `${message}`,
		center: true,
		dangerouslyUseHTMLString: true,
		showClose: false,
		duration: 3000,
		offset: 70,
		type: "info",
	});
};

const warningMsg = (message) => {
	Message({
		message: `${message}`,
		center: true,
		dangerouslyUseHTMLString: true,
		showClose: false,
		duration: 3000,
		offset: 70,
		type: "warning",
	});
};

const successMsg = (message) => {
	Message({
		message: `${message}`,
		center: true,
		dangerouslyUseHTMLString: true,
		showClose: false,
		duration: 3000,
		offset: 70,
		type: "success",
	});
};

const errorMsg = (message) => {
	Message({
		message: `${message}`,
		center: true,
		dangerouslyUseHTMLString: true,
		showClose: false,
		duration: 3000,
		offset: 70,
		type: "error",
	});
};

//data:数据
//exportFiledEnglishArray: 需要导出的字段英文名
//exportFiledMappingChineseArray: 需要导出的字段英文名映射中文
const hanndleExportData = (
	data,
	exportFiledEnglishArray,
	exportFiledMappingChineseArray
) => {
	let firstDataKeys = Object.keys(data[0]),
		json = [],
		result = [];
	zKeter.deepClone(data, json);  // eslint-disable-line

	//saveFiled ：要导出的字段（无序的）   unSaveFiled：不导出的字段（无序的）
	//exportFiledEnglishArray ：要导出的字段（有序的）  exportFiledMappingChineseArray: 要导出的字段对应中文（有序的）
	let saveFiled = [],
		unSaveFiled = [];

	for (let j = 0; j < firstDataKeys.length; j++) {
		if (exportFiledEnglishArray.indexOf(firstDataKeys[j]) == -1) {
			unSaveFiled.push(firstDataKeys[j]);
		} else {
			saveFiled.push(firstDataKeys[j]);
		}
	}
	for (let i = 0; i < json.length; i++) {
		let temp = {};
		for (let j = 0; j < exportFiledEnglishArray.length; j++) {
			temp[exportFiledMappingChineseArray[j]] =
				json[i][exportFiledEnglishArray[j]];
		}
		result.push(temp);
	}

	return {
		data: result,
		saveFiled: saveFiled,
		unSaveFiled: unSaveFiled,
	};
};

//按对象任意字段过滤数据，再合并在一起
//fillterArray : 要过滤的数据，动态数据必须放在数组最前面 必须是[{name:"小明"},{name:"小华"},{name:"小来"}] 这种数据结构
//diffSource  :  要对比的数据  必须是[{},{},{}]； 无其它要求
//diffArray : 选中的数据  必须是['小明','','小华','小来'] 这种数据结构
//diffFiled : 要对比的具体字段 比如：name (就是上面的name)
const fillterAndMergeArray = (
	fillterArray,
	diffSource,
	diffArray,
	diffFiled
) => {
	let data = [],
		diff = [],
		dataLen = fillterArray.length,
		diffLen = diffSource.length,
		unMakeDiffLen = dataLen - diffLen,
		staticData = [],
		result = [];
	zKeter.deepClone(fillterArray, data); // eslint-disable-line
	zKeter.deepClone(diffSource, diff); // eslint-disable-line
	for (let i = 0; i < dataLen - unMakeDiffLen; i++) {
		let temp = data[i][diffFiled];
		if (diffArray.indexOf(temp) !== -1) {
			result.push(data[i]);
		}
	}
	for (let j = unMakeDiffLen; j > 0; j--) {
		staticData.push(data[dataLen - j]);
	}
	return result.concat(staticData);
};

//data : 数据源
//titleData : 表头数据
//fillterFiled : //要开启过滤的字段，对应titleData中的prop属性
const fillFillterData = (data, titleData, fillterFiled) => {
	let dataCopy = [],
		titleCopy = [],
		fillterCopy = [];
	zKeter.deepClone(data, dataCopy);   // eslint-disable-line
	zKeter.deepClone(titleData, titleCopy);  // eslint-disable-line
	zKeter.deepClone(fillterFiled, fillterCopy);  // eslint-disable-line
	for (let i = 0; i < titleCopy.length; i++) {
		let titleItem = titleCopy[i];
		let titleProp = titleCopy[i].prop;
		for (let j = 0; j < dataCopy.length; j++) {
			if (fillterCopy.indexOf(titleProp) !== -1) {
				titleItem.filterData.push({
					text: dataCopy[j][titleProp],
					value: dataCopy[j][titleProp],
				});
			}
		}
	}

	//去重
	for (let i = 0; i < titleCopy.length; i++) {
		let repeatArray = titleCopy[i].filterData;
		titleCopy[i].filterData = zKeter.unDuplication(repeatArray, "value");  // eslint-disable-line
	}

	return titleCopy;
};

let loadingInstance;
const openLoading = () => {
	loadingInstance = Loading.service({ background: "transparent" });
};
const closeLoading = () => {
	loadingInstance.close();
};

//dataArray: 要被转换的数据
//defendantTransFiledsArray : 要被转换的key名称 [keyName,keyName,keyName]
//transFiledsArray : 要转换成的key名称 [keyName,keyName,keyName]
//@imptant  @imptant   @imptant  defendantTransFiledsArray 和 transFiledsArray 顺序必须一致
const replaceFileds = (
	dataArray,
	defendantTransFiledsArray,
	transFiledsArray
) => {
	let result = [];
	for (let i = 0; i < dataArray.length; i++) {
		let temp = {};
		for (let j = 0; j < transFiledsArray.length; j++) {
			temp[transFiledsArray[j]] =
				dataArray[i][defendantTransFiledsArray[j]];
		}
		result.push(temp);
	}
	return result;
};

//不可用，未完善
const promiseFactory = (fn) => {
	return new Promise((resolve, reject) => {
		fn();
	});
};

//数组对象排序
const compare = (field) => {
	return function (m, n) {
		var a = m[field];
		var b = n[field];
		return a - b; //升序
	};
};
/**
 * @Desc 生成日志（预留）
 * @param sourcePage, msg, codeLine, errorLevel
 * @param sourcePage 日志所属页面
 * @param msg 日志具体信息
 * @param codeLine 日志对应行号
 * @param errorLevel 日志级别 （预留  info : 黑色  warring : 黄色  error : 红色）
 *
 */
const createLog = (logger) => {
	let loggerConfig = {
		sourcePage: "斑马",
		codeLine: "-1",
		msg: "斑马系统",
		errorLevel: "info",
	};
	let logInstance = Object.assign(loggerConfig, logger);
	if (logInstance.codeLine == "-1") return;
	let prefixLog = `================ #start ${logInstance.sourcePage} ================`;
	let codeLineLog = `第${logInstance.codeLine}行`;
	let suffixLog = `================ #start ${logInstance.sourcePage} ================`;
	let infomation = `${logInstance.msg} ${codeLineLog}`;
	console.log(prefixLog);
	switch (logInstance.errorLevel) {
		case "info":
			console.log(`%c${infomation}`, "color:#000000");
			break;
		case "warring":
			console.log(`%c${infomation}`, "color:#ffeb3b");
			break;
		case "error":
			console.log(`%c${infomation}`, "color:#f44336");
			break;
		default:
			console.log(`%c${infomation}`, "color:#000000");
	}
	console.log(suffixLog);
};

export default {
	filterRouter: filterAsyncRouter,
	filterMenuRouter: filterMenuRouter,
	isExternal: isExternal,
	checkPermission: queryPermission,
	infoMsg: infoMsg,
	warningMsg: warningMsg,
	successMsg: successMsg,
	errorMsg: errorMsg,
	hanndleExportData: hanndleExportData,
	fillterAndMergeArray: fillterAndMergeArray,
	fillFillterData: fillFillterData,
	openLoading: openLoading,
	closeLoading: closeLoading,
	replaceFileds: replaceFileds,
	promiseFactory: promiseFactory,
	compare: compare,
	createLog: createLog,
};
