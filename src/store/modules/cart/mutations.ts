import { MutationTree } from 'vuex'
import { UserState, Cart, NumsObj, Address } from './types';

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
	saveAddress(state: UserState, address: Address): void {
		state.address = address
		this.commit('m_cart/saveToStorage')
	},
	updateAllState(state: UserState, fullChecked: boolean) {
		state.cart.forEach(x => {
			x.goods_state = fullChecked
		})
		this.commit('m_cart/saveToStorage')
	},
	updateUserInfo(state: UserState, userInfo: Record<string, any>) {
		state.userInfo = userInfo
		this.commit('m_cart/saveToStorage')
	},
	updateToken(state: UserState, token: string) {
		state.token = token
		this.commit('m_cart/saveToStorage')
	},
	saveToStorage(state) {
		uni.setStorageSync('cart', JSON.stringify(state.cart))
		uni.setStorageSync('address', JSON.stringify(state.address))
		uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
		uni.setStorageSync('token', JSON.stringify(state.token))
	}
}

export default Mutations