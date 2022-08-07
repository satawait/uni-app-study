/**
 * 类型的定义，在明确类型的时候将变量定义为明确类型，如果不能明确则定义any类型，除非必要，
 * 否则项目中还是尽量少定义any类型
 */
import { UserState, Cart, Address, RedirectInfo } from './types'
const state: UserState ={
	cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
	address: JSON.parse(uni.getStorageSync('address') || '{}'),
	token: JSON.parse(uni.getStorageSync('token')) || '',
	userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
	redirectInfo: null
}
export default state