1. this.$route：当前激活的路由的信息对象。每个对象都是局部的，可以获取当前路由的 path, name, params, query 等属性。
2. this.$router：全局的 router 实例。通过 vue 根实例中注入 router 实例，然后再注入到每个子组件，从而让整个应用都有路由功能。其中包含了很多属性和对象（比如 history 对象），任何页面也都可以调用其 push(), replace(), go() 等方法。

### 路由跳转分为编程式和声明式。
#### 声明式：
  简单来说，就是使用 router-link 组件来导航，通过传入 to 属性指定链接（router-link 默认会被渲染成一个a标签）。
  当需要在一个页面中嵌套子路由，并且页面不跳转的时候，这种方式不要太好用啊哈哈哈... 只需要将子页面渲染在 router-view 里面就可以了。
#### 编程式：
  1. 定义两个路由跳转的单 .vue 组件：home.vue 和 user.vue；
  2. 导入 vue, vue-router，并定义路由，每个路由包含一个 component 属性，这个属性映射一个组件 --- router.js
  3. 创建 router 实例，并传递 routes 配置 --- router.js
  4. 在 vue 根实例中注入路由，这样就可以在其他任何组件中访问路由了 --- main.js

### 页面跳转方法：
```javascript
this.$router.push({path: `/home/${page=2}``})
this.$router.push({name: 'home', params: { page: 2}})
this.$router.push({path: 'home', query: { page: 2}})
```
注意：如果提供了 path， params 会被忽略；params传参在页面刷新的时候会丢失

### push\replace\go 
push(), replace(), go()使用方法比较：
1.使用router.push()方法，这个方法会向history栈添加一个新纪录，成功跳转后点击浏览器的回退按钮会跳回之前的页面。
2.使用router.replace()方法，不会向history栈添加一个新纪录，成功跳转后点击浏览器的回退按钮会到上上个页面  
跳转方法和push一样，只需要把push改为replace
3.使用router.go()方法，向前或者向后跳转n个页面，n可为正整数或负整数







