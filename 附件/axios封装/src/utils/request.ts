import axios from 'axios'

export const instance = axios.create({
  baseURL: 'http://127.0.0.1:4523/m1/6494249-6194446-default',
  timeout: 1000
  //   headers: { 'X-Custom-Header': 'foobar' }
})
