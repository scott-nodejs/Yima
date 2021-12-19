<template>
	<view class="qrocde-modal">
		<view  class="modal-bg" :style="{zIndex:zindex}"></view>
		<view class="modal-box animated fast" :style="{zIndex:zindex+1,background:bg}" :class="show   ? 'slideInUp' : 'slideOutDown'">
			<view class="modal-main">
				<view class="closed">
					<text @click="closed()" class="iconfont  ft20 cl-notice iconbtn_close"></text>
				</view>
				<view class="lh20 ft16 cl-main ftw600 text-center">扫一扫微信二维码</view>
				<view class="flex center mt40"  style="height: 400rpx;">
					<image :src="'http://img.hazer.top'+cardData.cdata.wxCode" style="width: 400rpx; height: 400rpx;"></image>
				</view>
				<view class="mt16 text-center ft14 cl-info2">{{cardData.cdata.company}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import  QR   from '../../static/js/wxqrcode.js';
	
	export  default{
		props:{
			zindex:{
				type:Number,
				default:401,
			},
			bg:{
				type:String,
				default:'#ffffff',
			},
			
		},
		data(){
			return {
				show:false,
				qrcodeImg:'',
			}
		},
		created(){
			this.show = true;
			let img = QR.createQrCodeImg('youge', {  
			     size: 300//二维码大小  
			})
			this.qrcodeImg = 'http://img.hazer.top/qrcode.jpg';
		},
		methods:{
			closed(){
				this.show = false;
				setTimeout(()=>{
					this.$emit('closed');
				},400);
			}
		}
	}
</script>

<style>
	.qrocde-modal{
		position: relative;
		z-index: 400;
	}
	.qrocde-modal .modal-bg{
		position: fixed;
		z-index: 400;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,.5);
	}
	.qrocde-modal .modal-box{
		position: fixed;
		z-index: 401;
		background:#FFFFFF;
		left: 0;
		bottom: 0;
		width: 100%;
		padding-bottom:0rpx;
		padding-bottom:constant(safe-area-inset-bottom);
		padding-bottom:env(safe-area-inset-bottom);
		border-radius:32rpx 32rpx 0rpx 0rpx;
	}
	.qrocde-modal .modal-main{
		position: relative;
		height: auto;
		overflow: hidden;
		min-height: 1000rpx;
		padding-top: 64rpx;
		padding-bottom: 40rpx;
	}
	.qrocde-modal .modal-main .closed{
		position: absolute;
		right: 40rpx;
		top: 40rpx;
	}
</style>