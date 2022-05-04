<template>
	<div class="list">
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
							label="经验类型"
							prop="shareType"
							label-width="90px"
						>
							<el-select v-model="ruleForm.type">
								<el-option
									v-for="(item, index) in experienceTypeList"
									:key="index"
									:label="item.text"
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
						<!-- <el-form-item
							label="经验状态"
							prop="status"
							label-width="90px"
						>
							<el-select v-model="ruleForm.status">
								<el-option
									v-for="(
										item, index
									) in experienceStatusList"
									:key="index"
									:label="item.text"
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item> -->
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
		</div>

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
									label="发布时间"
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
import {
	getInitDataReq,
	getFormInitDataReq,
	deleteDataReq,
	chageStatusReq,
} from "@/api/experience";
import elephantTable from "@/components/template/elephantTable";
import request from "@/utils/request";
export default {
	name: "List",
	components: { elephantTable },
	filters: {},
	data() {
		return {
			experienceTypeList: [],
			experienceStatusList: [],
			imgShow: true,
			activities: [],
			title: "申诉",
			seeTopic: false,
			baseExperienceInfo: {
				title: "",
				userName: "",
				status: "",
				shareMode: "",
				content: "",
				createTime: "",
			},
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
				queryDate: [],
				type: "",
				status: "",
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
					name: "发布者",
					label: "发布者",
					prop: "userName",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 12,
					name: "所属分类",
					label: "所属分类",
					prop: "sswl",
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
					id: 1,
					name: "主标题",
					label: "主标题",
					prop: "title",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 2,
					name: "简单描述",
					label: "简单描述",
					prop: "content",
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
					id: 9,
					name: "全部文章",
					label: "全部文章",
					prop: "customList",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 10,
					name: "累计收益",
					label: "累计收益",
					prop: "sy",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 11,
					name: "总点赞数/点赞数",
					label: "总点赞数/点赞数",
					prop: "userxingwei",
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
		initFormData() {
			getFormInitDataReq().then((res) => {
				if (res.success) {
					this.experienceTypeList = res.data.typeList;
					this.experienceStatusList = res.data.statusList;
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
			// if (event.target.innerText == "基础信息") {
			// 	this.seeToppic(row);
			// }
			if (event.target.innerText == "编辑") {
				this.hanndlePackageFromData(row);
			}
			// if (event.target.innerText == "上架") {
			// 	this.goodsPutOn(row);
			// }
			// if (event.target.innerText == "下架") {
			// 	this.goodsOffShelf(row);
			// }
			// if (event.target.innerText == "删除") {
			// 	this.goodsDelete(row);
			// }
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
			// this.moreForm.cause = editContent.cause;
			// this.moreForm.reules = editContent.reules;
			this.$router.push({
				name: "Release",
				params: {
					isEditBaseInfo: true,
					editBaseInfo: {
						id: currData.id,
						title: currData.title,
						category: currData.category,
						shareMode: currData.shareMode,
						content: currData.content,
						industry: currData.industry,
						address: currData.address,
					},
				},
			});
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
		seeToppic(data) {
			this.baseExperienceInfo = data;
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
			if (type === 1) {
				this.shelfDownExperience({ ids: ids, statusType: 6 });
			}
			if (type === 2) {
				this.shelfDownExperience({ ids: ids, statusType: 7 });
			}
			if (type === 3) {
				this.deleteExperience(ids);
			}
		},
		shelfDownExperience(data) {
			chageStatusReq(data).then((res) => {
				if (res.success) {
					let msg = data.statusType == 6 ? "上架成功" : "下架成功";
					this.$b.successMsg(msg);
					this.fetchData();
				}
			});
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
				pageSize: this.queryPageSize,
				pageIndex: this.queryPageNo,
			};
			getInitDataReq(param).then((res) => {
				if (res.success) {
					this.$_.deepClone(
						res.data.experienceList,
						this.experienceListBakSourceData
					);
					let userInfo = JSON.parse(localStorage.getItem("userInfo"));
					let userName = userInfo.userName;
					let json = res.data.experienceList;
					for (let i = 0; i < json.length; i++) {
						json[i].userName = userName;
						json[i].userxingwei = "8.7万 / 0.32万";
						json[i].sswl = "制造业/烟草制品";
						json[i].sy = "1.2万象币";
						json[i].customHanndle = [
							"参与",
							"编辑",
							"通过",
							"驳回",
						];
					}

					for (let j = 0; j < json.length; j++) {
						if (json[j].shareMode == 1) {
							json[j].shareMode = "共享模式";
						} else if (json[j].shareMode == 2) {
							json[j].shareMode = "永久共享";
						} else if (json[j].shareMode == 3) {
							json[j].shareMode = "付费模式";
						} else if (json[j].shareMode == 4) {
							json[j].shareMode = "免费模式";
						}
						json[j].customList =
							"<span class='linkText' data-artict='true'>查看</span>";
						if (json[j].status == 1) {
							json[j].status = "未审核";
						} else if (json[j].status == 2) {
							json[j].status = "审核中";
						} else if (json[j].status == 3) {
							json[j].status = "审核通过";
						} else if (json[j].status == 4) {
							json[j].status = "审核未通过";
						} else if (json[j].status == 5) {
							json[j].status = "未上架";
						} else if (json[j].status == 6) {
							json[j].status = "上架中";
						} else if (json[j].status == 7) {
							json[j].status = "已下架";
						} else if (json[j].status == 8) {
							json[j].status = "强制下架";
						} else if (json[j].status == 9) {
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
