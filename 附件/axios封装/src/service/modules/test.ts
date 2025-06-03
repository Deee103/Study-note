import { hyRequest2 } from '..'

interface ITest {
  id: number
  name: string
  tags: string
}

//发送网络请求
//单独拦截
hyRequest2
  .request<ITest>({
    url: '/api/test',
    interceptors: {
      requestSuccessFn: config => {
        console.log('单独请求成功的拦截')
        return config
      },
      responseSuccessFn: res => {
        console.log('单独响应成功的拦截')
        return res
      }
    }
  })
  .then(res => {
    console.log(res)
  })
