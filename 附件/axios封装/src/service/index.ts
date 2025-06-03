import HYReuest from './request'
import { BASE_URL, TIME_OUT } from './config'
export const hyRequest = new HYReuest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

// 配置局部拦截器实例
export const hyRequest2 = new HYReuest({
  baseURL: BASE_URL,
  timeout: 10000,
  interceptors: {
    requestSuccessFn: config => {
      console.log('局部请求成功的拦截')
      return config
    },
    responseSuccessFn: res => {
      console.log('局部响应成功的拦截')
      return res
    },
    requestFailureFn: err => {
      console.log('局部请求失败的拦截')
      return err
    },
    responseFailureFn: err => {
      console.log('局部响应失败的拦截')
      return err
    }
  }
})
