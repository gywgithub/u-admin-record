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
						需  求
					</el-button>
				</el-col>
			</el-row>
			<elephant-table
				:tableSourceData="demandsList"
				:tableSourceTitleData="tableTitleData"
				:isOpenMultipleSelect="isSelectTable"
				:tableHeight="taskTableHeight"
				:isOpenColumnCustom="isCusColumn"
				:openDefaultRender="defaultShowFailed"
                :isShowPages="isShowPagesBol"
				@cellClicked="cellUserClick"
			>
			</elephant-table>
		</div>
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
    name:"Demands",
	components: {
        elephantTable
    },
	data() {
		return {
            isSelectTable: true,
            isShowPagesBol: false,
            taskTableHeight: "700px",
			isCusColumn: true, //是否开启列自定义
			defaultShowFailed: false, //开启列自定义或行自定义，此属性必须为false
			demandsList: [],
            tableTitleData: [
                {
					id: 15,
					name: "发起人",
					label: "发起人",
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
					id: 2,
					name: "描述",
					label: "描述",
					prop: "content",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 3,
					name: "所属分类",
					label: "所属分类",
					prop: "type",
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
					name: "应用场景",
					label: "应用场景",
					prop: "customList",
					sort: false,
					align: "center",
					filterData: [],
				},
                {
					id: 6,
					name: "推荐理由",
					label: "推荐理由",
					prop: "createTime",
					sort: false,
					width: "180px",
					align: "center",
					filterData: [],
				},
                {
					id: 7,
					name: "紧急程度",
					label: "紧急程度",
					prop: "createTime",
					sort: false,
					width: "180px",
					align: "center",
					filterData: [],
				},
                {
					id: 8,
					name: "预估上线时间",
					label: "预估上线时间",
					prop: "createTime",
					sort: false,
					width: "180px",
					align: "center",
					filterData: [],
				},
                {
					id: 9,
					name: "实际上线时间",
					label: "实际上线时间",
					prop: "createTime",
					sort: false,
					width: "180px",
					align: "center",
					filterData: [],
				},
                {
					id: 10,
					name: "备注",
					label: "备注",
					prop: "createTime",
					sort: false,
					width: "180px",
					align: "center",
					filterData: [],
				},
				{
					id: 11,
					name: "创建时间",
					label: "创建时间",
					prop: "createTime",
					sort: false,
					width: "180px",
					align: "center",
					filterData: [],
				},
                {
					id: 12,
					name: "更新时间",
					label: "创建时间",
					prop: "createTime",
					sort: false,
					width: "180px",
					align: "center",
					filterData: [],
				},
                {
					id: 13,
					name: "更新人",
					label: "更新人",
					prop: "updateUserName",
					sort: false,
					width: "180px",
					align: "center",
					filterData: [],
				},
				{
					id: 14,
					name: "操作",
					label: "操作",
					prop: "customHanndle",
					sort: false,
					fixed: false,
					align: "center",
					filterData: [],
				},
			],
		};
	},
	methods: {
		initData() {

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
	},
};
</script>

<style lang="scss" scoped>
.demands {}
</style>
