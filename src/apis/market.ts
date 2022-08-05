import request from '@/utils/request'

export const getSwiperData = () => {
  return request.get<Record<string, any>>('api/public/v1/home/swiperdata')
}
export const getNavData = () => {
  return request.get<Record<string, any>>('api/public/v1/home/catitems')
}
export const getFloorData = () => {
  return request.get<Record<string, any>>('api/public/v1/home/floordata')
}
export const getCateData = () => {
  return request.get<Record<string, any>>('api/public/v1/categories')
}
export const search = (data: Record<string, any>) => {
  return request.get<Record<string, any>>('api/public/v1/goods/qsearch', data)
}
export const getGoodsData = (data: Record<string, any>) => {
  return request.get<Record<string, any>>('api/public/v1/goods/search', data)
}
export const getGoodsDetail = (data: Record<string, any>) => {
  return request.get<Record<string, any>>('api/public/v1/goods/detail', data)
}
