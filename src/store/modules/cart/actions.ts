import {ActionTree} from 'vuex'
import { UserState, Cart } from './types'
import { RootState } from './../types'

const actions: ActionTree<UserState, RootState> = {
    addCart: async function ({commit, state}, Cart) {
        commit('addCart', Cart)
    }
}

export default actions ;