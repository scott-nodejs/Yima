<template>
	<view>
		<view class="home-header pd16_15" v-bind:style="{backgroundImage:'url(https://wximg.aliyinba.com/'+cardData.setData.Made_BgImg+')'}">
			
		</view>
		<view class="home-main">
			<view class="box pd16_15">
				 <navigator>	
					 <view class="home-vip-tag-box">
						 <image  class="bg" :src="statics.vipBgHas"></image>
						 <view class="main plr15 flex alcenter space">
							 <view class="tag-has-vip flex alcenter center">
								 <image class="vip-level-icon" :src="statics.vipLevelImg[0]"></image>
								 <text class="vip-level-means">V1白银会员</text>
							 </view>
							 <view class="flex alcenter">
								 <view class="ft12 cl-default mr15 ftw500">已帮您省了<text class="ft14 ftw600" style="color: #F51A1A;margin-left: 4rpx; margin-right: 4rpx;">9000.00</text>元</view>
								 <image class="right-icon" :src="statics.rightIcon"></image>
							 </view>
						 </view>
					 </view>
				 </navigator>
				 <!-- <view class="mt24 flex space">
					 <view class="col3 text-center">
						 <navigator>
						 <view class="cl-notice ft12">联系人</view>
						 <view class="mt8 ft20 ftw600 cl-default">{{cardData.temData.UserName}}</view>
						 </navigator>
					 </view>
					 
					 <view class="col3 text-center">
						 <navigator>
						 <view class="cl-notice ft12">优惠券</view>
						 <view class="mt8 ft20 ftw600 cl-default">0</view>
						 </navigator>
					 </view>
					 
					 <view class="col3 text-center">
						 <navigator>
							 <view class="cl-notice ft12">积分</view>
							 <view class="mt8 ft20 ftw600 cl-default">0</view>
						 </navigator>
					 </view>
				 </view> -->
				 <view class="flex alcenter mt16">
				 	<image class="adviser-face-big" :src="'https://wximg.aliyinba.com/'+cardData.temData.Profile"></image>
				 	<view style="width: calc(100% - 160rpx);" class=" pl15">
				 		<view class="ft16 cl-main ftw600">{{cardData.temData.UserName}}</view>
						<view v-if="cardData.temData.JobTitle !== ''">
							<view class="flex alcenter mt8">
								<view class="flex alcenter cl-notice">
									<text class="iconfont iconicon_user ft14"></text>
									<!-- <text class="ft14 ml5">联系人:</text> -->
									<text class="ft14 ml5">{{cardData.temData.JobTitle}}</text>
								</view>
							</view>
						</view>
						<view v-if="cardData.temData.Weixin !== ''">
							<view class="flex alcenter mt8">
								<view class="flex alcenter cl-notice">
									<text class="iconfont iconicon_weixin ft14"></text>
									<text class="ft14 ml5">{{cardData.temData.Weixin}}</text>
								</view>
								<view class="copy-tag ml10" :style="{background:tempColor}">复制</view>
							</view>
						</view>
				 		<view v-if="cardData.temData.Telephone !== ''">
							<view class="flex alcenter space mt8">
								<view class="flex alcenter cl-notice">
									<text class="iconfont iconicon_call ft14"></text>
									<text class="ft14 ml5">{{cardData.temData.Telephone}}</text>
								</view>
								
								<text class="iconfont iconicon_bottom_call ft20" :style="{color:tempColor}"></text>
							</view>
						</view>
				 	</view>
				 </view>
				 <view v-if="cardData.temData.Address !== ''">
					 <view class="flex alcenter mt8">
						<view class="flex alcenter cl-notice">
							<text class="iconfont iconicon_location02 ft14"></text>
							<!-- <text class="ft14">地址:</text> -->
							<text class="ft14 ml5">{{cardData.temData.Address}}</text>
						</view>
						
						<view @click="jumpMap" class="copy-tag ml10" :style="{background:tempColor}">查看</view>
					
					 </view>
				 </view>
				 
				 <view class="flex space alcenter  mt24" style="padding-bottom: 16rpx;">
					 <view class="flex alcenter">
						 <navigator>
							<view class="btn-vip-money" :style="getBtnStyle">发送朋友</view>
						 </navigator>
						 <navigator>
							<view class="btn-vip-adviser ml15" :style="getBtnPlanStyle">专属顾问</view>
						 </navigator>
					 </view>
					 
					 <view @click="showQrcodeAct" class="vip-qrcode-tag" :style="getBtnStyle">
						 <text class="iconfont iconbtn_card_ma-copy ft20 cl-w"></text>
					 </view>
				 </view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				vipLevel:0,//普通用户
			}
		},
		props:{
			cardData:{
				type: Object
			}
		},
		methods:{
			loginAct(){
				this.$emit('loginAct');
			},
			showQrcodeAct(){
				this.$emit('qrcode');
			},
			jumpMap(){
				let t = this;
				var latlon = t.cardData.temData.WxmapPoint;
				var arr = latlon.split(',');
				uni.navigateTo({
					url:'/pages/jump/map?lat='+arr[0]+'&lng='+arr[1]
				})
			}
		}
	}
</script>

<style>
	.home-header{
		height: 354rpx;
		width: 100%;
		position: relative;
		background: #363B4D;
		background-size: cover;
		border-radius: 0rpx 0rpx 48rpx 48rpx;
	}
	.home-main{
		width: 100%;
		position: relative;
		margin-top: -106rpx;
		padding: 0 30rpx;
	}
	.home-mendian{
		width: 100%;
		height: 84rpx;
		background:rgba(255,255,255,0.1);
		border-radius: 42rpx;
	}
	.home-vip-tag-box{
		height: 100rpx;
		width: 100%;
		position: relative;
		overflow: hidden;
		border-radius: 8rpx;	
	}
	.home-vip-tag-box .main{
		width: 100%;
		height: 100rpx;
		position: absolute;
		z-index: 2;
		left: 0;
		top: 0;
	}
	.home-vip-tag-box .bg{
		width: 100%;
		height: 100rpx;
	}
	.tag-no-vip{
		width: 128rpx;
		height: 40rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		font-size: 24rpx;
		font-weight: 600;
		color:#8A8D99;
		text-align: center;
		line-height: 40rpx;
	}
	.tag-has-vip{
		width: 200rpx;
		height: 40rpx;
		background: linear-gradient(180deg, #333333 0%, #000000 100%);
		border-radius: 20rpx;
	}
	.tag-has-vip .vip-level-icon{
		width: 36rpx;
		height: 36rpx;
	}
	.tag-has-vip .vip-level-means{
		font-size: 24rpx;
		margin-left: 8rpx;
		font-weight: 500;
		background: linear-gradient(180deg, #F2DCA9 0%, #C79556 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.home-vip-tag-box .main .right-icon{
		width: 40rpx;
		height: 40rpx;
	}
	.vip-qrcode-tag{
		width: 80rpx;
		height: 80rpx;
		border-radius: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.btn-vip-money,.btn-vip-adviser{
		width: 208rpx;
		height: 80rpx;
		border-radius: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		font-weight: 600;
		color:#FFFFFF;
	}
	.adviser-face-big{
		width: 160rpx;
		height: 160rpx;
		border-radius: 80rpx;
		background: #FFFFFF;
	}
	.copy-tag{
		width: 96rpx;
		height: 40rpx;
		color:#FFFFFF;
		font-size: 24rpx;
		text-align: center;
		line-height: 40rpx;
		border-radius: 20rpx;
	}
</style>
