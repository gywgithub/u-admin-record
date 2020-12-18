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
          <el-form-item label="发起者" prop="nameType" class="ml10">
            <el-input
              v-model="ruleForm.nameType"
              :placeholder="seachPeoplePla">
            </el-input>
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
            :picker-options="pickerOptions">
          </el-date-picker>
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
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-button icon="el-icon-folder-add" type="primary" @click="handleBatch($event,1)">
          批量上架
        </el-button>
        <el-button icon="el-icon-folder-remove" type="warning" @click="handleBatch($event,2)">
          批量下架
        </el-button>
        <el-button icon="el-icon-delete" type="danger" @click="handleBatch($event,3)">
          批量删除
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
          <el-button type="text" @click="seeAllSharePeople(row)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="状态"
        align="center">
        <template #default="{ row }">
          {{ row.status | statusTextFilter }}
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
          <el-button type="text" @click="goodsPutOn(row)">上架</el-button>
          <el-button type="text" @click="goodsOffShelf(row)">下架</el-button>
          <el-button type="text" @click="goodsDelete(row)">删除</el-button>
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
    :before-close="beforeCloseDetail">
    <span slot="title" class="dialog-title">
      <b>分享详情</b>
    </span>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-timeline>
          <el-timeline-item timestamp="2018/4/12" placement="top">
            <el-card>
              <div slot="header" class="clearfix ovfl">
                <el-button style="float: right; padding: 3px 0;" type="text">删除</el-button>
              </div>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/12 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/3" placement="top">
            <el-card>
              <div slot="header" class="clearfix ovfl">
                <el-button style="float: right; padding: 3px 0;" type="text">删除</el-button>
              </div>
              <h4>更新 Github 模板 </h4>
              <p>王小虎 提交于 2018/4/3 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/2" placement="top">
            <el-card>
              <div slot="header" class="clearfix ovfl">
                <el-button style="float: right; padding: 3px 0;" type="text">删除</el-button>
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
      title="分享人列表"
      :visible.sync="isShowShares"
      :before-close="beforeCloseSharesDislog">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-table
          :data="shareList"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table
                :data="shareList"
                border
                style="width: 100%">
                <el-table-column
                  fixed
                  prop="name"
                  label=""
                  width="150"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="updateTime"
                  label="最后更新时间"
                  width="120"
                  align="center">
                </el-table-column>
                <el-table-column
                  label="分享人"
                  width="120"
                  align="center">
                  <template #default="{ row }">
                      <!--{{ row.author}}-->
                     张三
                  </template>
                </el-table-column>
                <el-table-column
                  prop="pro"
                  label="省"
                  width="120"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="city"
                  label="市"
                  width="120"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  label="创建时间"
                  width="120"
                  align="center">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="100"
                  align="center">
                  <template slot-scope="scope">
                    <el-button @click="seeDetail(scope.row)" type="text" size="small">查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column
            label="分享人"
            prop="author"
            align="center">
          </el-table-column>
          <el-table-column
            label="状态"
            prop="status"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template #default="{ row }">
              <el-button type="text">添加分享</el-button>
            </template>
          </el-table-column>
        </el-table>
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
        activeName: 'first',
        currSharePeopleName: '',
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
        seachPeoplePla: '请输入发起者姓名',
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
        shareList:[{id : 1,name:'案例一',shareContent : [{},{},],author :"张三",status : "上架中" , createTime : "2020-04-12",updateTime : "2020-04-12",city : '保定',pro:"河北",ear:'唐县',},
                    {id : 2,name:'案例二',author :"李四",status : "已下架", createTime : "2020-04-12",updateTime : "2020-04-12",city : '保定',pro:"河北",ear:'唐县'},
                    {id : 3,name:'案例三',author :"王五",status : "审核中", createTime : "2020-04-12",updateTime : "2020-04-12",city : '保定',pro:"河北",ear:'唐县'},
                    {id : 4,name:'案例四',author :"赵柳",status : "上架中", createTime : "2020-04-12",updateTime : "2020-04-12",city : '保定',pro:"河北",ear:'唐县'}],
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
      load(tree, treeNode, resolve) {
          setTimeout(() => {
              resolve([
                  {
                      id: 31,
                      date: '2016-05-01',
                      name: '王小虎',
                      address: '上海市普陀区金沙江路 1519 弄'
                  }, {
                      id: 32,
                      date: '2016-05-01',
                      name: '王小虎',
                      address: '上海市普陀区金沙江路 1519 弄'
                  }
              ])
          }, 1000)
      },
      tableSortChange() {
        const imageList = []
        this.$refs.tableSort.tableData.forEach((item, index) => {
          imageList.push(item.img)
        })
        this.imageList = imageList
      },
      goodsDelete(){
          this.$baseMessage('删除成功', 'success')
      },
      goodsPutOn(){
          this.$baseMessage('上架成功', 'success')
      },
      goodsOffShelf(){
          this.$baseMessage('下架成功', 'success')
      },
      handleClick(tab, event) {
          console.log(tab, event);
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
          console.dir(row);
        let data = {};
        request({
          url: '/changeLog/getList',
          method: 'post',
          data,
        }).then((res) => {
          this.activities = res.data;
          this.currSharePeopleName = row.name;
          this.isShowExperienceDetail = true
        })
      },
      seeAllSharePeople(row){
          console.dir(row);
          this.isShowShares = true;
          this.sharePeoples = this.shareList;
      },
      handleBatch(row,type) {
          let msg = '';
          if(type===1) {
              msg = '确定要上架当前项吗'
          }
          if(type===2) {
              msg = '确定要下架当前项吗'
          }
          if(type===3) {
              msg = '你确定要删除当前项吗'
          }
        if (row.id) {
          this.$baseConfirm(
              msg,
            { title: '提示' },
            async () => {
              const { msg } = await doDelete({ ids: row.id })
              this.$baseMessage('未选中任何行', 'success')
              this.fetchData()
            }
          )
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join()
            this.$baseConfirm(
                msg,
              { title: '提示' },
              async () => {
                const { msg } = await doDelete({ ids: ids })
                this.$baseMessage('成功', 'success')
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
