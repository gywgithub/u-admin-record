<template>
	<div class="release">
		<div
			class="mainBody"
			ref="mainRef"
			v-bind:style="{ minHeight: warpHeight + 'px' }"
		>
			<el-form
				ref="form"
				:model="form"
				class="mt30"
				:rules="rules"
				label-width="100px"
			>
				<el-form-item label="主标题" prop="title">
					<el-row>
						<el-col :span="6">
							<el-input
								v-model="form.title"
								maxlength="30"
								style="width: 505px"
								placeholder="最多30字"
							></el-input>
						</el-col>
					</el-row>
				</el-form-item>
				<el-form-item label="类别" prop="category">
					<el-cascader
						ref="mycascaderCategory"
						v-model="form.category"
						:props="customProp"
						filterable
						style="width: 505px"
						:options="professionList"
						:clearable="true"
						placeholder="输入文字可搜索"
						@change="getProfession"
					></el-cascader>
					<!-- <el-link
						type="primary"
						@click="openInCategory"
						class="ml10"
						:underline="false"
						>未找到?</el-link
					> -->
				</el-form-item>
				<el-form-item
					label="维度"
					prop="dimension"
					label-width="90px"
				>
					<el-select v-model="form.dimension" style="width: 440px">
						<el-option
							v-for="(item, index) in dimensionList"
							:key="index"
							:label="item.text"
							:value="item.value"
						></el-option>
					</el-select>
					<el-link type="primary" :underline="false" class="ml10" @click="addDimension">添加</el-link>
					<el-link type="primary" :underline="false" class="ml10" @click="manageDimension">管理</el-link>
				</el-form-item>
				<el-form-item label="价值共享" prop="shareMode">
					<div class="mt8">
						<el-radio-group v-model="form.shareMode">
							<el-radio :label="1">
								共享模式
								<el-popover
									placement="right"
									title="规则"
									trigger="click"
								>
									<p>
										1:
										该经验将推送给平台所有用户(与行业、地址规则第一条不共享)
									</p>
									<p>
										2:
										平台将根据您经验的优质程度，奖励您一定的收益（每2个周期月结算一次）
										<el-tooltip
											class="item"
											effect="dark"
											content="算法： 每位经验者所得到的平台奖励构成 =  经验者获得的点赞数 + 发起者获得的收藏数 + 评论数(热度)"
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
										只要有人点赞、收藏、评论您名下经验者的经验时，您都将固定获得您名下经验者总收益的2%;
										&nbsp;&nbsp;&nbsp;
										<b style="color: red">且是永久的</b>
									</p>
									<p>
										4:
										点赞超1000后，且连续保持上架63天的经验，自动转为付费模式（0.1元/次）
									</p>
									<p>
										5:
										平台已认证的经验，11天后自动转为付费模式（0.1元/次）
									</p>
									<el-button
										slot="reference"
										class="tipRule"
										icon="el-icon-question"
									></el-button>
								</el-popover>
							</el-radio>
							<el-radio :label="2">
								永久共享
								<el-popover
									placement="right"
									title="规则"
									trigger="click"
								>
									<p>
										1.此经验将设为永久共享模式，感谢您的经验与付出
									</p>
									<p>
										2.平台将根据您经验的优质程度，固定奖励您一定的收益（每2个周期月结算一次）
									</p>
									<p>3:您可以随时调整为其它模式</p>
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
										1: 该经验需要提前认证<el-tooltip
											class="item"
											effect="dark"
											content="认证时间： 3~15工作日"
											placement="top-start"
										>
											<el-link
												icon="el-icon-question"
												:underline="false"
											></el-link>
										</el-tooltip>
									</p>
									<p>
										2: 0.2元/次
										(与行业、地址规则第二条不共享)
									</p>
									<p>
										3: 您将得到该经验的全部收益<el-tooltip
											class="item"
											effect="dark"
											content="不包括您名下经验者的点赞、收藏"
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
										"踩一下"的数量达到点赞数量的1/3时，该经验将强制下架
									</p>
									<el-button
										slot="reference"
										class="tipRule"
										icon="el-icon-question"
									></el-button>
								</el-popover>
							</el-radio>
							<el-radio :label="4">
								免费模式
								<el-popover
									placement="right"
									title="规则"
									trigger="click"
								>
									<p>
										1.此经验将设为免费模式，感谢您的经验与付出
									</p>
									<p>2.您可以随时调整为其它模式</p>
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
				<el-form-item label="简单描述" prop="content">
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
					<el-button
						type="primary"
						v-if="!isEditBaseExperienceFrom"
						@click="handleSave"
						>下一步</el-button
					>
					<el-button
						type="primary"
						v-if="isEditBaseExperienceFrom"
						@click="updateBaseInfo"
						>保 存</el-button
					>
					<el-button
						type="primary"
						v-if="isEditBaseExperienceFrom"
						@click="backExperienceList"
						>返回列表</el-button
					>
				</el-form-item>
			</el-form>
			<el-row class="mt20">
				<el-col :xs="24" :lg="12">
					<el-collapse v-model="activeNames" @change="handleChange">
						<el-collapse-item name="1">
							<template slot="title">
								<i class="header-icon el-icon-arrow-down"></i>
								<pre>&nbsp;</pre>
								填写更多
							</template>
							<el-form
								ref="moform"
								:model="moreForm"
								label-width="100px"
							>
								<el-form-item label="行业" prop="industry">
									<el-cascader
										ref="mycascader"
										v-model="moreForm.industry"
										style="width: 505px"
										:props="customProp"
										filterable
										:options="categoryList"
										:clearable="true"
										placeholder="输入文字可搜索"
										@change="getProfession"
									></el-cascader>
									<el-popover
										placement="right"
										title="规则"
										class="ml10"
										trigger="click"
									>
										<p>
											1:
											该经验将推送在同行业中或直接搜索该经验
										</p>
										<p>
											2: 奖励固定提升0.05（0.1元/次 =>
											0.15元/次）
										</p>
										<p>3: 该奖励与所属地址奖励可累加获得</p>
										<el-button
											slot="reference"
											class="tipRule"
											icon="el-icon-question"
										></el-button>
									</el-popover>
									<!-- <el-link
										type="primary"
										@click="openInTreeList"
										class="ml10"
										:underline="false"
										>未找到?</el-link
									> -->
								</el-form-item>
								<el-form-item label="地址" prop="address">
									<el-cascader
										ref="mycascader2"
										v-model="moreForm.address"
										style="width: 505px"
										:props="customProp"
										filterable
										:options="addressList"
										:clearable="true"
										placeholder="输入文字可搜索"
									></el-cascader>
									<el-popover
										placement="right"
										title="规则"
										class="ml10"
										trigger="click"
									>
										<p>
											1:
											该经验将根据用户地理位置，提升推送权重
											地理位置越接近，推送权重越大或直接搜索该经验
										</p>
										<p>
											2: 奖励固定提升0.05（0.1元/次 =>
											0.15元/次）
										</p>
										<p>3: 该奖励与所属行业奖励可累加获得</p>
										<el-button
											slot="reference"
											class="tipRule"
											icon="el-icon-question"
										></el-button>
									</el-popover>
									<!-- <el-link
										type="primary"
										@click="openAddAreaDig"
										class="ml10"
										:underline="false"
										>未找到?</el-link
									> -->
								</el-form-item>
								<el-form-item label="起因" prop="cause">
									<el-input
										v-model="moreForm.cause"
										maxlength="100"
										style="width: 505px"
										placeholder="最多100字"
									></el-input>
								</el-form-item>
								<el-form-item label="结果" prop="reules">
									<el-input
										v-model="moreForm.reules"
										maxlength="100"
										style="width: 505px"
										placeholder="最多100字"
									></el-input>
								</el-form-item>
							</el-form>
						</el-collapse-item>
					</el-collapse>
				</el-col>
			</el-row>
		</div>
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
				label-width="100px"
			>
				<el-form-item label="默认行业" prop="newindustryName">
					<el-row>
						<el-col :span="24">
							<el-cascader
								style="width: 300px"
								ref="newindustryCascader"
								v-model="treeNewNameForm.newindustryName"
								:props="newindustryCustomProp"
								filterable
								:options="categoryList"
								:clearable="true"
								placeholder="输入文字可搜索"
								@change="getProfession"
							></el-cascader>
						</el-col>
					</el-row>
				</el-form-item>
				<el-form-item label="新增名称" prop="treeNodeAddName">
					<el-row>
						<el-col :span="24">
							<el-input
								v-model="treeNewNameForm.treeNodeAddName"
								style="width: 300px"
								placeholder=""
							></el-input></el-col
					></el-row>
				</el-form-item>
				<div class="newindustryTips mb20" v-show="newindustryTipShow">
					<p>1、每位用户15天内，只能提交一次</p>
					<p>2、提交审核通过后，该经验将自动划分到您新增的行业中</p>
					<p>3、审核若未通过，该经验将自动划分到默认行业中</p>
				</div>
				<el-button
					type="primary"
					style="margin-left: 200px"
					@click="addNodeName('treeNewform')"
					>确 定</el-button
				>
			</el-form>
		</el-dialog>
		<el-dialog
			:title="dialogCategoryTitle"
			:visible.sync="dialogCategoryVisible"
			:close-on-click-modal="categoryUnModal"
			width="520px"
			:before-close="handleCategoryClose"
		>
			<el-form
				ref="categoryNewform"
				:model="categoryNewNameForm"
				:rules="categoryNewNameRules"
				:label-position="categoryLabelNodePos"
				class="disf"
				label-width="100px"
			>
				<el-form-item label="默认类别" prop="categoryName">
					<el-row>
						<el-col :span="24">
							<el-cascader
								style="width: 300px"
								ref="newindustryCascader"
								v-model="categoryNewNameForm.categoryName"
								:props="newCategoryCustomProp"
								filterable
								:options="professionList"
								:clearable="true"
								placeholder="输入文字可搜索"
								@change="categoryAddChange"
							></el-cascader>
						</el-col>
					</el-row>
				</el-form-item>
				<el-form-item label="新增名称" prop="categoryChilName">
					<el-row>
						<el-col :span="24">
							<el-input
								v-model="categoryNewNameForm.categoryChilName"
								style="width: 300px"
								placeholder=""
							></el-input></el-col
					></el-row>
				</el-form-item>
				<div class="newindustryTips mb20" v-show="newCategoryTipShow">
					<p>1、每位用户15天内，只能提交一次</p>
					<p>2、提交审核通过后，该经验将自动划分到您新增的类别中</p>
					<p>3、审核若未通过，该经验将自动划分到默认类别中</p>
				</div>
				<el-button
					type="primary"
					style="margin-left: 200px"
					@click="addCategoryNodeName('categoryNewform')"
					>确 定</el-button
				>
			</el-form>
		</el-dialog>
		<el-dialog
			:title="areaNameDialogTitle"
			:visible.sync="dialogAreaNameVisible"
			:close-on-click-modal="areaUnModalFaceBack"
			width="520px"
			:before-close="handleAreaCloseAddName"
		>
			<el-form
				ref="treeNewAreaform"
				:model="treeNewAreaNameForm"
				:rules="treeNewAreaNameRules"
				:label-position="labelAreaNodePos"
				class="disf"
				label-width="100px"
			>
				<el-form-item label="默认地址" prop="newAreaName">
					<el-row>
						<el-col :span="24">
							<el-cascader
								style="width: 300px"
								ref="newindustryCascader"
								v-model="treeNewAreaNameForm.newAreaName"
								:props="newAreaCustomProp"
								filterable
								:options="professionList"
								:clearable="true"
								placeholder="输入文字可搜索"
							></el-cascader>
						</el-col>
					</el-row>
				</el-form-item>
				<el-form-item label="新增名称" prop="treeNodeAddAreaName">
					<el-row>
						<el-col :span="24">
							<el-input
								v-model="
									treeNewAreaNameForm.treeNodeAddAreaName
								"
								style="width: 300px"
								placeholder=""
							></el-input></el-col
					></el-row>
				</el-form-item>
				<div class="newindustryTips mb20" v-show="newAreaTipShow">
					<p>1、每位用户15天内，只能提交一次</p>
					<p>2、提交审核通过后，该经验将自动划分到您新增的地址中</p>
					<p>3、提交审核若未通过，该经验将自动划分到默认地址中</p>
				</div>
				<el-button
					type="primary"
					style="margin-left: 200px"
					@click="addAreaNameSub('treeNewAreaform')"
					>确 定</el-button
				>
			</el-form>
		</el-dialog>
		<el-dialog
			:title="dimensionAddDialogTitle"
			:visible.sync="dimensionAddDialogVisible"
			:close-on-click-modal="dimensionAddUnModalBack"
			width="520px"
			:before-close="dimensionAddHandleClose"
		>
			<el-form
				ref="dimensionAddRef"
				:model="dimensionAddModelForm"
				:rules="dimensionAddModelRules"
				:label-position="dimensionAddPos"
				class="disf"
				label-width="70px"
			>
				<el-form-item label="名称" prop="name">
					<el-input
						v-model="dimensionAddModelForm.name"
						maxlength="12"
						placeholder="12字内"
					></el-input>
				</el-form-item>
				<el-form-item label="描述" prop="describe">
					<el-input
						v-model="dimensionAddModelForm.describe"
						type="textarea"
						maxlength="200"
						resize="none"
						show-word-limit
						:autosize="{ minRows: 6 }"
						placeholder="限200字"
					></el-input>
				</el-form-item>
				<el-button
					type="primary"
					class="ml50-imp"
					@click="dimensionAdd('dimensionAddRef')"
					>提 交</el-button
				>
			</el-form>
		</el-dialog>
		<el-dialog
			:title="dimensionMangeTitle"
			:visible.sync="dimensionMangeVisible"
			:close-on-click-modal="dimensionMangeBack"
			width="800px"
			:before-close="handleDimensionMangeClose"
		>
			<once-table
				:titleData="titleDataDimensionMange"
				:source="dimensionMangeData"
				:columnCustom="columnCustomIsOpen"
				:defaultShowFailed="showFailedIsDimensionMange"
				@commonCellClicked="dimensionMangeCellClickedCallback"
			></once-table>
		</el-dialog>
	</div>
</template>

<script>
import onceTable from "@/components/Table";
import {
	getIndustryCategoryReq,
	getCategoryReq,
	getAddressReq,
	updateExperienceDataReq,
} from "@/api/release";
import {
	addDimensionReq,
	deleteDimensionReq,
	updateDimensionReq,
	queryDimensionReq,
} from "@/api/dimension";

export default {
	name: "Release",
	components: { onceTable },
	watch: {
		filterText(val) {
			this.$refs.cateTree.filter(val);
		},
	},
	data() {
		return {
			dimensionMangeTitle: "维度管理",
			dimensionMangeVisible: false,
			dimensionMangeBack: false,
			titleDataDimensionMange: [
				{
					id: 2,
					name: "维度名称",
					label: "维度名称",
					prop: "name",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 3,
					name: "维度描述",
					label: "维度描述",
					prop: "describe",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 4,
					name: "创建时间",
					label: "创建时间",
					prop: "createTime",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 5,
					name: "操作",
					label: "操作",
					prop: "customHanndle",
					sort: false,
					align: "center",
					filterData: [],
				},
			],
			dimensionMangeData:[
				{ id: 1, name: "默认", describe: "sdfsdfsdf", createTime: "2020-12-01 12:34:21", customHanndle: ["编辑","删除"] }
			],
			columnCustomIsOpen: true,
			showFailedIsDimensionMange: false,
			categoryList: [],
			professionList: [],
			addressList: [],
			dimensionList: [
				{ id: 1, text: "默认", value: "" }
			],
			dimensionAddDialogTitle: "添加维度",
			dimensionAddDialogVisible: false,
			dimensionAddUnModalBack: false,
			dimensionAddPos: "right",
			dimensionAddModelForm:{
				name : "",
				describe : ""
			},
			dimensionAddModelRules: {
				name: [
					{
						required: true,
						message: "请输入",
						trigger: "change",
					},
				],
				describe: [
					{
						required: true,
						message: "请输入",
						trigger: "change",
					},
				],
			},
		
			dialogCategoryVisible: false,
			newindustryTipShow: false,
			newAreaTipShow: false,
			dialogCategoryTitle: "新增类别",
			categoryUnModal: false,
			categoryNewNameForm: {
				categoryName: "",
				categoryChilName: "",
			},
			categoryLabelNodePos: "100px",
			categoryNewNameRules: {
				categoryName: [
					{
						required: true,
						message: "请选择",
						trigger: "change",
					},
				],
				categoryChilName: [
					{
						required: true,
						message: "请输入",
						trigger: "change",
					},
				],
			},
			newCategoryTipShow: false,
			filterText: "",
			customProp: { value: "id", label: "name" },
			newindustryCustomProp: {
				value: "id",
				label: "name",
				checkStrictly: true,
			},
			newCategoryCustomProp: {
				value: "id",
				label: "name",
				checkStrictly: true,
			},
			newAreaCustomProp: {
				value: "code",
				label: "name",
				checkStrictly: true,
			},
			activeNames: "1",
			addNodeData: {},
			treeNewAreaNameForm: {
				treeNodeAddAreaName: "",
				newAreaName: "",
			},
			treeNewAreaNameRules: {
				newindustryName: [
					{
						required: true,
						message: "请选择",
						trigger: "change",
					},
				],
				treeNodeAddName: [
					{
						required: true,
						message: "请输入",
						trigger: "change",
					},
				],
			},
			treeNewNameForm: {
				treeNodeAddName: "",
				newindustryName: "",
			},
			labelAreaNodePos: "right",
			labelNodePos: "right",
			treeNewNameRules: {
				newindustryName: [
					{
						required: true,
						message: "请选择",
						trigger: "change",
					},
				],
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
			areaUnModalFaceBack: false,
			dialognodeNameVisible: false,
			dialogAreaNameVisible: false,
			remarkDialogTitle: "自定义行业",
			nodeNameDialogTitle: "新增行业",
			areaNameDialogTitle: "新增地址",
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
			isEditBaseExperienceFrom: false,
			isOpenMoenyShare: false,
			warpHeight: "730px",
			noUnder: false,
			form: {
				title: "", //标题
				content: "", //描述
				shareMode: 1, //共享模式
				category: [],
				dimension: ""
			},
			moreForm: {
				cause: "",
				reules: "",
				industry: [], //行业
				address: [], //省市区
			},
			rules: {
				title: [
					{
						required: true,
						message: "请输入",
						trigger: "change",
					},
				],
				category: [
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
						message: "请输入",
						trigger: "change",
					},
				],
				dimension: [
					{
						required: true,
						message: "请选择",
						trigger: "change",
					},
				],
			},
		};
	},
	mounted() {
		this.init();
		this.$nextTick(() => {
			this.warpHeight = this.$b.dynamicWinHeight(90);
		});
	},
	methods: {
		init() {
			this.initData();
			let isEditFrom = this.$route.params.isEditBaseInfo;
			if (isEditFrom) {
				this.isEditBaseExperienceFrom = true;
			} else {
				this.isEditBaseExperienceFrom = false;
			}
		},
		initData() {
			this.getIndustryList();
			this.getProfessionList();
			this.getAddressList();
			let reviewFormData = JSON.parse(
				localStorage.getItem("experienceBaseInfo")
			);
			let isReviewFrom = this.$route.params.isReviewFrom;
			if (reviewFormData && isReviewFrom) {
				this.form.title = reviewFormData.title;
				this.form.type = reviewFormData.type.split(",").map(Number);
				this.form.shareMode = reviewFormData.shareMode;
				this.form.content = reviewFormData.content;
				this.moreForm.industry = reviewFormData.industry
					.split(",")
					.map(Number);
				this.moreForm.address = reviewFormData.address
					.split(",")
					.map(Number);
				this.moreForm.cause = reviewFormData.cause;
				this.moreForm.reules = reviewFormData.reules;
			}
			//是否是编辑发布过的内容
			let isEditFrom = this.$route.params.isEditBaseInfo;
			let editContent = this.$route.params.editBaseInfo;

			if (isEditFrom) {
				this.form.title = editContent.title;
				this.form.category = editContent.category
					.split(",")
					.map(Number);
				this.form.shareMode = editContent.shareMode;
				this.form.content = editContent.content;
				this.moreForm.industry = editContent.industry
					.split(",")
					.map(Number);
				this.moreForm.address = editContent.address
					.split(",")
					.map(Number);
			}
		},
		saveContent() {
			this.dialogVisible = true;
		},
		dimensionAddHandleClose(){
			this.dimensionAddDialogVisible = false;
		},
		dimensionAdd(refDom) {
			this.$refs[refDom].validate((valid) => {
				if (valid) {
					this.hanndleAddDimensionFn();
				}
			});
		},
		hanndleAddDimensionFn(){
			//{"pageSize" : 100 , "pageIndex" : 1}
			let params = {
				"name" : this.dimensionAddModelForm.name,
				"describe" : this.dimensionAddModelForm.describe
			}
			addDimensionReq(params).then((res)=>{
				this.$message.success("添加成功");
				this.dimensionAddDialogVisible = false;
			});
		},
		dimensionMangeCellClickedCallback({ row, column, cell, event }) {
			if (column.label == "操作") {
				if (event.target.innerText == "编辑") {
					// this.editCurrCategoryId = row.id;
					// this.catalogModelForm.name = row.name;
					// this.catalogModelForm.descride =
					// 	row.describe == "无" ? "" : row.describe;
					// this.dialogTitle = "修改维度";
					this.dimensionAddDialogVisible = true;
				}
				if (event.target.innerText == "删除") {
					this.$baseConfirm(
						"您确定要删除吗?",
						{ title: "提示" },
						async () => {
							this.$message.success("删除成功");
							//this.deleteCategory(row.id);
						}
					);
				}
			}
		},
		handleClose() {
			this.dialogVisible = false;
		},
		handleCloseAddName() {
			this.dialognodeNameVisible = false;
		},
		handleAreaCloseAddName() {
			this.dialogAreaNameVisible = false;
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
		//提交反馈
		addNodeName(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.newindustryTipShow) {
						this.newindustryTipShow = false;
						this.dialognodeNameVisible = false;
					} else {
						this.newindustryTipShow = true;
					}
				} else {
					return false;
				}
			});
		},
		addAreaNameSub(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.newAreaTipShow) {
						this.newAreaTipShow = false;
						this.dialogAreaNameVisible = false;
					} else {
						this.newAreaTipShow = true;
					}
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
		handleDimensionMangeClose(){
			this.dimensionMangeVisible = false;
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
		getAddressList() {
			getAddressReq().then((res) => {
				if (res.success) {
					this.addressList = this.listToTreeAddress(res.data);
					console.dir(this.addressList);
				} else {
					this.$baseMessage(res.message, "error");
				}
			});
		},
		getProfessionList() {
			getCategoryReq().then((res) => {
				if (res.success) {
					console.dir(res.data);
					this.professionList = this.listToTree(res.data);
					console.dir(this.professionList);
				} else {
					this.$baseMessage(res.message, "error");
				}
			});
		},
		getIndustryList() {
			getIndustryCategoryReq().then((res) => {
				if (res.success) {
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
				"新增行业审核通过后将立即通知您，不过您现在仍然可以使用它?",
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
		listToTreeAddress(list) {
			let map = {};
			list.forEach((item) => {
				if (!map[item.selfId]) {
					map[item.selfId] = item;
				}
			});

			list.forEach((item) => {
				if (item.parentId !== "0") {
					if (map[item.parentId].children) {
						map[item.parentId].children.push(item);
					} else {
						map[item.parentId].children = [item];
					}
				}
			});

			return list.filter((item) => {
				if (item.parentId === "0") {
					return item;
				}
			});
		},
		addDimension(){
			this.dimensionAddDialogVisible = true;
		},
		manageDimension(){
			queryDimensionReq({"pageSize" : 100 , "pageIndex" : 1}).then((res)=>{
				this.manageDimensionBuss(res.data);
			});
		},
		manageDimensionBuss(data){
			let json = data.dimensionList;
				for (let i = 0; i < json.length; i++) {
					json[i].customHanndle = ["编辑", "删除"];
					if (!json[i].descride) {
						json[i].descride = "无";
					}
				}

				for (let j = 0; j < json.length; j++) {
					//操作按钮逻辑
					let hanndleStr = "";
					for (let k = 0; k < json[j].customHanndle.length; k++) {
						hanndleStr +=
							"<span class='linkText ml10' data-id='" +
							json[j].id +
							"'>" +
							json[j].customHanndle[k] +
							"</span>";
					}
					json[j].customHanndle = hanndleStr;
					json[j].createTime = new Date(json[j].createTime).Format(
						"yyyy-MM-dd hh:mm:ss"
					);
				}
				this.dimensionMangeData = json;
				this.dimensionMangeVisible = true;
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
		openInTreeList() {
			this.dialognodeNameVisible = true; //打开弹窗
		},
		openInCategory() {
			this.dialogCategoryVisible = true; //打开弹窗
		},
		openAddAreaDig() {
			this.dialogAreaNameVisible = true; //打开弹窗
		},
		handleCategoryClose() {
			this.dialogCategoryVisible = false;
		},
		addCategoryNodeName(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.newCategoryTipShow) {
						this.newCategoryTipShow = false;
						this.dialogCategoryVisible = false;
					} else {
						this.newCategoryTipShow = true;
					}
				} else {
					return false;
				}
			});
		},
		categoryAddChange() {},
		// getProfession(val) {
		// 	if (!this.$refs.mycascaderCategory.getCheckedNodes()[0].pathLabels) {
		// 		this.isSelectCity = "";
		// 	}
		// },
		getProfession(val) {
			console.dir(val);
		},
		hanndleStrogeSaveForm(data) {
			let expInfo = {
				title: data.title,
				category: data.category.join(","),
				shareMode: data.shareMode,
				content: data.content,
				industry: data.industry.join(","),
				address: data.address.join(","),
				cause: data.cause,
				reules: data.reules,
			};
			return expInfo;
		},
		backExperienceList() {
			this.$router.push({ name: "List", params: {} });
		},
		updateBaseInfo() {
			let params = this.hanndleStrogeSaveForm(
				Object.assign(this.form, this.moreForm)
			);
			params["id"] = this.$route.params.editBaseInfo.id;
			updateExperienceDataReq(params).then((res) => {
				if (res.success) {
					this.$b.successMsg("修改成功");
					this.$router.push({ name: "List", params: {} });
				}
			});
		},
		handleSave() {
			this.$refs["form"].validate((valid) => {
				if (valid) {
					let baseParams = this.hanndleStrogeSaveForm(
						Object.assign(this.form, this.moreForm)
					);
					localStorage.setItem(
						"experienceBaseInfo",
						JSON.stringify(baseParams)
					);
					this.$router.push({
						name: "TinymceEditor",
						params: {
							articleType: 1, //1：新增文章  2：编辑文章
							isReviewContent: true,
						},
					});
				} else {
					return false;
				}
			});
		},
	},
};
</script>
<style>
.addShare-treeEditStyle {
	height: 500px;
	overflow-y: scroll;
}
</style>
<style lang="scss" scoped>
::v-deep .custom-tree-node .el-button {
	margin-left: 10px;
}
::v-deep .el-cascader__tags .el-tag {
	margin-left: 5px;
}
::v-deep .el-collapse-item__header .el-icon-arrow-right {
	display: none;
}
::v-deep .el-collapse-item__wrap {
	border-bottom: 0px solid #606266;
}
::v-deep .el-collapse-item__header {
	border-bottom: 0px solid #606266;
}
.release {
	.newindustryTips {
		margin-left: 100px;
		p {
			margin: 0px;
			padding: 0px;
			color: #f56c6c;
			margin-top: 8px;
			font-size: 13px;
			font-weight: bold;
		}
	}
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
