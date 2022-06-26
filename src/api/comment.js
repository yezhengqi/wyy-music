// 评论
import request from '@/utils/request'

export const getcomment = (id, limit, offset) => request({ url: `/comment/music?id=${id}&limit=${limit}&offset=${offset}`, method: 'get' })
