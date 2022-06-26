import axios from 'axios'

const request = axios.create({
  baseURL: 'https://myymusic-serve.vercel.app/',
  timeout: 5000
})

request.interceptors.request.use((config) => {
  return config
})
request.interceptors.response.use((res) => {
  return res.data
}, (error) => {
  return Promise.reject(new Error('faile' + error))
})

export default request
