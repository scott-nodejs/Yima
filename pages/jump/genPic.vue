<template>
	<view style="text-align: center;">
		<canvas canvas-id="myCanvas" style="width: 690px;height:1040px; position: fixed;top: -10000px;"></canvas>
		<image @click="saveShareImg(canvasToTempFilePath)" style="width: 690upx; height: 1040upx; text-align: center;" :src="canvasToTempFilePath" mode=""></image>
	</view>
</template>
 
<script>
export default {
	onLoad(option) {
		console.log(option)
		this.coverUrl = option.coverImg;
		this.company = option.company;
		this.createCanvasImage();
	},
	data() {
		return {
			ratio: 1,
			ctx: null, // 创建canvas对象
			canvasToTempFilePath: null, // 保存最终生成的导出的图片地址
			openStatus: true, // 声明一个全局变量判断是否授权保存到相册
			coverUrl: '',
			company: ''
		};
	},
	methods: {
		// 生成海报
		async createCanvasImage() {
			let self = this;
			// 点击生成海报数据埋点
			if (!self.ctx) {
				let codeUrl = 'http://img.hazer.top/tag/h5-yima-1633836060996.jpeg';
				let headUrl = 'http://img.hazer.top/tag/h5-yima-1633836060996.jpeg';
				uni.showLoading({
					title: '生成中...'
				});
				let code = new Promise(function(resolve) {
					uni.getImageInfo({
						src: codeUrl,
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
 
				// 头像
				let headImg = new Promise(function(resolve) {
					uni.getImageInfo({
						src: headUrl,
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
 
				Promise.all([headImg, code,cover]).then(function(result) {
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
						
					//ctx.drawImage('../../static/bg.jpg', 0, 0, 690, 1040); // 背景图片需要本地
					
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
					
	// 				ctx.font = 'normal bold 45px sans-serif';
	// 				ctx.setFillStyle('#ffffff'); // 文字颜色
	// 				ctx.fillText('微信昵称', 240, 85); // 绘制文字
 
	// 				ctx.setFillStyle('#ffffff'); // 文字颜色
	// 				ctx.setFontSize(30); // 文字字号
	// 				ctx.fillText('推荐您来捷通驾校', 240, 130); // 绘制文字
 
					ctx.font = 'normal bold 40px sans-serif';
					ctx.setFillStyle('#222222');
					ctx.fillText('上捷通驾校', 40, 600);
 
					ctx.font = 'normal normal 26px sans-serif';
					ctx.setFillStyle('#666666'); // 文字颜色
					ctx.fillText('上海市松江区小昆山镇平原街398号5号楼', 40, 640); // 绘制文字
					
					// 白底
					ctx.setFillStyle('#CBE6FE')
					ctx.fillRect(40, 670, 125, 40)
 
					ctx.font = 'normal normal 24px sans-serif';
					ctx.setFillStyle('#1F8DFE'); // 文字颜色
					ctx.fillText('自有考场', 55, 700); // 绘制文字
					
					// 白底
					ctx.setFillStyle('#FDE5D2')
					ctx.fillRect(180, 670, 125, 40)
					
					ctx.setFillStyle('#F37F26'); // 文字颜色
					ctx.fillText('收费透明', 195, 700); // 绘制文字
					
					// 白底
					ctx.setFillStyle('#D2F1EF')
					ctx.fillRect(320, 670, 125, 40)
					
					ctx.setFillStyle('#2EBBB4'); // 文字颜色
					ctx.fillText('有接送', 335, 700); // 绘制文字
					
 
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
					ctx.fillText('小程序码', 444, 870); // 绘制孩子百分比
					
					ctx.font = 'normal normal 36px sans-serif';
					ctx.setFillStyle('#222222'); // 文字颜色
					ctx.fillText('查看驾校详细信息', 300, 920); // 绘制孩子百分比
					
					ctx.drawImage(result[2], coverurl_x, coverurl_y, coverurl_width, coverurl_heigth); // 绘制封面
					ctx.drawImage(result[1], codeurl_x, codeurl_y, codeurl_width, codeurl_heigth); // 绘制头像
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
				wx.openSetting({
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
				wx.getSetting({
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
 
<style></style>