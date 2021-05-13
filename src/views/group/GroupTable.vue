<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" v-bind:height="tableH" border fit
      highlight-current-row>
      <el-table-column align="center" label="学号" width="150">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="小组名称" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="小组编号" width="110">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="110" fixed="right">
        <template slot-scope="scope">
          <el-button
          @click.native.prevent="deleteRow(scope.$index, list)"
          type="danger"
          size="mini">
            <i class="el-icon-delete-solid" />
            删除
          </el-button>
        </template>

      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    getList
  } from '@/api/table'
  export default {
    name: 'GroupTable',
    props: ['tableH'],
    data() {
      return {
        list: null,
        listLoading: true,
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getList().then(response => {
          this.list = response.data.items
          this.listLoading = false
        })
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }
    }
  }
</script>

<style>
</style>
