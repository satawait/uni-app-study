<template>
	<view class="login">
		<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
		<button type="primary" class="login-btn" @click="getUserProfile">一键登录</button>
		<view class="tips-text">
			登录后尽享更多权益
		</view>
	</view>
</template>

<script lang="ts">
	import { mapActions, mapState } from 'vuex'
	import { login } from '@/apis/market'
	export default {
		name:"myLogin",
		data() {
			return {
				
			};
		},
		computed: {
			...mapState('m_cart', ['redirectInfo'])
		},
		methods: {
			getUserProfile() {
				uni.getUserProfile({
					desc: '授权一键登录',
					success: (res) => {
						this.updateUserInfo(res.userInfo)
						this.getToken(res)
					},
					fail() {
						uni.showToast({
							title: '您取消了授权',
							icon: 'none'
						})
					}
				})
			},
			getToken(info) {
				uni.login({
					success: (res) => {
						const params = {
							code: res.code,
							encryptedData: info.encryptedData,
							iv: info.iv,
							rawData: info.rawData,
							signature: info.signature
						}
						console.log(params)
						login({}).then(res => {
							console.log(res)
							const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
							this.updateToken(token)
							if (this.redirectInfo?.from) {
								if (this.redirectInfo.openType === 'switchTab') {
									uni.switchTab({
										url: this.redirectInfo.from,
										success: () => {
											this.updateRedirectInfo(null)
										}
									})
								} else {
									uni.navigateTo({
										url: this.redirectInfo.from,
										success: () => {
											this.updateRedirectInfo(null)
										}
									})
								}
							}
						}).catch(e => {
							console.log(e)
						})
					}
				})
			},
			...mapActions('m_cart', ['updateUserInfo', 'updateToken', 'updateRedirectInfo'])
		}
	}
</script>

<style lang="less">
.login {
	height: 750rpx;
	background-color: #f8f8f8;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	position: relative;
	&::after {
		content: ' ';
		display: block;
		width: 100%;
		height: 40px;
		position: absolute;
		bottom: 0;
		left: 0;
		border-radius: 100%;
		transform: translateY(50%);
		background-color: white;
	}
	.login-btn {
		width: 90%;
		border-radius: 100px;
		margin: 15px 0;
		background-color: #c00000;
	}
	.tips-text {
		font-size: 12px;
		color: gray;
	}
}
</style>