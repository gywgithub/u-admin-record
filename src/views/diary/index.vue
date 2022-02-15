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
						placeholder="日记标题"
					></el-input>
					<editor
						class="mt30"
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
									>保 存</el-button
								>
								<el-button
									class="mt20 cusList"
									type="primary"
									@click="seeDiaryList"
									>查看日记列表</el-button
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
				label-width="80px"
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
						show-word-limit
						:autosize="{ minRows: 3 }"
						placeholder="限200字"
					></el-input>
				</el-form-item>
				<el-button type="primary" @click="addCatelogName('catalogForm')"
					>提 交</el-button
				>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import Editor from "@/components/wangEditor";
import InputTag from "vue-input-tag";
import { getCatelogDataReq, addCatelogReq, saveDiaryReq } from "@/api/diary";

export default {
	name: "Diary",
	components: { Editor, InputTag },
	watch: {},
	data() {
		return {
			warpHeight: "800px",
			diaryTitle: "",
			content: "",
			dialogTitle: "新增目录",
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
		},
		initData() {
			this.getCatelogFn();
		},
		getCatelogFn() {
			let userIdObj = JSON.parse(localStorage.getItem("userInfo"));
			getCatelogDataReq({ userId: userIdObj.userId }).then((res) => {
				this.categoryList = res.data;
			});
		},
		handleClose() {
			this.dialogVisible = false;
		},
		addCatelogName(refDom) {
			this.$refs[refDom].validate((valid) => {
				if (valid) {
					this.hanndleAddCatelog();
				}
			});
		},
		hanndleAddCatelog() {
			let params = {
				userId: 1,
				name: this.catalogModelForm.name,
				describe: this.catalogModelForm.describe,
			};
			addCatelogReq(params).then((res) => {
				if (res.success) {
					this.dialogVisible = false;
					this.getCatelogFn();
					this.$b.successMsg("添加成功");
				}
			});
		},
		openDialog() {
			this.dialogVisible = true;
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
							this.hanndleDiarySave();
						}
					);
				} else {
					return false;
				}
			});
		},

		hanndleDiarySave() {
			let userIdObj = JSON.parse(localStorage.getItem("userInfo"));
			let params = {
				title: this.diaryTitle,
				content: this.content,
				label: this.form.keyword && this.form.keyword.join(","),
				catalogId: this.form.category,
				userId: userIdObj.userId,
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
