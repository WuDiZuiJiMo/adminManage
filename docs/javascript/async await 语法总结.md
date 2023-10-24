1. async 函数总是会返回一个 promise，返回 promise 的三种情形
   a.saync 函数中显示的 return 一个 promise
   b.return 一个具体的值，会转换为一个 resolve 为该值的 promise
   c.其它则会转换为一个 resolve 为 undefined 的 promise

2. await 后面跟什么
   a.若 promise 执行结果为 resolve，则 await 为 resolve 的值；若执行结果为 reject，则 await 无返回值
   b.具体值，则 await 返回的就是该值

3. 错误处理
   当 await 的 promise 返回 reject 时会报错，报错后代码不会继续执行，以下有几种错误处理方法
   a.直接在 await 处进行错误处理，但 await 返回 undefined，async 函数再继续往下执行；
   b.在 async 函数执行处添加错误处理，则碰到第一个 await 后的 promise 返回 reject 时会进行错误处理，但 async 函数不会继续执行；
   c.将 async 的 promise 操作都放在 try catch 中。
