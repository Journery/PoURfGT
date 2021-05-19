<template>
  <div class="app-container">
    <el-button v-if="checkPermission(['student'])" type="success" @click="onCreate">创建分组</el-button>
    <el-table v-loading="listLoading" :data="stu_list" element-loading-text="Loading" v-bind:height="tableH" border fit
      highlight-current-row>
      <el-table-column align="center" label="学号" width="150">
        <template slot-scope="scope">
          {{ scope.row.stuNumber }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程" align="center">
        <template slot-scope="scope">
          {{ scope.row.courseName }}
        </template>
      </el-table-column>
      <el-table-column label="课程编号" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.courseNumber }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="小组编号" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.group_id }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="checkPermission(['teacher'])" align="center" label="操作" width="110" fixed="right">
        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteRow(scope.$index, stu_list)" type="danger" size="mini">
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
      <el-table-column v-if="checkPermission(['student'])" align="center" label="操作" width="110" fixed="right">
        <template slot-scope="scope">
          <el-button type="danger" size="mini">
            退出
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-el-drag-dialog ref="CreateGroupDialog" :visible.sync="dialogVisible" title="创建分组">
      <el-form ref="CreateGroupForm" :model="createGroupForm">
        <el-form-item>
          <el-transfer
          v-model="choosed_member"
          :data="ungrouped_list"
          :titles="['未分组学生', '已选择']"
          filterable></el-transfer>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
      <!--        <div v-if="imgSrc" class="img_bg_camera">
        <img :src="imgSrc" alt="" class="tx_img">
      </div> -->
      <!-- <el-button @click="setImage()">拍照</el-button> -->
    </el-dialog>
  </div>
</template>

<script>
  import {
    getList
  } from '@/api/group'
  import {
    getStudentList
  } from '@/api/StudentList'
  import permission from '@/directive/permission/index.js' // 权限判断指令
  import elDragDialog from '@/directive/el-drag-dialog'
  import checkPermission from '@/utils/permission'
  import axios from 'axios'
  export default {
    name: 'GroupTable',
    props: ['tableH', 'course'],
    directives: {
      permission,
      elDragDialog
    },
    data() {
      return {
        stu_list: [],
        ungrouped_list:[],
        listLoading: true,
        dialogVisible: false,
        createGroupForm: {
          leader_id: "20720000",
        },
        choosed_member:["20720000"],
        course_list: {
          "SPM": "软件项目管理",
          "javaEE": "企业级应用技术开发",
          "AI": "人工智能导论",
          "database": "高级数据库",
          "dataAnalysis": "数据分析基础",
          "SA": "软件体系结构",
        }
      }
    },
    created() {
      this.fetchData(this.$props.course)
    },
    methods: {
      checkPermission,
      fetchData(courseName) {
        this.listLoading = true
        if (courseName) {
          getStudentList({
            "info_courseId": courseName
          }).then(response => {
            // console.log(response)
            response.forEach((item, index, array) => {
              item["courseName"] = courseName
            })
            this.stu_list = this.stu_list.concat(response)
            this.listLoading = false
          })
        } else {
          for (let key in this.course_list) {
            let courseName = this.course_list[key]
            getStudentList({
              "info_courseId": courseName
            }).then(response => {
              response.forEach((item, index, array) => {
                item["courseName"] = courseName
              })
              this.stu_list = this.stu_list.concat(response)
              this.listLoading = false
            })
          }
        }
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      onCreate() {
        this.dialogVisible = true;
        this.ungrouped_list = []
        let post_data = {}
        post_data["info_courseId"] = this.$props.course
        console.log(post_data)
        axios.post("/api/stu_query_students.do", post_data).then(resp =>{
          console.log(resp)
          // this.ungrouped_list = resp.data
          resp.data.forEach( (item, index) => {
            this.ungrouped_list.push({
            key: item.stuNumber.toString(),
            label: item.userName,
            disabled: item.stuNumber == this.createGroupForm.leader_id
          })
          })
          console.log("ungrouped:%o", this.ungrouped_list)
        })
      },
      onSubmit() {
        let create_group_data = {};
        create_group_data["info_courseId"] = this.$props.course;
        create_group_data["student"] = this.choosed_member;
        axios.post("/api/stu_create_group.do", create_group_data).then(resp => {
          console.log(resp.data[0].msg);
        })
      },
    }
  }
</script>

<style>
</style>
