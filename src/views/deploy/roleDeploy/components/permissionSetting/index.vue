<template>
	<div class="permission-setting">
		<div class="mainBody">
			<el-row>
				<el-col :span="24" style="background: #fff">
					<el-tabs :tab-position="tabPosition">
						<el-tab-pane label="超级管理员"
							><permission-options
								:roleData="permissionData"
							></permission-options
						></el-tab-pane>
						<el-tab-pane label="管理员">配置管理</el-tab-pane>
						<el-tab-pane label="特权用户">角色管理</el-tab-pane>
						<el-tab-pane label="高级用户">角色管理</el-tab-pane>
						<el-tab-pane label="中级用户">定时任务补偿</el-tab-pane>
						<el-tab-pane label="初级用户"></el-tab-pane>
					</el-tabs>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
import permissionOptions from "./permission.vue";
export default {
	name: "PermissionSetting",
	components: { permissionOptions },
	computed: {},
	watch: {},
	data() {
		return {
			tabPosition: "left",
			permissionData: [
				{
					id: 1,
					title: "菜单显示控制",
					elementList: [
						{
							id: 1,
							label: "经验大厅",
							value: "1",
							isChecked: false,
						},
						{ id: 2, label: "写日记", value: "2", isChecked: true },
						{
							id: 3,
							label: "发布经验",
							value: "3",
							isChecked: false,
						},
						{
							id: 4,
							label: "征求经验",
							value: "4",
							isChecked: false,
						},
						{
							id: 5,
							label: "日记管理",
							value: "5",
							isChecked: false,
						},
						{
							id: 6,
							label: "发布管理",
							value: "6",
							isChecked: false,
						},
						{
							id: 7,
							label: "征求管理",
							value: "7",
							isChecked: false,
						},
						{
							id: 10,
							label: "拓扑图",
							value: "10",
							isChecked: false,
						},
						{
							id: 8,
							label: "账号管理",
							value: "8",
							isChecked: false,
						},
						{
							id: 9,
							label: "角色管理",
							value: "9",
							isChecked: false,
						},
					],
				},
				{
					id: 2,
					title: "经验大厅",
					elementList: [
						{
							id: 1,
							label: "经验墙",
							value: "1",
							isChecked: false,
						},
						{ id: 2, label: "作者", value: "2", isChecked: false },
						{ id: 3, label: "经验", value: "3", isChecked: false },
						{ id: 4, label: "客服", value: "4", isChecked: false },
						{
							id: 5,
							label: "饼状图",
							value: "5",
							isChecked: false,
						},
						{
							id: 6,
							label: "柱状图",
							value: "6",
							isChecked: false,
						},
						{
							id: 7,
							label: "折线图",
							value: "7",
							isChecked: false,
						},
						{
							id: 8,
							label: "实时展示",
							value: "8",
							isChecked: false,
						},
						{
							id: 9,
							label: "经验排行榜",
							value: "9",
							isChecked: false,
						},
						{
							id: 10,
							label: "收益排行榜",
							value: "10",
							isChecked: false,
						},
					],
				},
				{
					id: 3,
					title: "写日记",
					elementList: [
						{
							id: 1,
							label: "发布日记",
							value: "1",
							isChecked: false,
						},
						{
							id: 2,
							label: "查看日记本",
							value: "2",
							isChecked: false,
						},
						{
							id: 3,
							label: "新增目录",
							value: "3",
							isChecked: false,
						},
						{
							id: 4,
							label: "目录管理",
							value: "4",
							isChecked: false,
						},
					],
				},
				{
					id: 4,
					title: "发布经验",
					elementList: [
						{
							id: 1,
							label: "发布经验",
							value: "1",
							isChecked: false,
						},
					],
				},
				{
					id: 5,
					title: "征求经验",
					elementList: [
						{
							id: 1,
							label: "发布征求",
							value: "1",
							isChecked: false,
						},
						{
							id: 2,
							label: "查看征求列表",
							value: "2",
							isChecked: false,
						},
					],
				},
				{
					id: 6,
					title: "日记管理",
					elementList: [
						{ id: 1, label: "查询", value: "1", isChecked: false },
						{ id: 2, label: "删除", value: "2", isChecked: false },
						{ id: 3, label: "编辑", value: "3", isChecked: false },
						{
							id: 4,
							label: "批量删除",
							value: "4",
							isChecked: false,
						},
					],
				},
				{
					id: 7,
					title: "发布管理",
					elementList: [
						{ id: 1, label: "查询", value: "1", isChecked: false },
						{ id: 2, label: "删除", value: "2", isChecked: false },
						{ id: 3, label: "编辑", value: "3", isChecked: false },
						{
							id: 4,
							label: "批量删除",
							value: "4",
							isChecked: false,
						},
						{
							id: 5,
							label: "批量上架",
							value: "5",
							isChecked: false,
						},
						{
							id: 6,
							label: "批量下架",
							value: "6",
							isChecked: false,
						},
						{
							id: 7,
							label: "查看全部文章",
							value: "7",
							isChecked: false,
						},
						{ id: 8, label: "驳回", value: "8", isChecked: false },
						{ id: 9, label: "通过", value: "9", isChecked: false },
						{
							id: 10,
							label: "参与",
							value: "10",
							isChecked: false,
						},
					],
				},
				{
					id: 7,
					title: "征求管理",
					elementList: [
						{ id: 1, label: "查询", value: "1", isChecked: false },
						{ id: 2, label: "删除", value: "2", isChecked: false },
						{ id: 3, label: "编辑", value: "3", isChecked: false },
						{
							id: 4,
							label: "批量删除",
							value: "4",
							isChecked: false,
						},
						{ id: 5, label: "驳回", value: "5", isChecked: false },
						{ id: 6, label: "通过", value: "6", isChecked: false },
					],
				},
				{
					id: 8,
					title: "拓扑图",
					elementList: [
						{ id: 1, label: "查看", value: "1", isChecked: false },
					],
				},
				{
					id: 9,
					title: "账号管理",
					elementList: [
						{ id: 1, label: "查询", value: "1", isChecked: false },
						{ id: 9, label: "编辑", value: "9", isChecked: false },
						{
							id: 2,
							label: "查看经验",
							value: "2",
							isChecked: false,
						},
						{
							id: 3,
							label: "查看文章",
							value: "3",
							isChecked: false,
						},
						{ id: 5, label: "删除", value: "5", isChecked: false },
						{ id: 6, label: "拉黑", value: "6", isChecked: false },
						{ id: 7, label: "关注", value: "7", isChecked: false },
						{
							id: 8,
							label: "角色分配",
							value: "8",
							isChecked: false,
						},
					],
				},
				{
					id: 10,
					title: "角色管理",
					elementList: [
						{ id: 1, label: "添加", value: "1", isChecked: false },
						{ id: 2, label: "删除", value: "2", isChecked: false },
						{ id: 3, label: "编辑", value: "3", isChecked: false },
						{
							id: 4,
							label: "权限配置",
							value: "4",
							isChecked: false,
						},
					],
				},
			],
		};
	},
	created() {
		this.initData();
	},
	mounted() {},
	methods: {
		initData() {},
	},
};
</script>

<style lang="scss" scoped>
::v-deep .el-menu-item {
	text-align: center;
	p:nth-child(1) {
		font-size: 14px;
		font-weight: bold;
	}
}
</style>
