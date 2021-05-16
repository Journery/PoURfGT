<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" v-bind:height="tableH" border fit
      highlight-current-row>
      <el-table-column align="center" label="学号" width="150">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程" align="center"
        :filters="[{text: '1', value: 1}, {text: '2', value: 2}, {text: '3', value: 3}, {text: '4', value: 4}]"
        :filter-method="filterHandler"
        prop="course">
        <template slot-scope="scope">
          {{ scope.row.course }}
        </template>
      </el-table-column>
      <el-table-column label="小组名称" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.group.group_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="小组编号" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.group.group_id }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="checkPermission(['teacher'])" align="center" label="操作" width="110" fixed="right">
        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteRow(scope.$index, list)" type="danger" size="mini">
            <i class="el-icon-delete-solid" />
            删除
          </el-button>
        </template>
      </el-table-column>
      <el-table-column v-if="checkPermission(['student'])" align="center" label="操作" width="110" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini">
            加入
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    getList
  } from '@/api/group'
  import permission from '@/directive/permission/index.js' // 权限判断指令
  import checkPermission from '@/utils/permission'
  export default {
    name: 'GroupTable',
    props: ['tableH'],
    directives: {
      permission
    },
    data() {
      return {
        list: null,
        listLoading: true,
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      checkPermission,
      fetchData() {
        this.listLoading = true
        getList().then(response => {
          this.list = response.data.items
          this.listLoading = false
        })
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }
    }
  }
</script>

<style>
</style>
