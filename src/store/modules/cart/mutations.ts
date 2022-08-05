import { MutationTree } from 'vuex'
import { UserState, Cart } from './types';

const Mutations: MutationTree<UserState> = {
	addCart(state: UserState, cart: Cart): void {
		const findResult = state.cart.find(x => x.goods_id === cart.goods_id)
		if (!findResult) {
			state.cart.push(cart)
		} else {
			findResult.goods_count++
		}
		this.commit('m_cart/saveToStorage')
	},
	saveToStorage(state) {
		uni.setStorageSync('cart', JSON.stringify(state.cart))
	}
}

export default Mutations