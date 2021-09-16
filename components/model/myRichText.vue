<template>
	<view>
		<rich-text :nodes="content"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: ''
			}
		},
		props:{
			content:{
				type: String
			}
		}
	}
</script>

<style>
	.u-content {
		margin-top: 100rpx;
	}
</style>
