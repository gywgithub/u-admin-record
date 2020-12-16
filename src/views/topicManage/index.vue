<template>
  <div class="topic-container">
    <el-row class="mb18">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-form
          ref="ruleForm"
          :inline="true"
          :model="ruleForm"
          :rules="rules"
          class="demo-ruleForm">
          <el-form-item label="发起ID" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="ruleForm.status" placeholder="">
              <el-option label="全部" value="all"></el-option>
              <el-option label="上架中" value="sj"></el-option>
              <el-option label="审核中" value="sh"></el-option>
              <el-option label="已下架" value="yx"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发起人姓名" prop="nameType" class="ml10">
            <el-input
              v-model="ruleForm.nameType"
              :placeholder="seachPeoplePla"
            ></el-input>
          </el-form-item>
          <span>时间范围：</span>
          <el-date-picker
            v-model="value2"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          ></el-date-picker>

          <el-button
            icon="el-icon-search"
            type="primary"
            size="small"
            native-type="submit"
            @click="handleQuery">
            查询
          </el-button>
        </el-form>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"></el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">
          添加
        </el-button>
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete">
          删除
        </el-button>
      </el-col>
    </el-row>
    <el-table
      ref="tableSort"
      v-loading="listLoading"
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
        label="ID"
        width="120"
        align="center">
        <template #default="{ row }">
          {{ row.id }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="title"
        label="标题"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="发起者"
        prop="author"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="分享者"
        align="center"
        width="180px">
        <template #default="{ row }">
          <el-button type="text" @click="seeDetail(row)">张三</el-button> <el-tag :type="row.status | statusFilter">{{ row.status | statusTextFilter }}</el-tag><br>
          <el-button type="text" @click="seeDetail(row)">李四</el-button> <el-tag :type="row.status | statusFilter">{{ row.status | statusTextFilter }}</el-tag><br>
          <el-button type="text" @click="seeAllSharePeople(row)">查看全部</el-button>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="创建时间"
        prop="datetime"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="180px" align="center">
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
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
    title="分享时间线"
    :visible.sync="isShowExperienceDetail"
    :before-close="beforeCloseDetail"
  >
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <el-timeline>
        <el-timeline-item timestamp="2018/4/12" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/12 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/3" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/3 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/2" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/2 20:46</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-col>
  </el-dialog>
    <el-dialog
      title="所有分享人"
      :visible.sync="isShowShares"
      :before-close="beforeCloseSharesDislog">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div v-for="peopleItem in ps" style="display: inline-block;margin-left:10px;">
          <el-button type="text" @click="seeDetail(row)">{{peopleItem.name}}({{ peopleItem.status | statusTextFilter }})</el-button>
        </div>
      </el-col>
    </el-dialog>
  </div>
</template>

<script>
  import { getList, doDelete } from '@/api/table'
  import request from '@/utils/request'
  export default {
    name: 'ComprehensiveTable',
    components: {},
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger',
        }
        return statusMap[status]
      },
      statusTextFilter(val) {
        if (val == 'published') {
          return '已上架'
        }
        if (val == 'deleted') {
          return '已下架'
        }
        if (val == 'draft') {
          return '审核中'
        }
      },
    },
    data() {
      return {
        imgShow: true,
        activities: [],
        pickerOptions: {
          shortcuts: [
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
              },
            },
          ],
        },
        value1: '',
        value2: '',
        seachPeoplePla: '输入发起人的姓名',
        ruleForm: {
          name: '',
          nameType: '',
          status: 'all',
        },
        rules: {
          name: [
            { required: false, message: '请输入活动名称', trigger: 'blur' },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur',
            },
          ],
        },
        isShowExperienceDetail: false, //是否展示分享详情
        isShowShares: false,
        ps:[{id : 1,name :"张三",status : "published"},{id : 2,name :"李四",status : "deleted"},{id : 3,name :"王五",status : "draft"},{id : 4,name :"赵柳",status : "deleted"}],
        reverse: true,
        list: [],
        imageList: [],
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        background: true,
        selectRows: '',
        elementLoadingText: '正在加载...',
        queryForm: {
          pageNo: 1,
          pageSize: 20,
          title: '',
        },
      }
    },
    computed: {
      height() {
        return this.$baseTableHeight()
      },
    },
    created() {
      this.fetchData()
    },
    beforeDestroy() {},
    mounted() {},
    methods: {
      tableSortChange() {
        const imageList = []
        this.$refs.tableSort.tableData.forEach((item, index) => {
          imageList.push(item.img)
        })
        this.imageList = imageList
      },
      beforeCloseDetail() {
        this.isShowExperienceDetail = false
      },
      beforeCloseSharesDislog() {
        this.isShowShares = false
      },
      setSelectRows(val) {
        this.selectRows = val
      },
      handleAdd() {},
      handleEdit(row) {},
      async seeDetail(row) {
        //row.id
        let data = {}
        request({
          url: '/changeLog/getList',
          method: 'post',
          data,
        }).then((res) => {
          this.activities = res.data
          this.isShowExperienceDetail = true
        })
      },
      seeAllSharePeople(){
          this.isShowShares = true;
          this.sharePeoples = this.ps;
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm(
            '你确定要删除当前项吗',
            { title: '提示' },
            async () => {
              const { msg } = await doDelete({ ids: row.id })
              this.$baseMessage(msg, 'success')
              this.fetchData()
            }
          )
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join()
            this.$baseConfirm(
              '你确定要删除选中项吗',
              { title: '提示' },
              async () => {
                const { msg } = await doDelete({ ids: ids })
                this.$baseMessage(msg, 'success')
                this.fetchData()
              }
            )
          } else {
            this.$baseMessage('未选中任何行', 'error')
            return false
          }
        }
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchData()
      },
      handleQuery() {
        this.queryForm.pageNo = 1
        this.fetchData()
      },
      async fetchData() {
        this.listLoading = true
        const { data, totalCount } = await getList(this.queryForm)
        this.list = data
        const imageList = []
        data.forEach((item, index) => {
          imageList.push(item.img)
        })
        this.imageList = imageList
        this.total = totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
    },
  }
</script>
<style lang="scss" scoped>
  ::v-deep .el-dialog__body {
    overflow: hidden;
  }
  ::v-deep .el-button {
    margin-left: 10px;
  }
</style>
