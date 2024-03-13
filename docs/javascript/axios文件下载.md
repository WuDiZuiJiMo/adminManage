vue 项目的时候遇到个功能是导出文件，其本质是将后端返回的文件二进制流在前端进行处理转换后实现文件下载功能。

看代码之前先要说明一下,响应类型必须为 ‘arraybuffer’ 或者 ‘blob’。Blob 对象表示一个不可变、原始数据的类文件对象。Blob 表示的不一定是 JavaScript 原生格式的数据。

接下来看代码

```javascript
axios({
  method: 'post',
  url: '/export',
  responseType: 'arraybuffer',
}).then(res => {
  // 这里 data 是返回来的二进制数据
  var blob = new Blob([res.data], {
    type: 'application/x-msdownload;charset=UTF-8',
  });
  // 创建一个blob的对象链接
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  // 把获得的blob的对象链接赋值给新创建的这个 a 链接
  link.setAttribute('download', '数据管理列表.xls'); // 设置下载文件名
  document.body.appendChild(link);
  // 使用js点击这个链接
  link.click();
  document.body.removeChild(link); // 下载完成移除元素
  window.URL.revokeObjectURL(url); // 释放blob对象
});
```
