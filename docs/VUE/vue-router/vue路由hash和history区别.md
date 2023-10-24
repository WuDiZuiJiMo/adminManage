vue-route默认是hash模式

总结：hash模式和history模式的区别：
1.hash模式带#号比较丑，history模式比较优雅；
2.pushState设置的新的URL可以是与当前URL同源的任意URL；而hash只可修改#后面的部分，故只可设置与当前同文档的URL；
3.pushState设置的新URL可以与当前URL一模一样，这样也会把记录添加到栈中；而hash设置的新值必须与原来不一样才会触发记录添加到栈中；
4.pushState通过stateObject可以添加任意类型的数据到记录中；而hash只可添加短字符串；
5.pushState可额外设置title属性供后续使用；
6.hash兼容IE8以上，history兼容IE10以上；
7.history模式需要后端配合将所有访问都指向index.html，否则用户刷新页面，会导致404错误。


简单来讲：
1.hash模式通过改变url来控制页面跳转，通过onhashchange时间监听页面跳转，传参也是通过url容量有限
2.history模式优点是可以直接使用无需多余配置，但是页面跳转都需要网络请求，且易出错
3.hash兼容IE8以上，history兼容IE10以上
4.history模式需要后端配合将所有访问都指向index.html，否则用户刷新页面，会导致404错误。


参考文档：[https://blog.csdn.net/qq_26780317/article/details/117790679](https://blog.csdn.net/qq_26780317/article/details/117790679)
