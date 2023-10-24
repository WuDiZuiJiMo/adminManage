### compile

```shell
#!/bin/bash
# ***********************************************************************
# Copyright: (c) Huawei Technologies Co., Ltd. 2019. All rights reserved.
# script for build
# version: 1.0.0
# change log:
# ***********************************************************************
set -ex
set -o pipefail

#先cd到脚本所在路径，再实现其他处理逻辑，否则该脚本执行会依赖脚本执行的路径
basepath=$(cd `dirname $0`; pwd)
cd $basepath

cd ..


#以下脚本开始实现业务具体的编译逻辑

# vue工程依赖 需要打包vue工程的时候解开注释
cd ${WORKSPACE}/MeCloudResourceH5/meCloudVue
npm install
# 打包vue工程
# 参数1 必填 src工程名称
# 参数2 必填 npm打包run的指令名称
# 参数3 必填 包名
buildProj(){
	cd ${WORKSPACE}/MeCloudResourceH5
	mkdir -p meCloudVue/src_$1/deploy
	cp -r common/deploy/* meCloudVue/src_$1/deploy/
	cp -r common/pom.xml meCloudVue/src_$1/
	sed -i 's/zipName/'$3'/g' meCloudVue/src_$1/pom.xml
	sed -i 's/versionCode/'${version}'/g' meCloudVue/src_$1/pom.xml

	cd ${WORKSPACE}/MeCloudResourceH5/meCloudVue
	sed -i 's/.*folderName.*/    folderName: '\'''$1''\''/g' config/proj.config.js
	npm run $2

	# 出包
	cd ${WORKSPACE}/MeCloudResourceH5/meCloudVue/src_$1
	cp -r readme.txt dist/
	mvn clean package -DskipTests
	bash ${WORKSPACE}/Script/clouddragon/build2.0/service/getPackageInfo.sh "MeCloudResourceH5/meCloudVue/src_"$1"/target" "*.zip" "" "" "meCloud"
}

# wm工程依赖 需要打包wm的时候解开注释
#cd ${WORKSPACE}/MeCloudResourceH5/marketing-store-extend
#npm install
# 打包wm工程
# 参数1 必填 src工程名称，默认也是打包的包名
# 参数2 必填 npm打包run的指令名称
buildWmProj(){
	cd ${WORKSPACE}/MeCloudResourceH5
	mkdir -p marketing-store-extend/src_$1/deploy
	cp -r common/deploy/* marketing-store-extend/src_$1/deploy/
	cp -r common/pom.xml marketing-store-extend/src_$1/
	sed -i 's/zipName/marketing-store-extend-'$1'/g' marketing-store-extend/src_$1/pom.xml
	sed -i 's/versionCode/'${version}'/g' marketing-store-extend/src_$1/pom.xml

	cd ${WORKSPACE}/MeCloudResourceH5/marketing-store-extend
	sed -i 's/.*folderName.*/    folderName: '\'''$1''\''/g' config/proj.config.js
	npm run $2

	# 出包
	cd ${WORKSPACE}/MeCloudResourceH5/marketing-store-extend/src_$1
	mvn clean package -DskipTests
	bash ${WORKSPACE}/Script/clouddragon/build2.0/service/getPackageInfo.sh "MeCloudResourceH5/marketing-store-extend/src_"$1"/target" "*.zip" "" "" "meCloud"
}

# 创建新的vue工程
# 参数1 必填 即将被复制的工程名称
# 参数2 必填 新的工程名称
# 参数3 必填 main.js中指定入口vue文件的名称
mkVueProj(){
	cd ${WORKSPACE}/MeCloudResourceH5
	mkdir -p meCloudVue/src_$2
	cp -r meCloudVue/src_$1/* meCloudVue/src_$2/
	sed -i 's/.*import App.*/import App from '\''\.\/'$3''\''/g' meCloudVue/src_$2/main.js
}

# 打包webOut页面
# 参数1 必填 meCloudWebOut中的文件名称
# 参数2 必填 包名
buildWebOutProj(){
	cd ${WORKSPACE}/MeCloudResourceH5
	mkdir -p meCloudWebOut/deploy
	cp -r common/deploy/* meCloudWebOut/deploy/
	cp -r common/pom.xml meCloudWebOut/
	sed -i 's/zipName/'$2'/g' meCloudWebOut/pom.xml
	sed -i 's/versionCode/'${version}'/g' meCloudWebOut/pom.xml

	mkdir -p meCloudWebOut/dist
	cp -r meCloudWebOut/$1/* meCloudWebOut/dist/

	# 出包
	mvn clean package -DskipTests
	bash ${WORKSPACE}/Script/clouddragon/build2.0/service/getPackageInfo.sh "MeCloudResourceH5/meCloudWebOut/target" "*.zip" "" "" "meCloud"
}


################################################################################### start 激励H5
# 激励1.0
#buildProj incentTaskV1 build incentTask1.0_product
# 激励2.0（摇奖机）
#buildProj incentTaskV2 build incentTask2.0_product
# 激励3.0
#buildProj incentTaskV3 build incentTask3.0_product
# 激励出海
#buildProj incentTaskI18n build incentTaskI18n_product
################################################################################### end 激励H5


################################################################################### start 云空间H5页面
# 云空间使用报告页
#mkVueProj meCloudH5Page cloudReports cloudReports
#buildProj cloudReports build cloudReports_product
################################################################################### end 云空间H5页面


################################################################################### start webOut
# 云盘分享介绍页 中文版本
#buildWebOutProj cloudShareIntro_zh cloudShareIntroZh_product

# 云盘分享介绍页 英文版本
#buildWebOutProj cloudShareIntro_en cloudShareIntroEn_product
################################################################################### end webOut


#----出包-----
# 参考文档：http://wiki.inhuawei.com/pages/viewpage.action?pageId=192490856
# bash ${WORKSPACE}/Script/clouddragon/build2.0/service/getPackageInfo.sh "params1" "params2" "params3" "params4" "params5"
# params1(必填)：业务包或者文件所在路径，相对于${WORKSPACE},  特殊场景：如果包直接在${WORKSPACE}下，默认为空即可;  codeRootDir 是代码checkout的目录，默认为微服务名
# params2(必填)：业务包名关键字，支撑模糊匹配，例如：Showcase*.zip
# params3(选填)：业务包类型，如：package、test ; 不指定默认为package类型
# params4(选填)：自定义buildVersion版本号，最终版本号按下面逻辑获取
#  1）release构建，获取启动流水线输入的 releaseversion版本号为版本号
#  2）snapshot构建

#cd ${WORKSPACE}/MeCloudResourceH5/meCloudVue/src_incentTaskH5
#mvn clean package -DskipTests
#bash ${WORKSPACE}/Script/clouddragon/build2.0/service/getPackageInfo.sh "MeCloudResourceH5/meCloudVue/src_incentTaskH5/target" "*.zip" "" "" "meCloud"
```
