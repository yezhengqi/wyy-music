import request from '@/utils/request'

export const getpersonal = (limit) => request({ url: `/personalized?limit=${limit}`, method: 'get' })

export const getnewsongs = () => request({ url: '/recommend/songs', method: 'get' })
