前端组CDN&域名&构建部署规范
待办事项
主要遗留事项：	进度
1、 各组CDN域名申请（中国区、亚非拉、欧洲区） 0719前 @汤德鑫	完成
2、 各组SE，申请生产和开发环境COS资源，确认是否可复用原有COS 0719前 主题@陈杰 运动健康@董昆、鹏飞 营销@谢发潘	完成
3、 CDN资源申请：技术评审+预算评审 0719 @陈杰 @汤德鑫 @董昆	完成
4、 CDN灰度刷新能力调研 @张明星	
5、运动健康内原有H5链接维护规则 grs @汤德鑫	完成
6、 细化新老项目迁移和接入方案流程 0801前 @汤德鑫	完成
背景
业务背景
运动健康H5，基本只服务于运动健康APP业务
主题H5，主要投放在运动健康APP中
营销中心H5，投放在运动健康APP、主题APP、负一屏、应用商店（海外）、游戏中心（海外）等。
营销H5，一部分是通过shopDC搭建，一部分是各业务方自己开发
运动健康、主题急需接入CDN，优化性能
技术背景
运动健康H5，通过jsbridge获取登录信息，与域名cookie无关
各接入营销的业务，包括shopDC构建和自己开发的H5，都部署在营销中心【服务器或cos】上，通过APP在platform.hihonorcloud.com域名下写入登录cookie，来实现登录
营销中心国内直接加速xxx.platform.hihonorcloud.com域名，海外因证书问题，反向代理方案临时兼容
invalid image(图片无法加载)

问题总结
https://space.welink.huaweicloud.com/p/57b77b034840a39464b4b3d74e739cdd 如上表统计，云服务各组H5/管理台域名规则不统一，部署脚本不统一，前端构建规则不统一，学习成本高，且易出错。
在当前情况下，各组规则不统一，直接接入CDN，不方便部署和回源
去年海外CDN厂商只有Akamai，不认platform.hihonorcloud.com证书，所以海外无法开启CDN加速。
今年海外引入新供应商AWS，可以加速platform.hihonorcloud.com，各组（包括营销），可以废弃反向代理的临时方案，采用直连CDN的方案
目标
长期目标
所有H5构建部署规则统一，未来能够自动化构建部署

当前目标
前端资源方位全部改为直连CDN方式：
invalid image(图片无法加载)

步骤：
第一步：统一云服务前端各项目组H5/管理台域名规范，
第二步：统一前端构建脚本
第三步：统一发布部署规范

方案全景
整体方案
资源部署：H5资源全部迁移到COS上。各业务开发/测试/预发布环境公用桶，生产环境单独桶
CDN加速厂商：国外CDN加速厂商全部切换到AWS
H5 CDN域名规则：
生产环境：h5-{业务线}-{地域}.platform.hihonorcloud.com 
开发、测试、预发布环境: h5-{业务线}-uat-{地域}.platform.hihonorcloud.com
特殊情况： 营销中心，需要部署各业务资源，所以要额外增加项目的区分**
各业务各环境CDN域名及资源路径规则
业务线	环境	区域	计划 CDN 加速域名	URL 资源拼接规则	桶信息
运动健康	生产	中国区	h5-health-drcn.platform.hihonorcloud.com	{domain}/项目名/版本号/index.html	https://obs-bj-planck-h5-1311269001.cos.ap-beijing.myqcloud.com
运动健康	生产	亚非拉	h5-health-dra.platform.hihonorcloud.com	{domain}/项目名/版本号/index.html	https://obs-sg-planck-h5-1311269001.cos.ap-singapore.myqcloud.com
运动健康	生产	欧洲区	h5-health-dre.platform.hihonorcloud.com	{domain}/项目名/版本号/index.html	https://obs-de-planck-h5-1311269001.cos.eu-frankfurt.myqcloud.com
运动健康	开发/测试/预发布		h5-health-uat-drcn.platform.hihonorcloud.com	{domain}/代码环境/地域/项目名/版本号/index.html	https://h5-health-uat-1311274267.cos.ap-chengdu.myqcloud.com
主题	生产	中国区	h5-theme-drcn.platform.hihonorcloud.com	{domain}/项目名/版本号/index.html	https://cos-bj-theme-h5-pub-1311269001.cos.ap-beijing.myqcloud.com
主题	生产	亚非拉	h5-theme-dra.platform.hihonorcloud.com	{domain}/项目名/版本号/index.html	https://cos-sg-theme-h5-pub-1311269001.cos.ap-singapore.myqcloud.com
主题	生产	欧洲区	h5-theme-dre.platform.hihonorcloud.com	{domain}/项目名/版本号/index.html	https://cos-de-theme-h5-pub-1311269001.cos.eu-frankfurt.myqcloud.com
主题	开发/测试/预发布		h5-theme-uat-drcn.platform.hihonorcloud.com	{domain}/代码环境/地域/项目名/版本号/index.html	https://h5-theme-uat-1311274267.cos.ap-chengdu.myqcloud.com
营销	生产	中国区	h5-magicmarketing-drcn.platform.hihonorcloud.com	{domain}/业务线/项目名/版本号/index.html	https://obs-bj-marketing-pub-1311269001.cos.ap-beijing.myqcloud.com
营销	生产	亚非拉	h5-magicmarketing-dra.platform.hihonorcloud.com	{domain}/业务线/项目名/版本号/index.html	https://marketing-prd-dra-1311269001.cos.ap-singapore.myqcloud.com
营销	生产	欧洲区	h5-magicmarketing-dre.platform.hihonorcloud.com	{domain}/业务线/项目名/版本号/index.html	https://marketing-prd-dre-1311269001.cos.eu-frankfurt.myqcloud.com
营销	开发/测试/预发布		h5-magicmarketing-uat-drcn.platform.hihonorcloud.com	{domain}/代码环境/地域/业务线/项目名/版本号/index.html	https://marketing-test-1311274267.cos.ap-chengdu.myqcloud.com
关键模块
共性问题
环境隔离和部署方式
开发测试预发布环境
invalid image(图片无法加载)

生产环境
invalid image(图片无法加载)

接口域名地址
原主题和营销业务，接口使用的是域名地址，为兼容处理，有2种方式：

构建方式改变：资源构建打包时，后端接口域名，需要使用绝对路径
  //package.json
  "scripts": {
    "dev": "npm run serve",
    "serve": "vue-cli-service serve --mode develop",
    "build": "npm run build:prd",
    "build:dev": "vue-cli-service build --mode dev",
    "build:uat": "vue-cli-service build --mode uat",
    "build:pre": "vue-cli-service build --mode pre",
    "build:prd": "vue-cli-service build --mode prd",
    "lint": "vue-cli-service lint"
  },
// 整个项目的配置
const appConst = {
  codeEnv: 'pro', // 默认生产环境
  dr: 'drcn', // 默认中国区
  API: 'https://magicmarketing-drcn.platform.hihonorcloud.com' // 默认中国区
}

export const setConst = (dr, codeEnv) => {
  appConst.dr = dr
  appConst.codeEnv = codeEnv
  if (dr === 'drcn') {
    if (codeEnv === 'pro') {
      appConst.API = 'https://magicmarketing-drcn.platform.hihonorcloud.com'
      appConst.dtAPI = 'https:/metrics-drcn.dt.hihonorcloud.com/webv1'
    } else if (codeEnv === 'test') {
      appConst.API = 'https://magicmarketing-test-drcn.platform.hihonorcloud.com'
      appConst.dtAPI = 'https://metrics-test-drcn.dt.hihonorcloud.com'
    } else if (codeEnv === 'dev') {
      appConst.API = 'https://magicmarketing-dev-drcn.platform.hihonorcloud.com'
    }
  } else if (dr === 'dra') {
    if (codeEnv === 'pro') {
      appConst.API = 'https://magicmarketing-dra.platform.hihonorcloud.com'
      appConst.dtAPI = 'https:/metrics-dra.dt.hihonorcloud.com/webv1'
    } else if (codeEnv === 'test') {
      appConst.API = 'https://magicmarketing-test-dra.platform.hihonorcloud.com'
      appConst.dtAPI = 'https://metrics-test-dra.dt.hihonorcloud.com'
    } else if (codeEnv === 'dev') {
      appConst.API = 'https://magicmarketing-dev-dra.platform.hihonorcloud.com'
    }
  }
}

setConst(import.meta.env.VITE_DR, import.meta.env.VITE_CODE_ENV)
构建方式不变，但后端接口域名，要动态获取，增加判断逻辑，如下所示
// health theme magicmarketing 3条业务线
export const curBuz = 'health'

// 各业务线开发、测试、预发布环境域名
export const uatBuzHostMap = {
  health: 'h5-health-uat-drcn.platform.hihonorcloud.com',
  theme: 'h5-theme-uat-drcn.platform.hihonorcloud.com',
  magicmarketing: 'h5-magicmarketing-uat-drcn.platform.hihonorcloud.com'
}

// 前端域名配置， 开发，测试，预发布共用域名，使用路径作为区分
export const hostConfig = {
  // 运动健康
  health: {
    dev: {
      drcn: uatBuzHostMap.health,
      dra: uatBuzHostMap.health,
      dre: uatBuzHostMap.health
    },
    uat: {
      drcn: uatBuzHostMap.health,
      dra: uatBuzHostMap.health,
      dre: uatBuzHostMap.health
    },
    pre: {
      drcn: uatBuzHostMap.health,
      dra: uatBuzHostMap.health,
      dre: uatBuzHostMap.health
    },
    pro: {
      drcn: 'h5-health-drcn.platform.hihonorcloud.com',
      dra: 'h5-health-dra.platform.hihonorcloud.com',
      dre: 'h5-health-dre.platform.hihonorcloud.com'
    }
  },
  // 主题
  theme: {
    dev: {
      drcn: uatBuzHostMap.theme,
      dra: uatBuzHostMap.theme,
      dre: uatBuzHostMap.theme
    },
    uat: {
      drcn: uatBuzHostMap.theme,
      dra: uatBuzHostMap.theme,
      dre: uatBuzHostMap.theme
    },
    pre: {
      drcn: uatBuzHostMap.theme,
      dra: uatBuzHostMap.theme,
      dre: uatBuzHostMap.theme
    },
    pro: {
      drcn: 'h5-theme-drcn.platform.hihonorcloud.com',
      dra: 'h5-theme-dra.platform.hihonorcloud.com',
      dre: 'h5-theme-dre.platform.hihonorcloud.com'
    }
  },
  magicmarketing: {}
}

// 开发测试预发布环境，不同地域 后端接口映射表
export const apiConfig = {
  health: {
    dev: {
      drcn: {
        API: 'https://health-dev-drcn.platform.hihonorcloud.com'
      },
      dra: {
        API: 'https://health-dev-dra.platform.hihonorcloud.com'
      }
    },
    uat: {
      drcn: {
        API: 'https://health-test-drcn.platform.hihonorcloud.com'
      },
      dra: {
        API: 'https://health-test-dra.platform.hihonorcloud.com'
      }
    },
    pre: {
      drcn: {
        API: 'https://healthsvc-demo-drcn.platform.hihonorcloud.com'
      },
      dra: {
        API: 'https://healthsvc-demo-dra.platform.hihonorcloud.com'
      }
    },
    pro: {
      drcn: {
        API: 'https://healthsvc-drcn.platform.hihonorcloud.com',
        testApi: 'todo.com'
      },
      dra: {
        API: 'https://health-dev-dra.platform.hihonorcloud.com',
        testApi: 'todo.com'
      },
      drru: {
        API: 'https://healthsvc-drru.platform.hihonorcloud.com',
        testApi: 'todo.com'
      },
      dre: {
        API: 'https://healthsvc-dre.platform.hihonorcloud.com',
        testApi: 'todo.com'
      }
    }
  },
  theme: {},
  magicmarketing: {}
}

/**
 * 根据域名动态匹配接口地址
 * @param {*} curBuz
 * @returns
 */
export function getCurrentApiMap(curBuz = 'health') {
  const curHostConfig = hostConfig[curBuz] // 当前业务的Host配置
  const curApiConfig = apiConfig[curBuz] // 当前业务的API配置
  const currentHost = window.location.host
  const pathSegments = window.location.pathname.split('/')
  const environment = pathSegments[1] // 第一个路径段是环境
  const region = pathSegments[2] // 第二个路径段是地域

  // 如果是本地开发环境
  if (import.meta.env.DEV) {
    return curApiConfig.dev.drcn
  }

  // 如果当前域名，是uat 则是开发、测试、或预发布
  if (currentHost === uatBuzHostMap[curBuz]) {
    return curApiConfig[environment][region]
  }

  let ApiMap = {}
  // 默认都是生产环境
  switch (currentHost) {
    case curHostConfig.pro.drcn:
    case oldProHost.drcn:
      ApiMap = curApiConfig.pro.drcn
      break
    case curHostConfig.pro.dra:
    case oldProHost.dra:
      ApiMap = curApiConfig.pro.dra
      break
    case curHostConfig.pro.dre:
    case oldProHost.dre:
      ApiMap = curApiConfig.pro.dre
      break
    default:
      ApiMap = curApiConfig.pro.drcn
  }

  return ApiMap
}

export const apiConst = getCurrentApiMap(curBuz)

export default apiConst
版本控制
通过在vite里配置版本，默认使用latest代表最新版本


import pkg from './package.json'

export default defineConfig(() => {
  return {
    base: './',
    build: {
      outDir: `dist/${pkg.name}/latest`
    },
// ....... 省略
主题
主题表盘H5的从服务器迁移到cos，并多版本兼容（所有环境）
运动健康
开发测试环境，从obs同步迁移到cos上（为后期统一部署做准备）
生产环境，重新构建项目，并部署到新cos桶内，开启CDN加速
营销
增加欧洲站点CDN
亚非拉CDN增加域名h5-magicmarketing-dra.platform.hihonorcloud.com。 原有CDN域名暂时保留
实施落地
执行路径
整体计划流程
梳理材料
生产环境
开发测试预发环境
验证完成
验证完成
各组SE准备开发和生产环境cos资源
申请域名
申请CDN资源
验证CDN功能
新域名CNAME开发测试环境桶
主题和运动健康接入
其他新业务接入
风险控制
接口跨域
要注意H5域名变更后，接口跨域的配置：
涉及业务：主题、运动健康、营销

主题
原有服务器部署方式，切换cos部署方式后，要注意URL的变化
运动健康
原有APP配置链接的切换
营销
亚非拉反向代理模式，H5域名变更后的兼容处理
总结复盘
阶段复盘
结项汇报