/*!
 * description zKeter库 - 算法合集
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://zketer.org/license (Alpha)
 *
 * Date: 2021-06-28T11:00Z
 */

/**
 * @Description 快速排序
 * @Author  zpw
 * @Version 1.0.0
 * @sign    Alpha
 * @Link    1297416879@qq.com
 * @Date    2021-06-28 09:00
 */
const quickSort = (arr) => {
	if (arr.length <= 1) return arr;
	var mid = ~~(arr.length / 2),
		midVal = arr.splice(mid, 1)[0],
		left = [],
		right = [];
	arr.forEach(function (item) {
		item > midVal ? right.push(item) : left.push(item);
	});
	return quickSort(left).concat(midVal, quickSort(right));
};

/**
 * @Description 广度优先遍历
 * @Author  zpw
 * @Version 0.8.0
 * @sign    Alpha
 * @Link    1297416879@qq.com
 * @Date    2021-06-28 09:00
 */
const findPathBFS = (source, goal) => {
	// 深拷贝原始数据
	var dataSource = JSON.parse(JSON.stringify(source));
	var res = [];
	// 每一层的数据都 push 进 res
	res.push(...dataSource);
	// res 动态增加长度
	for (var i = 0; i < res.length; i++) {
		var curData = res[i];
		// 匹配成功
		if (curData.value === goal) {
			var result = [];
			// 返回当前对象及其父节点所组成的结果
			return (function findParent(data) {
				result.unshift(data.key);
				if (data.parent) return findParent(data.parent);
				return result;
			})(curData);
		}
		// 如果有 children 则 push 进 res 中待搜索
		if (curData.children) {
			res.push(
				...curData.children.map((d) => {
					// 在每一个数据中增加 parent，为了记录路径使用
					d.parent = curData;
					return d;
				})
			);
		}
	}
	// 没有搜索到结果，默认返回空数组
	return [];
};

/**
 * @Description 深度优先遍历
 * @Author  zpw
 * @Version 0.8.0
 * @sign    Alpha
 * @Link    1297416879@qq.com
 * @Date    2021-06-28 09:00
 */
const findPathDFS = (source, goal) => {
	// 因为会改变原数据，因此做深拷贝处理
	var dataSource = JSON.parse(JSON.stringify(source));
	var res = [];
	return (function dfs(data) {
		res.push(data);
		// 深度搜索一条数据，存取在数组 res 中
		if (data.children) return dfs(data.children[0]);
		// 匹配成功
		if (res[res.length - 1].value === goal) {
			return res.map((r) => r.key);
		}
		// 匹配失败则删掉当前比对的节点
		res.pop();
		// 没有匹配到任何值则 return，如果源数据有值则再次深度搜索
		if (!res.length)
			return dataSource.length ? dfs(dataSource.shift()) : res;
		// 取得最后一个节点，待做再次匹配
		var lastNode = res[res.length - 1];
		// 删除已经匹配失败的节点（即为上面 res.pop() 的内容）
		lastNode.children.shift();
		// 没有 children 时
		if (!lastNode.children.length) {
			// 删除空 children，且此时需要深度搜索的为 res 的最后一个值
			delete lastNode.children;
			return dfs(res.pop());
		}
		return dfs(lastNode.children[0]);
	})(dataSource.shift());
};
export default { findPathBFS, quickSort, findPathDFS };
