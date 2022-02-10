<template>
	<div class="participant-list">
		<!-- <el-table :data="shareList" style="width: 100%">
			<el-table-column type="expand">
				<template slot-scope="scope">
					 {{ scope.row }}
					<el-table :data="selfShareList" border style="width: 100%">
						<el-table-column
							prop="name"
							label="Ta的案例"
							align="center"
						></el-table-column>
						<el-table-column
							prop="updateTime"
							label="最后更新时间"
							align="center"
						></el-table-column>
						<el-table-column label="经验者" align="center">
							<template #default="{ row }">
								{{ row.author }}
								张三
							</template>
						</el-table-column>
						<el-table-column
							prop="singlecoll"
							label="点赞数"
							align="center"
						></el-table-column>
						<el-table-column
							prop="pro"
							label="省"
							align="center"
						></el-table-column>
						<el-table-column
							prop="city"
							label="市"
							align="center"
						></el-table-column>
						<el-table-column
							prop="createTime"
							label="发布时间"
							align="center"
						></el-table-column>
						<el-table-column label="" width="180" align="center">
							<template slot="header" slot-scope="scope">
								操作
								 {{ scope.row }}
								<el-tooltip
									class="item"
									effect="dark"
									content="每位用户每月最多申诉3次"
									placement="top-start"
								>
									<el-link
										icon="el-icon-question"
										:underline="false"
									></el-link>
								</el-tooltip>
							</template>
							<template slot-scope="scope">
								<el-button
									type="text"
									size="small"
									@click="seeDetail(scope.row)"
								>
									查看
								</el-button>
								<el-button type="text" size="small"
									>上架</el-button
								>
								<el-button type="text" size="small"
									>下架</el-button
								>
								<el-button
									type="text"
									size="small"
									@click="report(scope.row)"
								>
									申诉
								</el-button>
							</template>
						</el-table-column>
					</el-table>
				</template>
			</el-table-column>
			<el-table-column
				label="参与者"
				prop="author"
				align="center"
			></el-table-column>
			<el-table-column
				label="参与者级别"
				prop="levUser"
				align="center"
			></el-table-column>
			<el-table-column label="总点赞数" prop="coll" align="center">
				<template slot="header" slot-scope="scope">
					总点赞数{{ scope.row }}
					<el-tooltip
						class="item"
						effect="dark"
						content="经验者所有经验案例点赞数累加之和"
						placement="top-start"
					>
						<el-link
							icon="el-icon-question"
							:underline="false"
						></el-link>
					</el-tooltip>
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作">
				<template>
					<el-link type="primary" :underline="false">关注</el-link>
					<el-link type="primary" :underline="false" class="ml20"
						>拉黑</el-link
					>
					<el-link type="primary" :underline="false" class="ml20"
						>举报</el-link
					>
				</template>
			</el-table-column>
		</el-table> -->
		<div class="mainBody">
			<elephant-table
				:tableSourceData="tableData"
				:tableSourceTitleData="tableTitleData"
				:pageTotal="tableListTotal"
				:pageNo="resetPageNo"
				:pageSize="resetPageSize"
				:cellTextShowTootip="isTootip"
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
export default {
	name: "ParticipantList",
	components: { elephantTable },
	computed: {},
	watch: {},
	data() {
		return {
			tableListTotal: 300,
			queryPageNo: 1,
			queryPageSize: 100,
			resetPageNo: 1,
			resetPageSize: 100,
			isTootip: true,
			isSelectTable: true,
			taskTableHeight: "730px",
			isCusColumn: true, //
			defaultShowFailed: false, //开启列自定义或行自定义，此属性必须为false
			selectRows: [],
			tableTitleData: [
				{
					id: 2,
					name: "参与者",
					label: "参与者",
					prop: "author",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 3,
					name: "全部案例",
					label: "全部案例",
					prop: "singlecoll",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 4,
					name: "级别",
					label: "级别",
					prop: "levUser",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 5,
					name: "点赞数",
					label: "点赞数",
					prop: "coll",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 6,
					name: "操作",
					label: "操作",
					prop: "hanndle",
					sort: false,
					align: "center",
					filterData: [],
				},
			],
			tableData: [],
			selfShareList: [
				{
					id: 1,
					name: "案例一",
					coll: 1334,
					levUser: "白银",
					singlecoll: 12,
					isVisible: true,
					shareContent: [{}, {}],
					author: "张三",
					isEdit: true,
					status: "上架中",
					createTime: "2020-04-12",
					updateTime: "2020-04-12",
					city: "保定",
					pro: "河北",
					ear: "唐县",
				},
				{
					id: 2,
					name: "案例二",
					author: "李四",
					coll: 1334,
					levUser: "黄金",
					singlecoll: 5,
					isVisible: false,
					status: "已下架",
					isEdit: false,
					createTime: "2020-04-12",
					updateTime: "2020-04-12",
					city: "保定",
					pro: "河北",
					ear: "唐县",
				},
				{
					id: 3,
					name: "案例三",
					author: "王五",
					coll: 1334,
					levUser: "白金",
					singlecoll: 11,
					isVisible: false,
					status: "审核中",
					isEdit: false,
					createTime: "2020-04-12",
					updateTime: "2020-04-12",
					city: "保定",
					pro: "河北",
					ear: "唐县",
				},
				{
					id: 4,
					name: "案例四",
					author: "赵柳",
					coll: 1334,
					levUser: "钻石",
					singlecoll: 6,
					isVisible: true,
					status: "上架中",
					isEdit: false,
					createTime: "2020-04-12",
					updateTime: "2020-04-12",
					city: "保定",
					pro: "河北",
					ear: "唐县",
				},
			],
		};
	},
	created() {
		this.initData();
	},
	mounted() {
		this.$nextTick(() => {
			this.taskTableHeight = this.$b.dynamicHeight(this, 0);
		});
	},
	methods: {
		initData() {
			let json = [];
			for (let i = 0; i < 8; i++) {
				let temp = {};
				temp.author = "张三";
				temp.createTime = "张三";
				temp.levUser = "白银";
				temp.coll = "231";
				temp.singlecoll = "<span class='linkText'>查看</span>";
				temp.hanndle =
					"<span class='linkText ml20'>屏蔽</span> <span class='linkText ml20'>关注</span>";
				json.push(temp);
			}
			this.tableData = json;
		},
		//分页控件获取数据
		pageFn({ pageSize, pageNo }) {
			this.queryPageSize = pageSize;
			this.queryPageNo = pageNo;
			this.fetchData();
		},
		//当某个单元格被点击时
		cellUserClick({ row, column, cell, event }) {
			if (column.label == "参与者" && event.target.innerText == "查看") {
				this.$router.push("/experience/participantList");
			}
		},
		selectRowData({ selection, row }) {
			this.selectRows = selection;
		},
		selectAllRowData({ selection }) {
			this.selectRows = selection;
		},
	},
};
</script>

<style lang="scss" scoped></style>
