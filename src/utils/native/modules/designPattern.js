/*!
 * description zKeter库 - 设计模式合集
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://zketer.org/license (Alpha)
 *
 * Date: 2021-06-28T11:00Z
 */

/**
 * @Description 单例
 * @Author  zpw
 * @Version 1.0.0
 * @sign    Alpha
 * @Link    1297416879@qq.com
 * @Date    2021-06-28 09:00
 */
const Singleton = (fn) => {
	var instance;
	return function () {
		// 通过apply的方式收集参数并执行传入的参数将结果返回
		return instance || (instance = fn.apply(this, arguments));
	};
};
export default Singleton;
