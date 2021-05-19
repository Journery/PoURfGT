<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="课程名称">
        <el-select v-model="form.courseName" placeholder="请选择课程">
          <el-option v-for="course, key in course_list" :key="course" :label="course" :value="course"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分组方式">
        <el-radio-group v-model="form.way">
          <el-radio label="fixed">固定人数</el-radio>
          <el-radio label="free">自行分组</el-radio>
        </el-radio-group>
      </el-form-item>
<!--      <el-form-item label="分配方法" v-if="form.way ==='fixed'">
        <el-radio-group v-model="form.isRandom">
          <el-radio label="sequence">顺序</el-radio>
          <el-radio label="random" >随机</el-radio>
        </el-radio-group>
      </el-form-item> -->
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
  <group-table v-if="tableIsShown" :tableH="tableHeight" :key="1" :course="form.courseName"></group-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import GroupTable from './GroupTable'
import axios from 'axios'
export default {
  components: {
    GroupTable
  },
  data() {
    return {
      maxNumber: 15,
      tableIsShown:false,
      tableHeight: "300px",
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
        way: '',
        isRandom: '',
        number: '',
      }
    }
  },
  methods: {
    onSubmit() {
      // console.log("form:",this.$data.form)
      this.$data.tableIsShown=false
      
      let post_data = {}
      post_data["info_courseId"] = this.$data.form.courseName
      if(this.$data.form.way === "fixed"){
        post_data["group_size"] = this.$data.form.number
        axios.post("/api/grouped_by_fixed_number.do", post_data).then(resp => {
        this.$data.tableIsShown=true
        console.log(resp)
        })
      }else{
        axios.post("/api/grouped_by_student.do", post_data).then(resp => {
          this.$data.tableIsShown=true
        console.log(resp)
        this.$message(resp.data[0].msg)
        })
      }
      console.log(post_data)


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

<style scoped>
.line{
  text-align: center;
}
</style>
