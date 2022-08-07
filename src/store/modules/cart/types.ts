export interface Cart {
	goods_id: number,
	goods_name: string,
	goods_price: number,
	goods_count: number,
	goods_small_logo: string,
	goods_state: boolean
}
export interface UserState {
	cart: Cart[],
	address: Address,
	token: string,
	userInfo: Record<string, any>,
	redirectInfo: RedirectInfo | null
}
export interface NumsObj {
	id: number,
	num: number
}
export interface Address {
	userName: string,
	telNumber: string,
	provinceName: string,
	cityName: string,
	countyName: string,
	detailInfo: string
}
export interface RedirectInfo {
	openType: string,
	from: string
}