基础数据类型：String、Number、Boolean、undefined、null
引用数据类型：Object、Array、Date、RegExp、Function

### 判断数据类型的方法
```javascript
1. toString.call(val)
  toString.call('') // '[object String]'
  toString.call(111) // '[object Number]'
  toString.call(true) // '[object Bollean]'
  toString.call(undefined) // '[object Undefined]'
  toString.call(null) // '[object Null]'
  toString.call({}) // '[object Object]'
  toString.call([]) // '[object Array]'
  toString.call(new Date()) // '[object Date]'
  toString.call(new RegExp()) // '[object RegExp]'
  toString.call(new Function()) // '[object Function]'
2. val instanceof Type
3. val.constructor
```

### typeof
```javascript
  typeof '' // string
  typeof 123 // number
  typeof true // boolean
  typeof undefined // undefined
  typeof null // object
  typeof {} // object
  typeof [] // object
  typeof new Date() // object
  typeof new Array() // object
  typeof new RegExp() // object
  typeof new Function() // function
  typeof Object // function
```

### 判断数组
```javascript
let val = []
1. val instanceof Array  // true
2. Array.isArray() // true  (es5和jquery都有的方法)
3. toString.call(val) // '[object Array]'
4. val.constrcutor // Array     val.constrcutor==Array // true
```

### 判断对象中是否含有某属性
```javascript
let obj = {name:'姓名'}
hasOwnProperty.call(obj,'name') // true
hasOwnProperty.call(obj,'sex') // false
```
