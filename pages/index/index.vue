<template>
   <view>
     <scroll-view 
     scroll-y="true" 
     :scroll-with-animation="true" 
     @scroll="scroll">
         <view class="scroll-view-item"  v-for="(item,idx) in recommendArr" :key="idx">
           <view v-if="item.type === 'head'">
			   <head-myHeader :headerType='headerType' :cardData="cardData"></head-myHeader>
		   </view>
           <view style="position: relative;box-sizing: border-box;" v-if="item.type === 'text'">
			   <view>
				   <view class="title_level1" v-bind:style="{fontSize: item.setData.fontSize +'px'}" style="padding: 15px;line-height: 1.5;text-align: left;" >{{item.temData.txt}}</view>
			   </view>
           </view>
		   <view v-if="item.type === 'image'">
				<image style="width: 100%;" mode="widthFix"  :src="'https://wximg.aliyinba.com/'+item.temData.img"></image>
		   </view>
		   <view v-if="item.type === 'advert'">
			   <com-banner :adData="item.temData.advertList"></com-banner>
		   </view>
		   <!-- <view v-if="item.type === 'richtext'">
			   <view v-html="item.temData"></view>
		   </view> -->
		   <view v-if = "item.type === 'video'">
			   <video style="width: 100%;height: 182px;" :src="'https://wximg.aliyinba.com/'+item.temData.src"></video>
		   </view>
         </view>
		 <com-copyright></com-copyright>
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
		autoH:"",
		autoW:""
      }
    },
	onLoad(option) {
		console.log(option.cardID);
		let url = 'https://api.hutuiai.com/api/CardPage/GetInfo?__rnd=1625017806792&cardId='+option.cardID+'&pageType=card';
		new Promise((resolve, reject) =>{
			uni.request({
			   url: url,
			   success: function (res) {
				resolve(res)
			   }
			  });
		  }).then((res)=>{
			  var data = JSON.parse(res.data.data.Elements);
			  console.log(data);
			  this.$store.commit('updateRecommend',data);
		  })
	},
    methods:{
      scroll: function(e) {
          this.old.scrollTop = e.detail.scrollTop
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
.scroll-view-item image{
  width: 100%;
  height: 120rpx;
  border-radius: 10rpx;
}
.title_level1{
  font-size: 18px;
  
}
.title_level2{
  font-size: 24rpx;
  color: #C8C7CC;
}
</style>