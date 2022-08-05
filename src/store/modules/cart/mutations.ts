import { MutationTree } from 'vuex'
import { UserState, Cart, NumsObj } from './types';

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
	changeCartState(state: UserState, cart: Cart): void {
		const findResult = state.cart.find(x => x.goods_id === cart.goods_id)
		if (findResult) {
			findResult.goods_state = !findResult.goods_state
			this.commit('m_cart/saveToStorage')
		}
	},
	changeCartNums(state: UserState, numsObj: NumsObj): void {
		const findResult = state.cart.find(x => x.goods_id === numsObj.id)
		if (findResult) {
			findResult.goods_count = numsObj.num
			this.commit('m_cart/saveToStorage')
		}
	},
	deleteCart(state: UserState, cart: Cart): void {
		const findResult = state.cart.findIndex(x => x.goods_id === cart.goods_id)
		if (findResult >= 0) {
			state.cart.splice(findResult, 1)
			this.commit('m_cart/saveToStorage')
		}
	},
	saveToStorage(state) {
		uni.setStorageSync('cart', JSON.stringify(state.cart))
	}
}

export default Mutations