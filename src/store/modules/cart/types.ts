export interface Cart {
	goods_id: number,
	goods_name: string,
	goods_price: string,
	goods_count: number,
	goods_small_logo: string,
	goods_state: boolean
}
export interface UserState {
	cart: Cart[]
}
export interface NumsObj {
	id: number,
	num: number
}