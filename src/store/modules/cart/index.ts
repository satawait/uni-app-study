import {Module} from 'vuex'
import getters from './getters'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import { UserState } from './types';
import { RootState } from '../types';
const cart: Module<UserState, RootState> = {
    namespaced: true, 
    state,
    getters,
    mutations,
    actions,
}

export default cart