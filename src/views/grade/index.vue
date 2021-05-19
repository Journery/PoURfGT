<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="课程名称">
        <el-select v-model="form.courseName" placeholder="请选择课程">
          <el-option v-for="course, key in course_list" :key="course" :label="course" :value="course"></el-option>
        </el-select>
      </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确定</el-button>
    </el-form-item>
    </el-form>
    
    <div v-show="isShow">
      <!--表格渲染-->
      <el-table
        :data="list"
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column
          prop="Id"
          type="index"
          label="序号"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="studentName"
          label="学生姓名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="studentNum"
          label="学生学号"
          align="center"
        ></el-table-column>
        <el-table-column
          v-for="(gradeItem, index) in gradeItems"
          :label="gradeItem.gradeItemName"
          :key="gradeItem.index"
          :prop="'grades.' + index + '.value'"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="finalGrade"
          label="总成绩"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" width="200" align="center" v-if="checkPermission(['teacher'])">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.row)"
              size="mini"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 编辑弹出框 -->
      <el-dialog title="编辑" :visible.sync="editVisible" width="40%">
        <el-form ref="editform" :model="editform">
          <!-- <el-form-item label="平时成绩" :label-width="formLabelWidth">
          <el-input
            v-model="editform.normalGrade"
            style="width: 70%"
          ></el-input>
        </el-form-item>
        <el-form-item label="考试成绩" :label-width="formLabelWidth">
          <el-input v-model="editform.testGrade" style="width: 70%"></el-input>
        </el-form-item> -->
          <el-form-item
            v-for="(gradeItem, index) in gradeItems"
            :label="gradeItem.gradeItemName"
            :key="index"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="editform.grades[index].value"
              style="width: 70%"
            ></el-input>
          </el-form-item>
          <el-form-item label="总成绩" :label-width="formLabelWidth">
            <el-input
              v-model="editform.finalGrade"
              style="width: 70%"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelEdit02">取 消</el-button>
          <el-button type="primary" @click="saveEdit">提 交</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
/*import { fetchList } from '@/api/table'*/
import checkPermission from '@/utils/permission'
export default {
  name: "ViewGrade",
  data() {
    return {
      //list: null,
      isShow: false,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 12,
      },
      form: {
        courseId: "",
      },
      editVisible: false,
      course_list: {
        "SPM": "软件项目管理",
        "javaEE": "企业级应用技术开发",
        "AI": "人工智能导论",
        "database": "高级数据库",
        "dataAnalysis": "数据分析基础",
        "SA": "软件体系结构",
      },
      editform: {
        //用于编辑
        // normalGrade: "", // 平时成绩
        // testGrade: "", // 考试成绩
        finalGrade: "", // 总成绩
        grades: [
          {
            value: "",
          },
          {
            value: "",
          },
          {
            value: "",
          },
        ],
      },
      formLabelWidth: "100",
      title: "",
      studentNum: "", //学号
      studentName: "", // 姓名
      courseNum: "", // 课程号
      // normalGrade: "", // 平时成绩
      // testGrade: "", // 考试成绩
      gradeItems: [
        { gradeItemName: "平时成绩" },
        { gradeItemName: "实验成绩" },
        { gradeItemName: "考试成绩" },
      ],
      finalGrade: "", // 总成绩
      list: [
        {
          studentNum: "111",
          studentName: "张三",
          courseNum: "软件项目管理",
          // normalGrade: "100",
          // testGrade: "100",
          finalGrade: "100",
          grades: [
            {
              value: "60",
            },
            {
              value: "70",
            },
            {
              value: "80",
            },
          ],
        },
        {
          studentNum: "112",
          studentName: "李四",
          courseNum: "软件项目管理",
          // normalGrade: "97",
          // testGrade: "99",
          finalGrade: "98",
          grades: [
            {
              value: "98",
            },
            {
              value: "99",
            },
            {
              value: "100",
            },
          ],
        },
      ],
    };
  },
  created() {
    //this.getList()
  },
  methods: {
    checkPermission,
    onSubmit(formName) {
      this.$message("submit!");
      this.$data.isShow = true;
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     this.$message("submit!");
      //     this.$data.isShow = true;
      //     console.log(this.$data.formName);
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    cancelEdit(row) {
      row.title = row.originalTitle;
      row.edit = false;
      this.$message({
        message: "已经撤销成绩编辑",
        type: "warning",
      });
    },
    confirmEdit(row) {
      row.edit = false;
      row.originalTitle = row.title;
      this.$message({
        message: "成绩编辑成功",
        type: "success",
      });
    },
    /*编辑功能*/
    handleEdit(row) {
      this.editform = row;
      this.editVisible = true;
    },
    /*编辑取消*/
    cancelEdit02() {
      this.$refs["editform"].resetFields();
      this.editVisible = false;
    },
    saveEdit() {
      this.$refs["editform"].resetFields();
      this.editVisible = false;
    },
  },
};
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
