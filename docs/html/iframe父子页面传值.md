```html
<!--主页面中的JS代码-->
<script type="text/javascript">
  //调用子页面的方法.
  var childWindow = $('#addFrame')[0].contentWindow; //表示获取了嵌入在iframe中的子页面的window对象。  []将JQuery对象转成DOM对象，用DOM对象的contentWindow获取子页面window对象。
  childWindow.subFunction(); //调用子页面中的subFunction方法。
</script>
```

```html
<!--子页面中的JS代码-->
<script type="text/javascript">
  //子页面调用父页面中的方法。
  window.parent.parentFunction(); //parentFunction是父页面中自定义的JS方法。
</script>
```
