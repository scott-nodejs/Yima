<template>
   <view>
     <scroll-view 
     scroll-y="true" 
     :scroll-with-animation="true" 
     @scroll="scroll">
         <view class="scroll-view-item"  v-for="(item,idx) in recommendArr" :key="idx">
           <view v-if="item.type === 'header'">
			   <head-myHeader></head-myHeader>
			   <!-- <view>{{headerType}}</view> -->
		   </view>
           <view class="plr15" style="position: relative;box-sizing: border-box;" v-if="item.type === 'base-text'">
			   <view>
				   <view v-bind:style="[{color: item.config.color,textAlign: item.config.txtStyle.textAlign,fontSize: item.config.fontSize+'px'}]" style="padding-top: 10px;line-height: 1.5;" >
					  {{item.cdata.txt}}
				   </view>
			   </view>
           </view>
		   <view class="plr15" v-if="item.type === 'base-image'">
			   <view class="mt16">
				<image style="width: 100%;" mode="widthFix"  :src="'http://img.hazer.top/'+item.cdata.img" @tap="_previewImage(item.cdata.img)"></image>
		       </view>
		   </view>
		   <view class="plr15" v-if="item.type === 'swiper-banner'">
			   <com-banner :adData="item.cdata.advertList"></com-banner>
		   </view>
		   <!-- <view v-if="item.type === 'richtext'">
			   <view v-html="item.temData"></view>
		   </view> -->
		   <view class="plr15" v-if = "item.type === 'base-video'">
			   <video style="width: 100%;height: 182px;" :src="'http://img.hazer.top'+item.cdata.src"></video>
		   </view>
		   <view class="plr15" v-if = "item.type === 'horizontal-list'">
			   <view class="mt24" v-for="(listItem,index) in item.cdata.listData" :key="index">
				   <view class="box pd16_15 flex alcenter mt16">
					<image class="integral-tuan-l" :src="'http://img.hazer.top/'+listItem.img"></image>
					<view class="pl15" style="width: calc(100% - 240rpx);">
						<view class="ft14 cl-main ftw600 text-over">{{listItem.title}}</view>
						<view class="flex alcenter space mt12 cl-notice">
							<view class="flex alcenter">
								<text class="ft12">{{listItem.desc}}</text>
							</view>
						</view>
					</view>
				   </view>
			   </view>
		   </view>
		   <view class="plr15" v-if = "item.type === 'vertical-list'">
			   <view v-for="(listItem,index) in item.cdata.listData" :key="index">
				   <view class="mt16 flex space">
					<view class="box pd16_15" style="width: 330rpx;">
						<image class="integral-mall-goods" :src="'http://img.hazer.top/'+listItem[0].img"></image>
						<view class="mt8 ft14 ftw600 text-center cl-main">{{listItem[0].title}}</view>
						<view class="text-center mt8 ft12 cl-notice">{{listItem[0].desc}}</view>
					</view>
					<view class="box pd16_15" style="width: 330rpx;">
						<image class="integral-mall-goods" :src="'http://img.hazer.top/'+listItem[1].img"></image>
						<view class="mt8 ft14 ftw600 text-center cl-main">{{listItem[1].title}}</view>
						<view class="text-center mt8 ft12 cl-notice">{{listItem[1].desc}}</view>
					</view>
				   </view>
			   </view>
		   </view>
		   <view class="plr15" v-if="item.type === 'news-marquee'">
			   <view class="mt16">
			   	<swiper :indicator-dots="false" class="swiper-integral" :autoplay="true" :vertical="true" :interval="2000" :duration="400">
					<swiper-item v-for="(listItem, index) in item.cdata.config" :key="index">
			   			<view class="flex alcenter">
			   				<text class="iconfont iconicon_notice ft14 cl-w" style="color: #F0AD4E;"></text>
			   				<text class="ml10 ft14 cl-main" style="width: calc(100% - 50rpx); overflow: hidden;color: #F0AD4E;">{{listItem.text}}</text>
			   			</view>
			   		</swiper-item>
				</swiper>
			   </view>
		   </view>
		   <view v-if="item.type === 'base-form'">
			   <model-baseForm :formData="item"></model-baseForm>
		   </view>
         </view>
		 <!-- <com-copyright></com-copyright> -->
		 <view v-if="gotop === true" class="top"  :style="{'display':(topState===true? 'block':'none')}">
		     <uni-icons class="topc" type="arrowthinup" size="50" @click="top"></uni-icons>
		 </view>
     </scroll-view>
	 
   </view>
</template>
 
<script>
  import {mapState} from "vuex";
  export default{
    data(){
      return{
        msg:'',
        old: {
            scrollTop: 0
        },
		display: true,
		autoH:"",
		autoW:"",
		gotop: false,
		topState: false
      }
    },
	onLoad(option) {
		let url;
		if(option.preview == 1){
			url = 'http://yima.hazer.top/api/preview/getInfo/'+option.uid;
		}else{
		    url = 'http://yima.hazer.top/api/getInfo?clientId='+option.clientId;
		}
		new Promise((resolve, reject) =>{
			uni.request({
			   url: url,
			   success: function (res) {
				resolve(res)
			   }
			  });
		  }).then((res)=>{
			  this.display = true;
			  var config = res.data.data;
			  this.gotop = config.gotop;
			  var data = res.data.data.cdata;
			  this.$store.commit('updateRecommend',config);
			  uni.setNavigationBarTitle({
			      title: config.pageName
			  });
		  })
	},
	onPageScroll(e){ //根据距离顶部距离是否显示回到顶部按钮
	    if(e.scrollTop>100){ //当距离大于600时显示回到顶部按钮
	        this.topState = true
	    }else{ //当距离小于600时显示回到顶部按钮
	        this.topState = false
	    }
	},
    methods:{
      scroll: function(e) {
          this.old.scrollTop = e.detail.scrollTop
      },
	  _previewImage(image){
		  var imgArr = [];
		  imgArr.push('http://img.hazer.top/'+image);
		  uni.previewImage({
		  	urls:imgArr,
			current:imgArr[0]
		  })
	  },
	  top() { //回到顶部  
	  　　　　uni.pageScrollTo({ 
	  　　　　　　scrollTop: 0, duration: 300 
	  　　　　}); 
	  　　} 
    }
  }
</script>
 
<style scoped>
scroll-view ::-webkit-scrollbar {
  width: 100%;
  height: auto;
  background-color: transparent;
}
.scroll-view_H{
  white-space: nowrap;
  overflow: hidden;
}
.scroll-view-item{
  width: 100%;
  height: 100%;
  display: block;
  margin-right: 40rpx;
}
.scroll-view-item:last-child{
  margin-right: 0;
}
/* .scroll-view-item image{
  width: 100%;
  height: 120rpx;
  border-radius: 10rpx;
} */
.title_level1{
  font-size: 18px;
}
.title_level2{
  font-size: 24rpx;
  color: #C8C7CC;
}

.integral-tuan-l{
		width: 240rpx;
		height: 180rpx;
		background: #f2f2f2;
	}
	
.integral-mall-goods{
		width: 100%;
		height: 200rpx;
		background: #F2F2F2;
	}
	.integral-mall-header{
		position: relative;
		height: 320rpx;
	}
	.integral-mall-header .main{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 320rpx;
	}
	.swiper-integral{
		height: 32rpx;
		width: 100%;
	}
	/* 回到顶部 */
	    .top {
	        position: relative;
	        display: none; /* 先将元素隐藏 */
	    }
	 
	    .topc {
	        position: fixed;
	        right: 0;
	        background: #5555ff;
	        top: 70%;
	        height: 50px;
	        line-height: 50px;
			z-index: 99;
	    }
</style>