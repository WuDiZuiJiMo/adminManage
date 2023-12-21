各位好，
新增需求在CDN侧配置实施完成，请充分验证后再切换DNS解析完成全接入。（注：两个厂商都要测试验证，测试完成后，业务侧自行在DNSpod平台上进行业务引流，即配置CNAME记录，将加速域名指向对应的CNAME。建议采用AA模式（双活）切换即按照省份或者权重分别指向两个CDN厂商对应的cname）。

请按照以下步骤进行CDN加速测试及验证：
目前国内两个厂商都已配置完成：
一、国内新增域名配置：
主题：
百度CDN厂商：
域名１：h5-theme-drcn.platform.hihonorcloud.com 对应百度的CNAME：h5-theme-drcn.platform.hihonorcloud.com.a.bdydns.com
字节CDN厂商：
域名１：h5-theme-drcn.platform.hihonorcloud.com 对应字节的CNAME：h5-theme-drcn.platform.hihonorcloud.com.volcgslb.com

运动健康：
百度CDN厂商：
域名１：h5-health-drcn.platform.hihonorcloud.com 对应百度的CNAME：h5-health-drcn.platform.hihonorcloud.com.a.bdydns.com
字节CDN厂商：
域名１：h5-health-drcn.platform.hihonorcloud.com 对应字节的CNAME：h5-health-drcn.platform.hihonorcloud.com.volcgslb.com

二，海外新增域名配置：
主题：
域名１：h5-theme-dre.platform.hihonorcloud.com对应CNAME：d1wbwfs1g9k5qz.cloudfront.net
域名２：h5-theme-dra.platform.hihonorcloud.com对应CNAME：d3i8x6uwbwvre3.cloudfront.net

远动健康：
域名１：h5-health-dre.platform.hihonorcloud.com对应CNAME：d3mkgmds6n2a0j.cloudfront.net
域名２：h5-health-dra.platform.hihonorcloud.com对应CNAME：d33ifeif50l9a2.cloudfront.net

营销中心：
域名１：h5-magicmarketing-dra.platform.hihonorcloud.com对应CNAME：dz0wcn1qtudcm.cloudfront.net
域名２：h5-magicmarketing-dre.platform.hihonorcloud.com对应CNAME：d2jkzuyu24raj5.cloudfront.net

注意：请在外网环境下测试（即：连接guest，断开spes连接）
测试及验证方法，举例：

域名：h5-theme-drcn.platform.hihonorcloud.com

CNAME：h5-theme-drcn.platform.hihonorcloud.com.a.bdydns.com

获取CDN边缘节点IP：
1）Windows系统：打开终端命令窗口，在命令行中ping CNAME地址，得到ping的IP地址；
2）Mac系统：打开终端命令窗口，在命令行中dig CNAME地址，得到dig的IP地址 。

在本地电脑绑定hosts文件：
将步骤3中得到的IP地址和加速域名绑定到电脑本地hosts文件中，绑定顺序为IP地址在前，加速域名在后，顺序不能颠倒。
1）Windows: c:\windows\system32\drivers\etc\hosts;
2）Linux/Mac: /etc/hosts。
例如：
x.x.x.x h5-theme-drcn.platform.hihonorcloud.com

用Chrome浏览器或API进行测试，并注意提前清空缓存，测试并对比修改hosts前后访问或者下载速度等
