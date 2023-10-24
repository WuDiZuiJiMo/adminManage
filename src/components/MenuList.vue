<template>
  <el-menu
    class="el-menu-vertical-demo"
    default-active="file1"
    :unique-opened="false"
    :collapse="isCollapse"
  >
    <!-- 所有的文件夹文件 -->
    <el-submenu v-for="item in listData" :key="item.index" :index="item.index">
      <template slot="title">
        <i class="el-icon-folder"></i>
        <span slot="title">{{ item.title }}</span>
      </template>
      <template v-if="item.children && item.children.length != 0">
        <menu-list :listData="item.children" />
      </template>
      <NodeMenu :path="item.path" />
    </el-submenu>
    <!-- 根目录文件 -->
    <!-- <NodeMenu path="/" /> -->
  </el-menu>
</template>

<script>
import NodeMenu from "@/components/NodeMenu.vue";
export default {
  name: "menu-list",
  components: { NodeMenu },
  props: {
    listData: {
      type: Array,
      default: () => [],
    },
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    // console.log("listData::", this.listData);
  },
};
</script>

<style scoped lang="less"></style>
