vue组件中name的三大作用

1. 递归组件
> 一个组件要用自己的时候，可以通过自己的名字来使用自己。

2. 移除keep-alive状态下组件自动缓存功能 -> exclud=“name”。
我们在App.vue中使用了keep-alive导致我们第二次进入的时候页面不会重新请求ajax，即mounted() 钩子函数只会执行一次。
有两个解决方案,一个增加activated()函数,每次进入新页面的时候再获取一次数据。
还有个方案就是在keep-alive中增加 exclud=“name”，移除选中页面的缓存，如下所示：
```vue
<div id="app">
  <keep-alive exclude="Detail">
    <router-view />
  </keep-alive>
</div>
```

3. 浏览器使用vue-tools调试时
> vue-devtools调试工具里显示的组件名称是由vue中组件name决定的
