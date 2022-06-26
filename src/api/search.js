import request from '@/utils/request'

export const getHotsearch = () => request({ url: '/search/hot', method: 'get' })
export const getSearchSuggest = (musicname) => request({ url: `/search/suggest?keywords=${musicname}`, method: 'get' })
export const getSearcchList = (name) => request({ url: `/cloudsearch?keywords=${name}`, method: 'get' })
