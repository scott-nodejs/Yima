<template>
	<view class="pd16_15">
		
		<view class="box pd20_15">
			<div v-for="(item, index) in formData.cdata.form" :key="index">
				<view class="flex alcenter">
					<view class="ft14 cl-main" style="width: 144rpx;">
						{{item.desc}}
					</view>
					<view style="width: calc(100% - 144rpx);">
						<input :maxlength="64" v-model="item.val" :placeholder="item.placeholder"  class="ft14 cl-main" placeholder-class="cl-notice" />
					</view>
				</view>
				<view class="bd-line mt20 mb20" v-if="index != formData.cdata.form.length - 1"></view>
			</div>
		</view>
		
		<view class="mt24">
			<button class="btn-big" :style="getBtnStyle" @click="submit()">确定保存</button>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return {
				address_id:0,
				form:{
					name:'',
					mobile:'',
					address:'',
					is_default:0,
				},
			}
		},
		props:{
			formData:{
				type: Object
			}
		},
		methods:{
			changeDefault(){
				this.form.is_default = this.form.is_default == 0 ? 1 : 0;
			},
			submit(){
				let url = 'http://localhost:9080/oneCode/api/submit';
				new Promise(uni.request({
					url: url,
					method: 'POST',
					header:{
						'content-type':'application/json'
					},
					data: {
						obj: this.formData.cdata.form,
						codeId: this.formData.codeId
					},
					success(res) {
						uni.showToast({
						        title: '操作成功',
						        duration: 1000
						    });
					}
				})).then(result=>{
					uni.showToast({
					        title: '操作成功',
					        duration: 1000
					    });
				})
			}
		}
	}
</script>

<style>
	
</style>