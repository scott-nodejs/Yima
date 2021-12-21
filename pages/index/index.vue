<template>
   <view>
	   <view>
     <!-- <scroll-view 
     scroll-y="true" 
     :scroll-with-animation="true" 
     @scroll="scroll"> -->
	     <view v-if="bgMusic" style="padding: 40rpx;position: absolute; z-index: 1000;">
	 		<image id="music" src="../../static/music.png" style="width: 80rpx; height: 80rpx;" :class="musicClass" @click="musicBtn()"></image>
	     </view>
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
		   <view class="plr15" v-if="item.type === 'rich-text'">
			   <view class="mt16 article-content">
			       <rich-text  :nodes="htmlParese(item.cdata.txt)"></rich-text>
			   </view>
		   </view>
		   <view class="plr15" v-if = "item.type === 'base-video'">
			   <view class="mt16">
			      <video :poster="'http://img.hazer.top/'+item.cdata.poster" style="width: 100%; height: 182px;" :src="'http://img.hazer.top'+item.cdata.src"></video>
		       </view>
		   </view>
		   <view class="plr15" v-if = "item.type === 'horizontal-list'">
			   <view class="mt24" v-for="(listItem,index) in item.cdata.listData" :key="index">
				   <view class="box pd16_15 flex alcenter mt16">
					<image class="integral-tuan-l" :src="'http://img.hazer.top/'+listItem.img" @tap="_previewImage(listItem.img)"></image>
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
						<image class="integral-mall-goods" :src="'http://img.hazer.top/'+listItem[0].img" @tap="_previewImage(listItem[0].img)"></image>
						<view class="mt8 ft14 ftw600 text-center cl-main">{{listItem[0].title}}</view>
						<view class="text-center mt8 ft12 cl-notice">{{listItem[0].desc}}</view>
					</view>
					<view class="box pd16_15" style="width: 330rpx;">
						<image class="integral-mall-goods" :src="'http://img.hazer.top/'+listItem[1].img" @tap="_previewImage(listItem[1].img)"></image>
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
		   <view class="pd16_15" v-if="item.type === 'coupon'">
			   <view class="box over-hide">
			   	<view class="card-box-header">
			   		<view class="main pd24_15">
			   			<view class="flex space">
			   				<view>
			   					<view class="ft18 ftw600 cl-w"><span class="ft24">{{item.cdata.money}}</span>元优惠券</view>
			   				</view>
							<view>
								<view class="tag-save">
									{{item.cdata.condition}}
								</view>
								<view class="mt10 ml10">
									<text class="cl-w ft10">{{item.cdata.time}}</text>
								</view>
							</view>
			   				
			   			</view>
			   		</view>
			   	</view>
			   	<view class="pd10_15 flex alcenter space">
			   		<view class="ft12 cl-notice">{{item.cdata.shop}}</view>
			   	</view>
			   </view>
		   </view>
		   <view class="pd16_15" v-if="item.type === 'tscroll'">
			   <scroll-view class="vip-coupon-scroll" :scroll-x="true">
			   	<view class="item" v-for="(listItem, index) in item.cdata.listData" :key="index">
					<image style="width: 240rpx;height: 230rpx;" :src="'http://img.hazer.top/'+listItem.img" @tap="_previewImage(listItem.img)"></image>
			   		<view class="mt12 flex center">
			   			<view class="btn-small" style="color:#000000;width: 190rpx;">{{listItem.title}}</view>
			   		</view>
			   	</view>
			</scroll-view>
		   </view>
		   <view class="pd16_15" v-if="item.type === 'mytebs'">
			   <view class="tuan-detail-content-tab">
				   <sub-tabnav :tabs="item.cdata.tebs"  @change="changeIndex" :selectIndex="selectIndex" :scrollTop="tebTop"></sub-tabnav>
			   </view>
			   <view v-for="(teb, index) in item.cdata.tebs" v-if="selectIndex == index" class="pd16_15">
			   	<view class="ft14 cl-main  lh20 mb16">{{teb.name}}</view>
			   </view>
		   </view>
         </view>
		 <!-- <com-copyright></com-copyright> -->
		 <!-- <view v-if="gotop === true" class="top"  :style="{'display':(topState===true? 'block':'none')}">
		     <uni-icons class="topc" type="arrowthinup" size="50" @click="top"></uni-icons>
		 </view> -->
		
     </view>
	 <view v-if="menu != null">
	 	<com-footer :model="model" :menu="menu" :clientId="clientId"></com-footer>
	 </view>
	 
   </view>
</template>
 
<script>
  import {mapState} from "vuex";
  import htmlPareser from '@/commen/html-parse.js'
  import myshare from '../../components/wx/share.js'

  export default{
    data(){
      return{
        msg:'',
        old: {
            scrollTop: 0
        },
		tebTop:0,
		selectIndex:0,
		display: true,
		autoH:"",
		autoW:"",
		bgMusic: false,
		musicClass: '',
		muteBgMusic: true,
		clientId:'',
		gotop: false,
		topState: false,
		menu : '',
		content: '',
		model: 'card1',
		nodes: [{
		            name: 'div',
		            attrs: {
		                class: 'div-class',
		                style: 'line-height: 60px; color: red; text-align:center;'
		            },
		            children: [{
		                type: 'text',
		                text: 'Hello&nbsp;uni-app!'
		            }]
		        }]
	    }
    },
	onLoad(option) {
		let url;
		console.log(option.model)
		if(option.preview == 1){
			url = 'http://yima.hazer.top/api/preview/getInfo/'+option.uid;
		}else{
			if(option.model == undefined){
				url = 'http://yima.hazer.top/api/getInfo?clientId='+option.clientId;
			}else{
				this.model = option.model
				url = 'http://yima.hazer.top/api/getInfo?clientId='+option.clientId+'&pageCode='+option.model;
			}
		}
		let en = window.navigator.userAgent.toLowerCase();
        if(en.match(/MicroMessenger/i) == 'micromessenger'){
			console.log("wx env");
			myshare.myshare('测试','test','test','http://img.hazer.top//tag/h5-yima-1635232559577.jpeg');
		}
		this.clientId = option.clientId
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
			  this.bgMusic = config.bgMusic;
			  this.menu = config.bottomMenu;
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
	  changeIndex(index){
		this.selectIndex = index;
	  },
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
	  　　},
	  preview(src, e) {  //事件：点击富文本里的图片
	        // do something
	      },
	  navigate(href, e) {  //事件：点击富文本里的链接
	        // do something
	  },
	  htmlParese(html){
		  return htmlPareser(html);
	  },
	  musicBtn() {
	  		 let _that = this;
	  	     this.muteBgMusic = !this.muteBgMusic
	  	     console.log(this.muteBgMusic,this.muteBgMusic?'已关闭音乐####':'已开启音乐####');      
	  	     if (this.muteBgMusic) {
	  	          // 开启静音
	  			  uni.createSelectorQuery().in(this).select("#music").boundingClientRect(data=>{
	  				  _that.musicClass = ""
	  			  }).exec()
	  	         this.$music.playBgm({mute:true})
	  			 }
	  	      else {
	  	          // 关闭 静音
	  			  uni.createSelectorQuery().in(this).select("#music").boundingClientRect(data=>{
	  			  	  _that.musicClass = "img-rotate"
	  			  }).exec()
	  	          this.$music.playBgm({mute:false})
	  			}
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
	.article-content{
		padding: 0, 30rpx;
		overflow: hidden;
		font-size: 30rpx;
		margin-bottom: 30rpx;
	}
	@-webkit-keyframes rotation{
		  from {-webkit-transform: rotate(0deg);}
		  to {-webkit-transform: rotate(360deg);}
		}
		
		.img-rotate{
		  -webkit-transform: rotate(360deg);
		  animation: rotation 1.4s linear infinite;
		  -moz-animation: rotation 1.4s linear infinite;
		  -webkit-animation: rotation 1.4s linear infinite;
		  -o-animation: rotation 1.4s linear infinite;
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
		.card-box-header{
			height: 182rpx;
			width: 100%;
			position: relative;
			background: #E4A216;
		}
		.card-box-header .main{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 232rpx;
		}
		.card-box-header .bg{
			width: 100%;
			height: 182rpx;
		}
		.tag-card{
			width: 64rpx;
			height: 32rpx;
			background: linear-gradient(139deg, #FFE5AD 0%, #FFBC5C 100%);
			border-radius: 4rpx;
			font-size: 24rpx;
			text-align: center;
			line-height: 32rpx;
			color: #A86B1B;
		}
		.tag-save{
			width: 238rpx;
			height: 40rpx;
			background: #ffffff;
			border-radius: 20rpx;
			font-size: 24rpx;
			text-align: center;
			line-height: 40rpx;
			color:#E4A216;
			font-weight: 600;
		}
		.vip-coupon-scroll{
			white-space: nowrap;
			height: 360rpx;
		}
		.vip-coupon-scroll .item{
			height: 360rpx;
			display: inline-block;
			width: 270rpx;
			background: #FFFFFF;
			position: relative;
			border-radius: 16rpx;
			overflow: hidden;
		}
		.vip-coupon-scroll .item .top{
			padding: 32rpx 40rpx 24rpx 40rpx;
			border-bottom: 2rpx dashed #FEC675;
		}
		.vip-coupon-scroll .item .y-l,.vip-coupon-scroll .item .y-r{
			width: 20rpx;
			height: 20rpx;
			border-radius: 10rpx;
			background: #F87065;
			position: absolute;
			z-index: 2;
			top: 220rpx;
		}
		.vip-coupon-scroll .item .y-l{
			left: -10rpx;
		}
		.vip-coupon-scroll .item .y-r{
			right: -10rpx;
		}
		.tuan-detail-content-tab{
			height: 102rpx;
		}
</style>