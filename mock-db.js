// 使用方式，非常简单地启动本地后台REST API模拟数据服务:
// 1. 执行 npm install -g json-server 安装json-server
// 2. 编辑本文件保存并执行 json-server --watch mock-db.js 启动json-server服务
const Mock = require('mockjs')
module.exports = () => Mock.mock({
  "address": {
  "prov": "19",
    "city": "289",
    "region": "3039",
    "inDetail": "新塘"
  },
  'user-list|80-100': [
    {
      id: '@id',
      name: '@name',
      nickName: '@last',
      phone: /^1[34578]\d{9}$/,
      'age|11-99': 1,
      address: '@county(true)',
      isMale: '@boolean',
      email: '@email',
      createTime: '@datetime',
      avatar () {
        return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', this.nickName.substr(0, 1))
      },
    },
  ],
  'system-user': [
    {
      id: '@id',
      password: 'admin', // 生产环境不返回密码，并且密码会被加密
      username: '18666666666',
      code: '186666',
      token: '@id'
    }, {
      id: '@id',
      password: 'guest', // 生产环境不返回密码，并且密码会被加密
      username: '18888888888',
      code: '188888',
      token: '@id'
    }, {
      id: '@id',
      password: 'developer', // 生产环境不返回密码，并且密码会被加密
      username: '13333333333',
      code: '133333',
      token: '@id'
    }
  ]
})
