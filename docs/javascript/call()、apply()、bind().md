### 示例展示：
```javascript
/*定义一个Person类*/ 
function Person(name,age) { 
     this.name=name; 
     this.age=age;
} 
 /*定义一个学生类*/ 
 function Student(name,age,grade) { 
    //Person.apply(this,arguments);//特点：this指代student对象，只接收2个参数，arguments为隐式类数组对象，用来接收传入的参数；
      Person.call(this,name,age);//特点：this指代student对象，可以接收任意多个参数
      this.grade=grade; 
 } 
 var student =new Student("zhangsan",22,"二年级");//方法Student()也是object的一个实例
 //测试 
 alert("name:"+student.name+"\n"+"age:"+student.age+"\n"+"grade:"+student.grade);
//学生类里面我没有给name和age属性赋值啊,为什么又存在这两个属性的值呢,这个就是apply的神奇之处.
结果：
name:zhangsan
age:22
grade:"二年级"
```

### 共同点：
都是用来重定义this对象的
### 不同点：
```javascript
  eg.obj.myFun,call(db,arg1,arg2)
     obj.myFun.apply(db,[arg1,arg2])
     obj.myFun.bind(db,arg1,arg2)()
```
1.bind()返回的是一个函数，需要调用后执行
2.call()和bind()第二个参数一样，都是用逗号分隔传参；apply()第二个参数，是用数组的方式传入


### call和apply使用场景区分：
使用call的情况： 如果我的Person的参数列表是这样的(age,name),而Student的参数列表是(name,age,grade),这样就可以用call来实现了,也就是直接指定参数列表对应值的位置(Person.call(this,age,name,grade));
使用apply的情况：在给对象参数的情况下,如果参数的形式是数组的时候,比如apply示例里面传递了参数arguments,这个参数是数组类型。


### call的其他重要用法
1.用A对象来替换B对象
2.用B对象来执行A对象的方法
3.用call来实现继承
