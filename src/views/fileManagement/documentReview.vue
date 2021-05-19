<template >
  <el-table :data="tableData" style="width: 100%">
     <el-table-column prop="number" label="序号" width="180">
    </el-table-column>
     <el-table-column prop="stuName" label="姓名" width="180">
    </el-table-column>
     <el-table-column prop="stuNumber" label="学号" width="180">
    </el-table-column>
     <el-table-column prop="stuClass" label="班级" width="180">
    </el-table-column>
    <el-table-column prop="suoshu" label="文件类型"> </el-table-column>
    <el-table-column prop="status" label="文件状态"> </el-table-column>
    <el-table-column prop="time" label="提交日期"> </el-table-column>

    <el-table-column align="center" prop="operation " label="操作" width="120">
        <el-button type="text" @click="downloadFile">文件下载</el-button>
    </el-table-column>


    <el-table-column prop="piyue" label="文件批阅" width="120">
      <template>
        <el-button type="text" @click="open">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

  <script>
export default {
  name: "viewFileList",
  data() {
    return {
      tableData: [
        {
          number:1,
          stuName:"小孟",
          stuNumber:"20721600",
          stuClass: "2班",
          suoshu: "1",
          status: "已提交",
          time:"2021-0517",
         
        },
        
      ],
    };
  },
    methods: {
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
        handleExceed(files, fileList) {
          this.$message.warning(
            `当前限制选择 3 个文件，本次选择了 ${
              files.length
            } 个文件，共选择了 ${files.length + fileList.length} 个文件`
          );
        },
        beforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${file.name}？`);
        },
        deleteRow(index, rows) {
          rows.splice(index, 1);
        },
        open() {
        this.$prompt('请输入分数', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '分数是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          }); 
        });
        },
        downloadFile: function() {
        this.$notify({
          message: '正在下载~',
          type: 'success'
        })
        const a = document.createElement('a')
        a.href = 'http://localhost:8080/file/download?fileName=' + this.form.file
        console.log('a.href=', a.href)
        a.click()
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