## Git History Diff 插件
> 鼠标移动到对应的行上面就能查看对应的 git 历史提交记录

## 配置快捷代码片段
注释
```javascript
文件注释
/**
 * @Author Your name
 * @Date File Creation Time
 * @Description Description
 */

方法注释
/*
 * @Author: Your name
 * @Date: Creation Time
 * @Description: Description
 */

vue组件注释
<!--
  /**
  * @Author Your name
  * @Date File Creation Time
  * @Description Description
  */
  Events
    eventName 事件说明，参数说明
  Methods
    methodName 方法说明，参数说明
 -->
```
1. ctrl+shift+p
2. 选择‘代码片段：配置用户代码片段’
3. 选择‘新代码片段’
4. 命名自己的文件名称，输入配置
```json
{
	"Explain file": {
		"prefix": "***file",
		"body": [
			"/**",
			" * @Author Your name",
			" * @Date File Creation Time",
			" * @Description Description",
			" */"
		],
		"description": "Log output to console"
	},
	"Explain function": {
		"prefix": "***function",
		"body": [
			"/*",
			" * @Author: Your name",
			" * @Date: Creation Time",
			" * @Description: Description",
			" */"
		],
		"description": "Log output to console"
	},
	"Explain vue component": {
		"prefix": "***vueComponent",
		"body": [
			"<!--",
			"	/**",
			"	* @Author Your name",
			"	* @Date File Creation Time",
			"	* @Description Description",
			"	*/",
			"	Events",
			"		eventName 事件说明，参数说明",
			"	Methods",
			"		methodName 方法说明，参数说明",
			" -->",
		],
		"description": "Log output to console"
	}
}
```
