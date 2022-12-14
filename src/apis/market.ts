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
export const login = (data: Record<string, any>) => {
  return request.post<Record<string, any>>('api/public/v1/users/wxlogin', data)
}
export const orderCreate = (data: Record<string, any>) => {
  return request.post<Record<string, any>>('api/public/v1/my/orders/create', data)
}
export const reqPayment = (data: Record<string, any>) => {
  return request.post<Record<string, any>>('api/public/v1/my/orders/req_unifiedorder', data)
}
export const checkOrder = (data: Record<string, any>) => {
  return request.post<Record<string, any>>('api/public/v1/my/orders/chkOrder', data)
}
