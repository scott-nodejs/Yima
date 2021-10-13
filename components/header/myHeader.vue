<template>
	<view>
		<view v-if="headerType === 0">
			<model-cardModel1 :cardData="cardData" :clientId="clientId"></model-cardModel1>
		</view>
		<view v-if="headerType === 1">
			<model-cardModel3></model-cardModel3>
		</view>
		<view v-if="headerType === 2">
			<model-cardModel3 :cardData="cardData" :clientId="clientId"></model-cardModel3>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
			
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
