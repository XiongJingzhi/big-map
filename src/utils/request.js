import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: '/api/Info/',
  timeout: 20 * 1000 // request timeout
})

service.interceptors.request.use(
  request => {
    request.headers['key'] = ' 32072b6686050b3d'
    return request
  }
)

service.interceptors.request.use(
  request => {
    request.headers['key'] = ' 32072b6686050b3d'
    return request
  }
)

service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)
export default service