@[toc](目录)

==标记==

> 段落引用

- 我的测试

- [x] 已完成任务
- [ ] 未完成任务

:laughing: :blush: :smiley: :)

---

## 项目简介

- 本项目是一个文档管理系统，主要是记录识别 md 文档，以此记录一些重要信息。

## 前端技术栈

1. 前端框架： vue + element-ui 组件库
2. 前端工程化：脚手架 vue-cli5 vue-router vuex

## 文件目录说明

```text
├── README.md
├── babel.config.js
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets
│   ├── components
│   ├── main.js
│   ├── docs      --所有本地文档
│   ├── router      --路由文件
│   ├── service     --api服务
│   ├── store       -- vuex全局状态管理
│   └── views
└── vue.config.js   -- webpack配置相关
```

## 第三方组件依赖

1. element组件，主要有：

| 组件名                              | 是否应用 |
| ----------------------------------- | -------- |
| container aside scrollbar menu 布局 | 是       |

2. 解析md文档组件

| 组件名       | 是否应用 |
| ------------ | -------- |
| text-loader  | 是       |
| mavon-editor | 是       |

## Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
