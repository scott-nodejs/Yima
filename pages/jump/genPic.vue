<template>
	<view style="text-align: center;">
		<view class="post">
		    <tki-qrcode
		        ref="qrcode"
		        :val="val"
		        :size="200"
		        background="#fff"
		        foreground="#000"
		        pdground="#000"
		        :onval="false"
		        :loadMake="false"
		        @result="createCanvasImage"
		        :show="false"
		    ></tki-qrcode>
		    <view class="wrapper"><canvas canvas-id="myCanvas" style="width: 690px;height:1040px; position: fixed;top: -10000px;"></canvas></view>
		</view>
		<image @click="saveShareImg(canvasToTempFilePath)" style="width: 690upx; height: 1040upx; text-align: center;" :src="canvasToTempFilePath" mode=""></image>
	</view>
</template>
 
<script>
import tkiQrcode from '@/components/qrcode/tki-qrcode.vue';	
export default {
	components: {
	    tkiQrcode
	},
	onLoad(option) {
		console.log(option)
		this.coverUrl = option.coverImg;
		this.company = option.company;
		this.address = option.address;
		this.phone = option.phone;
		this.weixin = option.weixin;
		this.userName = option.userName;
		this.val = 'http://yima.hazer.top/h5/?clientId='+option.clientId;
		// this.createCanvasImage();
	},
	onReady() {
		this.$refs.qrcode._makeCode();
	},
	data() {
		return {
			ratio: 1,
			ctx: null, // 创建canvas对象
			canvasToTempFilePath: null, // 保存最终生成的导出的图片地址
			openStatus: true, // 声明一个全局变量判断是否授权保存到相册
			coverUrl: '',
			company: '',
			address:'',
			weixin:'',
			phone:'',
			userName:'',
			val: '',
		};
	},
	methods: {
		// 生成海报
		async createCanvasImage(path) {
			console.log('path:'+path)
			let self = this;
			// 点击生成海报数据埋点
			if (!self.ctx) {
				uni.showLoading({
					title: '生成中...'
				});
				
				let cover = new Promise(function(resolve) {
					uni.getImageInfo({
						src: 'http://img.hazer.top/'+self.coverUrl,
						success: function(res) {
							resolve(res.path);
						},
						fail: function(err) {
							console.log(err);
							wx.showToast({
								title: '网络错误请重试',
								icon: 'loading'
							});
						}
					});
				});
 
 
				Promise.all([path,cover]).then(function(result) {
					const ctx = uni.createCanvasContext('myCanvas');
					console.log(ctx, self.ratio, 'ctx');
					let canvasWidthPx = 690 * self.ratio,
						canvasHeightPx = 1040 * self.ratio,
						
						avatarurl_width = 110, //绘制的头像宽度
						avatarurl_heigth = 110, //绘制的头像高度
						avatarurl_x = 95, //绘制的头像在画布上的位置
						avatarurl_y = 35, //绘制的头像在画布上的位置
						
						codeurl_width = 180, //绘制的二维码宽度
						codeurl_heigth = 180, //绘制的二维码高度
						codeurl_x = 70, //绘制的二维码在画布上的位置
						codeurl_y = 800, //绘制的二维码在画布上的位置
						
						coverurl_width = 610, //绘制的封面宽度
						coverurl_heigth = 350, //绘制的封面高度
						coverurl_x = 40, //绘制的封面在画布上的位置
						coverurl_y = 190; //绘制的封面在画布上的位置
						
					ctx.drawImage('../../static/bg.jpg', 0, 0, 690, 1040); // 背景图片需要本地
					
					// 白底
					ctx.setFillStyle('#ffffff')
					ctx.fillRect(25, 175, 640, 840)
					
					ctx.save(); // 先保存状态 已便于画完圆再用
					ctx.beginPath(); //开始绘制
					//先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
	// 				ctx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);
	// 				ctx.clip(); //画了圆 再剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内
	// 				ctx.drawImage(result[0], avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth); // 推进去图片
 
					// ctx.restore(); //恢复之前保存的绘图上下文状态 可以继续绘制
					
					ctx.font = 'normal bold 45px sans-serif';
					ctx.setFillStyle('#ffffff'); // 文字颜色
					ctx.fillText('亿码科技', 240, 85); // 绘制文字
 
					ctx.setFillStyle('#ffffff'); // 文字颜色
					ctx.setFontSize(30); // 文字字号
					ctx.fillText('提供技术支持', 240, 130); // 绘制文字
 
					ctx.font = 'normal bold 40px sans-serif';
					ctx.setFillStyle('#222222');
					ctx.fillText(self.company, 40, 600);
 
					ctx.font = 'normal normal 26px sans-serif';
					ctx.setFillStyle('#666666'); // 文字颜色
					ctx.fillText(self.userName, 40, 640); // 绘制文字
					
					ctx.font = 'normal normal 26px sans-serif';
					ctx.setFillStyle('#666666'); // 文字颜色
					ctx.fillText(self.phone, 40, 680); // 绘制文字
					
					ctx.font = 'normal normal 26px sans-serif';
					ctx.setFillStyle('#666666'); // 文字颜色
					ctx.fillText(self.weixin, 40, 720); // 绘制文字
					
					ctx.font = 'normal normal 26px sans-serif';
					ctx.setFillStyle('#666666'); // 文字颜色
					ctx.fillText(self.address, 40, 760); // 绘制文字
 
					ctx.beginPath();
					// 设置线宽
					ctx.lineWidth = 1;
					// 设置间距（参数为无限数组，虚线的样式会随数组循环）
					ctx.setLineDash([10, 10]);
					// 移动画笔至坐标 x20 y20 的位置
					ctx.moveTo(30, 760);
					// 绘制到坐标 x20 y100 的位置
					ctx.lineTo(660, 760);
					// 填充颜色
					ctx.strokeStyle="#aaaaaa";
					// 开始填充
					ctx.stroke();
					ctx.closePath();
					
					ctx.font = 'normal normal 36px sans-serif';
					ctx.setFillStyle('#E65449'); // 文字颜色
					ctx.fillText('长按识别', 300, 870); // 绘制孩子百分比
					
					ctx.font = 'normal normal 36px sans-serif';
					ctx.setFillStyle('#222222'); // 文字颜色
					ctx.fillText('二维码', 444, 870); // 绘制孩子百分比
					
					ctx.font = 'normal normal 36px sans-serif';
					ctx.setFillStyle('#222222'); // 文字颜色
					ctx.fillText('查看更多详细信息', 300, 920); // 绘制孩子百分比
					
					ctx.drawImage(result[1], coverurl_x, coverurl_y, coverurl_width, coverurl_heigth); // 绘制封面
					ctx.drawImage(result[0], codeurl_x, codeurl_y, codeurl_width, codeurl_heigth); // 绘制头像
					ctx.draw(false, function() {
						// canvas画布转成图片并返回图片地址
						uni.canvasToTempFilePath({
							canvasId: 'myCanvas',
							success: function(res) {
								self.canvasToTempFilePath = res.tempFilePath;
								self.showShareImg = true;
								console.log(res.tempFilePath, 'canvasToTempFilePath');
								uni.showToast({
									title: '绘制成功'
								});
							},
							fail: function() {
								uni.showToast({
									title: '绘制失败'
								});
							},
							complete: function() {
								uni.hideLoading();
								uni.hideToast();
							}
						});
					});
				});
			}
		},
 
		// 保存到系统相册
		saveShareImg: function(canvasToTempFilePath) {
			let self = this;
			// 数据埋点点击保存海报
			self.saveId = '保存学情海报';
			// 获取用户是否开启用户授权相册
			if (!self.openStatus) {
				uni.openSetting({
					success: result => {
						if (result) {
							if (result.authSetting['scope.writePhotosAlbum'] === true) {
								self.openStatus = true;
								wx.saveImageToPhotosAlbum({
									filePath: canvasToTempFilePath,
									success() {
										self.showShareImg = false;
										wx.showToast({
											title: '图片保存成功，快去分享到朋友圈吧~',
											icon: 'none',
											duration: 2000
										});
									},
									fail() {
										wx.showToast({
											title: '保存失败',
											icon: 'none'
										});
									}
								});
							}
						}
					},
					fail: () => {},
					complete: () => {}
				});
			} else {
				uni.getSetting({
					success(res) {
						// 如果没有则获取授权
						if (!res.authSetting['scope.writePhotosAlbum']) {
							wx.authorize({
								scope: 'scope.writePhotosAlbum',
								success() {
									self.openStatus = true;
									wx.saveImageToPhotosAlbum({
										filePath: canvasToTempFilePath,
										success() {
											self.showShareImg = false;
											wx.showToast({
												title: '图片保存成功，快去分享到朋友圈吧~',
												icon: 'none',
												duration: 2000
											});
										},
										fail() {
											wx.showToast({
												title: '保存失败',
												icon: 'none'
											});
										}
									});
								},
								fail() {
									// 如果用户拒绝过或没有授权，则再次打开授权窗口
									self.openStatus = false;
									console.log('请设置允许访问相册');
									wx.showToast({
										title: '请设置允许访问相册',
										icon: 'none'
									});
								}
							});
						} else {
							// 有则直接保存
							self.openStatus = true;
							wx.saveImageToPhotosAlbum({
								filePath: canvasToTempFilePath,
								success() {
									self.showShareImg = false;
									wx.showToast({
										title: '图片保存成功，快去分享到朋友圈吧~',
										icon: 'none',
										duration: 2000
									});
								},
								fail() {
									wx.showToast({
										title: '保存失败',
										icon: 'none'
									});
								}
							});
						}
					},
					fail(err) {
						console.log(err);
					}
				});
			}
		}
	}
};
</script>
 
<style lang="scss">
	.post {
	    height: 100%;
	    background-color: #f4f4f4;
	
	    .wrapper {
	        height: 20rpx;
	        display: flex;
	        justify-content: center;
	        align-items: center;
	        margin-top: 50upx;
	    }
	}
</style>