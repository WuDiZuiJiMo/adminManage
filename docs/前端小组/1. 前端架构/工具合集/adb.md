              adb
文档来源：http://doc-test-drcn.cloud.hihonor.com/doc/111/

使用 adb 安装 apk 安装到真机
安装 adb 。官网下载 adb:https://developer.android.google.cn/studio/command-line/adb

下载完毕后，电脑-右键：属性-关于-高级系统设置-环境变量-系统变量-添加-（解压后的文件夹所在位置）

运行 终端。输入 adb 后若提示 一大堆内容，或者“拒绝访问”，那说明配置没问题

申请 ICMP 权限http://yun.hihonor.com/eflow/application/icmp_permission/icpm-my-authority?
parentId=ff808081785d01990178a503d7540d50&code=my_authority&openMode=VUE_MODE&pcUrl=%2Fapplication%2Ficmp_permission%2Ficpm-my-authority&queryCode= 。
ICMP 中，策略-端口管控策略必须是：默认策略，否则是不行的，如果不行该策略，需要找人更新 ICMP 包。端口使用权限是：USB_DEBUG 。找导师或者主管审批。

提交，申请完毕后再验证 adb。看还有没有“拒绝访问” 。没有则完成ICMP的申请。

使用数据线将手机和电脑连接上，并且打开开发者调试模式，USB 连接方式改为"传输文件"。

终端输入 adb devices，获取安装设备码
~ adb devices
List of devices attached

设备码 e.g.
G2W02186660113443 device

安装

路径直接从下载的文件中，将文件直接拖向终端，可获取路径

adb -s [设备码] install [路径]

adb 安装失败提示" Failure [INSTALL_FAILED_TEST_ONLY]"。
原因：这是测试包，并非公共包。
解决方法：
方法二：【推荐】加 -t 属性 ：adb install -t app-debug.apk
方法一：在项目中的全局配置 gradle.properties 文件中设置：android.injected.testOnly=false
方法三；adb install -r -d -t xx.apk

清除app缓存
adb shell pm clear com.hihonor.health