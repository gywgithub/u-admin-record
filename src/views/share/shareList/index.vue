<template>
	<div class="share-list">
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
					<el-form-item label="经验类型" prop="shareType">
						<el-select v-model="ruleForm.shareType">
							<el-option label="发起的" value="fq"></el-option>
							<el-option label="征求的" value="zq"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="经验状态" prop="status">
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
		<el-table
			ref="tableSort"
			v-loading="listLoading"
			:border="true"
			:data="list"
			:element-loading-text="elementLoadingText"
			:height="height"
			@selection-change="setSelectRows"
			@sort-change="tableSortChange"
		>
			<el-table-column
				show-overflow-tooltip
				type="selection"
				width="55"
				align="center"
			></el-table-column>
			<el-table-column
				show-overflow-tooltip
				prop="title"
				label="标题"
				align="center"
			></el-table-column>
			<el-table-column label="详情描述" align="center">
				<template #default="{ row }">
					<p
						class="contentTxt"
						title="长期以来，我们甚至无法在美国地图上找到它，，戒备森严 美国51区里到底有没有外星人？"
					>
						长期以来，我们甚至无法在美国地图上找到它，，戒备森严
						美国51区里到底有没有外星人？
					</p>
				</template>
			</el-table-column>
			<el-table-column
				show-overflow-tooltip
				label="发起者"
				prop="author"
				align="center"
			></el-table-column>
			<el-table-column
				show-overflow-tooltip
				label="经验者"
				align="center"
				width="180px"
			>
				<template #default="{ row }">
					<el-button type="text" @click="seeAllSharePeople(row)">
						查看
					</el-button>
				</template>
			</el-table-column>
			<el-table-column show-overflow-tooltip label="状态" align="center">
				<template #default="{ row }">
					{{ row.status | statusTextFilter }}
				</template>
			</el-table-column>
			<el-table-column
				show-overflow-tooltip
				label="创建时间"
				prop="datetime"
				width="200"
				align="center"
			></el-table-column>
			<el-table-column
				show-overflow-tooltip
				label="操作"
				width="280px"
				align="center"
			>
				<template slot="header" slot-scope="scope">操作</template>
				<template #default="{ row }">
					<el-button type="text" @click="seeToppic(row)"
						>详情</el-button
					>
					<el-button type="text" @click="editTopic(row)"
						>编辑</el-button
					>
					<el-button type="text" @click="goodsPutOn(row)"
						>上架</el-button
					><br />
					<el-button type="text" @click="goodsOffShelf(row)"
						>下架</el-button
					>
					<el-button type="text">通过</el-button>
					<el-button type="text">驳回</el-button>
					<el-button type="text" @click="goodsDelete(row)"
						>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			:background="background"
			:current-page="queryForm.pageNo"
			:layout="layout"
			:page-size="queryForm.pageSize"
			:total="total"
			@current-change="handleCurrentChange"
			@size-change="handleSizeChange"
		></el-pagination>
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
					<!--          <el-button type="text" disabled  @click="addCurrShare(row)">添加经验</el-button>-->
				</div>
				<el-table :data="shareList" style="width: 100%">
					<el-table-column type="expand">
						<template slot-scope="props">
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
										<!--{{ row.author}}-->
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
										操作
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
							总点赞数
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
import { getList, doDelete } from "@/api/table";
import request from "@/utils/request";
export default {
	name: "ShareList",
	components: {},
	filters: {
		statusFilter(status) {
			const statusMap = {
				published: "success",
				draft: "gray",
				deleted: "danger",
			};
			return statusMap[status];
		},
		statusTextFilter(val) {
			if (val == "published") {
				return "已上架";
			}
			if (val == "deleted") {
				return "已下架";
			}
			if (val == "draft") {
				return "审核中";
			}
		},
	},
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
			imageList: [],
			listLoading: true,
			layout: "total, sizes, prev, pager, next, jumper",
			total: 0,
			background: true,
			selectRows: "",
			elementLoadingText: "正在加载...",
			queryForm: {
				pageNo: 1,
				pageSize: 20,
				title: "",
			},
		};
	},
	computed: {
		height() {
			return this.$baseTableHeight();
		},
	},
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
				console.log("quanbu ");
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
			this.$baseMessage("申诉成功", "success");
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
		tableSortChange() {
			const imageList = [];
			this.$refs.tableSort.tableData.forEach((item, index) => {
				imageList.push(item.img);
			});
			this.imageList = imageList;
		},
		changeShareList() {
			this.seeSelf = !this.seeSelf;
		},
		goodsDelete() {
			this.$baseMessage("删除成功", "success");
		},
		seeToppic(e) {
			this.seeTopic = true;
		},
		editTopic(e) {
			this.$router.push("/share/editShare");
		},
		goodsPutOn() {
			this.$baseMessage("上架成功", "success");
		},
		goodsOffShelf() {
			this.$baseMessage("下架成功", "success");
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
		setSelectRows(val) {
			this.selectRows = val;
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
					const { msg } = await doDelete({ ids: row.id });
					this.$baseMessage("未选中任何行", "success");
					this.fetchData();
				});
			} else {
				if (this.selectRows.length > 0) {
					const ids = this.selectRows.map((item) => item.id).join();
					this.$baseConfirm(msg, { title: "提示" }, async () => {
						const { msg } = await doDelete({ ids: ids });
						this.$baseMessage("成功", "success");
						this.fetchData();
					});
				} else {
					this.$baseMessage("未选中任何行", "error");
					return false;
				}
			}
		},
		handleSizeChange(val) {
			this.queryForm.pageSize = val;
			this.fetchData();
		},
		handleCurrentChange(val) {
			this.queryForm.pageNo = val;
			this.fetchData();
		},
		handleQuery() {
			this.queryForm.pageNo = 1;
			this.fetchData();
		},
		async fetchData() {
			this.listLoading = true;
			let arr = [];
			for (let i = 0; i < 90; i++) {
				let temp = {};
				temp["id"] = i + 1;
				temp["title"] = "中国石化";
				temp["status"] = "published";
				temp["author"] = "张三";
				temp["datetime"] = "2022-01-22";
				arr.push(temp);
			}
			this.list = arr;
			// const imageList = [];
			this.total = 91;
			setTimeout(() => {
				this.listLoading = false;
			}, 500);
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
.contentTxt {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
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
