import {ActionTree} from 'vuex'
import { UserState, Cart, NumsObj } from './types'
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
	}
}

export default actions ;