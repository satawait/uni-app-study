import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import { onShow } from '@dcloudio/uni-app'
const useInfo = () => {
	const store = useStore()
	const info = computed(() => store.getters['m_cart/info'])
	watch(info, (val) => {
		setBadge()
	})
	const setBadge = () => {
		uni.setTabBarBadge({
			index: 2,
			text: info.value + ''
		}).catch(e => {})
	}
	onShow(() => {
		setBadge()
	})
}

export default useInfo