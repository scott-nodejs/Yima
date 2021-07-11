<template>
    <view>
        <view class="page-body">
            <view class="page-section page-section-gap">
                <map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers">
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
            markers: [{
                width : 40,
                height: 40,
                latitude: 39.909,
                longitude: 116.39742,
                iconPath: '../../../static/p.png'
            }]
        }
    },
	onLoad(option) {
		this.latitude = option.lat;
		this.longitude = option.lng;
	},
    methods: {
    }
}
</script>
<style>
	
</style>
