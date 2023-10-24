### 浏览器渲染页面的过程
1. html 产生 dom tree
2. css 生产 cssdom
3. dom tree 和 cssdom 整合成 render tree（渲染树）
4. 遇到<script>会阻塞渲染（因为 js 有权力改变 dom）


### 为什么要把 css 放在 heade 里面？
防止多次渲染，严重影响该用户体验和性能

### html5 新标签有哪些
音频、视频、canvas 画布、svg 图片等

### localstorage、sessionstorage、cookie、session 的区别
1. cookie：作用于浏览器与服务器之间，存储量为 4k
2. session：存储于服务器
3. localstorage：存储于本地，存储量为 5M+，会永久存在，除非手动删除
4. sessionstorage：存储于本地，存储量为 5M+，关闭窗口或浏览器即被删除


### 如何实现网页显示小于12px的字体
1. 使用transform缩放，缺点 占位
2. 使用svg的text标签：<svg><text></text></svg>
