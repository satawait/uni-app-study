import { createStore } from 'vuex'
import cart from './modules/cart'

const store = createStore({
	modules: {
		'm_cart': cart
	}
})
export default store