<template>
	<div class="list">
		<el-row class="mb18">
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
							v-model="ruleForm.shareDate"
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
						label="经验类型"
						prop="shareType"
						label-width="90px"
					>
						<el-select v-model="ruleForm.shareType">
							<el-option label="全部" value="all"></el-option>
							<el-option label="发起的" value="fq"></el-option>
							<el-option label="征求的" value="zq"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item
						label="经验状态"
						prop="status"
						label-width="90px"
					>
						<el-select v-model="ruleForm.status">
							<el-option label="全部" value="all"></el-option>
							<el-option label="上架中" value="sj"></el-option>
							<el-option label="审核中" value="sh"></el-option>
							<el-option label="已驳回" value="sh"></el-option>
							<el-option label="已下架" value="yx"></el-option>
						</el-select>
					</el-form-item>
					<el-button
						icon="el-icon-search"
						type="primary"
						native-type="submit"
						@click="handleQuery"
					>
						查询
					</el-button>
				</el-form>
			</el-col>
		</el-row>
		<el-row class="mb30">
			<el-col>
				<el-button
					icon="el-icon-folder-add"
					type="primary"
					@click="handleBatch($event, 1)"
				>
					批量上架
				</el-button>
				<el-button
					icon="el-icon-folder-remove"
					type="warning"
					@click="handleBatch($event, 2)"
				>
					批量下架
				</el-button>
				<el-button
					icon="el-icon-delete"
					type="danger"
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
		<el-dialog
			title="经验时间线"
			:visible.sync="isShowExperienceDetail"
			:before-close="beforeCloseDetail"
		>
			<span slot="title" class="dialog-title">
				<b>经验详情</b>
			</span>
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-timeline>
						<el-timeline-item timestamp="2018/4/12" placement="top">
							<el-card>
								<div slot="header" class="clearfix ovfl">
									<el-button
										v-if="currAcc == '张三'"
										style="float: right; padding: 3px 0"
										type="text"
									>
										删除
									</el-button>
								</div>
								<h4>更新 Github 模板</h4>
								<p>王小虎 提交于 2018/4/12 20:46</p>
							</el-card>
						</el-timeline-item>
						<el-timeline-item timestamp="2018/4/3" placement="top">
							<el-card>
								<div slot="header" class="clearfix ovfl">
									<el-button
										v-if="currAcc == '张三'"
										style="float: right; padding: 3px 0"
										type="text"
									>
										删除
									</el-button>
								</div>
								<h4>更新 Github 模板</h4>
								<p>王小虎 提交于 2018/4/3 20:46</p>
							</el-card>
						</el-timeline-item>
						<el-timeline-item timestamp="2018/4/2" placement="top">
							<el-card>
								<div slot="header" class="clearfix ovfl">
									<el-button
										v-if="currAcc == '张三'"
										style="float: right; padding: 3px 0"
										type="text"
									>
										删除
									</el-button>
								</div>
								<h4>更新 Github 模板</h4>
								<p>王小虎 提交于 2018/4/2 20:46</p>
							</el-card>
						</el-timeline-item>
					</el-timeline>
				</el-col>
			</el-tabs>
		</el-dialog>
		<el-dialog
			title="经验者列表"
			:visible.sync="isShowShares"
			:before-close="beforeCloseSharesDislog"
		>
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<el-checkbox
					v-model="seeSelf"
					class="seeSelf"
					@click="changeShareList"
				>
					只看前三名
				</el-checkbox>
				<div style="float: right">
					<el-button
						v-if="true"
						icon="el-icon-circle-plus-outline"
						type="text"
						@click="addCurrShare(row)"
					>
						添加经验
						<el-tooltip
							class="item"
							effect="dark"
							content="不能给自己添加经验"
							placement="top-start"
						>
							<el-link
								icon="el-icon-question"
								:underline="false"
							></el-link>
						</el-tooltip>
					</el-button>
				</div>
				<el-table :data="shareList" style="width: 100%">
					<el-table-column type="expand">
						<template slot-scope="scope">
							{{ scope.row }}
							<el-table
								:data="selfShareList"
								border
								style="width: 100%"
							>
								<el-table-column
									fixed
									prop="name"
									label="Ta的案例"
									width="150"
									align="center"
								></el-table-column>
								<el-table-column
									prop="updateTime"
									label="最后更新时间"
									width="120"
									align="center"
								></el-table-column>
								<el-table-column
									label="经验者"
									width="120"
									align="center"
								>
									<template #default="{ row }">
										{{ row.author }}
										张三
									</template>
								</el-table-column>
								<el-table-column
									prop="singlecoll"
									label="点赞数"
									width="80"
									align="center"
								></el-table-column>
								<el-table-column
									prop="pro"
									label="省"
									width="120"
									align="center"
								></el-table-column>
								<el-table-column
									prop="city"
									label="市"
									width="120"
									align="center"
								></el-table-column>
								<el-table-column
									prop="createTime"
									label="创建时间"
									width="120"
									align="center"
								></el-table-column>
								<el-table-column
									fixed="right"
									label=""
									width="180"
									align="center"
								>
									<template slot="header" slot-scope="scope">
										操作{{ scope.row }}
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
						label="经验者"
						prop="author"
						align="center"
					></el-table-column>
					<el-table-column
						label="用户级别"
						prop="levUser"
						align="center"
					></el-table-column>
					<el-table-column
						label="总点赞数"
						prop="coll"
						align="center"
					>
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
					<!--          <el-table-column-->
					<!--            label="操作"-->
					<!--            align="center">-->
					<!--            <template slot="header" slot-scope="scope">-->
					<!--              操作-->
					<!--            </template>-->
					<!--            <template #default="{ row }">-->
					<!--              <el-button type="text" v-if="!row.isEdit">上架此人</el-button>-->
					<!--              <el-button type="text" disabled v-else>下架此人</el-button>-->
					<!--              <el-switch-->
					<!--                class="mt5"-->
					<!--                v-model="row.isVisible"-->
					<!--                active-color="#409eff"-->
					<!--                inactive-color="#dcdfe6"-->
					<!--                @change="swichChange">-->
					<!--              </el-switch>-->
					<!--            </template>-->
					<!--          </el-table-column>-->
				</el-table>
				<el-pagination
					background
					layout="prev, pager, next"
					:total="300"
				></el-pagination>
			</el-col>
		</el-dialog>
		<el-dialog
			:title="title"
			:visible.sync="reportVisible"
			width="500px"
			@close="close"
		>
			<el-form ref="form" :model="form" :rules="rules" label-width="80px">
				<el-form-item label="申诉原因" prop="reason">
					<el-input
						v-model="form.reason"
						type="textarea"
						:rows="2"
						placeholder="请输入内容"
						autocomplete="off"
					></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="close">取 消</el-button>
				<el-button type="primary" @click="save">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog
			:visible.sync="seeTopic"
			width="30%"
			class="setTopCss"
			:before-close="handleClose"
		>
			<span slot="title" class="dialog-title">
				<span class="topiceTitle">美国51区是否有外星人？</span>
			</span>
			<p>
				<span class="boldFix">发起人：</span>
				张盼伟
			</p>
			<p>
				<span class="boldFix">发起时间：</span>
				2020-05-35 13:25:45
			</p>
			<p>
				<span class="boldFix">状态：</span>
				上架
			</p>
			<p>
				<span class="boldFix">详细描述：</span>
				51区位于美国内华达州南部的一个区域，戒备森严使它在民间获得了“51禁区”的称号。长期以来，我们甚至无法在美国地图上找到它，美国51区里到底有没有外星人？
			</p>
			<span slot="footer" class="dialog-footer"></span>
		</el-dialog>
	</div>
</template>

<script>
import elephantTable from "@/components/template/elephantTable";
import request from "@/utils/request";
export default {
	name: "List",
	components: { elephantTable },
	filters: {},
	data() {
		return {
			imgShow: true,
			activities: [],
			title: "申诉",
			seeTopic: false,
			isOpenSwitch: true,
			form: {
				id: "",
				cname: "",
				reason: "",
			},
			rules: {
				reason: [
					{
						required: true,
						trigger: "blur",
						message: "请输入申诉原因",
					},
				],
				cname: [
					{
						required: true,
						trigger: "blur",
						message: "请输入权限名称",
					},
				],
			},
			reportVisible: false,
			currAcc: "",
			activeName: "first",
			currSharePeopleName: "",
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
			value1: "",
			value2: "",
			seachPeoplePla: "请输入发起者姓名",
			ruleForm: {
				name: "",
				nameType: "",
				status: "all",
			},
			formRules: {
				status: [{ required: false, message: "", trigger: "blur" }],
			},
			isShowExperienceDetail: false, //是否展示经验详情
			isShowShares: false,
			seeSelf: false,
			shareListCopy: [
				{
					id: 1,
					name: "案例一",
					levUser: "青铜",
					singlecoll: 12,
					coll: 214,
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
					levUser: "白银",
					singlecoll: 8,
					coll: 334,
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
					levUser: "黄金",
					singlecoll: 4,
					coll: 34,
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
					levUser: "白金",
					singlecoll: 11,
					coll: 25,
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
			shareList: [
				{
					id: 1,
					name: "案例一",
					coll: 344,
					levUser: "白金",
					singlecoll: 3,
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
					coll: 234,
					levUser: "黄金",
					singlecoll: 4,
					isVisible: false,
					author: "李四",
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
					coll: 134,
					levUser: "白银",
					singlecoll: 7,
					isVisible: false,
					author: "王五",
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
					coll: 34,
					levUser: "钻石",
					singlecoll: 9,
					isVisible: true,
					author: "赵柳",
					status: "上架中",
					isEdit: false,
					createTime: "2020-04-12",
					updateTime: "2020-04-12",
					city: "保定",
					pro: "河北",
					ear: "唐县",
				},
			],
			reverse: true,
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
			list: [],
			tableListTotal: 300,
			resetPageNo: 1,
			resetPageSize: 100,
			isSelectTable: true,
			taskTableHeight: "700px",
			isCusColumn: true, //是否开启列自定义
			defaultShowFailed: false, //开启列自定义或行自定义，此属性必须为false
			tableData: [],
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
					name: "描述",
					label: "描述",
					prop: "descript",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 3,
					name: "发起者",
					label: "发起者",
					prop: "author",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 4,
					name: "经验者",
					label: "经验者",
					prop: "experiencer",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 5,
					name: "状态",
					label: "状态",
					prop: "status",
					sort: false,
					sortType: "string",
					align: "center",
					filterData: [],
				},
				{
					id: 6,
					name: "创建时间",
					label: "创建时间",
					prop: "datetime",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 7,
					name: "操作",
					label: "操作",
					prop: "hanndle",
					sort: false,
					fixed: false,
					align: "center",
					filterData: [],
				},
			],
			imageList: [],
			background: true,
			selectRows: [],
			height: "500px",
		};
	},
	computed: {},
	watch: {
		seeSelf: function () {
			if (this.seeSelf) {
				this.shareList = [
					{
						id: 1,
						name: "案例一",
						coll: 344,
						levUser: "钻石",
						singlecoll: 3,
						isVisible: true,
						shareContent: [{}, {}],
						author: "李六",
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
						coll: 234,
						singlecoll: 4,
						levUser: "黄金",
						isVisible: false,
						author: "李四",
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
						coll: 134,
						singlecoll: 7,
						levUser: "大师",
						isVisible: false,
						author: "王五",
						status: "审核中",
						isEdit: false,
						createTime: "2020-04-12",
						updateTime: "2020-04-12",
						city: "保定",
						pro: "河北",
						ear: "唐县",
					},
				];
			} else {
				this.shareList = this.shareListCopy;
			}
		},
	},
	created() {
		this.fetchData();
	},
	beforeDestroy() {},
	mounted() {},
	methods: {
		//分页控件获取数据
		pageFn({ pageSize, pageNo }) {
			console.dir(pageSize);
			console.dir(pageNo);
		},
		//当某个单元格被点击时
		cellUserClick({ row, column, cell, event }) {
			if (column.label == "经验者" && event.target.innerText == "查看") {
				this.seeAllSharePeople(row);
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
			if (event.target.innerText == "详情") {
				this.seeToppic(row);
			}
			if (event.target.innerText == "编辑") {
				console.log("编辑");
			}
			if (event.target.innerText == "上架") {
				this.goodsPutOn(row);
			}
			if (event.target.innerText == "下架") {
				this.goodsOffShelf(row);
			}
			if (event.target.innerText == "删除") {
				this.goodsDelete(row);
			}
			if (event.target.innerText == "驳回") {
				console.log("驳回");
			}
			if (event.target.innerText == "通过") {
				console.log("通过");
			}
		},
		selectRowData({ selection, row }) {
			this.selectRows = selection;
		},
		selectAllRowData({ selection }) {
			this.selectRows = selection;
		},
		report() {
			this.reportVisible = true;
		},
		handleClose() {
			this.seeTopic = false;
		},
		close() {
			this.reportVisible = false;
		},
		save() {
			this.$b.successMsg("申诉成功");
			this.reportVisible = false;
		},
		load(tree, treeNode, resolve) {
			setTimeout(() => {
				resolve([
					{
						id: 31,
						date: "2016-05-01",
						name: "王小虎",
						address: "上海市普陀区金沙江路 1519 弄",
					},
					{
						id: 32,
						date: "2016-05-01",
						name: "王小虎",
						address: "上海市普陀区金沙江路 1519 弄",
					},
				]);
			}, 1000);
		},
		changeShareList() {
			this.seeSelf = !this.seeSelf;
		},
		goodsDelete() {
			this.$b.successMsg("删除成功");
		},
		seeToppic(e) {
			this.seeTopic = true;
		},
		editTopic(e) {
			this.$router.push("/share/editShare");
		},
		goodsPutOn() {
			this.$b.successMsg("上架成功");
		},
		goodsOffShelf() {
			this.$b.successMsg("下架成功");
		},
		addCurrShare() {
			this.$router.push("/share/addShare");
		},
		handleClick(tab, event) {
			console.log(tab, event);
		},
		beforeCloseDetail() {
			this.isShowExperienceDetail = false;
		},
		beforeCloseSharesDislog() {
			this.isShowShares = false;
		},
		handleAdd() {},
		handleEdit(row) {},
		async seeDetail(row) {
			//row.id
			this.currAcc = row.author;
			let data = {};
			request({
				url: "/changeLog/getList",
				method: "post",
				data,
			}).then((res) => {
				this.activities = res.data;
				this.currSharePeopleName = row.name;
				this.isShowExperienceDetail = true;
			});
		},
		seeAllSharePeople(row) {
			this.isShowShares = true;
			this.sharePeoples = this.shareList;
		},
		handleBatch(row, type) {
			let msg = "";
			if (type === 1) {
				msg = "您确定要上架吗?";
			}
			if (type === 2) {
				msg = "您确定要下架吗?";
			}
			if (type === 3) {
				msg = "您确定要删除吗?";
			}
			if (row.id) {
				this.$baseConfirm(msg, { title: "提示" }, async () => {
					this.$b.successMsg("未选中任何行");
					this.fetchData();
				});
			} else {
				if (this.selectRows.length > 0) {
					this.$baseConfirm(msg, { title: "提示" }, async () => {
						this.$b.successMsg("成功");
						this.fetchData();
					});
				} else {
					this.$b.warningMsg("未选中任何行");
					return false;
				}
			}
		},
		handleQuery() {
			this.fetchData();
		},
		async fetchData() {
			let arr = [];
			for (let i = 0; i < 90; i++) {
				let temp = {};
				temp["id"] = i + 1;
				temp["title"] = "中国石化";
				temp["status"] = "上架中";
				temp["author"] = "张三";
				temp["datetime"] = "2022-01-22 15:22:11";
				temp["experiencer"] = "张三";
				temp["hanndle"] = [
					"详情",
					"编辑",
					"上架",
					"下架",
					"删除",
					"驳回",
					"通过",
				];
				temp["descript"] =
					"长期以来，我们甚至无法在美国地图上找到，戒备森严 美国51区里到底有没有外星人？";
				arr.push(temp);
			}
			for (let j = 0; j < arr.length; j++) {
				arr[j].experiencer = `<span class="linkText">查看</span>`;
				let hanndleStr = "";
				for (let i = 0; i < arr[j].hanndle.length; i++) {
					hanndleStr +=
						"<span class='linkText ml10'>" +
						arr[j].hanndle[i] +
						"</span>";
				}
				arr[j].hanndle = hanndleStr;
			}
			this.tableData = arr;
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
