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
      <el-form
        :model="dynamicValidateForm"
        ref="dynamicValidateForm"
        label-width="120px"
        class="demo-dynamic"
      >
        <el-row>
          <el-form-item
            prop="stuNumber"
            label="学生学号"
            :rules="{
              required: true,
              message: '请输入学生学号',
              trigger: 'blur',
            }"
          >
            <el-col :span="10">
              <el-input
                v-model="dynamicValidateForm.stuNumber"
                oninput="value=value.replace(/[^\d]/g,'')"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item
            v-for="(grade, index) in dynamicValidateForm.grades"
            :label="grade.gradeItemName"
            :key="grade.key"
            :prop="'grades.' + index + '.gradeNumber'"
            :rules="{
              required: true,
              message: '成绩不能为空',
              trigger: 'blur',
            }"
          >
            <el-col :span="10">
              <el-input v-model="grade.gradeNumber"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item>
            <el-button type="primary" @click="submitForm('dynamicValidateForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('dynamicValidateForm')"
              >重置</el-button
            >
          </el-form-item>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showForm: false,
      form: {
        courseId: "",
      },
      dynamicValidateForm: {
        grades: [
          {
            gradeItemName: "平时成绩",
            gradeNumber: "",
          },
          {
            gradeItemName: "报告成绩",
            gradeNumber: "",
          },
          {
            gradeItemName: "考试成绩",
            gradeNumber: "",
          },
        ],
        stuNumber: "",
      },
    };
  },
  methods: {
    onSubmit(formName) {
      this.submitForm(formName);
      this.$data.showForm = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
           this.$message('submit!');
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>


