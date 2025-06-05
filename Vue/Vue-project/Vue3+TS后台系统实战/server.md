```js

// 登录接口
app.post('/login', (req, res) => {
  // console.log('成功进入登录接口', req.body)
  const { name, password } = req.body
  if (name === 'admin' && password === '11111') {
    res.json({
      code: 200,
      data: {
        id: 1,
        name: '张三',
        token: 'adminToken'
      },
      msg: '登录成功'
    })
  } else {
    res.json({
      code: 400,
      data: null,
      msg: '登录失败'
    })
  }
})
// 用户信息接口
app.get('/users/:id', (req, res) => {
  res.json({
    code: 200,
    data: {
      id: 1,
      name: '张三',
      cellphone: '12345678901',
      email: 'admin@163.com',
      enable: 1,
      createAt: '2025-01-01 00:00:00',
      updateAt: '2025-01-01 00:00:00',
      role: {
        id: 1,
        name: '管理员',
        code: 'admin',
        description: '管理员权限',
        createAt: '2025-01-01 00:00:00',
        updateAt: '2025-01-01 00:00:00',
        enable: 1
      },
      department: {
        id: 1,
        name: '技术部',
        code: 'tech',
        description: '技术部',
        createAt: '2025-02-01 00:00:00',
        updateAt: '2025-02-01 00:00:00',
        enable: 1
      }

    },
    msg: '登录成功'
  })
})
// 根据角色查询菜单
app.get('/role/:id/menu', (req, res) => {
  console.log('成功进入menu接口', req.url, req.query)
  res.json({
    code: 200,
    data: [
      {
        id: 38,
        name: '系统总览',
        code: 'monitor',
        type: 1,
        url: '/main/analysis',
        icon: 'el-icon-monitor',
        description: '系统总览',
        createAt: '2025-01-01 00:00:00',
        updateAt: '2025-01-01 00:00:00',
        enable: 1,
        children: [
          {
            id: 39,
            url: '/main/analysis/overview',
            name: '核心技术',
            sort: 106,
            type: 2,
            children: null,
            parendId: 38
          },
          {
            id: 40,
            url: '/main/analysis/dashboard',
            name: '商品统计',
            sort: 106,
            type: 2,
            children: null,
            parendId: 38
          }
        ]
      },
      {
        id: 41,
        name: '系统管理',
        code: 'systemManage',
        type: 1,
        url: '/main/system',
        icon: 'el-icon-setting',
        description: '系统管理',
        createAt: '2025-01-01 00:00:00',
        updateAt: '2025-01-01 00:00:00',
        enable: 1,
        children: [
          {
            id: 42,
            url: '/main/system/user',
            name: '用户管理',
            sort: 107,
            type: 2,
            children: [
              {
                id: 58,
                type: 3,
                permission: 'user:create'
              },
              {
                id: 59,
                type: 3,
                permission: 'user:delete'
              },
              {
                id: 60,
                type: 3,
                permission: 'user:update'
              },
              {
                id: 61,
                type: 3,
                permission: 'user:query'
              },
            ],
            parendId: 41
          },
          {
            id: 45,
            url: '/main/system/role',
            name: '角色管理',
            sort: 107,
            type: 2,
            children: null,
            parendId: 41,
            children: [
              {
                id: 54,
                type: 3,
                permission: 'role:create'
              },
              {
                id: 55,
                type: 3,
                permission: 'role:delete'
              },
              {
                id: 56,
                type: 3,
                permission: 'role:update'
              },
              {
                id: 57,
                type: 3,
                permission: 'role:query'
              },
            ]
          },
          {
            id: 46,
            name: '部门管理',
            code: 'department',
            type: 2,
            url: '/main/system/department',
            icon: 'el-icon-monitor',
            description: '部门管理',
            createAt: '2025-03-09 00:00:00',
            updateAt: '2025-03-09 00:00:00',
            enable: 1,
            parendId: 41,
            children: [
              {
                id: 50,
                type: 3,
                permission: 'department:create'
              },
              {
                id: 51,
                type: 3,
                permission: 'department:delete'
              },
              {
                id: 52,
                type: 3,
                permission: 'department:update'
              },
              {
                id: 53,
                type: 3,
                permission: 'department:query'
              },
            ]
          },
          {
            id: 47,
            name: '菜单管理',
            code: 'menuManagement',
            type: 2,
            url: '/main/system/menu',
            icon: 'el-icon-menu',
            description: '菜单管理',
            createAt: '2025-03-09 00:00:00',
            updateAt: '2025-03-09 00:00:00',
            enable: 1,
            parendId: 41,
            children: [
              {
                id: 62,
                type: 3,
                permission: 'menu:create'
              },
              {
                id: 63,
                type: 3,
                permission: 'menu:delete'
              },
              {
                id: 64,
                type: 3,
                permission: 'menu:update'
              },
              {
                id: 65,
                type: 3,
                permission: 'menu:query'
              },
            ]
          }
        ]
      },
      {
        id: 43,
        name: '商品中心',
        code: 'product',
        type: 1,
        url: '/main/product',
        icon: 'el-icon-monitor',
        description: '商品中心',
        createAt: '2025-01-01 00:00:00',
        updateAt: '2025-01-01 00:00:00',
        enable: 1,
        children: [
          {
            id: 44,
            url: '/main/product/baihuo',
            name: '日用百货',
            sort: 107,
            type: 2,
            children: null,
            parendId: 39
          }
        ]
      },
    ]
  })
})
let USERSLIST = [
  {
    id: 1,
    name: 'machao',
    realname: '马超',
    cellphone: '12345678901',
    email: 'machao@163.com',
    enable: 1,
    departmentId: 1,
    roleId: 1,
    createAt: new Date('2025-03-01 08:00:00'),
    updateAt: new Date('2025-03-01 13:00:00'),
  },
  {
    id: 1,
    name: 'weiyan',
    realname: '魏延',
    cellphone: '12345678901',
    email: 'weiyan@163.com',
    enable: 1,
    departmentId: 1,
    roleId: 1,
    createAt: new Date('2025-03-02 08:00:00'),
    updateAt: new Date('2025-03-02 14:00:00'),
  },
  {
    id: 1,
    name: 'xushu',
    realname: '徐庶',
    cellphone: '12345678901',
    email: 'admin@163.com',
    enable: 1,
    departmentId: 1,
    roleId: 1,
    createAt: new Date('2025-03-03 08:00:00'),
    updateAt: new Date('2025-03-04 15:00:00'),
  },
  {
    id: 1,
    name: 'fazheng',
    realname: '法正',
    cellphone: '12345678901',
    email: 'admin@163.com',
    enable: 1,
    departmentId: 1,
    roleId: 1,
    createAt: new Date('2025-03-03 08:00:00'),
    updateAt: new Date('2025-03-04 16:00:00'),
  },
  {
    id: 1,
    name: 'zhugeliang',
    realname: '诸葛亮',
    cellphone: '12345678901',
    email: 'admin@163.com',
    enable: 1,
    departmentId: 1,
    roleId: 1,
    createAt: new Date('2025-03-05 08:00:00'),
    updateAt: new Date('2025-03-05 17:00:00'),
  },
  {
    id: 1,
    name: 'huangzhong',
    realname: '黄忠',
    cellphone: '12345678901',
    email: 'admin@163.com',
    enable: 1,
    departmentId: 1,
    roleId: 1,
    createAt: new Date('2025-03-06 08:00:00'),
    updateAt: new Date('2025-03-06 18:00:00'),
  },
  {
    id: 1,
    name: 'zhoutai',
    realname: '周泰',
    cellphone: '12345678901',
    email: 'zhoutai@163.com',
    enable: 1,
    departmentId: 1,
    roleId: 1,
    createAt: new Date('2025-03-07 08:00:00'),
    updateAt: new Date('2025-03-07 19:00:00'),
  },
  {
    id: 1,
    name: 'liubei',
    realname: '刘备',
    cellphone: '12345678901',
    email: 'liubei@163.com',
    enable: 1,
    departmentId: 1,
    roleId: 1,
    createAt: new Date('2025-03-08 08:00:00'),
    updateAt: new Date('2025-03-08 20:00:00'),
  },
  {
    id: 1,
    name: 'guanyu',
    realname: '关羽',
    cellphone: '12345678901',
    email: 'guanyu@163.com',
    enable: 1,
    departmentId: 1,
    roleId: 1,
    createAt: new Date('2025-03-09 08:00:00'),
    updateAt: new Date('2025-03-09 09:00:00'),
  },
  {
    id: 1,
    name: 'zhangfei',
    realname: '张飞',
    cellphone: '12345678901',
    email: 'zhangfei@163.com',
    enable: 1,
    departmentId: 1,
    roleId: 1,
    createAt: new Date('2025-02-22 08:00:00'),
    updateAt: new Date('2025-02-22 12:00:00'),
  },
  {
    id: 1,
    name: 'zhaoyun',
    realname: '赵云',
    cellphone: '12345678901',
    email: 'zhaoyun@163.com',
    enable: 1,
    departmentId: 1,
    roleId: 1,
    createAt: new Date('2025-02-23 08:00:00'),
    updateAt: new Date('2025-02-23 11:00:00'),
  },
]
// 查询用户列表
app.post('/users/list', (req, res) => {
  console.log('成功进入用户列表接口', req.body)
  const { size, offset, name, realname, cellphone, createAt, enable } = req.body
  const temp1 = USERSLIST.filter(item => {
    if (name && realname && cellphone && createAt && enable) {
      return item.name.includes(name) && item.realname.includes(realname) && item.cellphone.includes(cellphone) && item.createAt.includes(createAt) && item.enable.includes(enable)
    } else if (name && realname && cellphone && createAt) {
      return item.name.includes(name) && item.realname.includes(realname) && item
    } else if (name && realname && cellphone) {
      return item.name.includes(name) && item.realname.includes(realname) && item.cellphone.includes(cellphone)
    } else if (name && realname) {
      return item.name.includes(name) && item.realname.includes(realname)
    } else if (name && cellphone) {
      return item.name.includes(name) && item.cellphone.includes()
    } else if (name) {
      return item.name.includes(name)
    } else if (realname) {
      return item.realname.includes(realname)
    } else if (cellphone) {
      return item.cellphone.includes(cellphone)
    } else if (createAt) {
      return item.createAt.includes(createAt)
    } else if (enable) {
     return item.enable.includes(enable)
    } else {
      return item
    }
  })
  const list = temp1.slice(offset, offset + size)
  res.json({
    code: 200,
    data: {
      list: list,
      totalCount: temp1.length,
    },
    msg: '查询用户列表成功'
  })
})

// 根据id删除用户
app.delete('/users/delete/:id', (req, res) => {
  console.log('成功进入删除用户接口', req.params)
  USERSLIST.splice(req.params.id, 1)
  res.json({
    code: 200,
    data: null,
    msg: '删除成功'
 })
})
const DEPARTMENTLIST = [
  {
    id: 1,
    name: '技术部',
    parentId: 0,
    leader: '马超1',
    createAt: new Date('2025-03-01 08:00:00'),
    updateAt: new Date('2025-03-01 13:00:00'),
  },
  {
    id: 2,
    name: '运营部',
    parentId: 0,
    leader: '马超2',

    createAt: new Date('2025-03-02 08:00:00'),
    updateAt: new Date('2025-03-02 14:00:00'),
  },
  {
    id: 3,
    name: '市场部',
    parentId: 0,
    leader: '马超3',

    createAt: new Date('2025-03-03 08:00:00'),
    updateAt: new Date('2025-03-04 15:00:00'),
  },
  {
    id: 4,
    name: '财务部',
    parentId: 0,
    leader: '马超4',

    createAt: new Date('2025-03-05 08:00:00'),
    updateAt: new Date('2025-03-05 17:00:00'),
  },
  {
    id: 5,
    name: '人事部',
    parentId: 0,
    leader: '马超5',

    createAt: new Date('2025-03-06 08:00:00'),
    updateAt: new Date('2025-03-06 18:00:00'),
  },
  {
    id: 6,
    name: '后勤部',
    parentId: 0,
    leader: '马超6',

    createAt: new Date('2025-03-07 08:00:00'),
    updateAt: new Date('2025-03-07 19:00:00'),
  },
  {
    id: 7,
    name: '研发部',
    parentId: 0,
    leader: '马超7',

    createAt: new Date('2025-03-08 08:00:00'),
    updateAt: new Date('2025-03-08 20:00:00'),
  },
  {
    id: 8,
    name: '法务部',
    parentId: 0,
    leader: '马超8',

    createAt: new Date('2025-03-09 08:00:00'),
    updateAt: new Date('2025-03-09 09:00:00'),
  },
  {
    id: 9,
    name: '客服部',
    parentId: 0,
    leader: '马超9',

    createAt: new Date('2025-02-22 08:00:00'),
    updateAt: new Date('2025-02-22 12:00:00')
  },
  {
    id: 10,
    name: '安保部',
    leader: '马超',
    createAt: new Date('2025-01-22 08:00:00'),
    updateAt: new Date('2025-01-22 12:00:00')
  }
]
// 获取部门列表
app.post('/department/list', (req, res) => {
  res.json({
    code: 200,
    data: {
      list: DEPARTMENTLIST,
      totalCount: DEPARTMENTLIST.length,
    },
    msg: '查询部门列表成功'
  })
})
const ROLELIST = [
  {
    id: 1,
    name: '管理员',
    intro: '管理员',
    createAt: new Date('2025-03-01 08:00:00'),
    updateAt: new Date('2025-03-01 13:00:00'),
  },
  {
    id: 2,
    name: '普通用户',
    intro: '普通用户',
    createAt: new Date('2025-03-02 08:00:00'),
    updateAt: new Date('2025-03-02 14:00:00'),
  }
]
// 获取角色列表
app.post('/role/list', (req, res) => {
  res.json({
    code: 200,
    data: {
      list: ROLELIST,
      totalCount: ROLELIST.length,
    },
    msg: '查询角色列表成功'
  })
})

// 创建用户
app.post('/users/create', (req, res) => {
  console.log('成功进入创建用户接口', req.body)
  USERSLIST.push({
    ...req.body,
    id: USERSLIST.length + 1,
    createAt: new Date(),
    updateAt: new Date(),
  })
  res.json({
    code: 200,
    data: null,
    msg: '创建用户成功'
 })
})

// 修改用户
app.patch('/users/:id', (req, res) => {
  console.log('成功进入修改用户接口', req.body, req.params)
  USERSLIST = USERSLIST.map(item => {
    if (item.id === req.params.id * 1) {
      item = {
        ...item,
        ...req.body,
        updateAt: new Date(),
      }
      return item
    }
  })
  res.json({
    code: 200,
    data: null,
    msg: '修改用户成功'
 })
})
const MENULIST = [
  {
    id: 1,
    name: '系统管理',
    icon: 'el-icon-setting',
    path: '/system',
    children: [
      {
        id: 2,
        name: '用户管理',
        icon: 'el-icon-user',
        url: '/system/user',
        type: 2,
        sort: 1,
        permissions: 'user:list',
        children: [
          {
            id: 5,
            name: '创建用户',
            type: 3,
            sort: 1,
            permission: 'system:user:create',
          },
          {
            id: 3,
            name: '删除用户',
            type: 3,
            sort: 2,
            permission: 'system:user:delete',
          },
          {
            id: 2,
            name: '修改用户',
            type: 3,
            sort: 3,
            permission: 'system:user:update',
          },
          {
            id: 4,
            name: '查询用户',
            type: 3,
            sort: 4,
            permission: 'system:user:query',
          },
        ]

      },
      {
        id: 3,
        name: '角色管理',
      }
    ]
  }
]
// 查询菜单接口
app.post('/menu/list', (req, res) => {
  console.log('成功进入查询菜单接口', req.body)
  res.json({
    code: 200,
    data: {
      list: MENULIST,
      totalCount: MENULIST.length,
    },
    msg: '查询菜单列表成功'
  })
})

// 商品数据统计
app.get('/goods/amount/list', (req, res) => {
  res.json({
    code: 200,
    data: [
      { amount: 'sale', title: '商品总销量', tips: '所有商品的总销量', subtitle: '商品总销量', number1: 509989, number2: 509989 },
      { amount: 'favor', title: '商品总收藏', tips: '所有商品的总收藏', subtitle: '商品总收藏', number1: 87226, number2: 87226 },
      { amount: 'has', title: '商品总库存', tips: '所有商品的总库存', subtitle: '商品总库存', number1: 22345, number2: 22345 },
      { amount: 'saleroom', title: '商品总销售额', tips: '所有商品的销售额', subtitle: '商品总销售额', number1: 99999, number2: 99999 },
    ],
    msg: '查询商品数据统计成功'
  })
})

// 每个分类商品的销量
app.get('/goods/category/sale', (req, res) => {
  res.json({
    code: 200,
    data: [
      { id: '1', name: '衣服', goodsCount: 1000, sale: 1000 },
      { id: '2', name: '鞋子', goodsCount: 2000, sale: 1000 },
      { id: '3', name: '厨具', goodsCount: 500, sale: 1000 },
      { id: '4', name: '家具', goodsCount: 1500, sale: 1000 },
      { id: '5', name: '床上用品', goodsCount: 800, sale: 1000 },
      { id: '6', name: '电器', goodsCount: 700, sale: 1000 },
    ]
  })
})
// 每个分类商品的收藏
app.get('/goods/category/favor', (req, res) => {
  res.json({
    code: 200,
    data: [
      { id: '1', name: '衣服', goodsFavor: 900, sale: 1000 },
      { id: '2', name: '鞋子', goodsFavor: 780, sale: 1000 },
      { id: '3', name: '厨具', goodsFavor: 3000, sale: 1000 },
      { id: '4', name: '家具', goodsFavor: 890, sale: 1000 },
      { id: '5', name: '床上用品', goodsFavor: 1500, sale: 1000 },
      { id: '6', name: '电器', goodsFavor: 2000, sale: 1000 },
    ]
  })
})

// 不同城市销量数据
app.get('/goods/address/sale', (req, res) => {
  res.json({
    code: 200,
    data: [
      { id: '1', address: '北京', count: 10000 },
      { id: '2', address: '上海', count: 30000 },
      { id: '3', address: '广州', count: 90000 },
      { id: '4', address: '深圳', count: 20000 },
      { id: '5', address: '杭州', count: 50000 },
    ]
  })
})
```