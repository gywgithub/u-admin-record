<template>
  <div class="topic-container">
    <el-row class="mb18">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-form
          ref="ruleForm"
          :inline="true"
          :model="ruleForm"
          :rules="rules"
          class="demo-ruleForm"
        >
          <el-form-item label="问题ID" prop="name">
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
          <el-form-item label="" prop="nameType" class="ml10">
            <el-select
              v-model="ruleForm.nameType"
              placeholder=""
              @change="seachPeopleType"
            >
              <el-option label="全部" value="all"></el-option>
              <el-option label="提问者" value="tw"></el-option>
              <el-option label="回答者" value="hd"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="name">
            <el-input
              v-model="ruleForm.name"
              :placeholder="seachPeoplePla"
            ></el-input>
          </el-form-item>
          <el-button
            icon="el-icon-search"
            type="primary"
            size="small"
            native-type="submit"
            @click="handleQuery"
          >
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
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="ID" width="120">
        <template #default="{ row }">
          {{ row.id }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="title"
        label="标题"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="提问者"
        prop="author"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="问答详情" width="180px">
        <template #default="{ row }">
          <el-button type="text" @click="seeDetail(row)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="状态">
        <template #default="{ row }">
          <el-tooltip
            :content="row.status"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="row.status | statusFilter">
              {{ row.status | statusTextFilter }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="创建时间"
        prop="datetime"
        width="200"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="180px">
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
      title="分享详情"
      :visible.sync="isShowExperienceDetail"
      :before-close="beforeCloseDetail"
    >
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card class="card" shadow="never">
          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
              :color="activity.color"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
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
        seachPeoplePla: '输入提问者的姓名',
        ruleForm: {
          name: '',
          nameType: 'all',
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
      seachPeopleType() {
        this.ruleForm.nameType === 'hd'
          ? (this.seachPeoplePla = '输入回答者的姓名')
          : (this.seachPeoplePla = '输入提问者的姓名')
      },
      beforeCloseDetail() {
        this.isShowExperienceDetail = false
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
