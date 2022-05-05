<template>
	<div class="diary">
		<div
			class="mainBody"
			ref="mainRef"
			v-bind:style="{ minHeight: warpHeight + 'px' }"
		>
			<el-row :gutter="30">
				<el-col :span="16">
					<el-input
						v-model="diaryTitle"
						maxlength="50"
						class="mb30"
						placeholder="日记标题"
					></el-input>
					<editor
						ref="editorOne"
						v-model="content"
						@change="contentChange"
					></editor>
				</el-col>
				<el-col :span="8">
					<el-card
						class="box-card"
						shadow="never"
						style="height: 410px"
					>
						<div slot="header" class="clearfix">
							<span>写下你的日记，记录你的生活</span>
						</div>
						<el-form
							ref="form"
							:model="form"
							class="mt30"
							:rules="rules"
							label-width="70px"
						>
							<el-form-item label="关键词" prop="keyword">
								<input-tag
									v-model="form.keyword"
									:limit="3"
									placeholder="最多3个"
								></input-tag>
							</el-form-item>
							<el-form-item label="目录" prop="category">
								<el-select
									v-model="form.category"
									placeholder="请选择"
								>
									<el-option
										v-for="item in categoryList"
										:key="item.id"
										:label="item.name"
										:value="item.id"
									>
									</el-option>
								</el-select>
								<i
									class="el-icon-circle-plus-outline font26-imp ml10 cup addIcon"
									@click="openDialog"
								></i>
							</el-form-item>
							<el-form-item>
								<el-button
									class="mt20"
									type="primary"
									@click="handleSave"
									>保存日记</el-button
								>
								<el-button
									class="mt20"
									type="primary"
									@click="mangerCategory"
									>目录管理</el-button
								>
								<el-button
									class="mt20 cusList"
									type="primary"
									@click="seeDiaryList"
									>查看日记本</el-button
								>
							</el-form-item>
						</el-form>
					</el-card>
				</el-col>
			</el-row>
		</div>
		<el-dialog
			:title="dialogTitle"
			:visible.sync="dialogVisible"
			:close-on-click-modal="unModalBack"
			width="520px"
			:before-close="handleClose"
		>
			<el-form
				ref="catalogForm"
				:model="catalogModelForm"
				:rules="catalogModelRules"
				:label-position="catalogPos"
				class="disf"
				label-width="50px"
			>
				<el-form-item label="名称" prop="name">
					<el-input
						v-model="catalogModelForm.name"
						placeholder=""
					></el-input>
				</el-form-item>
				<el-form-item label="描述" prop="descride">
					<el-input
						v-model="catalogModelForm.descride"
						type="textarea"
						maxlength="200"
						resize="none"
						show-word-limit
						:autosize="{ minRows: 6 }"
						placeholder="限200字"
					></el-input>
				</el-form-item>
				<el-button
					type="primary"
					class="ml50-imp"
					@click="addCatelogName('catalogForm')"
					>提 交</el-button
				>
			</el-form>
		</el-dialog>
		<el-dialog
			:title="dialogCategoryTitle"
			:visible.sync="dialogCategoryVisible"
			:close-on-click-modal="unModalCategoryBack"
			width="800px"
			:before-close="handleCategoryClose"
		>
			<once-table
				:titleData="titleDataDiglog"
				:source="categoryData"
				:columnCustom="columnCustomIsOpen"
				:defaultShowFailed="defaultShowFailedIs"
				@commonCellClicked="commonCellClickedCallback"
			></once-table>
		</el-dialog>
	</div>
</template>

<script>
import Editor from "@/components/wangEditor";
import InputTag from "vue-input-tag";
import onceTable from "@/components/Table";
import {
	getCatelogDataReq,
	queryByIdDiaryReq,
	addCatelogReq,
	updateDiaryCatalogReq,
	deleteDiaryCatalogReq,
	saveDiaryReq,
	updateDiaryReq,
} from "@/api/diary";

export default {
	name: "Diary",
	components: { Editor, InputTag, onceTable },
	watch: {},
	data() {
		return {
			dialogCategoryTitle: "目录管理",
			dialogCategoryVisible: false,
			unModalCategoryBack: false,
			categoryData: [],
			columnCustomIsOpen: true,
			defaultShowFailedIs: false,
			titleDataDiglog: [
				{
					id: 1,
					name: "序号",
					label: "序号",
					prop: "indexNumber",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 2,
					name: "目录名称",
					label: "目录名称",
					prop: "name",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 3,
					name: "目录描述",
					label: "目录描述",
					prop: "describe",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 4,
					name: "创建时间",
					label: "创建时间",
					prop: "createTime",
					sort: false,
					align: "center",
					filterData: [],
				},
				{
					id: 5,
					name: "操作",
					label: "操作",
					prop: "customHanndle",
					sort: false,
					align: "center",
					filterData: [],
				},
			],
			warpHeight: "800px",
			diaryTitle: "",
			content: "",
			plainFalse: false,
			iconClassString: "el-icon-circle-check",
			iconStyleObj: { color: "#409EFF" },
			dialogTitle: "新增目录",
			editCurrCategoryId: 0,
			dialogVisible: false,
			unModalBack: false,
			catalogPos: "right",
			catalogModelForm: { name: "", descride: "" },
			catalogModelRules: {
				name: [
					{
						required: true,
						trigger: "change",
						message: "请输入",
					},
				],
			},
			// 文章内容
			detail: "",
			categoryList: [],
			categoryListBak: [],
			form: {
				category: "",
				keyword: [],
			},
			rules: {},
		};
	},
	mounted() {
		this.init();
		this.$nextTick(() => {
			this.warpHeight = this.$b.dynamicWinHeight(90);
		});
	},
	methods: {
		init() {
			this.initData();
			let reviewId = this.$route.params.diaryId;
			if (reviewId) {
				this.isReviewDiary(reviewId);
			}
		},
		initData() {
			this.getCatelogFn();
		},
		isReviewDiary(id) {
			queryByIdDiaryReq({ id: id }).then((res) => {
				this.diaryTitle = res.data.title;
				this.content = res.data.content;
				this.form.category = res.data.diaryCatalogId;
				this.form.keyword = res.data.label.split(",");
			});
		},
		getCatelogFn() {
			getCatelogDataReq().then((res) => {
				this.categoryList = res.data;
				this.$_.deepClone(res.data, this.categoryListBak);
			});
		},
		handleClose() {
			this.dialogVisible = false;
		},
		handleCategoryClose() {
			this.dialogCategoryVisible = false;
		},
		addCatelogName(refDom) {
			this.$refs[refDom].validate((valid) => {
				if (valid) {
					if (this.dialogTitle == "新增目录") {
						this.hanndleAddCatelog();
					} else {
						this.hanndleUpdateCatelog();
					}
				}
			});
		},
		hanndleAddCatelog() {
			let params = {
				name: this.catalogModelForm.name,
				describe: this.catalogModelForm.descride,
			};
			addCatelogReq(params).then((res) => {
				if (res.success) {
					this.dialogVisible = false;
					this.getCatelogFn();
					this.$b.successMsg("添加成功");
				}
			});
		},
		hanndleUpdateCatelog() {
			let params = {
				id: this.editCurrCategoryId,
				name: this.catalogModelForm.name,
				describe: this.catalogModelForm.descride,
			};
			updateDiaryCatalogReq(params).then((res) => {
				if (res.success) {
					this.dialogVisible = false;
					this.getCatelogFn();
					this.editCategoryFn();
					this.$b.successMsg("修改成功");
				}
			});
		},
		openDialog() {
			this.dialogTitle = "新增目录";
			this.dialogVisible = true;
		},
		mangerCategory() {
			this.dialogCategoryVisible = true;
			this.editCategoryFn();
		},
		editCategoryFn() {
			getCatelogDataReq().then((res) => {
				let json = res.data;
				for (let i = 0; i < json.length; i++) {
					json[i].customHanndle = ["编辑", "删除"];
					json[i].indexNumber = i + 1;
					if (!json[i].descride) {
						json[i].descride = "无";
					}
				}

				for (let j = 0; j < json.length; j++) {
					//操作按钮逻辑
					let hanndleStr = "";
					for (let k = 0; k < json[j].customHanndle.length; k++) {
						hanndleStr +=
							"<span class='linkText ml10' data-id='" +
							json[j].id +
							"'>" +
							json[j].customHanndle[k] +
							"</span>";
					}
					json[j].customHanndle = hanndleStr;
					json[j].createTime = new Date(json[j].createTime).Format(
						"yyyy-MM-dd hh:mm:ss"
					);
				}

				this.categoryData = json;
			});
		},
		contentChange() {
			console.log("90909");
		},
		handleSave() {
			if (!this.diaryTitle) {
				this.$b.warningMsg("请填写日记标题");
				return;
			}
			if (!this.content) {
				this.$b.warningMsg("请填写日记内容");
				return;
			}
			this.$refs["form"].validate((valid) => {
				if (valid) {
					this.$baseConfirm(
						"确认保存并提交当前日记吗？",
						{ title: "提示" },
						async () => {
							if (this.$route.params.diaryId) {
								this.hanndleDiaryUpdate(
									this.$route.params.diaryId
								);
							} else {
								this.hanndleDiarySave();
							}
						}
					);
				} else {
					return false;
				}
			});
		},
		commonCellClickedCallback({ row, column, cell, event }) {
			if (column.label == "操作") {
				if (event.target.innerText == "编辑") {
					this.editCurrCategoryId = row.id;
					this.catalogModelForm.name = row.name;
					this.catalogModelForm.descride =
						row.describe == "无" ? "" : row.describe;
					this.dialogTitle = "修改目录";
					this.dialogVisible = true;
				}
				if (event.target.innerText == "删除") {
					this.$baseConfirm(
						"您确定要删除吗?",
						{ title: "提示" },
						async () => {
							this.deleteCategory(row.id);
						}
					);
				}
			}
		},
		deleteCategory(id) {
			deleteDiaryCatalogReq({ id: id }).then((res) => {
				if (res.success) {
					this.dialogVisible = false;
					this.editCategoryFn();
					this.getCatelogFn();
					this.$b.successMsg("删除成功");
				}
			});
		},
		hanndleDiaryUpdate(id) {
			let params = {
				id: id,
				title: this.diaryTitle,
				content: this.content,
				label: this.form.keyword && this.form.keyword.join(","),
				diaryCatalogId: this.form.category,
			};
			updateDiaryReq(params).then((res) => {
				if (res.success) {
					this.$b.successMsg("更新成功");
					this.clearDiary();
				}
			});
		},
		hanndleDiarySave() {
			let params = {
				title: this.diaryTitle,
				content: this.content,
				label: this.form.keyword && this.form.keyword.join(","),
				diaryCatalogId: this.form.category,
			};
			saveDiaryReq(params).then((res) => {
				if (res.success) {
					this.$b.successMsg("保存成功");
					this.clearDiary();
				}
			});
		},
		clearDiary() {
			this.diaryTitle = "";
			this.content = "";
			this.$nextTick(() => {
				this.$refs["form"].resetFields();
			});
		},
		seeDiaryList() {
			this.$router.push({
				name: "DiaryList",
				params: {},
			});
		},
	},
};
</script>
<style lang="scss" scoped>
::v-deep .vue-input-tag-wrapper .input-tag {
	line-height: 18px;
	margin-right: 8px;
	padding: 6px;
	background-color: #f4f4f5;
	border-color: #e9e9eb;
	font-size: 12px;
	border-radius: 4px;
}
::v-deep .vue-input-tag-wrapper {
	border-color: #c0c4cc;
	border-radius: 4px;
}
::v-deep .vue-input-tag-wrapper .input-tag {
	color: #909399;
}
::v-deep .vue-input-tag-wrapper .input-tag .remove {
	color: #909399;
}
::v-deep .vue-input-tag-wrapper .new-tag {
	padding-left: 7px;
	height: 30px;
}
.diary {
	.cusList {
		background-color: #3ccba3;
		border-color: #3ccba3;
	}
	.vue-input-tag-wrapper ::placeholder {
		color: #c0c4cc;
	}
	.addIcon {
		color: #afb3bc;
		display: inline-block;
		vertical-align: middle;
		margin-top: -6px;
	}
}
</style>
-
