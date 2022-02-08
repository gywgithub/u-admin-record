<template>
	<div class="draggable">
		<!-- row-key="id" -->
		<el-table
			:ref="tableDyBaseRef"
			:height="setTableHeight"
			:key="mathKey"
			:row-class-name="addActiveClass"
			:data="source"
			:stripe="isOpenStripe"
			:border="isOpenBorder"
			:highlight-current-row="highligtTrue"
			:show-summary="isOpenSummay"
			:sum-text="setSummayText"
			:summary-method="cumtomSummary"
			:row-style="customRowStyle"
			@select="checkRow"
			@select-all="checkAllRow"
			@row-click="clickRow"
			@cell-click="cellClicked"
			@clearSelection="clearSelectStatus"
			@sort-change="sortChange"
			style="width: 100%"
		>
			<el-table-column
				v-if="isOpenSelect"
				:type="columnType"
				align="center"
				width="55"
			>
				<!-- <template>
					<component v-bind:is="nestedComponent"></component>
				</template> -->
			</el-table-column>
			<el-table-column
				v-for="(item, index) in oldList"
				:key="index"
				:prop="newList[index].prop"
				:label="item.label"
				:width="item.width"
				:min-width="item.minWidth"
				:fixed="item.fixed"
				:resizable="!!0"
				:sortable="item.sort"
				:isButton="item.isCustom"
				:align="item.align"
				:show-overflow-tooltip="isShowTootip"
				:filters="item.filterData.length > 0 ? item.filterData : null"
				:filter-method="
					item.filterData.length > 0 ? filterHandler : null
				"
				:sort-method="
					item.sort
						? (a, b) => sorthandler(a, b, newList[index])
						: null
				"
			>
				<template slot="header" slot-scope="{ column, $index }">
					<span
						style="white-space: pre-wrap"
						v-if="
							newList[isOpenSelect ? $index - 1 : $index]
								.rewriteHeader
						"
					>
						<render-html
							:html="
								newList[isOpenSelect ? $index - 1 : $index]
									.rewriteContent
							"
							style="display: inline-block"
						></render-html>
					</span>
					<span
						v-if="
							!newList[isOpenSelect ? $index - 1 : $index]
								.rewriteHeader
						"
					>
						<span>{{ column.label }}</span>
					</span>
				</template>
				<template slot-scope="scope">
					<div
						v-if="rowCustom"
						:title="
							scope.row[`${newList[index].prop}`] | filterHtml
						"
					>
						<div v-html="scope.row[`${newList[index].prop}`]"></div>
					</div>
					<div
						v-if="columnCustom"
						:title="
							scope.row[`${newList[index].prop}`] | filterHtml
						"
					>
						<div v-html="scope.row[`${newList[index].prop}`]"></div>
					</div>
					<div
						v-if="defaultShowFailed"
						:title="scope.row[`${newList[index].prop}`]"
					>
						{{ scope.row[`${newList[index].prop}`] }}
					</div>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
import elephantTable from "@/components/template/elephantTable";
import Sortable from "sortablejs";
import Vue from "vue";
export default {
	name: "Table",
	props: {
		tabledynamicRef: {
			type: String,
			default: "",
		},
		columnType: {
			type: String,
			default: "selection",
		},
		source: /* 表格数据 */ {
			type: Array,
			default: () => [],
			required: true,
		},
		titleData: /* 表格标题数据 */ {
			type: Array,
			default: () => [],
			required: true,
		},
		mathKey: {
			type: Number,
			required: false,
			default: 2394023819,
		},
		isOpenDynamicColumn: /* 是否开启动态列渲染 */ {
			type: Boolean,
			default: false,
		},
		isOpenCustomFilter: /* 是否开启自定义过滤数据 */ {
			type: Boolean,
			default: false,
		},
		rowCustom: /* 是否开启行自定义内容 */ {
			type: Boolean,
			default: false,
		},
		columnCustom: /* 是否开启列自定义内容 */ {
			type: Boolean,
			default: false,
		},
		nestedCustom: /* 嵌套内容 */ {
			type: Boolean,
			default: false,
		},
		defaultShowFailed:
			/* 默认渲染  开启列自定义或行自定义，此属性必须为false*/ {
				type: Boolean,
				default: true,
			},
		isOpenStripe: /* 是否开启创建带斑马纹的表格 */ {
			type: Boolean,
			default: false,
		},
		isOpenBorder: /* 是否开启创带边框的表格 */ {
			type: Boolean,
			default: true,
		},
		setTableHeight: /* 设置表格的高度，会默认开启表头固定 */ {
			type: [String, Number],
			default: null,
		},
		isOpenFixedColumn: /* 是否开启固定列 */ {
			type: [Boolean, String],
			default: false,
		},
		isOpenSelect: /* 是否开启多选 */ {
			type: Boolean,
			default: false,
		},
		isOpenColumDrag: /* 是否开启列拖拽 */ {
			type: Boolean,
			default: false,
		},
		openDropCallback: /* 是否开启列拖拽回调函数 */ {
			type: Boolean,
			default: false,
		},
		isOpenRowDrag: /* 是否开启行拖拽 */ {
			type: Boolean,
			default: false,
		},
		isOpenSummay: /* 是否展示合计行 */ {
			type: Boolean,
			default: false,
		},
		setSummayText: /* 设置合计行标题 */ {
			type: String,
			default: "合计",
		},
		cumtomSummaryArray: /* 自定义合计内容 */ {
			type: Array,
			default: () => [],
		},
	},
	filters: {
		filterHtml: function (value) {
			if (!value) return "";
			if (typeof value != "string") {
				return value;
			} else {
				return value.replace(/<[^>]+>/gi, "");
			}
		},
	},
	data() {
		return {
			nestedComponent: "elephantTable",
			oldList: [],
			newList: [],
			activeSortType: "",
			activeSortProp: "",
			highligtTrue: true,
			emitIndex: -1,
			isShowTootip: false,
			tableDyBaseRef: "",
		};
	},
	created() {
		if (!this.tabledynamicRef) {
			this.tableDyBaseRef = this.$_.randomWord(false, 6);
		}
	},
	watch: {
		mathKey: {
			handler(newVal, oldVal) {
				this.mathKey = newVal;
				if (this.$route.name == "caseList") {
					this.$nextTick(() => {
						this.columnDrop();
					});
				}
			},
		},
		titleData: {
			handler(newVal, oldVal) {
				this.oldList = JSON.parse(JSON.stringify(this.titleData));
				this.newList = JSON.parse(JSON.stringify(this.titleData));
			},
			deep: true,
			immediate: true,
		},
	},
	mounted() {
		if (this.isOpenColumDrag) {
			/* 开启列拖拽,不支持固定列的拖拽 */ this.columnDrop();
		}
		if (this.isOpenRowDrag) {
			/* 开启行拖拽,不支持固定列的拖拽 */ this.rowDrop();
		}
	},
	updated() {
		this.$nextTick(() => {
			this.$refs[this.tableDyBaseRef].doLayout();
		});
	},
	methods: {
		//自定义合计行
		cumtomSummary() {
			return this.cumtomSummaryArray;
		},
		filterHandler(value, row, column) {
			const property = column["property"];
			if (this.isOpenCustomFilter) {
				return row[property].indexOf(value) !== -1;
			} else {
				return row[property] === value;
			}
		},
		intSortFn(a, b, columnObj) {
			let col = columnObj.prop,
				af =
					typeof a[col] == "string"
						? a[col].replace(/<[^>]+>/gi, "") //去除html标签
						: a[col],
				bf =
					typeof b[col] == "string"
						? b[col].replace(/<[^>]+>/gi, "")
						: b[col];
			if (parseInt(af) > parseInt(bf)) {
				return 1;
			} else {
				return -1;
			}
		},
		stringSortFn(a, b, columnObj) {
			let col = columnObj.prop,
				af = a[col].replace(/<[^>]+>/gi, ""), //去除html标签,
				bf = b[col].replace(/<[^>]+>/gi, "");
			return af.localeCompare(bf, "zh", {
				sensitivity: "base",
			});
		},
		floatSortFn(a, b, columnObj) {
			let col = columnObj.prop,
				af =
					typeof a[col] == "string"
						? a[col].replace(/<[^>]+>/gi, "") //去除html标签
						: a[col],
				bf =
					typeof b[col] == "string"
						? b[col].replace(/<[^>]+>/gi, "")
						: b[col];
			//返回的接口中金额字段有可能是string类型，有可能是number类型 为了兼容，仅此而已
			let trimAf =
					(af + "").indexOf(",") > -1 ? af.replace(/,/gi, "") : af,
				trimBf =
					(bf + "").indexOf(",") > -1 ? bf.replace(/,/gi, "") : bf;
			if (parseFloat(trimAf) > parseFloat(trimBf)) {
				return 1;
			} else {
				return -1;
			}
		},
		dateSortFn(a, b, columnObj) {
			let exception = false;
			let col = columnObj.prop;
			if (
				new Date(a[col].replace(/<[^>]+>/gi, "")) == "Invalid Date" ||
				new Date(b[col].replace(/<[^>]+>/gi, "")) == "Invalid Date"
			) {
				return -1;
			}
			let afReplaceTime = new Date(
					a[col].replace(/<[^>]+>/gi, "")
				).getTime(),
				bfReplaceTime = new Date(
					b[col].replace(/<[^>]+>/gi, "")
				).getTime();
			let af =
				afReplaceTime < -28800000 ? exception == true : afReplaceTime;
			let bf =
				bfReplaceTime < -28800000 ? exception == true : bfReplaceTime;

			try {
				if (exception) {
					throw "日期异常";
				}
			} catch (error) {
				throw new Error(error);
			}
			if (af > bf) {
				return 1;
			}
			if (af < bf) {
				return -1;
			}
		},
		customSortFn(a, b, columnObj) {
			let typeFlag = columnObj.sortTypeDiscern;
			let col = columnObj.prop;
			if (typeFlag == "百分比") {
				if (!a[col] || !b[col]) {
					return -1;
				}
				let v = parseFloat(a[col].replace(/%/gi, "")),
					vDiff = parseFloat(b[col].replace(/%/gi, ""));
				if (v > vDiff) {
					return 1;
				} else {
					return -1;
				}
			}
		},
		sorthandler(a, b, columnObj) {
			if (!columnObj.sortType) {
				return;
			}
			this.activeSortType = columnObj.sortType;
			if (this.activeSortType == "int") {
				return this.intSortFn(a, b, columnObj);
			}
			if (this.activeSortType == "string") {
				return this.stringSortFn(a, b, columnObj);
			}
			if (this.activeSortType == "float") {
				return this.floatSortFn(a, b, columnObj);
			}
			if (this.activeSortType == "date") {
				return this.dateSortFn(a, b, columnObj);
			}
			if (this.activeSortType == "custom") {
				if (columnObj.sortTypeDiscern) {
					return this.customSortFn(a, b, columnObj);
				} else {
					let loggerConfig = {
						sourcePage: "~/components/Table/index.vue",
						codeLine: "380",
						msg: "自定义排序信息缺失",
						errorLevel: "error",
					};
					this.$b.createLog(loggerConfig);
				}
			}
		},
		/**
		 * 排序比较
		 * @param {string} propertyName 排序的属性名
		 * @param {string} sort ascending(升序)/descending(降序)
		 * @return {function}
		 */
		compare(propertyName, sort) {
			return function (obj1, obj2) {
				var value1 = obj1[propertyName];
				var value2 = obj2[propertyName];
				if (typeof value1 === "string" && typeof value2 === "string") {
					const res = value1.localeCompare(value2, "zh");
					return sort === "ascending" ? res : -res;
				} else {
					if (value1 <= value2) {
						return sort === "ascending" ? -1 : 1;
					} else if (value1 > value2) {
						return sort === "ascending" ? 1 : -1;
					}
				}
			};
		},
		// 行拖拽
		rowDrop() {
			// 此时找到的元素是要拖拽元素的父容器
			const tbody = document.querySelector(
				".draggable .el-table__body-wrapper tbody"
			);
			const _this = this;
			Sortable.create(tbody, {
				//  指定父元素下可被拖拽的子元素
				draggable: ".draggable .el-table__row",
				onEnd({ newIndex, oldIndex }) {
					let calcOldIndex = _this.isOpenSelect
						? oldIndex - 1
						: oldIndex;
					let calcNewIndex = _this.isOpenSelect
						? newIndex - 1
						: newIndex;
					const currRow = _this.source.splice(calcOldIndex, 1)[0];
					_this.source.splice(calcNewIndex, 0, currRow);
				},
			});
		},
		// 列拖拽
		columnDrop() {
			let newListBak = [];
			const wrapperTr = document.querySelector(
				".draggable .el-table__header-wrapper tr"
			);
			this.sortable = Sortable.create(wrapperTr, {
				animation: 180,
				delay: 0,
				onEnd: (evt) => {
					this.$_.deepClone(this.newList, newListBak);
					let calcOldIndex = this.isOpenSelect
						? evt.oldIndex - 1
						: evt.oldIndex;
					let calcNewIndex = this.isOpenSelect
						? evt.newIndex - 1
						: evt.newIndex;
					const oldItem = this.newList[calcOldIndex];
					this.newList.splice(calcOldIndex, 1);
					this.newList.splice(calcNewIndex, 0, oldItem);
					if (this.openDropCallback) {
						let oldDropItem = newListBak[calcOldIndex],
							newDropItem = newListBak[calcNewIndex];
						//newDropItem - 被交换的元素
						//oldDropItem - 被拖拽的元素
						this.$emit("updateSort", {
							updateSortList: this.newList,
							oldDropItem: oldDropItem,
							newDropItem: newDropItem,
						});
					}
				},
			});
		},
		// 当用户手动勾选数据行的 Checkbox 时触发的事件
		checkRow(selection, row) {
			this.$emit("commonSelect", { selection: selection, row: row });
		},
		//当用户手动勾选全选 Checkbox 时触发的事件
		checkAllRow(selection) {
			this.$emit("commonAllSelect", { selection: selection });
		},
		//当某一行被点击时会触发该事件
		clickRow(row, column, event) {
			this.emitIndex = row.index;
			this.$emit("commonRowClick", {
				row: row,
				column: column,
				event: event,
			});
			this.customRowStyle({ row: row, rowIndex: row.index });
		},
		//当某个单元格被点击时会触发该事件
		cellClicked(row, column, cell, event) {
			this.$emit("commonCellClicked", {
				row: row,
				column: column,
				cell: cell,
				event: event,
			});
		},
		customRowStyle({ row, rowIndex }) {
			row.index = rowIndex;
			// if (rowIndex === this.emitIndex) {
			// 	return { "background-color": "red !important" };
			// }
		},
		addActiveClass({ row, rowIndex }) {
			if (rowIndex % 2 === 0) {
				return "success-row";
			}
			if (rowIndex % 2 !== 0) {
				return "warning-row";
			}
			return "";
		},
		sortChange({ column, prop, order }) {},
		clearSelectStatus() {
			if (this.tabledynamicRef) {
				this.$nextTick(() => {
					this.$refs[this.tableDyBaseRef].clearSelection();
				});
			} else {
				this.$nextTick(() => {
					this.$refs[this.tableDyBaseRef].clearSelection();
				});
			}
		},
	},
	components: {
		elephantTable,
		"render-html": {
			props: {
				html: String,
			},
			render(h) {
				const com = Vue.extend({
					template: `<div>${this.html}</div>`,
				});

				return h(com, {});
			},
		},
	},
};
</script>
<style lang="scss" scoped></style>
