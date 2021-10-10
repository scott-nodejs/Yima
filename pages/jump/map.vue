<template>
    <view>
        <view class="page-body">
            <view class="page-section page-section-gap">
                <map style="width: 100%; height: 1500rpx;" :latitude="latitude" :longitude="longitude" :markers="markers">
                </map>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    data() {
        return {
            title: 'map',
            latitude: 39.909,
            longitude: 116.39742,
            markers: []
        }
    },
	onLoad(option) {
		console.log(option.lnglat);
		let arr = option.lnglat.split(',');
		console.log(arr)
		this.latitude = arr[1];
		this.longitude = arr[0];
	},
	onShow() {
		this.markers=[{
			    width : 40,
			    height: 60,
			    latitude: this.latitude,
			    longitude: this.longitude,
			    iconPath: '../../static/p.png'
			}]
	}
}
</script>
<style>
	
</style>
