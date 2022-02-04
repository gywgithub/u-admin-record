/*!
 * description zKeter库 - 数据结构合集
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://zketer.org/license (Alpha)
 *
 * Date: 2021-06-28T11:00Z
 */

/**
 * @Description 单链表
 * @Author  zpw
 * @sign    Alpha
 * @Version 0.9.0
 * @Link    1297416879@qq.com
 * @Date    2021-06-28 09:00
 * @Use     let myList = new SingleList();
            let arr = [3, 4, 5, 6, 7, 8, 9];
            for(let i=0; i<arr.length; i++){
                myList.append(arr[i]);
            }
            myList.display();  // head->3->4->5->6->7->8->9
            console.log(myList.find(4));  // Node {data: 4, prev: null, next: Node}

            myList.insert(9, 9.1);
            myList.insert(3, 3.1);
            myList.display();  // head->3->3.1->4->5->6->7->8->9->9.1

            myList.remove(9.1);
            myList.remove(3);
            myList.display();  // head->3.1->4->5->6->7->8->9

            console.log(myList.findLast());  // Node {data: 9, prev: null, next: null}
            console.log(myList.advance(4));  // Node {data: 6, prev: null, next: Node}
            console.log(myList.getLength());  // 7

            myList.clear();
            myList.display();  // head
 * 
 */
const SingleList = (arr) => {
	function Node(data) {
		this.data = data;
		this.prev = null;
		this.next = null;
	}

	this.size = 0; // 单链表的长度
	this.head = new Node("head"); // 表头节点
	this.currNode = ""; // 当前节点的指向

	// 判断单链表是否为空
	function isEmpty() {
		return this.size === 0;
	}

	// 获取单链表的最后一个节点
	function findLast() {
		let currNode = this.head;

		while (currNode.next) {
			currNode = currNode.next;
		}

		return currNode;
	}

	// 单链表的遍历显示
	function display() {
		let result = "";
		let currNode = this.head;

		while (currNode) {
			result += currNode.data;
			currNode = currNode.next;
			if (currNode) {
				result += "->";
			}
		}
		console.log(result);
	}

	// 从当前位置向前移动 n 个节点。
	function advance(n, currNode = this.head) {
		this.currNode = currNode;

		while (n-- && this.currNode.next) {
			this.currNode = this.currNode.next;
		}

		return this.currNode;
	}

	// 在单链表中寻找item元素
	function find(item) {
		let currNode = this.head;

		while (currNode && currNode.data !== item) {
			currNode = currNode.next;
		}

		return currNode;
	}

	// 显示当前节点
	function show() {
		console.log(this.currNode.data);
	}

	// 获取单链表的长度
	function getLength() {
		return this.size;
	}

	// 向单链表中插入元素
	function insert(item, element) {
		let itemNode = find(item);

		if (!itemNode) {
			// 如果item元素不存在
			return;
		}

		let newNode = new Node(element);

		newNode.next = itemNode.next; // 若currNode为最后一个节点，则currNode.next为空
		itemNode.next = newNode;

		this.size++;
	}

	// 在单链表中删除一个节点
	function remove(item) {
		if (!find(item)) {
			// item元素在单链表中不存在时
			return;
		}

		// 企图删除头结点
		if (item === "head") {
			if (!isEmpty()) {
				return;
			} else {
				this.head.next = null;
				return;
			}
		}

		let currNode = this.head;

		while (currNode.next.data !== item) {
			// 企图删除不存在的节点
			if (!currNode.next) {
				return;
			}
			currNode = currNode.next;
		}

		currNode.next = currNode.next.next;
		this.size--;
	}

	// 在单链表的尾部添加元素
	function append(element) {
		let currNode = findLast();
		let newNode = new Node(element);

		currNode.next = newNode;
		this.size++;
	}

	// 清空单链表
	function clear() {
		this.head.next = null;
		this.size = 0;
	}
};

export default { SingleList };
