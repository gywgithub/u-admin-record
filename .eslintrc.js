/*
 * @Description     本配置文件默认使用eslint:recommended推荐规则
 * @Author          zpw
 * @CreateTime      2021-06-15 15:30
 **/
module.exports = {
	/*
	 * 默认情况下，ESLint 会在所有父级目录里寻找配置文件，一直到根目录。
	 * 如果你想要ESLint停止在父级目录中寻找，则需要在项目根目录下的package.json文件或者.eslintrc.*文件里eslintConfig字段下设置"root": true。
	 * ESLint 一旦发现配置文件中有"root": true，它就会停止在父级目录中寻找了。
	 * */
	root: true, //限制esLint遍历寻找配置文件
	parserOptions: /* 指定你想要支持的 JavaScript 语言版本 */ {
		parser: "babel-eslint", //指定一个不同的解析器; ESLint默认使用Espree作为其解析器
		sourceType: "module", // 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)
	},
	env: /* 指定脚本的运行环境 */ {
		browser: true, //支持浏览器环境
		node: true, //支持node环境
		es6: true, //支持es6环境
	},
	//plugin:vue/recommended     详见：https://eslint.vuejs.org/rules/           -   Vue.js的官方 ESLint 插件
	//eslint:recommended         详见：https://eslint.bootcss.com/docs/rules/    -   ESLint完整规则配置列表
	extends: [
		"plugin:vue/essential",
		"plugin:prettier/recommended",
		"eslint:recommended",
	], //ESLint递归地继承扩展lint配置

	/*
	 * "off" 或 0 -   关闭规则
	 * "warn" 或 1 -  开启规则，使用警告级别的错误：warn (不会导致程序退出)
	 * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
	 **/
	rules: /* 自定义规则 */ {
		"prettier/prettier": "error",
		"no-console": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-unused-vars": [
			2,
			{
				vars: "all", //只检测变量包括全局变量
				args: "none", //不检测参数
			},
		],

		//更多规则......
	},
};
