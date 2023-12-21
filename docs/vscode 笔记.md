## Git History Diff 插件
> 鼠标移动到对应的行上面就能查看对应的 git 历史提交记录

## prettier配置
```javascript
"prettier.printWidth": 120, // 超过最大值换行

"prettier.tabWidth": 2, // 缩进字节数

"prettier.useTabs": false, // 缩进不使用 tab，使用空格

"prettier.semi": true, // 句尾添加分号

"prettier.singleQuote": true, // 使用单引号代替双引号

"prettier.proseWrap": "preserve", // 默认值。因为使用了一些折行敏感型的渲染器（如 GitHub comment）而按照 markdown 文本样式进行折行

"prettier.arrowParens": "avoid", // (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号

"prettier.bracketSpacing": true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"

"prettier.disableLanguages": ["vue"], // 不格式化 vue 文件，vue 文件的格式化单独设置

"prettier.endOfLine": "auto", // 结尾是 \n \r \n\r auto

"prettier.eslintIntegration": false, // 不让 prettier 使用 eslint 的代码格式进行校验

"prettier.htmlWhitespaceSensitivity": "ignore",

"prettier.ignorePath": ".prettierignore", // 不使用 prettier 格式化的文件填写在项目的.prettierignore 文件中

"prettier.jsxBracketSameLine": false, // 在 jsx 中把'>' 单独放一行

"prettier.jsxSingleQuote": false, // 在 jsx 中使用单引号代替双引号

"prettier.parser": "babylon", // 格式化的解析器，默认是 babylon

"prettier.requireConfig": false, // Require a 'prettierconfig' to format prettier

"prettier.stylelintIntegration": false, //不让 prettier 使用 stylelint 的代码格式进行校验

"prettier.trailingComma": "es5", // 在对象或数组最后一个元素后面是否加逗号（在 ES5 中加尾逗号）

"prettier.tslintIntegration": false // 不让 prettier 使用 tslint 的代码格式进行校验

"trailingComma": "none" // 函数最后不需要逗号
```

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
