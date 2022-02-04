<template>
	<div class="tiny-editor" ref="mainTinyHeight">
		<el-row :gutter="20">
			<el-col :span="12">
				<h2 style="text-align: center">
					<strong>{{ currShareData.title }}</strong>
				</h2>
				<tinymce-editor
					v-model="content"
					:height="dyHeight"
				></tinymce-editor>
			</el-col>
			<el-col :span="12">
				<h2 style="text-align: center">
					<strong>实时展示</strong>
				</h2>
				<div class="editor-content" v-html="content" />
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="12">
				<div
					class="mt30"
					style="display: flex; justify-content: center"
				>
					<el-button
						style="display: fixed"
						type="primary"
						class="saveStyle"
						@click="prvePage"
						>上一步</el-button
					>
					<el-button
						style="display: fixed"
						type="primary"
						class="saveStyle ml20-imp"
						@click="saveContent"
						>保 存</el-button
					>
				</div>
			</el-col>
		</el-row>
		<el-dialog
			v-dialogDrag
			:visible.sync="dialogVisible"
			:close-on-click-modal="unModalFaceBack"
			width="520px"
			:before-close="handleClose"
		>
			<div slot="title" class="listDialog">
				{{ currShareData.title }}
				<el-popover
					placement="right"
					title="规则"
					width="300"
					trigger="hover"
				>
					<p>1:当前目录仅作用于当前的经验</p>
					<p>
						2:您可以以目录的方式划分经验
						<el-tooltip
							class="item"
							effect="dark"
							content="划分提示: 从不同维度、不同角度等划分"
							placement="top-start"
						>
							<el-link
								icon="el-icon-question"
								:underline="false"
							></el-link>
						</el-tooltip>
					</p>
					<el-button
						slot="reference"
						class="tipRule"
						icon="el-icon-question"
					></el-button>
				</el-popover>
			</div>
			<el-tree
				ref="cateTree"
				:data="treeData"
				node-key="id"
				class="mb20"
				show-checkbox
				:default-expanded-keys="[1]"
				:default-checked-keys="[99]"
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
			<el-button type="primary" @click="reviewreeValue">提 交</el-button>
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
				<el-form-item
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
import tinymceEditor from "@/components/Tinymce";
export default {
	name: "TinyEditor",
	components: { tinymceEditor },
	data() {
		return {
			content: "",
			currShareData: {},
			addNodeData: {},
			treeNewNameForm: {
				treeNodeAddName: "",
			},
			treeNewNameRules: {},
			dyHeight: 450,
			labelNodePos: "right",
			dialogVisible: false,
			unModalFaceBack: false,
			dialognodeNameVisible: false,
			remarkDialogTitle: "当前经验",
			nodeNameDialogTitle: "新增",
			nodeTreeType: 1,
			treeData: [
				{
					id: 1,
					nativeNode: true,
					disabled: true,
					label: "根目录",
					children: [
						{
							id: 99,
							nativeNode: true,
							disabled: false,
							label: "默认目录",
						},
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
											disabled: false,
											isAddNode: true,
										},
										{
											id: 5,
											label: "1-1-2",
											nativeNode: true,
											disabled: false,
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
									disabled: false,
									isAddNode: true,
								},
								{
									id: 8,
									label: "2-2",
									nativeNode: true,
									disabled: false,
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
									disabled: false,
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
											disabled: false,
											isAddNode: true,
										},
										{
											id: 13,
											label: "3-2-2",
											nativeNode: true,
											disabled: false,
											isAddNode: true,
										},
										{
											id: 14,
											label: "3-2-3",
											nativeNode: true,
											disabled: false,
											isAddNode: true,
										},
									],
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
		};
	},
	computed: {},

	watch: {
		filterText(val) {
			this.$refs.cateTree.filter(val);
		},
		content(nv, ov) {
			// this.dyHeight = this.$refs["mainTinyHeight"].clientHeight - 200;
			// console.log(this.$refs["mainTinyHeight"].clientHeight);
			// this.dyHeight = this.$refs["mainTinyHeight"].clientHeight;
			// this.dyHeight = 1000;
		},
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.currShareData = JSON.parse(
				localStorage.getItem("tempShareObject")
			);
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
							{node.data.id == 99 ? "" : "新增"}
						</el-button>
						<el-button
							size="mini"
							type="text"
							on-click={() => this.editNode(data)}
						>
							{node.data.id == 99
								? ""
								: node.data.id == 1
								? ""
								: "编辑"}
						</el-button>
						<el-button
							size="mini"
							type="text"
							on-click={() => this.remove(node, data)}
						>
							{node.data.id == 99
								? ""
								: node.data.id == 1
								? ""
								: "删除"}
						</el-button>
					</span>
				</span>
			);
		},
		//提交反馈
		addNodeName(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.hannleNode(this.addNodeData);
				} else {
					return false;
				}
			});
		},
		hannleNode(data) {
			if (this.nodeTreeType == 1) {
				//新增
				let cout = this.childNodeCount++;
				const newChild = {
					id: cout,
					label: this.treeNewNameForm.treeNodeAddName,
					children: [],
				};
				if (!data.children) {
					this.$set(data, "children", []);
				}
				data.children.push(newChild);
				this.$baseMessage("添加成功", "success");
			} else {
				//编辑
				this.$baseMessage("修改成功", "success");
			}
			this.dialognodeNameVisible = false;
		},
		append(data) {
			this.nodeTreeType = 1;
			this.treeNewNameForm.treeNodeAddName = "";
			this.nodeNameDialogTitle = "新增";
			this.dialognodeNameVisible = true;
			this.addNodeData = data;
		},
		editNode(data) {
			this.nodeTreeType = 2;
			this.nodeNameDialogTitle = "编辑";
			this.dialognodeNameVisible = true;
			this.treeNewNameForm.treeNodeAddName = data.label;
		},
		remove(node, data) {
			const parent = node.parent;
			const children = parent.data.children || parent.data;
			const index = children.findIndex((d) => d.id === data.id);
			children.splice(index, 1);
			this.$baseMessage("删除成功", "success");
		},
		reviewreeValue() {
			let selected = this.$refs.cateTree.getCheckedNodes();
			if (selected.length == 1) {
				this.dialogVisible = false;
				this.$router.push("/experience/releaseSuccess");
			} else if (selected.length == 0) {
				this.$baseMessage("请选择目录", "error");
			} else {
				this.$baseMessage("只能选择一个目录", "error");
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
		prvePage() {
			this.$confirm("是否保存当前内容?", "提示", {
				confirmButtonText: "保存并返回",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					this.$router.push("/experience/release");
				})
				.catch(() => {});
		},
		importHanndle() {
			this.$baseMessage("提交成功", "success");
			this.dialogVisible = false;
		},
	},
};
</script>

<style lang="scss" scoped>
::v-deep .custom-tree-node .el-button {
	margin-left: 10px;
}
::v-deep .listDialog .el-button {
	border: 0px;
	background: none;
	padding-left: 0px;
}
.tinymceEditorStyle {
	width: 50%;
}
.editor-content {
	margin-top: 20px;
}
.saveStyle {
	width: 100px;
}
</style>
