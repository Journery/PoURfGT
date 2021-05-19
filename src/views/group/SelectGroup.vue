<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="课程名称">
        <el-select v-model="form.courseName" placeholder="请选择课程" >
          <el-option v-for="course, key in course_list" :key="course" :label="course" :value="course"></el-option>
        </el-select>
      </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <!-- <el-button type="success" @click="onCreate">创建分组</el-button> -->
    </el-form-item>
    </el-form>
    <group-table v-if="tableIsShown&&free" :tableH="tableHeight" :key="2" :course="form.courseName">
    </group-table>
  </div>
</template>

<script>
  import GroupTable from './GroupTable'
  import {
    getList
  } from '@/api/group'
  import axios from 'axios'
  export default {
    components: {
      GroupTable
    },
    data() {
      return {
        tableIsShown: false,
        tableHeight: "300px",
        free: true,
        course_list: {
          "SPM": "软件项目管理",
          "javaEE": "企业级应用技术开发",
          "AI": "人工智能导论",
          "database": "高级数据库",
          "dataAnalysis": "数据分析基础",
          "SA": "软件体系结构",
        },
        form: {
          courseName: '',
        }
      }
    },
    methods: {
      onSubmit() {
        console.log("form:",this.$data.form)
        this.$data.tableIsShown=false

        let post_data = {}
        post_data["info_courseId"] = this.$data.form.courseName
        post_data["stuNumber"] = "20720000"
        axios.post("/api/stu_query_group.do", post_data).then(resp => {
          console.log(resp.data)
          this.$data.tableIsShown=true
          this.$message(resp.data[0].msg)
          if(resp.data[0].type !== 2){
            this.free = false
          }else{
            this.free = true
          }
          })

      },
      onCreate() {
        this.$message({
          message: 'create!',
          type: 'warning'
        })
      },
    }
  }
</script>

<style>
</style>
