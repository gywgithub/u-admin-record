<template>
  <div class="roleManagement-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
          添加
        </el-button>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel :span="12"></vab-query-form-right-panel>
    </vab-query-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      :border="true"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
    >
      <!--<el-table-column show-overflow-tooltip type="selection"></el-table-column>  单选  多选  全选-->
      <el-table-column
        show-overflow-tooltip
        prop="id"
        align="center"
        label="id"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="permission"
        align="center"
        label="权限代码"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="chinessName"
        align="center"
        label="权限名称"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="操作"
        width="200"
        align="center"
      >
        <template #default="{ row }">
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit ref="edit" @fetch-data="fetchData"></edit>
  </div>
</template>

<script>
  import { getList, doDelete } from '@/api/roleManagement'
  import Edit from './components/RoleManagementEdit'

  export default {
    name: 'RoleManagement',
    components: { Edit },
    data() {
      return {
        list: [
          {
            id: '35000016899026589',
            permission: 'root',
            chinessName: '超级管理员',
          },
          {
            id: '350000198609136730',
            permission: 'admin',
            chinessName: '管理员',
          },
          {
            id: '540000201006291838',
            permission: 'editor',
            chinessName: 'VIP',
          },
          {
            id: '35664501006291838',
            permission: 'editor2',
            chinessName: 'VIP2',
          },
          {
            id: '68800111226291936',
            permission: 'user1',
            chinessName: '普通用户-1级',
          },
          {
            id: '4333580111226291936',
            permission: 'user2',
            chinessName: '普通用户-2级',
          },
          {
            id: '986555111226291936',
            permission: 'user3',
            chinessName: '普通用户-3级',
          },
        ],
        listLoading: false,
        layout: 'total, sizes, prev, pager, next, jumper',
        selectRows: '',
        elementLoadingText: '正在加载...',
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          permission: '',
        },
      }
    },
    created() {},
    methods: {
      setSelectRows(val) {
        this.selectRows = val
      },
      handleEdit(row) {
        if (row.id) {
          this.$refs['edit'].showEdit(row)
        } else {
          this.$refs['edit'].showEdit()
        }
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { msg } = await doDelete({ ids: row.id })
            this.$baseMessage(msg, 'success')
            this.fetchData()
          })
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join()
            this.$baseConfirm('你确定要删除选中项吗', null, async () => {
              const { msg } = await doDelete({ ids })
              this.$baseMessage(msg, 'success')
              this.fetchData()
            })
          } else {
            this.$baseMessage('未选中任何行', 'error')
            return false
          }
        }
      },
    },
  }
</script>
