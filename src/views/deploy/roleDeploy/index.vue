<template>
	<div class="role-deploy">
		<div class="mainBody mt15">
			<el-row class="mb30">
				<el-col>
					<el-button type="primary" @click="addRole">
						<i class="elephant">&#xe6b6;</i> 添加
					</el-button>
				</el-col>
			</el-row>
			<elephant-table
				:tableSourceData="tableData"
				:tableSourceTitleData="tableTitleData"
				:tableHeight="taskTableHeight"
				:isOpenColumnCustom="isCusColumn"
				:openDefaultRender="defaultShowFailed"
				:isShowPages="isShowPagesBoobeal"
				@cellClicked="cellUserClick"
			>
			</elephant-table>
		</div>
		<el-dialog
			:visible.sync="roleDiglog"
			width="30%"
			:before-close="handleClose"
		>
			<el-form ref="addRef" :model="addFormForm" :rules="addFormRules">
				<el-form-item
					label="角色名称"
					prop="roleName"
					label-width="80px"
				>
					<el-input
						v-model="addFormForm.roleName"
						maxlength="30"
						placeholder=""
					></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="remark" label-width="80px">
					<el-input
						v-model="addFormForm.remark"
						type="textarea"
						maxlength="200"
						resize="none"
						show-word-limit
						:autosize="{ minRows: 6 }"
						placeholder="限200字"
					></el-input>
				</el-form-item>
				<el-form-item label-width="80px">
					<el-button type="primary" @click="hanndleAdd('addRef')">
						提 交
					</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import elephantTable from "@/components/template/elephantTable";
export default {
	name: "RoleDeploy",
	components: { elephantTable },
	computed: {},
	watch: {},
	data() {
		return {
			roleDiglog: false,
			taskTableHeight: "730px",
			isShowPagesBoobeal: false,
			isCusColumn: true, //
			defaultShowFailed: false, //开启列自定义或行自定义，此属性必须为false
			selectRows: [],
			addFormForm: {
				roleName: "",
				remark: "",
			},
			addFormRules: {
				roleName: [
					{
						required: true,
						trigger: "change",
						message: "请输入",
					},
				],
			},
			tableTitleData: [
				{
					id: 1,
					name: "角色名称",
					label: "角色名称",
					prop: "roleName",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 2,
					name: "备注",
					label: "备注",
					prop: "remark",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 3,
					name: "修改时间",
					label: "修改时间",
					prop: "updateTime",
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
					prop: "hanndle",
					sort: false,
					align: "center",
					filterData: [],
				},
			],
			tableData: [],
		};
	},
	created() {
		this.initData();
	},
	mounted() {
		this.$nextTick(() => {
			this.taskTableHeight = this.$b.dynamicWinHeight(210);
		});
	},
	methods: {
		initData() {
			let json = [];
			for (let i = 0; i < 8; i++) {
				let temp = {};
				temp.roleName = "管理员";
				temp.remark = "";
				temp.updateTime = "2022-11-12 22:12:04";
				temp.createTime = "2022-04-10 14:24:36";
				temp.hanndle =
					"<span class='linkText ml20' data-permission='true'>权限配置</span> <span class='linkText ml20' data-edit='true'>编辑</span> <span class='linkText ml20' data-delete='true'>删除</span>";
				json.push(temp);
			}
			this.tableData = json;
		},
		//当某个单元格被点击时
		cellUserClick({ row, column, cell, event }) {
			if (
				column.label == "操作" &&
				event.target.innerText == "权限配置" &&
				event.target.dataset.permission
			) {
				this.$router.push({
					name: "PermissionSetting",
					params: {},
				});
				// this.$b.successMsg("权限配置");
			}
			if (
				column.label == "操作" &&
				event.target.innerText == "编辑" &&
				event.target.dataset.edit
			) {
				this.$b.successMsg("编辑");
			}
			if (
				column.label == "操作" &&
				event.target.innerText == "删除" &&
				event.target.dataset.delete
			) {
				this.$baseConfirm(
					"您确认删除此角色吗？",
					{ title: "提示" },
					async () => {
						this.$b.successMsg("删除成功");
					}
				);
			}
		},
		addRole() {
			this.roleDiglog = true;
		},
		handleClose() {
			this.roleDiglog = false;
		},
		hanndleAdd(refDom) {
			this.$refs[refDom].validate((valid) => {
				if (valid) {
					this.hanndleAddBusiness();
				}
			});
		},
		hanndleAddBusiness() {
			this.roleDiglog = false;
			this.$b.successMsg("添加成功");
		},
	},
};
</script>

<style lang="scss" scoped></style>
