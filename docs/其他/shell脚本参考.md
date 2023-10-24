### shell 脚本参考

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
BASE_PATH=${WORKSPACE}/AppGalleryQuickAppDirectTemplate
QUICKCARD_TOOLKIT=${BASE_PATH}/script/fa-toolkit-11.4.1-Beta.213.tgz
TOOLKIT_VERSION=fa-toolkit-11.4.1-Beta.213.tgz
CARD_JSON=${BASE_PATH}/script/package.json
PACKJSON_JSON_NAME=package.json

#先cd到脚本所在路径，再实现其他处理逻辑，否则该脚本执行会依赖脚本执行的路径
basepath=$(cd `dirname $0`; pwd)
cd $basepath
echo 'start'
cd ..

PACKLIST=($(ls -d com.huawei.*))

mkdir ${BASE_PATH}/script/package

ulimit -n 655360
export SASS_BINARY_SITE=http://mirrors-devcloud.rnd.huawei.com/repository/toolkit/node-sass/

#以下脚本开始实现业务具体的编译逻辑
for ((i=0;i<${#PACKLIST[*]};i++))
do
	package=${PACKLIST[${i}]}
	cp ${QUICKCARD_TOOLKIT} ${BASE_PATH}/${package}
    cp ${CARD_JSON} ${BASE_PATH}/${package}
	cd ${BASE_PATH}/${package}
	npm install
	npm run fa-release
	rm -rf ${BASE_PATH}/${package}/${TOOLKIT_VERSION}
	rm -rf ${BASE_PATH}/${package}/${PACKJSON_JSON_NAME}
	rm -rf ${BASE_PATH}/${package}/node_modules
	cd ..
	zip -q -r ${package}.zip ${package}
	cp ${package}.zip ${BASE_PATH}/script/package
done

cd ${BASE_PATH}/script/package
timestamp=$(date "+%Y%m%d%H%M%S")
zip -q -r AppGalleryQuickAppDirectTemplate.$timestamp.zip *

function modify_clouddrag_package_metadata
{
  cd ${WORKSPACE}/AppGalleryQuickAppDirectTemplate/script/package

  softwareName=`ls AppGalleryQuickAppDirectTemplate*.zip`
  FILEPATH=${WORKSPACE}/AppGalleryQuickAppDirectTemplate/script/package/${softwareName}

  echo FILEPATH=${FILEPATH} > ${WORKSPACE}/env.list

  versionNum=`date +%Y%m%d%H%M%S`

  echo SERVICE_VERSION=${versionNum} >>  ${WORKSPACE}/env.list
  echo "{
    \"service\":\"AppGalleryQuickAppDirectTemplate\",
    \"serviceID\":\"${SERVICE_ID}\",
    \"version\":\"${versionNum}\"
  } " > ${WORKSPACE}/clouddrag.json

  echo "{
    \"type\":\"software\",
    \"scope\":\"hispace\",
      \"name\":\"AppGalleryQuickAppDirectTemplate\",
    \"version\":\"${versionNum}\"
  } " > ${WORKSPACE}/package.json

  cd ${WORKSPACE}
  zip  $FILEPATH clouddrag.json
  zip  $FILEPATH package.json
}

function modify_package_info
{
  bash ${WORKSPACE}/Script/clouddragon/build2.0/service/getPackageInfo.sh "AppGalleryQuickAppDirectTemplate/script/package" "AppGalleryQuickAppDirectTemplate.*.zip" "package" "" "false"
}

function do_method {
  #clouddrag.json和package.json
  modify_clouddrag_package_metadata
  #build2.0
  modify_package_info
}

do_method
```
