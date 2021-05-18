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

    <!-- <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="学号" width="80">
        <template slot-scope="{row}">
          <span>{{ row.num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="学生姓名">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="课程号">
        <template slot-scope="{row}">
          <span>{{ row.coursenum }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="平时成绩">
        <template slot-scope="{row}">
          <span>{{ row.normalgrade }}</span>
        </template>
      </el-table-column>

      <el-table-column   label="考试成绩" width="110">
        <template slot-scope="{row}">
           <span>{{ row.testgrade }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="总成绩" width="300px">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.title" class="edit-input" size="small" />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              取消
            </el-button>
          </template>
          <span v-else>{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"  label="操作" width="120">
        <template slot-scope="{row}">
          <el-button
            v-if="row.edit"
            type="success"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(row)"
          >
            完成
          </el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="row.edit=!row.edit"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>-->
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
        <el-table-column label="操作" width="200" align="center">
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

export default {
  name: "ViewGrade",
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
      //list: null,
      isShow: false,
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
    onSubmit(formName) {
      this.submitForm(formName);
      this.$data.showForm = true;
      console.log(this.$data.formName);
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
