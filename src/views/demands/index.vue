<template>
	<div class="demands">
		<div class="headerTitle">
			<el-row>
				<el-col>
					<el-form
						ref="platformRef"
						:inline="true"
						:model="platformForm"
						:rules="platformRules"
					>
						<el-form-item
							label="所属平台"
							prop="keyword"
							label-width="70px"
						>
							<el-select v-model="platformForm.keyword">
								<el-option
									v-for="(item, index) in demandKeywordList"
									:key="index"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
						<el-button
							icon="el-icon-search"
							type="primary"
							class="ml20"
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
						icon="el-icon-plus"
						type="primary"
						@click="handleBatch($event)"
					>
						新 增
					</el-button>
				</el-col>
			</el-row>
			<elephant-table
				:tableSourceData="demandsList"
				:tableSourceTitleData="tableTitleData"
				:tableHeight="taskTableHeight"
				:isOpenColumnCustom="isCusColumn"
				:openDefaultRender="defaultShowFailed"
				:isShowPages="isShowPagesBol"
				@cellClicked="cellUserClick"
			>
			</elephant-table>
		</div>
		<el-drawer
			:title="dialogTitle"
			:visible.sync="dialogVisible"
			:direction="direction"
			size="680px"
			:wrapperClosable="wrapperClosableBol"
			:before-close="handleClose"
		>
			<div slot="title">
				<h2>{{ dialogTitle }}</h2>
			</div>
			<el-form
				ref="demandForm"
				:model="demandModelForm"
				:rules="demandModelRules"
				:label-position="demandPos"
				class="disf"
				label-width="120px"
			>
				<el-form-item label="所属平台" prop="keyword">
					<el-select
						v-model="demandModelForm.keyword"
						placeholder="请选择"
						style="width: 500px"
					>
						<el-option
							v-for="item in demandKeywordList"
							:key="item.id"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="标题" prop="title">
					<el-input
						v-model="demandModelForm.title"
						placeholder=""
						style="width: 500px"
					></el-input>
				</el-form-item>
				<el-form-item label="紧急程度" prop="urgentLevel">
					<el-select
						v-model="demandModelForm.urgentLevel"
						placeholder="请选择"
						style="width: 500px"
					>
						<el-option
							v-for="item in demandLevelList"
							:key="item.id"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="所属类别" prop="catalog">
					<el-select
						v-model="demandModelForm.catalog"
						placeholder="请选择"
						style="width: 500px"
					>
						<el-option
							v-for="item in categoryList"
							:key="item.id"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="需求状态" prop="status">
					<el-select
						v-model="demandModelForm.status"
						placeholder="请选择"
						style="width: 500px"
					>
						<el-option
							v-for="item in statusList"
							:key="item.id"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="描述" prop="descript">
					<el-input
						v-model="demandModelForm.descript"
						type="textarea"
						maxlength="300"
						resize="none"
						show-word-limit
						style="width: 500px"
						:autosize="{ minRows: 6 }"
						placeholder="限300字"
					></el-input>
				</el-form-item>
				<el-form-item label="需求场景" prop="applyScenes">
					<el-input
						v-model="demandModelForm.applyScenes"
						type="textarea"
						maxlength="500"
						resize="none"
						style="width: 500px"
						show-word-limit
						:autosize="{ minRows: 6 }"
						placeholder="限500字"
					></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="remark">
					<el-input
						v-model="demandModelForm.remark"
						type="textarea"
						maxlength="200"
						resize="none"
						style="width: 500px"
						show-word-limit
						:autosize="{ minRows: 6 }"
						placeholder="限200字"
					></el-input>
				</el-form-item>
				<el-button
					type="primary"
					class="ml120-imp"
					@click="addDemand('demandForm')"
					>提 交</el-button
				>
			</el-form>
		</el-drawer>

		<el-dialog
			:title="showDialogTitle"
			:visible.sync="showDialogVisible"
			width="800px"
			:before-close="handleShowClose"
		>
			<el-descriptions column="1" :colon="true">
				<el-descriptions-item label="需求标题" labelClassName="fwb">{{
					currRow.title
				}}</el-descriptions-item>
				<el-descriptions-item label="紧急程度" labelClassName="fwb"
					><div
						v-html="
							$options.filters.levelFillter(currRow.urgentLevel)
						"
					></div
				></el-descriptions-item>
				<el-descriptions-item label="所属类别" labelClassName="fwb"
					><div
						v-html="
							$options.filters.catalogFillter(currRow.catalog)
						"
					></div
				></el-descriptions-item>
				<el-descriptions-item label="需求状态" labelClassName="fwb"
					><div
						v-html="$options.filters.statusFillter(currRow.status)"
					></div
				></el-descriptions-item>
				<el-descriptions-item label="需求描述" labelClassName="fwb">{{
					currRow.descript
				}}</el-descriptions-item>
				<el-descriptions-item label="需求场景" labelClassName="fwb">{{
					currRow.applyScenes
				}}</el-descriptions-item>
				<el-descriptions-item label="需求备注" labelClassName="fwb">{{
					currRow.remark
				}}</el-descriptions-item>
			</el-descriptions>
		</el-dialog>
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
  name: "Demands",
  components: {
    elephantTable,
  },
  filters: {
    levelFillter: function (value) {
      if (!value) return "";
      let str = value.replace(/<[^>]+>/gi, "");
      switch (str) {
        case "极高":
          return value = "<span class='lev-demand jg-demand'>极高</span>";
        case "高":
          return value = "<span class='lev-demand g-demand'>高</span>";
        case "中":
          return value = "<span class='lev-demand z-demand'>中</span>";
        case "低":
          return value = "<span class='lev-demand d-demand'>低</span>";
        default:
          return value = "";
      }
    },
    catalogFillter: function (value) {
      if (!value) return "";
      return value.replace(/<[^>]+>/gi, "");
    },
    statusFillter: function (value) {
      if (!value) return "";
      return value.replace(/<[^>]+>/gi, "");
    },
  },
  data () {
    return {
      platformForm: {
        keyword: ""
      },
      platformRules: {},

      demandKeywordList: [
        { id: 1, label: "App端", value: 1 },
        { id: 2, label: "中台", value: 2 },
        { id: 3, label: "后台", value: 3 },
      ],
      demandLevelList: [
        { id: 1, label: "极高", value: 1 },
        { id: 2, label: "高", value: 2 },
        { id: 3, label: "中", value: 3 },
        { id: 4, label: "低", value: 4 },
      ],
      categoryList: [
        { id: 1, label: "核心功能", value: 1 },
        { id: 2, label: "新功能", value: 2 },
        { id: 3, label: "功能优化", value: 3 },
        { id: 4, label: "样式优化", value: 4 },
        { id: 5, label: "代码优化", value: 5 },
        { id: 6, label: "系统规则优化", value: 6 },
      ],
      statusList: [
        { id: 1, label: "未开始", value: 1 },
        { id: 2, label: "进行中", value: 2 },
        { id: 3, label: "已完毕", value: 3 },
      ],
      showDialogTitle: "详情",
      showDialogVisible: false,
      showDemandModelForm: {
        title: "",
        urgentLevel: "",
        catalog: "",
        descript: "",
        applyScenes: "",
        remark: "",
        status: 1,
      },
      showFormPos: "right",
      dialogTitle: "新增需求",
      wrapperClosableBol: false,
      dialogVisible: false,
      unModalBack: false,
      direction: "rtl",
      demandPos: "right",
      demandModelForm: {
        title: "",
        urgentLevel: "",
        catalog: "",
        descript: "",
        applyScenes: "",
        remark: "",
        status: 1,
        keyword: ""
      },
      demandModelRules: {
        title: [
          {
            required: true,
            trigger: "change",
            message: "请输入",
          },
        ],
        catalog: [
          {
            required: true,
            trigger: "change",
            message: "请选择",
          },
        ],
        urgentLevel: [
          {
            required: true,
            trigger: "change",
            message: "请选择",
          },
        ],
        applyScenes: [
          {
            required: true,
            trigger: "change",
            message: "请选择",
          },
        ],
        status: [
          {
            required: true,
            trigger: "change",
            message: "请选择",
          },
        ],
        keyword: [
          {
            required: true,
            trigger: "change",
            message: "请选择",
          },
        ],
      },
      isShowPagesBol: false,
      taskTableHeight: "700px",
      isCusColumn: true, //是否开启列自定义
      defaultShowFailed: false, //开启列自定义或行自定义，此属性必须为false
      demandsList: [],
      tableTitleData: [
        {
          id: 1,
          name: "紧急程度",
          label: "紧急程度",
          prop: "urgentLevel",
          sort: true,
          align: "center",
          filterData: [],
        },
        {
          id: 3,
          name: "发起人",
          label: "发起人",
          prop: "userName",
          sort: false,
          align: "center",
          filterData: [],
        },
        {
          id: 4,
          name: "标题",
          label: "标题",
          prop: "title",
          sort: false,
          align: "center",
          filterData: [],
        },
        {
          id: 5,
          name: "描述",
          label: "描述",
          prop: "descript",
          sort: false,
          align: "center",
          filterData: [],
        },
        {
          id: 2,
          name: "需求场景",
          label: "需求场景",
          prop: "applyScenes",
          sort: false,
          align: "center",
          filterData: [],
        },
        {
          id: 6,
          name: "所属分类",
          label: "所属分类",
          prop: "catalog",
          sort: false,
          align: "center",
          filterData: [],
        },
        {
          id: 12,
          name: "需求状态",
          label: "需求状态",
          prop: "status",
          sort: false,
          align: "center",
          filterData: [],
        },
        {
          id: 8,
          name: "创建时间",
          label: "创建时间",
          prop: "createTime",
          sort: true,
          width: "170px",
          align: "center",
          filterData: [],
        },
        {
          id: 9,
          name: "更新人",
          label: "更新人",
          prop: "updateUserName",
          sort: true,
          align: "center",
          filterData: [],
        },
        {
          id: 10,
          name: "更新时间",
          label: "更新时间",
          prop: "updateTime",
          sort: true,
          width: "170px",
          align: "center",
          filterData: [],
        },
        {
          id: 11,
          name: "操作",
          label: "操作",
          prop: "customHanndle",
          sort: false,
          fixed: false,
          width: "180px",
          align: "center",
          filterData: [],
        },
      ],
      demandListBak: [],
      currRow: {}
    };
  },
  mounted () {
    this.initData();
  },
  methods: {
    initData () {
      this.getDemandListData({});
    },
    handleQuery () {
      this.getDemandListData({ "keyword": this.platformForm.keyword });
    },
    getDemandListData (params) {
      getDemandDataReq(params).then((res) => {
        this.$_.deepClone(
          res.data,
          this.demandListBak
        );
        this.packageData(res);
      });
    },
    packageData (data) {
      let json = data.data;
      for (let i = 0; i < json.length; i++) {
        switch (json[i].status) {
          case "1":
            json[i].status = "未开始";
            break;
          case "2":
            json[i].status = "进行中";
            break;
          case "3":
            json[i].status = "已结束";
            break;
          default:
            json[i].status = "";
            break;
        }
        switch (json[i].urgentLevel) {
          case 1:
            json[i].urgentLevel = "<span class='lev-demand jg-demand'>极高</span>";
            break;
          case 2:
            json[i].urgentLevel = "<span class='lev-demand g-demand'>高</span>";
            break;
          case 3:
            json[i].urgentLevel = "<span class='lev-demand z-demand'>中</span>";
            break;
          case 4:
            json[i].urgentLevel = "<span class='lev-demand d-demand'>低</span>";
            break;
          default:
            json[i].urgentLevel = "";
            break;
        }
        switch (json[i].catalog) {
          case "1":
            json[i].catalog = "<span class=''>核心功能</span>";
            break;
          case "2":
            json[i].catalog = "<span class=''>新功能</span>";
            break;
          case "3":
            json[i].catalog = "<span class=''>功能优化</span>";
            break;
          case "4":
            json[i].catalog = "<span class=''>样式优化</span>";
            break;
          case "5":
            json[i].catalog = "<span class=''>代码优化</span>";
            break;
          case "6":
            json[i].catalog = "<span class=''>系统规则优化</span>";
            break;
          default:
            json[i].catalog = "";
            break;
        }
        json[i].customHanndle = ["查看详情", "编辑", "删除"];

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
        if (json[j].status == "已结束") {
          json[j].customHanndle = "<span class='linkText ml10' data-id='" + json[j].id + "'>查看详情</span>";
        } else {
          json[j].customHanndle = hanndleStr;
        }
        json[j].createTime = new Date(json[j].createTime).Format(
          "yyyy-MM-dd hh:mm:ss"
        );
        if (json[j].updateTime) {
          json[j].updateTime = new Date(json[j].updateTime).Format(
            "yyyy-MM-dd hh:mm:ss"
          );
        }
      }
      this.demandsList = json;
    },
    handleBatch (e) {
      this.dialogTitle = "新增需求";
      this.dialogVisible = true;
      this.$refs.demandForm.resetFields();
    },
    addDemand (refDom) {
      this.$refs[refDom].validate((valid) => {
        if (valid) {
          if (this.dialogTitle == "新增需求") {
            this.hanndleAddDemand();
          } else {
            this.hanndleUpdateDemand();
          }
        }
      });
    },
    handleClose () {
      this.dialogVisible = false;
    },
    handleShowClose () {
      this.showDialogVisible = false;
    },
    hanndleAddDemand () {
      addDemandReq(this.demandModelForm).then((res) => {
        if (res.success) {
          this.$message.success("添加成功");
          this.dialogVisible = false;
          this.getDemandListData({});
        }
      });
    },
    hanndleUpdateDemand () {
      let params = { id: this.currRow.id };
      Object.assign(params, this.demandModelForm)
      updateDemandReq(params).then((res) => {
        if (res.success) {
          this.$message.success("修改成功");
          this.dialogVisible = false;
          this.getDemandListData({});
        }
      });
    },
    reviewData (id) {
      let bakData = this.demandListBak;
      let reviewData = {};
      for (let i = 0; i < bakData.length; i++) {
        if (id == bakData[i].id) {
          reviewData = bakData[i];
        }
      }
      this.$nextTick(() => {
        this.demandModelForm.title = reviewData.title;
        this.demandModelForm.urgentLevel = reviewData.urgentLevel;
        this.demandModelForm.catalog = parseInt(reviewData.catalog);
        this.demandModelForm.descript = reviewData.descript;
        this.demandModelForm.applyScenes = reviewData.applyScenes;
        this.demandModelForm.remark = reviewData.remark;
        this.demandModelForm.keyword = reviewData.keyword;
      });
    },
    //当某个单元格被点击时
    cellUserClick ({ row, column, cell, event }) {
      if (column.label == "操作") {
        this.currRow = row;
        if (event.target.innerText == "查看详情") {
          this.showDialogVisible = true;
        }
        if (event.target.innerText == "编辑") {
          this.reviewData(row.id);
          this.currRow = row;
          this.dialogTitle = "修改需求";
          this.dialogVisible = true;
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
    deleteFn (ids) {
      deleteDemandReq(ids).then((res) => {
        if (res.success) {
          this.$message.success("删除成功");
          this.getDemandListData({});
        }
      });
    },
  },
};
</script>
<style>
.lev-demand {
	display: inline-block;
	color: #fff;
	border-radius: 3px;
	width: 50px;
	height: 25px;
	text-align: center;
	line-height: 25px;
}
.jg-demand {
	background-color: #f56c6c;
	border-color: #f56c6c;
}
.g-demand {
	background-color: #e6a23c;
	border-color: #e6a23c;
}
.z-demand {
	background-color: #67c23a;
	border-color: #67c23a;
}
.d-demand {
	background-color: #409eff;
	border-color: #409eff;
}
.end-demand {
	display: inline-block;
	color: #fff;
	background-color: #909399;
	border-color: #909399;
	border-radius: 3px;
	width: 70px;
	height: 30px;
	line-height: 30px;
}
</style>
<style lang="scss" scoped>
::v-deep .showForm .el-form-item__content {
	line-height: 24px;
}
.demands {
	.showForm {
	}
}
</style>
