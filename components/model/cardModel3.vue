<template>
	<view>
		<view class="tuan-detail-header">
			<swiper :indicator-dots="true" indicator-color="rgba(255,255,255,.3)" indicator-active-color="#ffffff" class="tuan-detail-swiper" :autoplay="true"  :interval="3000" :duration="400">
				 <swiper-item>
					 <image :src="'http://img.hazer.top/'+cardData.cdata.bgImg"></image>
				 </swiper-item>
			</swiper>
		</view>
		<view class="tuan-detail-tit pd20_15">
			<view class="ft18 cl-main ftw600">{{cardData.cdata.company}}</view>
			<view class="flex alcenter space mt12">
				<view class="flex alcenter">
					<text class="ft16 cl-orange">联系人:</text>
					<text class="ft16 cl-orange ftw600">{{cardData.cdata.userName}}</text>
					<!-- <text class="ml10 ft16 cl-notice">电话：</text>
					<text class="ft16 cl-notice ">{{cardData.temData.Telephone}}</text> -->
				</view>
				<view class="cl-notice ft16">点赞{{cardData.cdata.likeQty}}</view>
			</view>
			<view v-if="cardData.cdata.phone !== ''">
				<view class="flex alcenter mt8">
					<view class="flex alcenter cl-notice">
						<text class="iconfont iconicon_mobilephone ft14"></text>
						<text class="ft16 ml5">{{cardData.cdata.phone}}</text>
					</view>
					<view class="iconfont iconicon_bottom_call ft20" @click="goCall(cardData.cdata.phone)" :style="{color:tempColor}"></view>
				</view>
			</view>
			<view v-if="cardData.cdata.weixin !== ''">
				<view class="flex alcenter mt8">
					<view class="flex alcenter cl-notice">
						<text class="iconfont iconicon_weixin ft14"></text>
						<text class="ft16 ml5">{{cardData.cdata.weixin}}</text>
					</view>
					<view class="copy-tag ml10" @click="copyText(cardData.cdata.weixin)" :style="{background:tempColor}">复制</view>
				</view>
			</view>
			<view v-if="cardData.cdata.address !== ''">
				<view class="flex alcenter mt8">
					<view class="flex alcenter cl-notice">
						<text class="iconfont iconicon_location02 ft14"></text>
						<text class="ft16 ml5">{{cardData.cdata.address}}</text>
					</view>
					<navigator :url="'/pages/jump/map?lnglat='+cardData.cdata.lnglat">
					     <view class="copy-tag ml10" :style="{background:tempColor}">查看</view>
					</navigator>
				</view>
			</view>
			<view class="mt16">
				<navigator :url="'/pages/jump/genPic?coverImg='+cardData.cdata.bgImg+'&company='+cardData.cdata.company+'&address='+cardData.cdata.address+'&phone='+cardData.cdata.phone+'&userName='+cardData.cdata.userName+'&weixin='+cardData.cdata.weixin+'&clientId='+clientId">
					<view class="user-not-vip">
						发送给朋友
					</view>
				</navigator>
			</view>
		</view>
		
		
		<!-- <view class="form-footer-h">
			<view class="form-footer-h form-footer">
				<view class="form-footer-main pd10_15 flex alcenter space">
						
						<view class="flex alcenter space" style="width: calc(100% - 400rpx);">
							<navigator open-type="reLaunch" url="/pages/client/index">
								<view class="form-footer-item text-center">
									<view class="iconfont iconicon_bottom_home ft22"></view>
									<view class="ft12 mt8">首页</view>
								</view>
							</navigator>
							
							<view @click="contactAct" class="form-footer-item text-center ">
								<view class="iconfont iconicon_bottom_call ft22"></view>
								<view class="ft12 mt8">联系</view>
							</view>
						
							<button open-type="share" class="form-footer-item text-center ">
								<view class="iconfont iconicon_bottom_share ft22"></view>
								<view class="ft12 mt8">分享</view>
							</button>
							
						</view>
						<button  @click="buyAct" class="btn-big" style="width: 288rpx;" :style="getBtnStyle">¥100购买</button>
				</view>
			</view>
		</view> -->
		
		<dialog-login v-if="showLogin" @loginYes="loginYes" @closed="showLogin = false"></dialog-login>
		
	</view>
</template>

<script>
	export default{
		data(){
			return {
				isLogin:true,
				showLogin:false,
				selectIndex:0,
				tabs:['套餐详情','购买须知'],
				nextStep:'',
			}
		},
		props:{
			cardData:{
				type:Object
			},
			clientId:{
				type:Number
			}
		},
		onLoad(){
			
		},
		
		onShareAppMessage(e){
			
		},
		onShareTimeline(e){
			
		},
		methods:{
			contactAct(){
				if(this.isLogin == false){
					this.showLogin = true;
					this.nextStep = 'contact';
				}else{
					uni.navigateTo({
						url:'/pages/client/vipcard/adviser'
					})
				}
			},
			buyAct(){
				if(this.isLogin == false){
					this.showLogin = true;
					this.nextStep = 'buy';
				}else{
					uni.navigateTo({
						url:'/pages/client/tuan/buy'
					})
				}
			},
			loginYes(){
				if(this.nextStep == 'buy'){
					uni.navigateTo({
						url:'/pages/client/tuan/buy'
					})
				}else{
					uni.navigateTo({
						url:'/pages/client/vipcard/adviser'
					})
				}
			},
			changeIndex(index){
				this.selectIndex = index;
			},
			goCall(phoneNumber){
				uni.makePhoneCall({
					phoneNumber:phoneNumber,
					success() {
						console.log("调用成功")
					},
					fail() {
						console.log("调用失败");
					}
				})
			},
			copyText(val){
				this.$copyText(val).then(
				     res => {
				         uni.showToast({
				         title: '复制成功'
				     })
				   }
			    )
			}
		}
	}
</script>

<style>
	.user-not-vip{
		width: 100%;
		height: 80rpx;
		background: #FDF6EC;
		border-radius: 40rpx;
		border: 2rpx solid #EFC381;
		text-align: center;
		line-height: 76rpx;
		font-size: 24rpx;
		color:#000000;
		font-weight: bold;
	}
	
	.tuan-detail-header{
		position: relative;
	}
	.tuan-detail-swiper{
		height: 500rpx;
	}
	.tuan-detail-swiper image{
		width: 100%;
		height: 500rpx;
		background: #F2F2F2;
	}
	.tuan-detail-tit{
		width: 100%;
		background: #FFFFFF;
		border-radius: 40rpx 40rpx 0rpx 0rpx;
		position: relative;
		margin-top: -32rpx;
	}
	.tuan-detail-content-tab{
		height: 102rpx;
	}
	.tuan-detail-content{
		min-height: calc(100vh - 600rpx);
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