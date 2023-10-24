<template>
  <div>
    <el-menu-item
      v-for="item in listdata"
      :key="item.index"
      :index="item.index"
      @click="handleClick(item.filePath)"
    >
      <i class="el-icon-document"></i>
      <span slot="title" :title="item.title">{{ item.title }}</span>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: "node-menu",
  components: {},
  props: {
    path: {
      type: String,
      default: "/",
    },
  },
  data() {
    return {
      listdata: [],
    };
  },
  methods: {
    handleClick(filePath) {
      // console.log("click item::", filePath);
      this.$store.commit("setFilePath", filePath);
    },
  },
  mounted() {
    // console.log("path::**************************************", this.path);
    require
      .context(`docs`, true, /.md/)
      .keys()
      .forEach((filePath) => {
        // console.log("filePath", i, filePath);
        let temp = filePath.split("/").splice(1);
        let title = temp.pop();
        temp = `/${temp.join("/")}`;
        if (temp == this.path) {
          let fileIndex = this.$store.state.fileIndex;
          this.listdata.push({
            index: `file-${fileIndex}`,
            title: title.replace(".md", ""),
            filePath: filePath.replace("./", ""),
          });
          this.$store.commit("setFileIndex", fileIndex + 1);
        }
      });
    // console.log("this.listdata::", this.listdata);
  },
};
</script>

<style scoped lang="less"></style>
