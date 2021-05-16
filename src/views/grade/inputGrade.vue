<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" class="demo-dynamic">
      <el-row>
        <el-col :span="5">
          <el-form-item
            prop="courseId"
            label="课程号"
            :rules="{
              required: true,
              message: '请输入课程号',
              trigger: 'blur',
            }"
          >
            <el-input
              v-model="form.courseId"
              oninput="value=value.replace(/[^\d]/g,'')"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-button type="primary" @click="onSubmit('form')">确定</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div v-show="showForm">
      <el-form :model="inputForm" ref="inputForm">
        <!--表格渲染-->
        <el-table
          :data="inputForm.list"
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

          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="handleEdit(scope.row)"
                size="mini"
                >录入成绩</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-form-item align="center">
          <el-button type="primary" @click="submitForm('inputForm')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>

      <!-- 编辑弹出框 -->
      <el-dialog title="录入成绩" :visible.sync="editVisible" width="40%">
        <el-form ref="editform" :model="editform">
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
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelEdit02">取 消</el-button>
          <el-button type="primary" @click="saveEdit()">提 交</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      showForm: false,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 12,
      },
      form: {
        courseName: "",
      },
      editVisible: false,
      editform: {
        //用于编辑

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
      gradeItems: [
        { gradeItemName: "平时成绩" },
        { gradeItemName: "实验成绩" },
        { gradeItemName: "考试成绩" },
      ],
      inputForm: {
        list: [
          {
            studentNum: "111",
            studentName: "张三",
            courseNum: "软件项目管理",

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
          {
            studentNum: "112",
            studentName: "李四",
            courseNum: "软件项目管理",

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
        ],
      },
    };
  },

  methods: {
    onSubmit(formName) {
      this.submitForm(formName);
      this.$data.showForm = true;
      console.log(this.$data.gradeItems);
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    cancelEdit(row) {
      row.title = row.originalTitle;
      row.edit = false;
      this.$message({
        message: "已经撤销成绩录入",
        type: "warning",
      });
    },
    confirmEdit(row) {
      row.edit = false;
      row.originalTitle = row.title;
      this.$message({
        message: "成绩录入成功",
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
