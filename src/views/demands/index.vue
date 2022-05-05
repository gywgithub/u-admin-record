<template>
	<div class="demands">
		<div class="mainBody mt30" ref="mainRef">
			<el-row class="mb30">
				<el-col>
					<el-button
						icon="el-icon-plus"
						type="primary"
						@click="handleBatch($event)"
					>
						新 增
					</el-button>
				</el-col>
			</el-row>
			<elephant-table
				:tableSourceData="demandsList"
				:tableSourceTitleData="tableTitleData"
				:isOpenMultipleSelect="isSelectTable"
				:tableHeight="taskTableHeight"
				:isOpenColumnCustom="isCusColumn"
				:openDefaultRender="defaultShowFailed"
				:isShowPages="isShowPagesBol"
				@cellClicked="cellUserClick"
			>
			</elephant-table>
		</div>
		<el-drawer
			:title="dialogTitle"
			:visible.sync="dialogVisible"
			:direction="direction"
			size="680px"
			:wrapperClosable="wrapperClosableBol"
			:before-close="handleClose"
		>
			<div slot="title">
				<h2>{{ dialogTitle }}</h2>
			</div>
			<el-form
				ref="demandForm"
				:model="demandModelForm"
				:rules="demandModelRules"
				:label-position="demandPos"
				class="disf"
				label-width="120px"
			>
				<el-form-item label="标题" prop="title">
					<el-input
						v-model="demandModelForm.title"
						placeholder=""
						style="width: 500px"
					></el-input>
				</el-form-item>
				<el-form-item label="紧急程度" prop="demandLevel">
					<el-select
						v-model="demandModelForm.demandLevel"
						placeholder="请选择"
						style="width: 500px"
					>
						<el-option
							v-for="item in demandLevelList"
							:key="item.id"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="所属类别" prop="category">
					<el-select
						v-model="demandModelForm.category"
						placeholder="请选择"
						style="width: 500px"
					>
						<el-option
							v-for="item in categoryList"
							:key="item.id"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="描述" prop="descride">
					<el-input
						v-model="demandModelForm.descride"
						type="textarea"
						maxlength="300"
						resize="none"
						show-word-limit
						style="width: 500px"
						:autosize="{ minRows: 6 }"
						placeholder="限300字"
					></el-input>
				</el-form-item>
				<el-form-item label="需求场景" prop="demandScenes">
					<el-input
						v-model="demandModelForm.demandScenes"
						type="textarea"
						maxlength="500"
						resize="none"
						style="width: 500px"
						show-word-limit
						:autosize="{ minRows: 6 }"
						placeholder="限500字"
					></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="remark">
					<el-input
						v-model="demandModelForm.remark"
						type="textarea"
						maxlength="200"
						resize="none"
						style="width: 500px"
						show-word-limit
						:autosize="{ minRows: 6 }"
						placeholder="限200字"
					></el-input>
				</el-form-item>
				<el-button
					type="primary"
					class="ml120-imp"
					@click="addDemand('demandForm')"
					>提 交</el-button
				>
			</el-form>
		</el-drawer>
	</div>
</template>

<script>
import elephantTable from "@/components/template/elephantTable";
import {
	addDemandReq,
	deleteDemandReq,
	updateDemandReq,
	getDemandDataReq,
} from "@/api/demands";
export default {
	name: "Demands",
	components: {
		elephantTable,
	},
	data() {
		return {
			demandLevelList: [
				{ id: 1, label: "极高", value: 1 },
				{ id: 2, label: "高", value: 2 },
				{ id: 3, label: "中", value: 3 },
				{ id: 4, label: "低", value: 4 },
			],
			categoryList: [
				{ id: 1, label: "核心功能", value: 1 },
				{ id: 2, label: "新功能", value: 2 },
				{ id: 3, label: "功能优化", value: 3 },
				{ id: 4, label: "样式优化", value: 4 },
				{ id: 5, label: "代码优化", value: 5 },
				{ id: 6, label: "系统规则优化", value: 6 },
			],
			dialogTitle: "新增需求",
			wrapperClosableBol: false,
			dialogVisible: false,
			unModalBack: false,
			direction: "rtl",
			demandPos: "right",
			demandModelForm: {
				title: "",
				demandLevel: "",
				category: "",
				descride: "",
				demandScenes: "",
				remark: "",
			},
			demandModelRules: {
				title: [
					{
						required: true,
						trigger: "change",
						message: "请输入",
					},
				],
				category: [
					{
						required: true,
						trigger: "change",
						message: "请选择",
					},
				],
				demandLevel: [
					{
						required: true,
						trigger: "change",
						message: "请选择",
					},
				],
				demandScenes: [
					{
						required: true,
						trigger: "change",
						message: "请选择",
					},
				],
			},
			isSelectTable: true,
			isShowPagesBol: false,
			taskTableHeight: "700px",
			isCusColumn: true, //是否开启列自定义
			defaultShowFailed: false, //开启列自定义或行自定义，此属性必须为false
			demandsList: [
				{
					id: 1,
					title: "首页功能都没做",
					jjcd: 1,
					xqcj: "首页功能排行榜对用户很重要",
					fqr: "张盼伟",
					ms: "好的，核心功能必须做",
					ssfl: 1,
					bz: "这个功能在首页",
					updateUserName: "程详一",
					updateTime: "2021-12-30 12:01:23",
					createTime: "2021-11-04 08:12:05",
				},
				{
					id: 2,
					title: "发起经验优化",
					jjcd: 2,
					xqcj: "发起经验优化对用户很重要",
					fqr: "张盼伟",
					ms: "",
					bz: "这个功能在首页",
					ssfl: 2,
					createTime: "2022-01-12 16:01:31",
				},
				{
					id: 3,
					title: "权限还未完善",
					jjcd: 3,
					xqcj: "权限还未完善",
					fqr: "张盼伟",
					ms: "必须完善",
					bz: "这个功能在首页",
					ssfl: 3,
					createTime: "2021-09-12 13:21:33",
					updateUserName: "郭远威",
					updateTime: "2022-03-12 11:12:56",
				},
				{
					id: 4,
					title: "征求经验规则优化",
					jjcd: 4,
					xqcj: "征求经验金额需要调整",
					fqr: "张盼伟",
					ms: "",
					bz: "这个功能在首页",
					ssfl: 6,
					createTime: "2022-04-01 18:08:33",
				},
			],
			tableTitleData: [
				{
					id: 1,
					name: "紧急程度",
					label: "紧急程度",
					prop: "jjcd",
					sort: false,
					width: "180px",
					align: "center",
					filterData: [],
				},
				{
					id: 2,
					name: "需求场景",
					label: "需求场景",
					prop: "xqcj",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 3,
					name: "发起人",
					label: "发起人",
					prop: "fqr",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 4,
					name: "标题",
					label: "标题",
					prop: "title",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 5,
					name: "描述",
					label: "描述",
					prop: "ms",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 6,
					name: "所属分类",
					label: "所属分类",
					prop: "ssfl",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 7,
					name: "备注",
					label: "备注",
					prop: "bz",
					sort: false,
					width: "180px",
					align: "center",
					filterData: [],
				},
				{
					id: 8,
					name: "创建时间",
					label: "创建时间",
					prop: "createTime",
					sort: false,
					width: "180px",
					align: "center",
					filterData: [],
				},
				{
					id: 9,
					name: "更新人",
					label: "更新人",
					prop: "updateUserName",
					sort: false,
					width: "180px",
					align: "center",
					filterData: [],
				},
				{
					id: 10,
					name: "更新时间",
					label: "更新时间",
					prop: "updateTime",
					sort: false,
					width: "180px",
					align: "center",
					filterData: [],
				},
				{
					id: 11,
					name: "操作",
					label: "操作",
					prop: "customHanndle",
					sort: false,
					fixed: false,
					align: "center",
					filterData: [],
				},
			],
		};
	},
	mounted() {
		this.initData();
	},
	methods: {
		initData() {
			let json = this.demandsList;
			for (let i = 0; i < json.length; i++) {
				if (json[i].jjcd == 1) {
					json[i].jjcd =
						"<span class='lev-demand jg-demand'>极高</span>";
				}
				if (json[i].jjcd == 2) {
					json[i].jjcd =
						"<span class='lev-demand g-demand'>高</span>";
				}
				if (json[i].jjcd == 3) {
					json[i].jjcd =
						"<span class='lev-demand z-demand'>中</span>";
				}
				if (json[i].jjcd == 4) {
					json[i].jjcd =
						"<span class='lev-demand d-demand'>低</span>";
				}
				if (json[i].ssfl == 1) {
					json[i].ssfl = "<span class=''>核心功能</span>";
				}
				if (json[i].ssfl == 2) {
					json[i].ssfl = "<span class=''>新功能</span>";
				}
				if (json[i].ssfl == 3) {
					json[i].ssfl = "<span class=''>功能优化</span>";
				}
				if (json[i].ssfl == 4) {
					json[i].ssfl = "<span class=''>样式优化</span>";
				}
				if (json[i].ssfl == 5) {
					json[i].ssfl = "<span class=''>代码优化</span>";
				}
				if (json[i].ssfl == 6) {
					json[i].ssfl = "<span class=''>系统规则优化</span>";
				}
				json[i].customHanndle = ["编辑", "删除"];
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
			}
			this.demandsList = json;
		},
		handleBatch(e) {
			this.dialogTitle = "新增需求";
			this.dialogVisible = true;
		},
		addDemand(refDom) {
			this.$refs[refDom].validate((valid) => {
				if (valid) {
					if (this.dialogTitle == "新增需求") {
						this.hanndleAddCatelog();
					} else {
						this.hanndleUpdateCatelog();
					}
				}
			});
		},
		handleClose() {
			this.dialogVisible = false;
		},
		//当某个单元格被点击时
		cellUserClick({ row, column, cell, event }) {
			if (column.label == "操作") {
				if (event.target.innerText == "编辑") {
					this.dialogTitle = "修改需求";
					this.dialogVisible = true;
				}
				if (event.target.innerText == "删除") {
					this.$baseConfirm(
						"您确定要删除吗?",
						{ title: "提示" },
						async () => {
							this.$message.success("删除成功");
							// this.deleteFn([event.target.dataset.id]);
						}
					);
				}
			}
		},
	},
};
</script>
<style>
.lev-demand {
	display: inline-block;
	color: #fff;
	border-radius: 3px;
	width: 50px;
	height: 25px;
}
.jg-demand {
	background-color: #f56c6c;
	border-color: #f56c6c;
}
.g-demand {
	background-color: #e6a23c;
	border-color: #e6a23c;
}
.z-demand {
	background-color: #67c23a;
	border-color: #67c23a;
}
.d-demand {
	background-color: #409eff;
	border-color: #409eff;
}
</style>
<style lang="scss" scoped>
.demands {
}
</style>
