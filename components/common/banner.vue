<template>
	<view>
		<swiper class="home-swiper-banner" indicator-color="rgba(255, 255, 255, 0.3)" indicator-active-color="#FFFFFF" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500">
			<swiper-item v-for="(item,index) in adData" :key="index">
				<image :src="'http://img.hazer.top/'+item.img"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default{
		data(){
			return {
			
			}
		},
		props:{
			adData:{
				type:Object
			}
		}
	}
</script>

<style>
	.home-swiper-banner{
		height: 300rpx;
		box-shadow: 0rpx 4rpx 32rpx 0rpx rgba(0, 0, 0, 0.04);
		border-radius: 32rpx;
		overflow: hidden;
	}
	.home-swiper-banner image{
		width: 100%;
		height: 300rpx;
	}
</style>
