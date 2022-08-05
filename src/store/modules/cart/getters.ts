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
	}
}

export default getters