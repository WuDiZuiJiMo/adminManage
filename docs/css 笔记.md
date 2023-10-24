### 解决编辑器 html 换行引起的空格

父级设置 font-size:0; 子级设置 font-size 属性，即可解决

### e-dialog 的 dialog 显示在了遮罩层下面，怎么解决？

组件默认是将遮罩层嵌套在了 body 上，而 dialog 是嵌套在父组件上的。这里只需根据情况将 model-append-to-body 设置为 false，或将 append-to-body 设置为 true

### less 定义公共变量的方法

定义：@lovecolor:#fff；调用：a{color:@lovecolor;}
