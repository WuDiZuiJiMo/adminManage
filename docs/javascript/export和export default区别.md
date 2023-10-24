相同点：均可用于导出常量、函数等

不同点：
1.export可以有多个；export default只能有一个
2.export导出，导入时要加个{}；export default则不用；

示例：
```javascript
//a.js
let sex = 'boy'
export const name1 = 'name1'
export const name2 = 'name2'
export default sex

//b.js
import {name1} from './a.js'
import {name2} from './a.js'
import sex from './a.js'
```
