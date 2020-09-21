import axios from 'axios'

// 创建axios实例

const service = axios.create({
  baseURL: 'http://localhost:8090', // api的base_url
  timeout: 20000 // 请求超时时间
})

export default service