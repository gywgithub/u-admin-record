<template>
	<div class="elephant-table">
		<!-- （非原生table）+ page -->
		<!-- 详见@/components/Table组件 -->
		<common-table
			:ref="commonDynamicRef"
			:source="tableSourceData"
			:title-data="tableSourceTitleData"
			:mathKey="randomKey"
			:columnType="columnType"
			:tabledynamicRef="commonDynamicRef"
			row-key="Id"
			:set-table-height="tableHeight"
			:is-open-colum-drag="isOpenColumDrog"
			:openDropCallback="openTempDropCallback"
			:is-open-select="isOpenMultipleSelect"
			:isOpenSummay="isSummary"
			:setSummayText="summayText"
			:cumtomSummaryArray="summaryArray"
			:rowCustom="isOpenRowCustom"
			:columnCustom="isOpenColumnCustom"
			:nestedCustom="isOpenNestedCustom"
			:isOpenCustomFilter="commIsOpenCustomFilter"
			:defaultShowFailed="openDefaultRender"
			@commonSelect="checkRow"
			@commonAllSelect="checkAllRow"
			@commonRowClick="clickRow"
			@commonCellClicked="commCellClicked"
			@updateSort="updateSortFn"
		>
			<address slot="hanndle">
				<slot name="hanndleCommon"></slot>
			</address>
		</common-table>
		<el-pagination
			v-if="isShowPages"
			class="fr mt30"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:page-sizes="pageSizes"
			layout="total, sizes, prev, pager, next, jumper"
			:current-page.sync="realPageNo"
			:page-size="pageSize"
			:total="pageTotal"
		>
		</el-pagination>
	</div>
</template>

<script>
import commonTable from "@/components/Table";
export default {
	name: "ElephantTable",
	props: {
		tableSourceData: /* 表格数据 */ {
			type: Array,
			default: () => [],
			required: true,
		},
		commonDynamicRef: {
			type: String,
			default: "",
		},
		columnType: {
			type: String,
			default: "selection",
		},
		randomKey: {
			type: Number,
			required: false,
		},
		isOpenNestedCustom: /* 嵌套内容 */ {
			type: Boolean,
			default: false,
		},
		commIsOpenCustomFilter: /* 是否开启自定义过滤数据 */ {
			type: Boolean,
			default: false,
		},
		tableSourceTitleData: /* 表格标题数据 */ {
			type: Array,
			default: () => [],
			required: true,
		},
		tableHeight: /* 设置表格的高度，会默认开启表头固定 */ {
			type: [String, Number],
			default: null,
		},
		isOpenRowCustom: /* 是否开启行自定义内容 */ {
			type: Boolean,
			default: false,
		},
		isOpenColumnCustom: /* 是否开启列自定义内容 */ {
			type: Boolean,
			default: false,
		},
		openDefaultRender:
			/* 是否开启默认渲染内容 开启列自定义内容或行自定义内容，此属性必须为false */ {
				type: Boolean,
				default: true,
			},
		openTempDropCallback: /* 是否开启列拖拽回调函数 */ {
			type: Boolean,
			default: false,
		},
		isOpenColumDrog: /* 是否开启列拖拽 */ {
			type: Boolean,
			default: false,
		},
		isShowPages: /* 是否显示分页组件 */ {
			type: Boolean,
			default: true,
		},
		isOpenMultipleSelect: /* 是否开启多选 */ {
			type: Boolean,
			default: false,
		},
		pageTotal: /* 分页数据总条数 */ {
			type: Number,
			default: 0,
		},
		pageSizes: /* 每页显示个数选择器的选项设置- */ {
			type: Array,
			default: () => [100, 300, 500],
		},
		pageSize: /* 每页显示条目个数 */ {
			type: Number,
			default: 100,
		},
		pageNo: /* 当前页 */ {
			type: Number,
			default: 1,
		},
		isSummary: /* 是否展示合计行 */ {
			type: Boolean,
			default: false,
		},
		summayText: /* 设置合计行标题 */ {
			type: String,
			default: "合计",
		},
		summaryArray: /* 自定义合计内容 */ {
			type: Array,
			default: () => [],
		},
	},
	components: {
		commonTable,
	},
	computed: {},
	watch: {
		pageNo: function (val) {
			this.realPageNo = val;
		},
		randomKey: {
			handler(newVal, oldVal) {
				this.randomKey = newVal;
			},
		},
	},
	data() {
		return {
			emitPageSize: 100,
			emitPageNo: 1,
			realPageNo: 1,
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.emitPageSize = this.pageSize;
			this.emitPageNo = this.pageNo;
		},
		clearSelectedList() {
			this.$nextTick(() => {
				this.$refs[this.commonDynamicRef].clearSelectStatus();
			});
		},
		initComponentProps() {},
		//pageSize 改变时会触发
		handleSizeChange(val) {
			this.emitPageSize = val;
			this.$emit("getData", {
				emitFn: "handleSizeChange",
				pageSize: val,
				pageNo: 1,
			});
		},
		//pageNo 改变时会触发
		handleCurrentChange(val) {
			this.emitPageNo = val;
			this.$emit("getData", {
				emitFn: "handleCurrentChange",
				pageSize: this.emitPageSize,
				pageNo: val,
			});
		},
		// 当用户手动勾选数据行的 Checkbox 时触发的事件
		checkRow({ selection, row }) {
			this.$emit("selectRowed", { selection: selection, row: row });
		},
		//当用户手动勾选全选 Checkbox 时触发的事件
		checkAllRow({ selection }) {
			this.$emit("selectAllRowed", { selection: selection });
		},
		//当某一行被点击时会触发该事件
		clickRow({ row, column, event }) {
			this.$emit("clickRowed", {
				row: row,
				column: column,
				event: event,
			});
		},
		//当某个单元格被点击时会触发该事件
		commCellClicked({ row, column, cell, event }) {
			this.$emit("cellClicked", {
				row: row,
				column: column,
				cell: cell,
				event: event,
			});
		},
		updateSortFn({ updateSortList, oldDropItem, newDropItem }) {
			this.$emit("updateSortCallback", {
				updateSortList: updateSortList,
				oldDropItem: oldDropItem,
				newDropItem: newDropItem,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.elephant-table {
	overflow: hidden;
}
</style>
