EventBus又称为事件总线。在Vue中数据流是单向的，EventBus 可以来作为沟通桥梁的概念，就像是所有组件共用相同的事件中心，可以向该中心注册发送事件或接收事件，所以组件都可以上下平行地通知其他组件，但也就是太方便所以若使用不慎，就会造成难以维护的“灾难”，因此才需要更完善的Vuex作为状态管理中心，将通知的概念上升到共享状态层次。

使用场景如：兄弟组件间的通信，父组件 father 中同时使用到 A.vue 和 B.vue 两个兄弟组件，点击子组件 B.vue 需要另一子组件 A.vue 响应；

1.首先需要创建事件总线并将其导出，以便其它模块可以使用或者监听它：
import Vue from 'vue'
export const EventBus = new Vue()
实质上 EventBus是一个不具备dom的组件，它具有的仅仅只是它实例方法而已，因此它非常的轻便。

2.使用到EventBus的兄弟组件都引入eventBus.js：
import EventBus from '../../utils/eventBus.js'

3.发送事件 - 子组件 A.vue 声明发布事件：
```javascript
<!-- A.vue -->
<template>
    <button @click="sendMsg()">-</button>
</template>
 
<script> 
import EventBus from '../../utils/eventBus.js'
export default {
  methods: {
    sendMsg() {
      EventBus.$emit("aMsg", '来自A页面的消息');
    }
  }
}; 
</script>
```

4.接收事件 - 子组件 B.vue 订阅事件：
```javascript
<!-- B.vue -->
<template>
  <p>{{msg}}</p>
</template>
 
<script> 
import EventBus from '../../utils/eventBus.js'
export default {
  data(){
    return {
      msg: ''
    }
  },
  mounted() {
    EventBus.$on("aMsg", (msg) => {
      // A发送来的消息
      this.msg = msg;
    });
  }
};
</script>
```

5.在 beforeDestroyed(){} 中移除监听事件
```javascript
beforeDestroyed(){
    EventBus.$off('getTarget');
}
```
以上这就是一个完整的EventBus通信。

EventBus适用于深层级组件之间的简单通信，因为深层级组件经常被销毁重建，每次建立和移除相关 EventBus 都会有性能的开销，所以 EventBus交互不易过多，逻辑不直观并且不便于维护。

总结：
创建一个vue实例，通过一个空的vue实例作为桥梁实现vue组件间的通信
$emit 发送事件
$on 接收事件
$off 移除监听
  十分重要，如果不手动清除，会一直存在，反复进入到接受组件内操作获取数据原本只有一次的操作将会有多次
  移除单个事件EventBus.$off('aMsg')
  移除所有事件EventBus.$off()
