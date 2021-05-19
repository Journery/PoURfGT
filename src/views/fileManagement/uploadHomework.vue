<template>
  <div class="container">
    <div class="wrapper">
      <el-form ref="uploadFile" :model="uploadFile" label-width="100px">
        <el-form-item label="文件名称" prop="fileName">
          <el-input v-model="uploadFile.fileName"></el-input>
        </el-form-item>
        <el-form-item label="文件类型" prop="fileType">
          <el-radio-group v-model="uploadFile.fileType">
            <el-radio label="0">论文</el-radio>
            <el-radio label="1">作业</el-radio>
            <el-radio label="2">项目文件</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if="uploadFile.fileType == '0' || uploadFile.fileType == '1'">
          <el-form-item label="所属科目" prop="subject">
            <el-select v-model="uploadFile.subject" placeholder="请选择">
              <el-option label="软件项目管理" value="spm"></el-option>
              <el-option label="高级数据库" value="database"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div v-else>
          <el-form-item label="项目类名" prop="catag">
            <el-select v-model="uploadFile.catag" placeholder="请选择">
              <el-option label="特类" value="特类"></el-option>
              <el-option label="A类" value="A类"></el-option>
              <el-option label="B类" value="B类"></el-option>
              <el-option label="C类" value="C类"></el-option>
              <el-option label="D类" value="D类"></el-option>
              <el-option label="E类" value="E类"></el-option>
              <el-option label="F类" value="F类"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <el-form-item label="文件上传" prop="load">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">提交文件</el-button>
          <el-button @click="resetForm('uploadFile')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "uploadFile",
  data() {
    return {
      uploadFile: {
        fileName: "",
        fileType: "",
        subject: "",
        catag: "",
        fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        ],
      },

    };
  },
  methods: {
    onSubmit() {
      this.$message("submit");
      console.log(this.$data.uploadFile);

    },
    resetForm(uploadFile) {
      console.log("reset");
      this.$refs[uploadFile].resetFields();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 100px 10%;
  .wrapper {
    max-width: 50%;
    margin: 0 auto;
  }
  .el-input {
    max-width: 60% !important;
  }
}
</style>