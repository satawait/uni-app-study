import {ActionTree} from 'vuex'
import { UserState, Cart, NumsObj, Address } from './types'
import { RootState } from './../types'

const actions: ActionTree<UserState, RootState> = {
    addCart: async function ({commit, state}, cart: Cart) {
        commit('addCart', cart)
    },
	changeCartState: async function ({commit, state}, cart: Cart) {
	    commit('changeCartState', cart)
	},
	changeCartNums: async function ({commit, state}, numsObj: NumsObj) {
	    commit('changeCartNums', numsObj)
	},
	deleteCart: async function ({commit, state}, cart: Cart) {
	    commit('deleteCart', cart)
	},
	saveAddress: async function ({commit, state}, address: Address) {
	    commit('saveAddress', address)
	},
	updateAllState: async function ({commit, state}, fullChecked: boolean) {
	    commit('updateAllState', fullChecked)
	},
	updateUserInfo: async function ({commit, state}, userInfo: Record<string, any>) {
	    commit('updateUserInfo', userInfo)
	},
	updateToken: async function ({commit, state}, token: string) {
	    commit('updateToken', token)
	}
}

export default actions ;