### dependencies：
  1.需要发布到生产环境
  2.项目运行所需的依赖
### devDependencies：
  1.不用于生产环境
  2.是开发者开发时整个项目所需要的依赖
  
### dependencies指令：
npm install --save xxx
npm install xxx --save
### devDependencies指令：
npm install xxx --save-dev

### 项目中package.json的^和~代表什么意思
1.^符号代表，下载依赖时，它将当前库的版本更新到第一个数字中的最新版本，比如：“^12.2.2”，库会匹配更新到12.X.X的最新版本，但是不会更新到13.X.X版本
2.~符号代表，它会自动更新到中间那个数字的最新版本，比如：“~2.2.0”，库就会更新到2.2.X的最新版本，但是不会更新到2.3.X版本
