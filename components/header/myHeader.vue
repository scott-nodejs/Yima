<template>
	<view>
		<view v-if="headerType === 0">
			<model-cardModel1 :cardData="cardData" :clientId="clientId"></model-cardModel1>
		</view>
		<view v-if="headerType === 1">
			<model-cardModel3 @qrcode="showQrcode = true"></model-cardModel3>
		</view>
		<view v-if="headerType === 2">
			<model-cardModel1 @qrcode="showQrcode = true"></model-cardModel1>
		</view>
		<view v-if="headerType === 3">
			<model-cardModel1></model-cardModel1>
		</view>
		<view v-if="headerType === 4">
			<model-cardModel1 :cardData="cardData" :clientId="clientId"></model-cardModel1>
		</view>
		<view v-if="headerType === 5">
			<model-cardModel1 :cardData="cardData"></model-cardModel1>
		</view>
		<view v-if="headerType === 6">
			<model-cardModel1 :cardData="cardData"></model-cardModel1>
		</view>
		<view v-if="headerType === 7">
			<model-cardModel1 :cardData="cardData"></model-cardModel1>
		</view>
		<view v-if="headerType === 8">
			<model-cardModel1 :cardData="cardData"></model-cardModel1>
		</view>
		<view v-if="headerType === 9">
			<model-cardModel1 :cardData="cardData"></model-cardModel1>
		</view>
		<view v-if="headerType === 10">
			<model-cardModel1 :cardData="cardData"></model-cardModel1>
		</view>
		<view v-else-if="headerType === 11">
			<model-cardModel2></model-cardModel2>
		</view>
		<dialog-qrcode v-if="showQrcode" @closed="showQrcode = false"></dialog-qrcode>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showQrcode: false,
			}
		},
		props: {
		  
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
