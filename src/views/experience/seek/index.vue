<template>
	<div class="seek">
		<el-form
			ref="baseform"
			:model="form"
			:rules="rules"
			label-width="100px"
		>
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
			<el-form-item label="价值模式" prop="shareMode">
				<div class="mt8">
					<el-radio-group
						v-model="form.shareMode"
						@change="hanndleValid"
					>
						<el-radio :label="1">
							共享模式
							<el-popover
								placement="right"
								title="规则"
								trigger="click"
							>
								<p>1: 该经验推送所有用户（权重：一般）</p>
								<p>2: 打赏额度无最低要求</p>
								<p>
									3:
									当您采纳后，平台将根据您采纳经验者的内容优质程度，退还您5%~30%的象币
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
								trigger="click"
							>
								<p>
									1:
									该经验推送特定行业的用户（权重：高级），其它用户（权重：一般）
								</p>
								<p>2: 打赏额度最低100象币</p>
								<p>
									3:
									当您采纳后，平台将根据您采纳经验者的内容优质程度，退还您5%~15%的象币
								</p>
								<el-button
									slot="reference"
									class="tipRule"
									icon="el-icon-question"
								></el-button>
							</el-popover>
						</el-radio>
						<el-radio :label="3">
							付费模式
							<el-popover
								placement="right"
								title="规则"
								trigger="click"
							>
								<p>
									1:
									平台将在1个工作日内，为你提供相关优质经验者的平台联系ID<el-tooltip
										class="item"
										effect="dark"
										content="需征求经验者同意的前提下,至少2位，至多5位"
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
									平台将在1个工作日内，为你提供相关优质经验者的微信、QQ、邮箱任意一种联系方式<el-tooltip
										class="item"
										effect="dark"
										content="需征求经验者同意的前提下,至少2位，至多5位"
										placement="top-start"
									>
										<el-link
											icon="el-icon-question"
											:underline="false"
										></el-link>
									</el-tooltip>
								</p>
								<p>
									3:
									平台将在1个工作日内，为你提供相关优质经验者的手机号码<el-tooltip
										class="item"
										effect="dark"
										content="需征求经验者同意的前提下,至少2位，至多5位"
										placement="top-start"
									>
										<el-link
											icon="el-icon-question"
											:underline="false"
										></el-link>
									</el-tooltip>
								</p>
								<p>
									4:
									平台将在3个工作日内，为你提供相关优质经验者的所有信息(个人基础信息、工作信息、资质等)<el-tooltip
										class="item"
										effect="dark"
										content="需征求经验者同意且涉及其它机构相关授权的前提下,至少2位，至多5位"
										placement="top-start"
									>
										<el-link
											icon="el-icon-question"
											:underline="false"
										></el-link>
									</el-tooltip>
								</p>
								<div>
									5:
									<span class="fwb">平台联系: </span
									>打赏额度最低100象币
									<p class="ml15">
										<span class="fwb"
											>微信、邮箱、QQ:
										</span>
										打赏额度最低依次为600、400、300象币
									</p>
									<p class="ml15">
										<span class="fwb">手机号码: </span
										>打赏额度最低800象币+经验者自身溢价(和平台无关)
									</p>
									<p class="ml15">
										<span class="fwb">完整信息: </span
										>打赏额度最低2000象币+经验者自身溢价(和平台无关)
									</p>
									<p class="ml15">
										<span class="fwb">其它: </span
										>打赏额度最低500象币+经验者自身溢价(和平台无关)
									</p>
								</div>
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
			<el-form-item
				label="行业"
				prop="isSelectProfession"
				v-show="form.shareMode == '2'"
			>
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
				label="付费类型"
				prop="monenyMode"
				v-show="form.shareMode == '3'"
			>
				<el-select v-model="form.monenyMode">
					<el-option label="平台联系" value="ptlx"></el-option>
					<el-option label="微信" value="wx"></el-option>
					<el-option label="QQ" value="qq"></el-option>
					<el-option label="邮箱" value="email"></el-option>
					<el-option label="手机号码" value="sjhm"></el-option>
					<el-option label="完整信息" value="wzxx"></el-option>
					<el-option label="其它" value="other"></el-option>
				</el-select>
				<el-popover
					placement="right"
					title="规则"
					trigger="click"
					class="ml10"
				>
					<p>
						1:
						平台将在1个工作日内，为你提供相关优质经验者的平台联系ID<el-tooltip
							class="item"
							effect="dark"
							content="需征求经验者同意的前提下,至少2位，至多5位"
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
						平台将在1个工作日内，为你提供相关优质经验者的微信、QQ、邮箱任意一种联系方式<el-tooltip
							class="item"
							effect="dark"
							content="需征求经验者同意的前提下,至少2位，至多5位"
							placement="top-start"
						>
							<el-link
								icon="el-icon-question"
								:underline="false"
							></el-link>
						</el-tooltip>
					</p>
					<p>
						3:
						平台将在1个工作日内，为你提供相关优质经验者的手机号码<el-tooltip
							class="item"
							effect="dark"
							content="需征求经验者同意的前提下,至少2位，至多5位"
							placement="top-start"
						>
							<el-link
								icon="el-icon-question"
								:underline="false"
							></el-link>
						</el-tooltip>
					</p>
					<p>
						4:
						平台将在3个工作日内，为你提供相关优质经验者的所有信息(个人基础信息、工作信息、资质等)<el-tooltip
							class="item"
							effect="dark"
							content="需征求经验者同意且涉及其它机构相关授权的前提下,至少2位，至多5位"
							placement="top-start"
						>
							<el-link
								icon="el-icon-question"
								:underline="false"
							></el-link>
						</el-tooltip>
					</p>
					<div>
						5:
						<span class="fwb">平台联系: </span>打赏额度最低100象币
						<p class="ml15">
							<span class="fwb">微信、邮箱、QQ: </span>
							打赏额度最低依次为600、400、300象币
						</p>
						<p class="ml15">
							<span class="fwb">手机号码: </span
							>打赏额度最低800象币+经验者自身溢价(和平台无关)
						</p>
						<p class="ml15">
							<span class="fwb">完整信息: </span
							>打赏额度最低2000象币+经验者自身溢价(和平台无关)
						</p>
						<p class="ml15">
							<span class="fwb">其它: </span
							>打赏额度最低500象币+经验者自身溢价(和平台无关)
						</p>
					</div>
					<el-button
						slot="reference"
						class="tipRule"
						icon="el-icon-question"
					></el-button>
				</el-popover>
			</el-form-item>
			<el-form-item label="打赏额度" prop="bounty">
				<el-row>
					<el-col :span="6">
						<el-input
							v-model="form.bounty"
							placeholder="1人民币= 10象币"
							suffix-icon="el-icon-money"
							type="text"
							max-length="6"
						></el-input>
					</el-col>
				</el-row>
			</el-form-item>
			<el-form-item label="描述" prop="content">
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
					<el-descriptions-item v-if="form.shareMode == 2">
						<template slot="label">
							<i class="el-icon-menu"></i>
							行业
						</template>
						{{ pathLabelsArray[0] }}/
						{{ pathLabelsArray[1] }}
					</el-descriptions-item>
					<el-descriptions-item>
						<template slot="label">
							<i class="el-icon-refresh"></i>
							价值模式
						</template>
						{{
							form.shareMode == 1
								? "共享模式"
								: form.shareMode == 2
								? "打赏模式"
								: "付费模式"
						}}
					</el-descriptions-item>
					<el-descriptions-item v-if="form.shareMode == 3">
						<template slot="label">
							<i class="el-icon-menu"></i>
							付费类型
						</template>
						{{ form.monenyMode | monenyFilter }}
					</el-descriptions-item>
					<el-descriptions-item>
						<template slot="label">
							<i class="el-icon-money"></i>
							打赏额度
						</template>
						{{ form.bounty }}象币
					</el-descriptions-item>
				</el-descriptions>
				<div class="news-content mt20" v-html="form.content"></div>
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
var id = 0;
export default {
	name: "Seek",
	components: {},
	watch: {
		filterText(val) {
			this.$refs.cateTree.filter(val);
		},
	},
	filters: {
		monenyFilter(value) {
			if (value == "ptlx") {
				return "平台联系";
			} else if (value == "wx") {
				return "微信";
			} else if (value == "qq") {
				return "QQ";
			} else if (value == "email") {
				return "邮箱";
			} else if (value == "sjhm") {
				return "手机号码";
			} else if (value == "wzxx") {
				return "完整信息";
			} else if (value == "other") {
				return "其它";
			} else {
				return "/";
			}
		},
	},
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
				isSelectProfession: "-999",
				monenyMode: "ptlx",
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
				monenyMode: [
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
						validator: (rules, value, cb) => {
							if (this.form.shareMode == "1") {
								if (!value) {
									return cb(new Error("请输入"));
								}
							}
							if (this.form.shareMode == "2") {
								if (parseInt(value) < 100) {
									return cb(
										new Error(
											"打赏模式下，打赏额度最低100象币"
										)
									);
								}
							}
							if (this.form.shareMode == "3") {
								if (
									this.form.monenyMode == "ptlx" &&
									parseInt(value) < 100
								) {
									return cb(
										new Error(
											"付费模式下，平台联系方式，打赏额度最低100象币"
										)
									);
								}
								if (
									this.form.monenyMode == "wx" &&
									parseInt(value) < 600
								) {
									return cb(
										new Error(
											"付费模式下，微信联系方式，打赏额度最低600象币"
										)
									);
								}
								if (
									this.form.monenyMode == "qq" &&
									parseInt(value) < 400
								) {
									return cb(
										new Error(
											"付费模式下，QQ联系方式，打赏额度最低400象币"
										)
									);
								}
								if (
									this.form.monenyMode == "email" &&
									parseInt(value) < 300
								) {
									return cb(
										new Error(
											"付费模式下，邮箱联系方式，打赏额度最低300象币"
										)
									);
								}
								if (
									this.form.monenyMode == "sjhm" &&
									parseInt(value) < 800
								) {
									return cb(
										new Error(
											"付费模式下，邮箱联系方式，打赏额度最低800象币"
										)
									);
								}
								if (
									this.form.monenyMode == "wzxx" &&
									parseInt(value) < 2000
								) {
									return cb(
										new Error(
											"付费模式下，完整联系方式，打赏额度最低2000象币"
										)
									);
								}
								if (
									this.form.monenyMode == "other" &&
									parseInt(value) < 500
								) {
									return cb(
										new Error(
											"付费模式下，其它联系方式，打赏额度最低500象币"
										)
									);
								}
							}
							return cb();
						},
						trigger: "blur",
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
		hanndleValid() {
			this.form.bounty = "";
			this.$refs["baseform"].clearValidate();
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
			// getIndustryCategoryReq().then((res) => {
			// 	if (res.success) {
			// 		this.categoryListBak = res.data;
			// 		let editTreeList = this.transFiled(res.data);
			// 		this.treeData = this.listToTree(editTreeList);
			// 		this.categoryList = this.listToTree(res.data);
			// 	} else {
			// 		this.$baseMessage(res.message, "error");
			// 	}
			// });
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
			this.$refs["baseform"].validate((valid) => {
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
			this.$refs["baseform"].validate((valid) => {
				if (valid) {
					this.$router.push("/experience/releaseSuccess");
				} else {
					return false;
				}
			});
		},
	},
};
</script>
<style lang="scss" scoped>
.seek {
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
}
</style>
