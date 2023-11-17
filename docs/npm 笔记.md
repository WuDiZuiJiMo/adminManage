# npm 常用命令

1. 设置、查看npm的registry配置项
```
// 淘宝镜像
> npm config set registry https://registry.npm.taobao.org
 
// npm原始数据源
> npm config set registry https://registry.npmjs.org     
 
// 查看npm的registry配置项
> npm config get registry
```

2. 安装nrm，管理数据源
- npm的registry配置项用来设置数据源，单独设置非常不方便，推荐使用nrm管理数据源，可方便查看和切换。安装命令如下所示。
```
> cnpm i nrm -g
```
-  安装完成后，使用nrm ls命令可以查看所有可切换的数据源。如下图所示，星号标记的为当前数据源。
```
> nrm ls
```
- 如下命令所示，切换数据源。
```
> nrm use cnpm
```

3. 强制删除缓存
```
> npm cache clean --force
```

4. 安装cnpm
```
> npm install -g cnpm --registry=https://registry.npm.taobao.org //安装cnpm
 
> npm uninstall -g cnpm //卸载cnpm
```
> 由于墙的原因，npm下载可能很慢，可以使用cnpm代替。虽然cnpm下载速度快，但是有时必须使用npm，cnpm下载的会出问题。
注意，如果cnpm install长时间卡住无反应，可以尝试在C盘用户文件夹内，找到一个名为.npmrc的文件，删掉即可。

5. npm升级到最新版本
```
npm install -g npm
```

6. 安装NVM
> NVM是一个node.js版本管理工具。当node.js版本不适用时，可以通过它很方便的切换到不同版本的node.js。
```
// 查看nvm版本
nvm --version
 
// 安装指定版本node
nvm install 14.18.2 
 
// 查看安装了哪些node版本
nvm ls
 
// 切换node版本（以管理员身份运行）
nvm use 14.18.2
```
