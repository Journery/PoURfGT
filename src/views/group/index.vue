<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="课程名称">
        <el-select v-model="form.courseName" placeholder="请选择课程">
          <el-option label="软件项目管理" value="SPM" />
          <el-option label="企业级应用技术开发" value="javaEE" />
          <el-option label="人工智能导论" value="ai" />
          <el-option label="数据挖掘" value="dataMining" />
          <el-option label="矩阵论" value="matrixTheory" />
        </el-select>
      </el-form-item>
      <el-form-item label="分组方式">
        <el-radio-group v-model="form.way">
          <el-radio label="fixed">固定人数</el-radio>
          <el-radio label="free">自行分组</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分配方法" v-if="form.way ==='fixed'">
        <el-radio-group v-model="form.isRandom">
          <el-radio label="sequence">顺序</el-radio>
          <el-radio label="random" >随机</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="人数" v-if="form.way ==='fixed'">
        <el-select v-model="form.number" placeholder="请选择人数">
          <el-option v-for="item in maxNumber" :key="item" :label="item" :value="item"></el-option>
          <!-- <el-option label="maxNumber"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  <group-table v-if="tableIsShown" :tableH="tableHeight"></group-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import GroupTable from './GroupTable'
export default {
  components: {
    GroupTable
  },
  data() {
    return {
      maxNumber: 15,
      tableIsShown:false,
      tableHeight: "300px",
      form: {
        courseName: '',
        way: '',
        isRandom: '',
        number: '',
      }
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
    onSubmit() {
      this.$message('submit!')
      console.log("form:",this.$data.form)
      this.$data.tableIsShown=true
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
