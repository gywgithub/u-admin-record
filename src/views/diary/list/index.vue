<template>
	<div class="diary-list">
		<div class="headerTitle">
			<el-row>
				<el-col>
					<el-form
						ref="ruleFormRef"
						:inline="true"
						:model="ruleForm"
						:rules="formRules"
					>
						<el-form-item label="日期" prop="diaryDate">
							<el-date-picker
								v-model="ruleForm.diaryDate"
								type="daterange"
								align="right"
								unlink-panels
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
							></el-date-picker>
						</el-form-item>
						<el-form-item
							label="分类"
							prop="type"
							label-width="60px"
						>
							<el-select v-model="ruleForm.type">
								<el-option
									v-for="(item, index) in diaryTypeList"
									:key="index"
									:label="item.name"
									:value="item.id"
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
						@click="handleBatch($event)"
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
import elephantTable from "@/components/template/elephantTable";
import { getCatelogDataReq, queryDiaryReq, deleteDiaryReq } from "@/api/diary";
export default {
	name: "DiaryList",
	components: { elephantTable },
	filters: {},
	data() {
		return {
			diaryTypeList: [],
			diaryCatelogBak: [],
			pickerOptions: {},
			ruleForm: {
				diaryDate: [],
				type: "",
			},
			formRules: {},
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
			diaryListBakData: [],
			tableTitleData: [
				{
					id: 1,
					name: "标题",
					label: "标题",
					prop: "title",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 2,
					name: "内容",
					label: "内容",
					prop: "content",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 3,
					name: "分类",
					label: "分类",
					prop: "typeName",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 4,
					name: "关键词",
					label: "关键词",
					prop: "label",
					sort: false,
					sortType: "string",
					align: "center",
					filterData: [],
				},
				{
					id: 5,
					name: "关联的经验",
					label: "关联的经验",
					prop: "customList",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 6,
					name: "创建时间",
					label: "创建时间",
					prop: "createTime",
					sort: false,
					width: "180px",
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
			height: "500px",
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
		},
		//初始化表单数据
		initFormData() {
			let userIdObj = JSON.parse(localStorage.getItem("userInfo"));
			getCatelogDataReq({ userId: userIdObj.userId }).then((res) => {
				if (res.success) {
					this.$_.deepClone(res.data, this.diaryCatelogBak);
					this.diaryTypeList = res.data;
					this.fetchData();
				}
			});
		},
		//分页控件获取数据
		pageFn({ pageSize, pageNo }) {
			this.queryPageSize = pageSize;
			this.queryPageNo = pageNo;
			this.fetchData();
		},
		//当某个单元格被点击时
		cellUserClick({ row, column, cell, event }) {
			if (column.label == "关联的经验" && event.target.dataset.linkexp) {
				//关联的经验，多个日记； 就可以写成一篇好文章
			}

			if (column.label == "操作") {
				if (event.target.innerText == "编辑") {
					this.$router.push({
						name: "Diary",
						params: {
							diaryId: event.target.dataset.id,
						},
					});
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
		selectRowData({ selection, row }) {
			this.selectRows = selection;
		},
		selectAllRowData({ selection }) {
			this.selectRows = selection;
		},
		handleBatch(row) {
			let msg = "您确定要删除吗?";
			if (row.id) {
				this.$baseConfirm(msg, { title: "提示" }, async () => {
					this.$b.successMsg("未选中任何行");
				});
			} else {
				if (this.selectRows.length > 0) {
					this.$baseConfirm(msg, { title: "提示" }, async () => {
						this.hanndleBtnFn(this.selectRows);
					});
				} else {
					this.$b.warningMsg("未选中任何行");
					return false;
				}
			}
		},
		hanndleBtnFn(selectRows) {
			let ids = [];
			for (let i = 0; i < selectRows.length; i++) {
				ids.push(selectRows[i]["id"]);
			}
			this.deleteFn(ids);
		},
		deleteFn(ids) {
			deleteDiaryReq(ids).then((res) => {
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
					this.ruleForm.diaryDate.length > 0
						? new Date(this.ruleForm.diaryDate[0]).Format(
								"yyyy-MM-dd"
						  )
						: "",
				endTime =
					this.ruleForm.diaryDate.length > 0
						? new Date(this.ruleForm.diaryDate[1]).Format(
								"yyyy-MM-dd"
						  )
						: "";
			let param = {
				startTime: startTime,
				endTime: endTime,
				diaryCatalogId: this.ruleForm.type,
				userId: userIdstr.userId,
				pageSize: this.queryPageSize,
				pageIndex: this.queryPageNo,
			};
			queryDiaryReq(param).then((res) => {
				if (res.success) {
					this.$_.deepClone(
						res.data.diaryList,
						this.diaryListBakData
					);
					let json = res.data.diaryList;
					for (let i = 0; i < json.length; i++) {
						json[i].customHanndle = ["编辑", "删除"];
					}

					let cat = this.diaryCatelogBak,
						catLen = this.diaryCatelogBak.length;

					for (let j = 0; j < json.length; j++) {
						//关联经验处理逻辑
						if (json[j].customList) {
							json[j].customList =
								"<span class='el-icon-connection font18 linkText' data-linkexp='true'></span>";
						} else {
							json[j].customList = "无关联";
						}

						//分类处理逻辑
						for (let k = 0; k < catLen; k++) {
							if (json[j].diaryCatalogId == cat[k].id) {
								json[j].typeName = cat[k].name;
								break;
							}
						}

						//操作按钮逻辑
						let hanndleStr = "";
						for (let i = 0; i < json[j].customHanndle.length; i++) {
							hanndleStr +=
								"<span class='linkText ml10' data-id='" +
								json[j].id +
								"'>" +
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
::v-deep .setTopCss .el-dialog__body {
	padding-top: 10px;
	padding-bottom: 10px;
}
::v-deep .el-form-item {
	margin-bottom: 0px;
}
.tipRule {
	font-size: 14px;
	border: none;
	padding: 0px;
}
.setTopCss {
	p {
		padding: 0px;
		margin: 0px;
	}
	.topiceTitle {
		font-weight: bold;
	}
	.boldFix {
		font-weight: bold;
		line-height: 30px;
	}
}
.seeSelf {
	margin-bottom: 20px;
}
</style>
