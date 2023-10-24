参考文档：[https://blog.csdn.net/peilinll/article/details/124285281](https://blog.csdn.net/peilinll/article/details/124285281)

### 1.变量声明
let和const变量声明具有块级作用域，且变量不会提升
var声明的变量作用域在其所在的函数内，且存在变量提升的现象

### 2.解构赋值
eg.let [a,b] = [1,2]
  let [a,b,c,d,e] = 'hello'
  
### 3.Symbol
ES6 引入了一种新的原始数据类型 Symbol ，表示独一无二的值，最大的用法是用来定义对象的唯一属性名。
let sy = Symbol("KK");
console.log(sy);   // Symbol(KK)
typeof(sy);        // "symbol"
// 相同参数 Symbol() 返回的值不相等
let sy1 = Symbol("kk"); 
sy === sy1;       // false
用法：由于每一个 Symbol 的值都是不相等的，所以 Symbol 作为对象的属性名，可以保证属性不重名

### 4.Map 与 Set
1）Map对象
  Map 对象保存键值对。任何值(对象或者原始值) 都可以作为一个键或一个值。
  Maps 和 Objects 的区别：
    一个 Object 的键只能是字符串或者 Symbols，但一个 Map 的键可以是任意值。
    Map 中的键值是有序的（FIFO 原则），而添加到对象中的键则不是。
    Map 的键值对个数可以从 size 属性获取，而 Object 的键值对个数只能手动计算。
    Object 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。
  Map的key可以是：字符串、对象、函数、NaN
  Map的迭代：for...of和forEach()
2）Set对象
  Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用。
  Set 对象存储的值总是唯一的，所以需要判断两个值是否恒等。有几个特殊值需要特殊对待：
  Set 对象作用：
    a.数组去重
      var mySet = new Set([1, 2, 3, 4, 4])
      [...mySet]; // [1, 2, 3, 4]
    b.合并数组
      var a = new Set([1, 2, 3]);
      var b = new Set([4, 3, 2]);
      var union = new Set([...a, ...b]); // {1, 2, 3, 4}

### 5.Proxy 与 Reflect
概述：
  Proxy 与 Reflect 是 ES6 为了操作对象引入的 API 。
  Proxy 可以对目标对象的读取、函数调用等操作进行拦截，然后进行操作处理。它不直接操作对象，而是像代理模式，通过对象的代理对象进行操作，在进行这些操作时，可以添加一些需要的额外操作。
  Reflect 可以用于获取目标对象的行为，它与 Object 类似，但是更易读，为操作对象提供了一种更优雅的方式。它的方法与 Proxy 是对应的。
Proxy对象：
  let target = {
      name: 'Tom',
      age: 24
  }
  let handler = {
      get: function(target, key) {
          console.log('getting '+key);
          return target[key]; // 不是target.key
      },
      set: function(target, key, value) {
          console.log('setting '+key);
          target[key] = value;
      }
  }
  let proxy = new Proxy(target, handler)
  proxy.name     // 实际执行 handler.get
  proxy.age = 25 // 实际执行 handler.set
Reflect对象：
  查找并返回 target 对象的 name 属性。
  let exam = {
      name: "Tom",
      age: 24,
      get info(){
          return this.name + this.age;
      }
  }
  Reflect.get(exam, 'name'); // "Tom"

  // 当 target 对象中存在 name 属性的 getter 方法， getter 方法的 this 会绑定 // receiver
  let receiver = {
      name: "Jerry",
      age: 20
  }
  Reflect.get(exam, 'info', receiver); // Jerry20

  // 当 name 为不存在于 target 对象的属性时，返回 undefined
  Reflect.get(exam, 'birth'); // undefined

  // 当 target 不是对象时，会报错
  Reflect.get(1, 'name'); // TypeError
Reflect 对象的方法与 Proxy 对象的方法是一一对应的。所以 Proxy 对象的方法可以通过调用 Reflect 对象的方法获取默认行为，然后进行额外操作。
  let exam = {
      name: "Tom",
      age: 24
  }
  let handler = {
      get: function(target, key){
          console.log("getting "+key);
          return Reflect.get(target,key);
      },
      set: function(target, key, value){
          console.log("setting "+key+" to "+value)
          Reflect.set(target, key, value);
      }
  }
  let proxy = new Proxy(exam, handler)
  proxy.name = "Jerry"
  proxy.name
  // setting name to Jerry
  // getting name
  // "Jerry"

### 6.字符串拓展方法
includes()：返回布尔值，判断是否找到参数字符串。
startsWith()：返回布尔值，判断参数字符串是否在原字符串的头部。
endsWith()：返回布尔值，判断参数字符串是否在原字符串的尾部。
  以上三个方法都可以接受两个参数，需要搜索的字符串，和可选的搜索起始位置索引。
  let string = "apple,banana,orange";
  string.includes("banana");     // true
  string.startsWith("apple");    // true
  string.endsWith("apple");      // false
  string.startsWith("banana",6)  // true
  注意：
  这三个方法只返回布尔值，如果需要知道子串的位置，还是得用 indexOf 和 lastIndexOf 。
  这三个方法如果传入了正则表达式而不是字符串，会抛出错误。而 indexOf 和 lastIndexOf 这两个方法，它们会将正则表达式转换为字符串并搜索它。
  
repeat()：返回新的字符串，表示将字符串重复指定次数返回。
  console.log("Hello,".repeat(2));  // "Hello,Hello,"
  
padStart：返回新的字符串，表示用参数字符串从头部（左侧）补全原字符串。
padEnd：返回新的字符串，表示用参数字符串从尾部（右侧）补全原字符串。
  以上两个方法接受两个参数，第一个参数是指定生成的字符串的最小长度，第二个参数是用来补全的字符串。如果没有指定第二个参数，默认用空格填充。
  console.log("h".padStart(5,"o"));  // "ooooh"
  console.log("h".padEnd(5,"o"));    // "hoooo"
  console.log("h".padStart(5));      // "    h"

模板字符串
  模板字符串相当于加强版的字符串，用反引号 `,除了作为普通字符串，还可以用来定义多行字符串，还可以在字符串中加入变量和表达式。
  let string = `Hello'\n'world`;
  console.log(string); 
  // "Hello'
  // 'world"

### 7.数字拓展方法
指数运算符
  1 ** 2; // 1
  // 右结合，从右至左计算
  2 ** 2 ** 3; // 256
  // **=
  let exam = 2;
  exam ** = 2; // 4

### 8.对象的拓展
属性的简洁写法
  const age = 12;
  const name = "Amy";
  const person = {age, name};
  person   //{age: 12, name: "Amy"}
  //等同于
  const person = {age: age, name: name}
属性名表达式
  ES6允许用表达式作为属性名，但是一定要将表达式放在方括号内。
    const obj = {
     ["he"+"llo"](){
       return "Hi";
      }
    }
    obj.hello();  //"Hi"
  注意点：属性的简洁表示法和属性名表达式不能同时使用，否则会报错。
    const hello = "Hello";
    const obj = {
     [hello]
    };
    obj  //SyntaxError: Unexpected token }
拓展运算符
  let age = {age: 15};
  let name = {name: "Amy"};
  let person = {...age, ...name};
  person;  //{age: 15, name: "Amy"}
合并对象
  Object.assign(target, source_1, ···)
  如果该函数只有一个参数，当参数为对象时，直接返回该对象；当参数不是对象时，会先将参数转为对象然后返回。
    Object.assign(3);         // {3}
    typeof Object.assign(3);  // "object"
Object.is(value1, value2)
  用来比较两个值是否严格相等，与（===）基本类似。
   Object.is("q","q");      // true
  Object.is(1,1);          // true
  Object.is([1],[1]);      // false
  Object.is({q:1},{q:1});  // false

### 9.数组的拓展
Array.of()将参数中所有值作为元素形成数组。
  console.log(Array.of(1, 2, 3, 4)); // [1, 2, 3, 4]
Array.from()将类数组对象或可迭代对象转化为数组。
  // 参数含空位
  console.log(Array.from([1, , 3])); // [1, undefined, 3]
find()查找数组中符合条件的元素,若有多个符合条件的元素，则返回第一个元素。
findIndex()查找数组中符合条件的元素索引，若有多个符合条件的元素，则返回第一个元素索引。
fill() 将一定范围索引的数组元素内容填充为单个指定的值。
copyWithin() 将一定范围索引的数组元素修改为此数组另一指定范围索引的元素。
entries()遍历键值对。
keys()遍历键名。
values()遍历键值。
includes()数组是否包含指定值。
flat()嵌套数组转一维数组
flatMap()先对数组中每个元素进行了的处理，再对数组执行 flat() 方法。


