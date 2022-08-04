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
