<template>
	<div class="participant-list">
		<div class="headerTitle">
			<el-form
				ref="ruleForm"
				:inline="true"
				:model="ruleForm"
				:rules="formRules"
				class="demo-ruleForm"
			>
				<el-form-item
					label="参与者级别"
					prop="shareType"
					label-width="90px"
				>
					<el-select v-model="ruleForm.type">
						<el-option
							v-for="(item, index) in participarnList"
							:key="index"
							:label="item.text"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="粉丝数" prop="status" label-width="70px">
					<el-select v-model="ruleForm.status">
						<el-option
							v-for="(item, index) in fanNumberList"
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
		</div>
		<div class="mainBody mt30">
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
		<el-dialog
			:visible.sync="seeTopic"
			width="30%"
			class="setTopCss"
			:before-close="handleClose"
		>
			<span slot="title" class="dialog-title">
				<span class="topiceTitle">{{ baseExperienceInfo.title }}</span>
			</span>
			<p>
				<span class="boldFix">发布人：</span>
				{{ baseExperienceInfo.userName }}
			</p>
			<p>
				<span class="boldFix">发布状态：</span>
				{{ baseExperienceInfo.status }}
			</p>
			<p>
				<span class="boldFix">累计收益：</span>
				2132象币
				<el-popover placement="right" title="" trigger="hover">
					1元 = 10象币
					<el-button
						slot="reference"
						class="tipRule"
						icon="el-icon-question"
					></el-button>
				</el-popover>
			</p>
			<p>
				<span class="boldFix">所属分类：</span>
				制造业/烟草制品
			</p>
			<p>
				<span class="boldFix">价值模式：</span>
				{{ baseExperienceInfo.shareMode }}
			</p>
			<p>
				<span class="boldFix">参与者/总点赞数/中位点赞数：</span>
				132位 / 8.7万 / 0.32万
			</p>
			<p>
				<span class="boldFix">简单描述：</span>
				{{ baseExperienceInfo.content }}
			</p>
			<p>
				<span class="boldFix">发布时间：</span>
				{{ baseExperienceInfo.createTime }}
			</p>
			<span slot="footer" class="dialog-footer"></span>
		</el-dialog>
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
			seeTopic: false,
			baseExperienceInfo: {
				title: "地球有外星人吗？",
				userName: "张盼伟",
				status: "上架中",
				shareMode: "共享模式",
				content: "地球100%有外星人，且存在五种外星人",
				createTime: "2022-02-13 16:30:37",
			},
			pickerOptions: {},
			fanNumberList: [
				{ id: 1, text: "10k以下", value: 1 },
				{ id: 2, text: "10k~50k", value: 2 },
				{ id: 3, text: "50k~100k", value: 3 },
				{ id: 4, text: "100k~500k", value: 4 },
				{ id: 5, text: "500k~1000k", value: 5 },
				{ id: 6, text: "1000k以上", value: 6 },
			],
			participarnList: [
				{ id: 1, text: "普通用户", value: 1 },
				{ id: 2, text: "中级用户", value: 2 },
				{ id: 3, text: "高级用户", value: 3 },
				{ id: 4, text: "资深用户", value: 4 },
				{ id: 5, text: "授权用户", value: 5 },
			],
			ruleForm: {
				queryDate: [],
				type: "",
				status: "",
			},
			formRules: {
				status: [{ required: false, message: "", trigger: "blur" }],
			},
			isSelectTable: false,
			taskTableHeight: "730px",
			isCusColumn: true, //
			defaultShowFailed: false, //开启列自定义或行自定义，此属性必须为false
			selectRows: [],
			tableTitleData: [
				{
					id: 1,
					name: "参与者",
					label: "参与者",
					prop: "author",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 2,
					name: "级别",
					label: "级别",
					prop: "levUser",
					sort: false,
					align: "center",
					filterData: [],
				},

				{
					id: 3,
					name: "最近活动",
					label: "最近活动",
					prop: "coll",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 4,
					name: "关联的经验",
					label: "关联的经验",
					prop: "linkExperience",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 5,
					name: "点赞/收藏",
					label: "点赞/收藏",
					prop: "singlecoll",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 6,
					name: "获得象币",
					label: "获得象币",
					prop: "xb",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 7,
					name: "被拉黑数",
					label: "被拉黑数",
					prop: "sc",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 8,
					name: "粉丝",
					label: "粉丝",
					prop: "fs",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 9,
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
			this.taskTableHeight = this.$b.dynamicWinHeight(300);
		});
	},
	methods: {
		initData() {
			let json = [];
			for (let i = 0; i < 8; i++) {
				let temp = {};
				temp.author = "张三";
				temp.linkExperience =
					"<span class='linkText' data-see='true'>查看</span>";
				temp.createTime = "张三";
				temp.levUser = "高级用户";
				temp.coll = "5天前来过";
				temp.sc = "389";
				temp.fs = "1022";
				temp.xb = "1283";
				temp.singlecoll = "283 / 512";
				temp.hanndle =
					"<span class='linkText ml20'>查看Ta的文章</span> <span class='linkText ml20' data-shield='true'>拉黑</span> <span class='linkText ml20' data-fllow='true'>关注</span>";
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
			if (
				column.label == "关联的经验" &&
				event.target.innerText == "查看" &&
				event.target.dataset.see
			) {
				this.seeTopic = true;
			}
			if (
				column.label == "操作" &&
				event.target.innerText == "拉黑" &&
				event.target.dataset.shield
			) {
				this.$baseConfirm(
					"您确认拉黑此用户吗？您将屏蔽Ta所有的文章",
					{ title: "提示" },
					async () => {
						this.$b.successMsg("拉黑成功");
					}
				);
			}
			if (
				column.label == "操作" &&
				event.target.innerText == "关注" &&
				event.target.dataset.fllow
			) {
				this.$b.successMsg("关注成功");
			}
		},
		handleClose() {
			this.seeTopic = false;
		},
		handleQuery() {
			this.fetchData();
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

<style lang="scss" scoped>
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
</style>
