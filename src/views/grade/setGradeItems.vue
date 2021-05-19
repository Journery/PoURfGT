	<template>
  <div class="app-container">
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="100px"
      class="demo-dynamic"
    >
      <el-row>
        <el-col :span="10">
          <el-form-item
            prop="courseId"
            label="课程号"
            :rules="{
              required: true,
              message: '请输入课程号',
              trigger: 'blur',
            }"
          >
            <el-col :span="20">
              <el-input
                v-model="dynamicValidateForm.courseId"
                oninput="value=value.replace(/[^\d]/g,'')"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item
            v-for="(grade, index) in dynamicValidateForm.grades"
            :label="'成绩项名'"
            :key="grade.key"
            :prop="'grades.' + index + '.value'"
            :rules="{
              required: true,
              message: '成绩项名不能为空',
              trigger: 'blur',
            }"
          >
            <el-col :span="20">
              <el-input v-model="grade.value"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item
            v-for="(
              gradeProportion, index
            ) in dynamicValidateForm.gradeProportions"
            :label="'成绩项占比'"
            :key="gradeProportion.key"
            :prop="'gradeProportions.' + index + '.value'"
            :rules="{
              required: true,
              message: '成绩项占比不能为空',
              trigger: 'blur',
            }"
          >
            <el-col :span="20">
              <el-input
                v-model="gradeProportion.value"
                oninput="value=value.replace(/[^0-9.]/g,'')"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item>
          <el-button type="primary" @click="submitForm('dynamicValidateForm')"
            >提交</el-button
          >
          <el-button @click="addGrade">新增成绩项</el-button>
          <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dynamicValidateForm: {
        grades: [
          {
            value: "",
          },
        ],
        gradeProportions: [
          {
            value: "",
          },
        ],
        courseId: "",
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message('submit!');
          this.$refs[formName].resetFields();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      
    },
    removeGrade(index) {
      if (index !== -1) {
        this.dynamicValidateForm.grades.splice(index, 1);
        this.dynamicValidateForm.gradeProportions.splice(index, 1);
      }
    },
    addGrade() {
      if (this.dynamicValidateForm.grades.length < 8) {
        this.dynamicValidateForm.grades.push({
          value: "",
          key: Date.now(),
        });
        this.dynamicValidateForm.gradeProportions.push({
          value: "",
          key: Date.now(),
        });
      }else{
        alert('成绩项数目已达最大值！');
      }
    },
  },
};
</script>