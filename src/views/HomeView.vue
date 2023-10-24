<template>
  <div class="home">
    <el-container style="height: 100vh">
      <el-aside width="400px" style="background-color: rgb(238, 241, 246)">
        <el-scrollbar style="height: 100vh">
          <div class="aside-scroll-content">
            <el-input class="mb10" placeholder="输入关键字进行过滤" v-model="filterText" prefix-icon="el-icon-search" clearable @input="filterTextChanged"></el-input>
            <el-tree
              ref="tree"
              :data="menuListData"
              node-key="index"
              :accordion="true"
              :highlight-current="true"
              :props="defaultProps"
              :filter-node-method="filterNode"
              @node-click="handleNodeClick"
            >
              <span slot-scope="{ node, data }">
                <i v-if="data.filePath" class="el-icon-document mr5"></i>
                <span>{{ data.label }}</span>
              </span>
            </el-tree>
          </div>
        </el-scrollbar>
      </el-aside>

      <el-container>
        <!-- head -->
        <el-header style="text-align: right; font-size: 12px">
          <div></div>
          <span class="title">{{ filePath | toFileName }}</span>

          <span>
            <i class="el-icon-user-solid mr5"></i>
            <span>Admin</span>
          </span>
        </el-header>
        <!-- main -->
        <el-main>
          <MdPage :filePath="filePath" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MdPage from '@/components/MdPage.vue';

export default {
  name: 'HomeView',
  components: {
    MdPage,
  },
  data() {
    return {
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      menuListData: [
        // 节点数据，示例
        {
          index: '1',
          title: 'git',
          path: '/git',
          children: [
            {
              index: '1-1',
              title: 'aa',
              path: '/git/aa',
            },
          ],
        },
        {
          index: '2',
          title: 'html',
          path: '/html',
          children: [],
        },
      ],
    };
  },
  computed: {
    filePath() {
      return this.$store.state.filePath || 'README.md';
    },
  },
  filters: {
    toFileName(path) {
      let res = path.split('/');
      res = res.pop();
      res = res.replace('.md', '');
      return res;
    },
  },
  methods: {
    handleNodeClick(data) {
      if (!data.filePath) return;
      this.$store.commit('setFilePath', data.filePath);
    },
    getChildrenFiles(path) {
      let listdata = [];
      require
        .context(`docs`, true, /.md/)
        .keys()
        .forEach(filePath => {
          let temp = filePath.split('/').splice(1);
          let title = temp.pop();
          temp = `/${temp.join('/')}`;
          if (temp == path) {
            let fileIndex = this.$store.state.fileIndex;
            listdata.push({
              index: `file-${fileIndex}`,
              label: title.replace('.md', ''),
              filePath: filePath.replace('./', ''),
            });
            this.$store.commit('setFileIndex', fileIndex + 1);
          }
        });
      return listdata;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    filterTextChanged(val) {
      this.$refs.tree.filter(val);
    },
  },
  mounted() {
    const _this = this;
    let folderlist = [];
    let folders = [];
    require
      .context('docs/', true, /\.md/)
      .keys()
      .forEach(filePath => {
        let temp = filePath.split('/').splice(1);
        temp.pop();
        folders = folders.concat(temp);
        temp != '' && folderlist.push(temp.join());
      });
    folderlist = Array.from(new Set(folderlist));
    folderlist = folderlist.map(item => item.split(','));
    folders = Array.from(new Set(folders));
    // console.log("folderlist::", folderlist);
    // console.log("folders::", folders);
    // 处理treedata
    let nodeIndex = 1;
    function loop(path, level) {
      let nodelist = []; // 该层的所有节点数据
      let nodenamelist = []; // 该层的所有节点名称
      folderlist.forEach(paths => {
        let temppath = '/' + paths.join('/');
        if (temppath.indexOf(path) === 0 && paths.length >= level) {
          nodenamelist.push(paths[level - 1]);
        }
      });
      nodenamelist = Array.from(new Set(nodenamelist));
      nodelist = nodenamelist.map(nodename => {
        let hasChildren = folderlist.find(item => {
          if (item[level - 1] == nodename && item[level]) {
            return true;
          }
          return false;
        });
        let temp = {
          index: 'folder' + nodeIndex,
          title: nodename,
          label: nodename,
          path: path + '/' + nodename,
          hasChildren: hasChildren != undefined ? true : false,
        };
        nodeIndex++;
        return temp;
      });
      if (nodelist.length == 0) return []; // 结束递归条件
      nodelist.forEach(item => {
        if (item.hasChildren) {
          // 有子目录
          item.children = loop(item.path, level + 1);
        }
        item.children = item.children ? item.children.concat(_this.getChildrenFiles(item.path)) : _this.getChildrenFiles(item.path);
      });
      return nodelist;
    }
    this.menuListData = loop('', 1);
    this.menuListData = this.menuListData.concat(this.getChildrenFiles('/'));
    console.log('menuListData::', this.menuListData);
  },
};
</script>

<style scoped lang="less">
.aside-scroll-content {
  padding: 10px;
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.mr5 {
  margin-right: 5px;
}

.mb5 {
  margin-bottom: 5px;
}

.mb10 {
  margin-bottom: 10px;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 400px;
  // min-height: 400px;
}

.el-aside {
  color: #333;
}

/deep/.el-submenu__title,
/deep/.el-menu-item {
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
}

/deep/.el-menu-item.is-active {
  background-color: #ecf5ff;
}

/deep/.markdown-body .highlight pre,
/deep/.markdown-body pre {
  background: #1f1f1f;
  color: #cccccc;
}

// tree
/deep/.el-tree-node__content {
  height: 35px;
}

/deep/.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background: rgba(74, 156, 217, 0.3);
  font-weight: bold;
}
</style>
