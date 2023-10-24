import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    filePath: "", // 当前展示页面的文件路径
    fileIndex: 1, // 文件下标
  },
  getters: {},
  mutations: {
    setFilePath(state, filePath) {
      state.filePath = filePath;
    },
    setFileIndex(state, fileIndex) {
      state.fileIndex = fileIndex;
    },
  },
  actions: {},
  modules: {},
});
