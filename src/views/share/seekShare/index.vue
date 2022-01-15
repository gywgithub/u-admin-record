<template>
	<div class="add-share">
		<el-form ref="form" :model="form" :rules="rules" label-width="100px">
			<el-form-item label="主标题" prop="title">
				<el-row>
					<el-col :span="6">
						<el-input
							v-model="form.title"
							maxlength="30"
							placeholder="最多30字"
						></el-input>
					</el-col>
				</el-row>
			</el-form-item>
			<el-form-item label="所属类别" prop="isSelectProfession">
				<el-row>
					<el-col :span="6">
						<el-cascader
							ref="mycascader"
							v-model="form.isSelectProfession"
							style="width: 80%"
							:props="customProp"
							filterable
							:options="categoryList"
							:clearable="true"
							placeholder="输入文字可搜素"
							@change="getProfession"
						></el-cascader>
						<el-link
							type="primary"
							@click="openInTreeList"
							class="ml20"
							:underline="false"
							>未找到?</el-link
						>
					</el-col>
				</el-row>
			</el-form-item>
			<el-form-item
				label="价值共享"
				prop="shareMode"
				class="vab-quill-content"
			>
				<div class="mt8">
					<el-radio-group v-model="form.shareMode">
						<el-radio :label="1">
							共享模式
							<el-popover
								placement="right"
								title="规则"
								width="300"
								trigger="click"
							>
								<p>
									1:
									您的打赏中90%(100%-10%)的象币将按一定比例90天内分享给每位分享者
									<el-tooltip
										class="item"
										effect="dark"
										content="算法： 每位分享者所得到的象币 = 发起者打赏象币的90% * 分享者个人获得的点赞数 / 所有分享者的总点赞数"
										placement="top-start"
									>
										<el-link
											icon="el-icon-question"
											:underline="false"
										></el-link>
									</el-tooltip>
								</p>
								<p>
									2:
									您自己将会得到自己打赏自己的10%(既上面的10%)象币，因为发起分享的人，属于分享者的一种特殊群体
								</p>
								<p>
									3:
									只要有人打赏您发起的分享，或打赏您名下分享者的经验时，您都将固定获得打赏人总象币的10%;
									&nbsp;&nbsp;&nbsp;
									<b style="color: red">且是永久的</b>
								</p>
								<p>
									4:
									上架中的经验分享将在180天后，自动转为付费模式（0.1元/次）
								</p>
								<el-button
									slot="reference"
									class="tipRule"
									icon="el-icon-question"
								></el-button>
							</el-popover>
						</el-radio>
						<el-radio :label="2">
							打赏模式
							<el-popover
								placement="right"
								title="规则"
								width="300"
								trigger="click"
							>
								<p>
									1:
									您打赏的象币将按一定比例90天内全部分享给每位分享者
									<el-tooltip
										class="item"
										effect="dark"
										content="算法： 每位分享者所得到的象币 = 发起者打赏象币的100% * 分享者个人获得的点赞数 / 所有分享者的总点赞数"
										placement="top-start"
									>
										<el-link
											icon="el-icon-question"
											:underline="false"
										></el-link>
									</el-tooltip>
								</p>
								<p>
									2:上架中的经验分享将在180天后，自动转为付费模式（0.1元/次）
								</p>
								<el-button
									slot="reference"
									class="tipRule"
									icon="el-icon-question"
								></el-button>
							</el-popover>
						</el-radio>
					</el-radio-group>
				</div>
			</el-form-item>
			<el-form-item label="打赏额度" prop="bounty">
				<el-row>
					<el-col :span="6">
						<el-input
							v-model="form.bounty"
							placeholder="1人民币= 10象币"
							suffix-icon="el-icon-potato-strips"
							type="text"
							max-length="6"
						></el-input>
					</el-col>
				</el-row>
			</el-form-item>
			<el-form-item
				label="话题描述"
				prop="content"
				class="vab-quill-content"
			>
				<el-row>
					<el-col :span="8">
						<el-input
							v-model="form.content"
							type="textarea"
							maxlength="300"
							show-word-limit
							:autosize="{ minRows: 8 }"
							placeholder="限300字"
						></el-input>
					</el-col>
				</el-row>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleSave">提 交</el-button>
				<el-button type="primary" @click="handleSee"
					>预览效果</el-button
				>
			</el-form-item>
		</el-form>
		<el-dialog title="预览" :visible.sync="dialogTableVisible">
			<div style="min-height: 60vh">
				<h3 class="news-title mb40">{{ form.title }}</h3>
				<el-descriptions class="mb40" title="" :column="2" border>
					<el-descriptions-item>
						<template slot="label">
							<i class="el-icon-user"></i>
							登录用户
						</template>
						张盼伟
					</el-descriptions-item>
					<el-descriptions-item>
						<template slot="label">
							<i class="el-icon-menu"></i>
							所属类别
						</template>
						{{ pathLabelsArray[0] }}/
						{{ pathLabelsArray[1] }}
					</el-descriptions-item>
					<el-descriptions-item>
						<template slot="label">
							<i class="el-icon-refresh"></i>
							价值共享
						</template>
						{{ form.shareMode == 1 ? "共享模式" : "打赏模式" }}
					</el-descriptions-item>
					<el-descriptions-item>
						<template slot="label">
							<i class="el-icon-money"></i>
							打赏金额
						</template>
						{{ form.bounty }}象币
					</el-descriptions-item>
				</el-descriptions>
				<div class="news-content" v-html="form.content"></div>
			</div>
		</el-dialog>
		<el-dialog
			v-dialogDrag
			:title="remarkDialogTitle"
			:visible.sync="dialogVisible"
			:close-on-click-modal="unModalFaceBack"
			width="520px"
			:before-close="handleClose"
		>
			<el-input
				v-model="filterText"
				class="mb20"
				placeholder="输入名称即可搜索"
			></el-input>
			<div class="addShare-treeEditStyle">
				<el-tree
					ref="cateTree"
					:data="treeData"
					node-key="id"
					class="mb20"
					show-checkbox
					:default-expanded-keys="[]"
					:default-checked-keys="[]"
					@check-change="handleCheckChange"
					@node-drag-start="handleDragStart"
					@node-drag-enter="handleDragEnter"
					@node-drag-leave="handleDragLeave"
					@node-drag-over="handleDragOver"
					@node-drag-end="handleDragEnd"
					@node-drop="handleDrop"
					:render-content="renderContent"
					:filter-node-method="filterNode"
					:draggable="false"
					:allow-drop="allowDrop"
					:allow-drag="allowDrag"
				>
				</el-tree>
			</div>
			<el-button type="primary" @click="confirmTreeValue"
				>提 交</el-button
			>
		</el-dialog>
		<el-dialog
			:title="nodeNameDialogTitle"
			:visible.sync="dialognodeNameVisible"
			:close-on-click-modal="unModalFaceBack"
			width="520px"
			:before-close="handleCloseAddName"
		>
			<el-form
				ref="treeNewform"
				:model="treeNewNameForm"
				:rules="treeNewNameRules"
				:label-position="labelNodePos"
				class="disf"
				label-width="70px"
			>
				<el-form-item label="新名称" prop="treeNodeAddName">
					<el-row>
						<el-col :span="12">
							<el-input
								v-model="treeNewNameForm.treeNodeAddName"
								placeholder=""
							></el-input></el-col
					></el-row>
				</el-form-item>
				<el-form-item class="mt40"
					><el-button
						type="primary"
						@click="addNodeName('treeNewform')"
						>确 定</el-button
					></el-form-item
				>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import vabQuill from "@/plugins/vabQuill";
import { getIndustryCategoryReq } from "@/api/share/addShare";
let id = 0;
export default {
	name: "AddShare",
	components: { vabQuill },
	watch: {
		filterText(val) {
			this.$refs.cateTree.filter(val);
		},
	},
	filters: {},
	data() {
		return {
			addNodeData: {},
			pathLabelsArray: [],
			treeNewNameForm: {
				treeNodeAddName: "",
			},
			labelNodePos: "right",
			treeNewNameRules: {
				treeNodeAddName: [
					{
						required: true,
						message: "请输入",
						trigger: "change",
					},
				],
			},
			dialogVisible: false,
			unModalFaceBack: false,
			dialognodeNameVisible: false,
			remarkDialogTitle: "自定义类别",
			nodeNameDialogTitle: "新增类别",
			treeData: [
				{
					id: 2,
					label: "1",
					disabled: true,
					nativeNode: true,
					children: [
						{
							id: 3,
							label: "1-1",
							disabled: true,
							nativeNode: true,
							isAddNode: true,
							children: [
								{
									id: 4,
									label: "1-1-1",
									nativeNode: true,
									disabled: true,
									isAddNode: true,
								},
								{
									id: 5,
									label: "1-1-2",
									disabled: true,
									nativeNode: true,
									isAddNode: true,
								},
							],
						},
					],
				},
				{
					id: 6,
					label: "2",
					disabled: true,
					nativeNode: true,
					isAddNode: true,
					children: [
						{
							id: 7,
							label: "2-1",
							nativeNode: true,
							disabled: true,
							isAddNode: true,
						},
						{
							id: 8,
							label: "2-2",
							nativeNode: true,
							disabled: true,
							isAddNode: true,
						},
					],
				},
				{
					id: 9,
					label: "3",
					disabled: true,
					nativeNode: true,
					children: [
						{
							id: 10,
							label: "3-1",
							nativeNode: true,
							disabled: true,
							isAddNode: true,
						},
						{
							id: 11,
							label: "3-2",
							disabled: true,
							nativeNode: true,
							isAddNode: true,
							children: [
								{
									id: 12,
									label: "3-2-1",
									nativeNode: true,
									disabled: true,
									isAddNode: true,
								},
								{
									id: 13,
									label: "3-2-2",
									nativeNode: true,
									isAddNode: true,
								},
								{
									id: 14,
									label: "3-2-3",
									disabled: true,
									nativeNode: true,
									isAddNode: true,
								},
							],
						},
					],
				},
			],
			defaultProps: {
				children: "children",
				label: "label",
			},
			childNodeCount: 99,
			options: {
				theme: "snow",
				bounds: document.body,
				debug: "warn",
				modules: {
					toolbar: [
						["bold", "underline", "strike"],
						[{ header: [1, 2, 3, 4, 5, 6, false] }],
						[{ size: ["small", false, "large", "huge"] }],
						// [{ color: [] }, { background: [] }],
						[{ color: [] }],
						["blockquote", "code-block"],
						[{ list: "ordered" }, { list: "bullet" }],
						[{ script: "sub" }, { script: "super" }],
						// [{ indent: '-1' }, { indent: '+1' }],
						[{ align: [] }],
						// [{ direction: 'rtl' }],
						[{ font: [] }],
						// ['clean'],
						["link"],
					],
				},
				placeholder: "最多500字.",
				readOnly: false,
			},
			borderColor: "#dcdfe6",
			dialogTableVisible: false,
			isOpenMoenyShare: false,
			props: {
				lazy: true,
				lazyLoad(node, resolve) {
					const { level } = node;
					setTimeout(() => {
						const nodes = Array.from({ length: level + 1 }).map(
							(item) => ({
								value: ++id,
								label: `选项${id}`,
								leaf: level >= 2,
							})
						);
						// 通过调用resolve将子节点数据返回，通知组件数据加载完成
						resolve(nodes);
					}, 300);
				},
			},
			form: {
				title: "",
				content: "",
				shareMode: 1,
				bounty: "",
				isSelectProfession: "",
			},
			categoryList: [],
			categoryListBak: [],
			filterText: "",
			customProp: { value: "code", label: "name" },
			rules: {
				title: [
					{
						required: true,
						message: "请输入",
						trigger: "change",
					},
				],
				isSelectProfession: [
					{
						required: true,
						message: "请选择",
						trigger: "change",
					},
				],
				shareMode: [
					{
						required: true,
						trigger: "change",
					},
				],
				bounty: [
					{
						required: true,
						message: "请输入",
						trigger: "change",
					},
				],
				content: [
					{
						required: true,
						message: "请输入内容",
						trigger: "change",
					},
				],
			},
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.getIndustryList();
		},
		saveContent() {
			this.dialogVisible = true;
		},
		handleClose() {
			this.dialogVisible = false;
		},
		handleCloseAddName() {
			this.dialognodeNameVisible = false;
		},
		handleCheckChange(data, checked, indeterminate) {
			console.log(data, checked, indeterminate);
		},
		renderContent(h, { node, data, store }) {
			return (
				<span class="custom-tree-node">
					<span>{node.label}</span>
					<span>
						<el-button
							size="mini"
							type="text"
							on-click={() => this.append(data)}
						>
							新增
						</el-button>
						<el-button
							size="mini"
							type="text"
							on-click={() => this.remove(node, data)}
						>
							{node.data.nativeNode ? "" : "删除"}
						</el-button>
					</span>
				</span>
			);
		},
		openInTreeList() {
			this.dialogVisible = true;
		},
		//提交反馈
		addNodeName(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.addNode(this.addNodeData);
				} else {
					return false;
				}
			});
		},
		addNode(data) {
			let cout = this.childNodeCount++;
			const newChild = {
				id: cout,
				disabled: false,
				label: this.treeNewNameForm.treeNodeAddName,
				children: [],
			};
			if (!data.children) {
				this.$set(data, "children", []);
			}
			data.children.push(newChild);
			this.dialognodeNameVisible = false;
		},
		append(data) {
			this.dialognodeNameVisible = true;
			this.treeNewNameForm.treeNodeAddName = "";
			this.addNodeData = data;
		},

		remove(node, data) {
			const parent = node.parent;
			const children = parent.data.children || parent.data;
			const index = children.findIndex((d) => d.id === data.id);
			children.splice(index, 1);
			this.$baseMessage("删除成功", "success");
		},
		confirmTreeValue() {
			let selected = this.$refs.cateTree.getCheckedNodes();
			let count = 0;
			for (let i = 0; i < selected.length; i++) {
				if (!selected[i].disabled) {
					count++;
				}
			}
			if (count == 1) {
				this.open();
			} else if (count == 0) {
				this.$baseMessage("未选择分类", "error");
			} else {
				this.$baseMessage("只能选择一个分类", "error");
			}
			console.dir(selected);
		},
		//过滤接收对象下拉树回调函数
		filterNode(value, data) {
			if (!value) return true;
			return data.label.indexOf(value) !== -1;
		},
		handleDragStart(node, ev) {
			console.log("drag start", node);
		},
		handleDragEnter(draggingNode, dropNode, ev) {
			console.log("tree drag enter: ", dropNode.label);
		},
		handleDragLeave(draggingNode, dropNode, ev) {
			console.log("tree drag leave: ", dropNode.label);
		},
		handleDragOver(draggingNode, dropNode, ev) {
			console.log("tree drag over: ", dropNode.label);
		},
		handleDragEnd(draggingNode, dropNode, dropType, ev) {
			console.log(
				"tree drag end: ",
				dropNode && dropNode.label,
				dropType
			);
		},
		handleDrop(draggingNode, dropNode, dropType, ev) {
			console.log("tree drop: ", dropNode.label, dropType);
		},
		allowDrop(draggingNode, dropNode, type) {
			if (dropNode.data.label === "二级 3-1") {
				return type !== "inner";
			} else {
				return true;
			}
		},
		allowDrag(draggingNode) {
			return draggingNode.data.label.indexOf("三级 3-2-2") === -1;
		},
		getIndustryList() {
			getIndustryCategoryReq().then((res) => {
				if (res.success) {
					this.categoryListBak = res.data;
					let editTreeList = this.transFiled(res.data);
					this.treeData = this.listToTree(editTreeList);
					this.categoryList = this.listToTree(res.data);
				} else {
					this.$baseMessage(res.message, "error");
				}
			});
		},
		transFiled(data) {
			let arr = [];
			for (let i = 0; i < data.length; i++) {
				let temp = {};
				temp["id"] = data[i]["id"];
				temp["label"] = data[i]["name"];
				temp["parentId"] = data[i]["parentId"];
				temp["name"] = data[i]["name"];
				temp["disabled"] = true;
				temp["nativeNode"] = true;
				temp["isAddNode"] = true;
				arr.push(temp);
			}
			return arr;
		},
		open() {
			this.$confirm(
				"新增类别审核通过后将立即通知您，不过您现在仍然可以使用它?",
				"提示",
				{
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				}
			)
				.then(() => {
					this.$baseMessage("提交成功", "success");
					this.dialogVisible = false;
				})
				.catch(() => {});
		},
		listToTree(list) {
			let map = {};
			list.forEach((item) => {
				if (!map[item.id]) {
					map[item.id] = item;
				}
			});

			list.forEach((item) => {
				if (item.parentId !== 0) {
					if (map[item.parentId].children) {
						map[item.parentId].children.push(item);
					} else {
						map[item.parentId].children = [item];
					}
				}
			});

			return list.filter((item) => {
				if (item.parentId === 0) {
					return item;
				}
			});
		},
		handleChange() {
			console.dir(123);
		},
		handleSee() {
			this.$refs["form"].validate((valid) => {
				if (valid) {
					this.dialogTableVisible = true;
				} else {
					return false;
				}
			});
		},
		deleEditedContent() {},
		getProfession(val) {
			if (!this.$refs.mycascader.getCheckedNodes()[0].pathLabels) {
				this.isSelectCity = "";
			}
			this.pathLabelsArray =
				this.$refs.mycascader.getCheckedNodes()[0].pathLabels;
		},
		handleSave() {
			this.$refs["form"].validate((valid) => {
				if (valid) {
					this.$baseMessage("提交成功", "success");
				} else {
					return false;
				}
			});
		},
	},
};
</script>
<style lang="scss" scoped>
.add-share {
	.tipRule {
		font-size: 14px;
		border: none;
		padding: 0px;
	}
	.mainTitle {
		text-align: center;
		width: 100%;
		height: 30px;
		min-width: 200px;
	}
	.timeLineDele {
		font-weight: bold;
	}
	.tipRule:hover {
		color: #606266;
	}
	.news {
		&-title {
			text-align: center;
		}

		&-content {
			::v-deep {
				p {
					line-height: 30px;

					img {
						display: block;
						margin-right: auto;
						margin-left: auto;
					}
				}
			}
		}
	}

	.vab-quill-content {
		::v-deep {
			.el-form-item__content {
				line-height: normal;
			}
		}
	}
}
</style>
