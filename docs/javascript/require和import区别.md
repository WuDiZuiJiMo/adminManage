1.模块加载时间
  require：运行时加载
  import：编译时加载（效率更高）（一般写在整个模块头部）
  
2.模块的本质
  require：模块就是对象，输入时必须查找对象属性
  import：模块不是对象，而是通过export命令显式指定输出的代码，再通过impoort命令输入

3.严格模式
  a.使用require的commonJS模块默认采用非严格模式
  b.使用import的ES6模块自动采用严格模式
  c.commonJS模块输出的是一个值的拷贝，ES6模块输出的是一个值的引用
