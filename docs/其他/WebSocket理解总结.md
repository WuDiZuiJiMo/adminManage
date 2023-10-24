## 一、什么是 websocket

WebSocket 是 HTML5 下一种新的协议（websocket 协议本质上是一个基于 tcp 的协议）
它实现了浏览器与服务器全双工通信，能更好的节省服务器资源和带宽并达到实时通讯的目的
Websocket 是一个持久化的协议

## 二、websocket 的原理

websocket 约定了一个通信的规范，通过一个握手的机制，客户端和服务器之间能建立一个类似 tcp 的连接，从而方便它们之间的通信
在 websocket 出现之前，web 交互一般是基于 http 协议的短连接或者长连接
websocket 是一种全新的协议，不属于 http 无状态协议，协议名为"ws"

## 三、websocket 与 http 的关系，有一定交集的平级关系

相同点：
都是基于 tcp 的，都是可靠性传输协议
都是应用层协议
不同点：
1.WebSocket 是双向通信协议，模拟 Socket 协议，可以双向发送或接受信息
HTTP 是单向的
2.WebSocket 是需要浏览器和服务器握手进行建立连接的
而 http 是浏览器发起向服务器的连接，服务器预先并不知道这个连接
联系：
WebSocket 在建立握手时，数据是通过 HTTP 传输的。但是建立之后，在真正传输时候是不需要 HTTP 协议的
总结（总体过程）：
首先，客户端发起 http 请求，经过 3 次握手后，建立起 TCP 连接；http 请求里存放 WebSocket 支持的版本号等信息，如：Upgrade、Connection、WebSocket-Version 等；
然后，服务器收到客户端的握手请求后，同样采用 HTTP 协议回馈数据；
最后，客户端收到连接成功的消息后，开始借助于 TCP 传输信道进行全双工通信。

## 四、websocket 具有以下特点

1.是真正的全双工方式，建立连接后客户端与服务器端是完全平等的，可以互相主动请求。而 HTTP 长连接基于 HTTP，是传统的客户端对服务器发起请求的模式。
2.HTTP 长连接中，每次数据交换除了真正的数据部分外，服务器和客户端还要大量交换 HTTP header，信息交换效率很低。Websocket 协议通过第一个 request 建立了 TCP 连接之后，之后交换的数据都不需要发送 HTTP header 就能交换数据，这显然和原有的 HTTP 协议有区别所以它需要对服务器和客户端都进行升级才能实现（主流浏览器都已支持 HTML5）

## 参考文档

[https://blog.csdn.net/JustinIsCool/article/details/128246638](https://blog.csdn.net/JustinIsCool/article/details/128246638)
