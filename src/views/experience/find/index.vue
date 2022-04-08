<template>
	<div class="find">
		<div class="headerTitle">
			<el-row>
				<el-col>
					<el-form
						ref="ruleForm"
						:inline="true"
						:model="ruleForm"
						:rules="formRules"
						class="demo-ruleForm"
					>
						<el-form-item label="日期" prop="shareDate">
							<el-date-picker
								v-model="ruleForm.queryDate"
								type="daterange"
								align="right"
								unlink-panels
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
								:picker-options="pickerOptions"
							></el-date-picker>
						</el-form-item>
						<el-form-item
							label="征求状态"
							prop="status"
							label-width="90px"
						>
							<el-select v-model="ruleForm.status">
								<el-option
									v-for="(
										item, index
									) in findExperienceStatusList"
									:key="index"
									:label="item.text"
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
						<el-button
							icon="el-icon-search"
							type="primary"
							@click="handleQuery"
						>
							查 询
						</el-button>
					</el-form>
				</el-col>
			</el-row>
		</div>
		<div class="mainBody mt30" ref="mainRef">
			<el-row class="mb30">
				<el-col>
					<el-button
						icon="el-icon-delete"
						type="warning"
						@click="handleBatch($event, 3)"
					>
						批量删除
					</el-button>
				</el-col>
			</el-row>
			<elephant-table
				:tableSourceData="tableData"
				:tableSourceTitleData="tableTitleData"
				:pageTotal="tableListTotal"
				:pageNo="resetPageNo"
				:pageSize="resetPageSize"
				:isOpenMultipleSelect="isSelectTable"
				:tableHeight="taskTableHeight"
				:isOpenColumnCustom="isCusColumn"
				:openDefaultRender="defaultShowFailed"
				@getData="pageFn"
				@cellClicked="cellUserClick"
				@selectRowed="selectRowData"
				@selectAllRowed="selectAllRowData"
			>
			</elephant-table>
		</div>
	</div>
</template>

<script>
import { getInitDataReq, deleteDataReq } from "@/api/experience";
import elephantTable from "@/components/template/elephantTable";
export default {
	name: "Find",
	components: { elephantTable },
	filters: {},
	data() {
		return {
			findExperienceStatusList: [
				{ id: 1, text: "未发布", value: 1 },
				{ id: 2, text: "进行中", value: 2 },
				{ id: 3, text: "已采纳", value: 3 },
				{ id: 4, text: "已结束", value: 4 },
			],
			pickerOptions: {
				shortcuts: [
					{
						text: "最近一周",
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 7
							);
							picker.$emit("pick", [start, end]);
						},
					},
					{
						text: "最近一个月",
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 30
							);
							picker.$emit("pick", [start, end]);
						},
					},
					{
						text: "最近三个月",
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 90
							);
							picker.$emit("pick", [start, end]);
						},
					},
				],
			},
			warpHeight: "730px",
			ruleForm: {
				queryDate: [],
				type: "",
				status: "",
			},
			formRules: {
				status: [{ required: false, message: "", trigger: "blur" }],
			},
			list: [],
			tableListTotal: 0,
			queryPageNo: 1,
			queryPageSize: 100,
			resetPageNo: 1,
			resetPageSize: 100,
			isSelectTable: true,
			taskTableHeight: "700px",
			isCusColumn: true, //是否开启列自定义
			defaultShowFailed: false, //开启列自定义或行自定义，此属性必须为false
			tableData: [],
			experienceListBakSourceData: [],
			tableTitleData: [
				{
					id: 3,
					name: "征求者",
					label: "征求者",
					prop: "userName",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 1,
					name: "主标题",
					label: "主标题",
					prop: "title",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 8,
					name: "价值模式",
					label: "价值模式",
					prop: "shareMode",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 12,
					name: "所属行业",
					label: "所属行业",
					prop: "sshy",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 5,
					name: "发布状态",
					label: "发布状态",
					prop: "status",
					sort: false,
					sortType: "string",
					align: "center",
					filterData: [],
				},
				{
					id: 13,
					name: "付费类型",
					label: "付费类型",
					prop: "sy",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 2,
					name: "描述",
					label: "描述",
					prop: "content",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 6,
					name: "发布时间",
					label: "发布时间",
					prop: "createTime",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 7,
					name: "操作",
					label: "操作",
					prop: "customHanndle",
					sort: false,
					fixed: false,
					align: "center",
					filterData: [],
				},
			],
			selectRows: [],
		};
	},
	computed: {},
	watch: {},
	created() {
		this.initData();
	},
	beforeDestroy() {},
	mounted() {
		this.$nextTick(() => {
			this.taskTableHeight = this.$b.dynamicWinHeight(350);
		});
	},
	methods: {
		initData() {
			this.initFormData();
			this.fetchData();
		},
		//初始化表单数据
		initFormData() {},
		//分页控件获取数据
		pageFn({ pageSize, pageNo }) {
			this.queryPageSize = pageSize;
			this.queryPageNo = pageNo;
			this.fetchData();
		},
		//当某个单元格被点击时
		cellUserClick({ row, column, cell, event }) {
			console.dir(event.target);
			if (
				column.label == "参与者" &&
				event.target.innerText == "查看" &&
				event.target.dataset.see
			) {
				// this.seeAllSharePeople(row);
				this.$router.push("/experience/participantList");
			}
			if (
				column.label == "全部文章" &&
				event.target.innerText == "查看" &&
				event.target.dataset.artict
			) {
				this.$router.push({ name: "ArticleList", params: {} });
			}

			if (column.label == "操作") {
				//操作列
				this.hanndleOperate({
					row: row,
					column: column,
					cell: cell,
					event: event,
				});
			}
		},
		hanndleOperate({ row, column, cell, event }) {
			if (event.target.innerText == "编辑") {
				this.hanndlePackageFromData(row);
			}
			if (event.target.innerText == "删除") {
				this.goodsDelete(row);
			}
			if (event.target.innerText == "参与") {
				this.$router.push({
					name: "TinymceEditor",
					params: { isOnlyTitle: true, titleContent: row },
				});
			}
			if (event.target.innerText == "驳回") {
				console.log("驳回");
			}
			if (event.target.innerText == "通过") {
				console.log("通过");
			}
		},
		hanndlePackageFromData(data) {
			let currData = {};
			for (let i = 0; i < this.experienceListBakSourceData.length; i++) {
				if (this.experienceListBakSourceData[i].id == data.id) {
					currData = this.experienceListBakSourceData[i];
				}
			}
			console.dir(currData);
			this.$router.push({
				name: "Seek",
				params: {},
			});
		},
		selectRowData({ selection, row }) {
			this.selectRows = selection;
		},
		selectAllRowData({ selection }) {
			this.selectRows = selection;
		},
		goodsDelete() {
			this.$b.successMsg("删除成功");
		},
		handleBatch(row, type) {
			let msg = "";
			if (type === 3) {
				msg = "您确定要删除吗?";
			}
			if (row.id) {
				this.$baseConfirm(msg, { title: "提示" }, async () => {
					this.$b.successMsg("未选中任何行");
				});
			} else {
				if (this.selectRows.length > 0) {
					this.$baseConfirm(msg, { title: "提示" }, async () => {
						this.hanndleBtnFn(type, this.selectRows);
					});
				} else {
					this.$b.warningMsg("未选中任何行");
					return false;
				}
			}
		},
		hanndleBtnFn(type, selectRows) {
			let ids = [];
			for (let i = 0; i < selectRows.length; i++) {
				ids.push(selectRows[i]["id"]);
			}
			if (type === 3) {
				this.deleteExperience(ids);
			}
		},
		deleteExperience(data) {
			deleteDataReq(data).then((res) => {
				if (res.success) {
					this.$b.successMsg("删除成功");
					this.fetchData();
				}
			});
		},
		handleQuery() {
			this.fetchData();
		},
		fetchData(fn) {
			let userIdstr = JSON.parse(localStorage.getItem("userInfo"));
			let startTime =
					this.ruleForm.queryDate.length > 0
						? new Date(this.ruleForm.queryDate[0]).Format(
								"yyyy-MM-dd"
						  )
						: "",
				endTime =
					this.ruleForm.queryDate.length > 0
						? new Date(this.ruleForm.queryDate[1]).Format(
								"yyyy-MM-dd"
						  )
						: "";
			let param = {
				startTime: startTime,
				endTime: endTime,
				status: this.ruleForm.status,
				type: this.ruleForm.type,
				userId: userIdstr.userId,
				pageSize: this.queryPageSize,
				pageIndex: this.queryPageNo,
			};
			getInitDataReq(param).then((res) => {
				if (res.success) {
					this.$_.deepClone(
						res.data.experienceList,
						this.experienceListBakSourceData
					);
					let userName = res.data.userName;
					let json = res.data.experienceList;
					for (let i = 0; i < json.length; i++) {
						json[i].userName = userName;
						json[i].sy = "微信";
						json[i].sshy = "互联网";
						json[i].customHanndle = [
							"编辑",
							"通过",
							"驳回",
							"删除",
						];
					}

					for (let j = 0; j < json.length; j++) {
						if (json[j].shareMode == 1) {
							json[j].shareMode = "共享模式";
						} else if (json[j].shareMode == 2) {
							json[j].shareMode = "打赏模式";
						} else if (json[j].shareMode == 3) {
							json[j].shareMode = "付费模式";
						}
						if (json[j].status == 1) {
							json[j].status = "未发布";
						} else if (json[j].status == 2) {
							json[j].status = "进行中";
						} else if (json[j].status == 3) {
							json[j].status = "已采纳";
						} else if (json[j].status == 4) {
							json[j].status = "已结束";
						} else if (json[j].status == 5) {
							json[j].status = "人工处理中";
						}
						let hanndleStr = "";
						for (let i = 0; i < json[j].customHanndle.length; i++) {
							hanndleStr +=
								"<span class='linkText ml10'>" +
								json[j].customHanndle[i] +
								"</span>";
						}
						json[j].customHanndle = hanndleStr;
						json[j].createTime = new Date(
							json[j].createTime
						).Format("yyyy-MM-dd hh:mm:ss");
					}
					this.tableData = json;
					this.tableListTotal = res.data.total;
				}
			});
		},
	},
};
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__body {
	overflow: hidden;
}
::v-deep .el-button {
	margin-left: 10px;
}
::v-deep .el-form-item {
	margin-bottom: 0px;
}
</style>
