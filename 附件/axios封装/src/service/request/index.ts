import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { AxiosHeaders } from 'axios'
import type { HYReuestConfig } from './type'
class HYReuest {
  instance: AxiosInstance
  headers = new AxiosHeaders({
    'Content-Type': 'application/json'
  })
  //request实例 => axios的实例
  constructor(config: HYReuestConfig) {
    this.instance = axios.create(config)

    //每个instance实例都添加拦截器(全局拦截)
    this.instance.interceptors.request.use(
      config => {
        console.log('全局请求成功的拦截')
        return config
      },
      err => {
        console.log('全局请求失败的拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      res => {
        console.log('全局响应成功的拦截')
        return res.data
      },
      err => {
        console.log('全局响应失败的拦截')
        return err
      }
    )

    //针对特定的hyRequest实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  //封装网络请求的方法
  request<T = any>(config: HYReuestConfig<T>) {
    const adaptConfig = {
      ...config,
      headers: this.headers
    }
    //单次请求的成功拦截处理
    if (adaptConfig.interceptors?.requestSuccessFn) {
      config = adaptConfig.interceptors.requestSuccessFn(adaptConfig)
    }
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then(res => {
          //单次响应的成功拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  get<T = any>(config: HYReuestConfig<T>) {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T = any>(config: HYReuestConfig<T>) {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T = any>(config: HYReuestConfig<T>) {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: HYReuestConfig<T>) {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HYReuest
