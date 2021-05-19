<template class="container" >
  <el-table :data="tableData" style="width: 100%" >
    <el-table-column prop="number" label="序号" width="180">
    </el-table-column>
    <el-table-column prop="fileName" label="文件名称" width="180">
    </el-table-column>
    <el-table-column prop="uploadTime" label="上传时间" width="180">
    </el-table-column>
    <!-- <el-table-column prop="fileType" label="文件类型"> </el-table-column> -->
    <el-table-column prop="suoshu" label="文件所属"> </el-table-column>
    <div v-if="suoshu == '0' || suoshu  == '1'">
      <el-table-column prop="status" label="评分状态"> </el-table-column>
    </div>
    <div v-else>
      <el-table-column prop="status" label="接收状态"> </el-table-column>
    </div>
 
    <!-- <template slot-scope="scope">
      <span v-if="scope.row.suoshu == '0'|| scope.row.suoshu == '1'" >
          <el-table-column prop="pingfenstatus" label="评分状态"> </el-table-column>
      </span>
      <span v-else>
          <el-table-column prop="acceptstatus" label="接收状态"> </el-table-column>
      </span>
    </template> -->
    



    <el-table-column align="center" prop="operation " label="操作" width="120">
      <template slot-scope="scope">
        <span v-if="scope.row.status == '0'">
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
            <el-button size="small" type="primary">重新上传</el-button>
          </el-upload>
        </span>
      </template>
    </el-table-column>

    <el-table-column align="center" prop="operation " label="操作" width="120">
      <template slot-scope="scope">
        <span v-if="scope.row.status == '0'">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >
            删除
          </el-button>
        </span>
      </template>
    </el-table-column>

    <!-- <el-table-column prop="piyue" label="文件批阅" width="120">
      <template>
        <el-button type="text" @click="open">编辑</el-button>
      </template>
    </el-table-column> -->
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
          fileName: "spm期末作业",
          uploadTime: "2016-05-02",
          fileType: ".doc",
          suoshu: "1",
          // status: "0",
         status:"0"
        },
        {
          number:2,
          fileName: "项目",
          uploadTime: "2016-05-02",
          fileType: ".zip",
          suoshu: "2",
          // status: "1",
          status:"1"
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