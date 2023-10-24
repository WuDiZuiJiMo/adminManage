<template>
  <div class="hello">
    <mavon-editor
      v-model="articalContent"
      :editable="false"
      :value="articalContent"
      :subfield="false"
      :defaultOpen="'preview'"
      :toolbarsFlag="true"
      :scrollStyle="false"
      :ishljs="false"
      :navigation="true"
      style="max-height: calc(100vh - 110px)"
    />
  </div>
</template>

<script>
import "github-markdown-css/github-markdown.css";
import "highlight.js/styles/github.css";
export default {
  name: "md-page",
  components: {},
  props: {
    filePath: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      articalContent: "", // 文档内容
    };
  },
  watch: {
    filePath: {
      handler() {
        this.articalContent = require("docs/" + this.filePath);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped lang="less"></style>
