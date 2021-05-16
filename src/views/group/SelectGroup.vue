<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="课程名称" v-if="free">
      <el-select v-model="form.courseName" placeholder="请选择课程">
        <el-option label="软件项目管理" value="SPM" />
        <el-option label="企业级应用技术开发" value="javaEE" />
        <el-option label="人工智能导论" value="ai" />
        <el-option label="数据挖掘" value="dataMining" />
        <el-option label="矩阵论" value="matrixTheory" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
    </el-form>
    <group-table v-if="tableIsShown&&free" :tableH="tableHeight"></group-table>
  </div>
</template>

<script>
  import GroupTable from './GroupTable'
  import {
    getList
  } from '@/api/group'
  export default {
    components: {
      GroupTable
    },
    data() {
      return {
        tableIsShown: false,
        tableHeight: "300px",
        free: true,
        form: {
          courseName: '',
        }
      }
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
    }
  }
</script>

<style>
</style>
