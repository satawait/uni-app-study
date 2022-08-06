import { GetterTree } from 'vuex'
import { UserState, Cart } from './types'
import { RootState } from '../types'
const getters: GetterTree<UserState, RootState> = {
	cart(state: UserState): Cart[] {
		return state.cart
	},
	info(state: UserState): number {
		let count = 0
		state.cart.forEach(x => {
			count += x.goods_count
		})
		console.log(count)
		return count
	},
	checkedInfo(state: UserState): number {
		let count = 0
		state.cart.forEach(x => {
			if (x.goods_state) {
				count += x.goods_count
			}
		})
		console.log(count)
		return count
	},
	checkedPrice(state: UserState): string {
		let price = 0
		state.cart.forEach(x => {
			if (x.goods_state) {
				price += x.goods_count * x.goods_price
			}
		})
		console.log(price)
		return price.toFixed(2)
	},
	fullChecked(state: UserState, getters: GetterTree<UserState, RootState>): boolean {
		return getters.checkedInfo === getters.info
	}
}

export default getters