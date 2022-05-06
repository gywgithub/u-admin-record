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
				<el-form-item label="紧急程度" prop="urgentLevel">
					<el-select
						v-model="demandModelForm.urgentLevel"
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
				<el-form-item label="所属类别" prop="catalog">
					<el-select
						v-model="demandModelForm.catalog"
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
				<el-form-item label="描述" prop="descript">
					<el-input
						v-model="demandModelForm.descript"
						type="textarea"
						maxlength="300"
						resize="none"
						show-word-limit
						style="width: 500px"
						:autosize="{ minRows: 6 }"
						placeholder="限300字"
					></el-input>
				</el-form-item>
				<el-form-item label="需求场景" prop="applyScenes">
					<el-input
						v-model="demandModelForm.applyScenes"
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
				urgentLevel: "",
				catalog: "",
				descript: "",
				applyScenes: "",
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
				catalog: [
					{
						required: true,
						trigger: "change",
						message: "请选择",
					},
				],
				urgentLevel: [
					{
						required: true,
						trigger: "change",
						message: "请选择",
					},
				],
				applyScenes: [
					{
						required: true,
						trigger: "change",
						message: "请选择",
					},
				],
			},
			isShowPagesBol: false,
			taskTableHeight: "700px",
			isCusColumn: true, //是否开启列自定义
			defaultShowFailed: false, //开启列自定义或行自定义，此属性必须为false
			demandsList: [],
			tableTitleData: [
				{
					id: 1,
					name: "紧急程度",
					label: "紧急程度",
					prop: "urgentLevel",
					sort: false,
					width: "180px",
					align: "center",
					filterData: [],
				},
				{
					id: 2,
					name: "需求场景",
					label: "需求场景",
					prop: "applyScenes",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 3,
					name: "发起人",
					label: "发起人",
					prop: "userName",
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
					prop: "descript",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 6,
					name: "所属分类",
					label: "所属分类",
					prop: "catalog",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 7,
					name: "备注",
					label: "备注",
					prop: "remark",
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
			demandListBak:[],
			currRow:{}
		};
	},
	mounted() {
		this.initData();
	},
	methods: {
		initData() {
			this.getDemandListData();
		},
		getDemandListData(){
			getDemandDataReq().then((res)=>{
				this.$_.deepClone(
					res.data,
					this.demandListBak
				);
				this.packageData(res);
			});
		},
		packageData(data){
			let json = data.data;
			for (let i = 0; i < json.length; i++) {
				if (json[i].urgentLevel == 1) {
					json[i].urgentLevel =
						"<span class='lev-demand jg-demand'>极高</span>";
				}
				if (json[i].urgentLevel == 2) {
					json[i].urgentLevel =
						"<span class='lev-demand g-demand'>高</span>";
				}
				if (json[i].urgentLevel == 3) {
					json[i].urgentLevel =
						"<span class='lev-demand z-demand'>中</span>";
				}
				if (json[i].urgentLevel == 4) {
					json[i].urgentLevel =
						"<span class='lev-demand d-demand'>低</span>";
				}
				if (json[i].catalog == 1) {
					json[i].catalog = "<span class=''>核心功能</span>";
				}
				if (json[i].catalog == 2) {
					json[i].catalog = "<span class=''>新功能</span>";
				}
				if (json[i].catalog == 3) {
					json[i].catalog = "<span class=''>功能优化</span>";
				}
				if (json[i].catalog == 4) {
					json[i].catalog = "<span class=''>样式优化</span>";
				}
				if (json[i].catalog == 5) {
					json[i].catalog = "<span class=''>代码优化</span>";
				}
				if (json[i].catalog == 6) {
					json[i].catalog = "<span class=''>系统规则优化</span>";
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
				json[j].createTime = new Date(json[j].createTime).Format(
					"yyyy-MM-dd hh:mm:ss"
				);
				if(json[j].updateTime){
					json[j].updateTime = new Date(json[j].updateTime).Format(
						"yyyy-MM-dd hh:mm:ss"
					);
				}
			}
			this.demandsList = json;
		},
		handleBatch(e) {
			this.dialogTitle = "新增需求";
			this.dialogVisible = true;
			this.$refs.demandForm.resetFields();
		},
		addDemand(refDom) {
			this.$refs[refDom].validate((valid) => {
				if (valid) {
					if (this.dialogTitle == "新增需求") {
						this.hanndleAddDemand();
					} else {
						this.hanndleUpdateDemand();
					}
				}
			});
		},
		handleClose() {
			this.dialogVisible = false;
		},
		hanndleAddDemand(){
			addDemandReq(this.demandModelForm).then((res)=>{
				if(res.success){
					this.$message.success("添加成功");
					this.dialogVisible = false;
					this.getDemandListData();
				}
			});
		},
		hanndleUpdateDemand(){
			let params = { id : this.currRow.id};
			Object.assign(params, this.demandModelForm)
			updateDemandReq(params).then((res)=>{
				if(res.success){
					this.$message.success("修改成功");
					this.dialogVisible = false;
					this.getDemandListData();
				}
			});
		},
		reviewData(id){
			let bakData = this.demandListBak;
			let reviewData = {};
			for(let i =0;i<bakData.length;i++){
				if(id == bakData[i].id){
					reviewData = bakData[i];
				}
			}
			this.$nextTick(() => {
				this.demandModelForm.title = reviewData.title;
				this.demandModelForm.urgentLevel = reviewData.urgentLevel;
				this.demandModelForm.catalog = parseInt(reviewData.catalog);
				this.demandModelForm.descript = reviewData.descript;
				this.demandModelForm.applyScenes = reviewData.applyScenes;
				this.demandModelForm.remark = reviewData.remark;
			});
		},
		//当某个单元格被点击时
		cellUserClick({ row, column, cell, event }) {
			if (column.label == "操作") {
				if (event.target.innerText == "编辑") {
					this.reviewData(row.id);
					this.currRow = row;
					this.dialogTitle = "修改需求";
					this.dialogVisible = true;
				}
				if (event.target.innerText == "删除") {
					this.$baseConfirm(
						"您确定要删除吗?",
						{ title: "提示" },
						async () => {
							this.deleteFn([event.target.dataset.id]);
						}
					);
				}
			}
		},
		deleteFn(ids){
			deleteDemandReq(ids).then((res)=>{
				if(res.success){
					this.$message.success("删除成功");
					this.getDemandListData();
				}
			});
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
