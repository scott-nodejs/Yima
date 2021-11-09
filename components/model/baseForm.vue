<template>
	<view class="pd16_15">
		
		<view v-if="formData.dictWay == 0" class="box pd20_15">
			<div v-for="(item, index) in formData.cdata.form" :key="index">
				<view class="flex alcenter" v-if="item.type === 'text'">
					<view class="ft14 cl-main" style="margin-left: -10rpx;color: #FF3D3D;" v-if="item.isNecessary === 1">*</view>
					<view class="ft14 cl-main" style="width: 144rpx;">
						{{item.desc}}
					</view>
					<view style="width: calc(100% - 144rpx);">
						<input :maxlength="64" v-model="item.val" :placeholder="item.placeholder"  class="ft14 cl-main" placeholder-class="cl-notice" />
					</view>
				</view>
				<view class="flex alcenter" v-if="item.type === 'number'">
					<view class="ft14 cl-main" style="margin-left: -10rpx;color: #FF3D3D;" v-if="item.isNecessary === 1">*</view>
					<view class="ft14 cl-main" style="width: 144rpx;">
						{{item.desc}}
					</view>
					<view style="width: calc(100% - 144rpx);">
						<input :maxlength="64" type="number" v-model="item.val" :placeholder="item.placeholder"  class="ft14 cl-main" placeholder-class="cl-notice" />
					</view>
				</view>
				<view class="flex alcenter" v-else-if="item.type === 'radio'">
					<view class="ft14 cl-main" style="margin-left: -10rpx;color: #FF3D3D;" v-if="item.isNecessary === 1">*</view>
					<view class="ft14 cl-main" style="width: 144rpx;">
						{{item.desc}}
					</view>
					<view class="flex alcenter" style="width: calc(100% - 144rpx);">
						<radio-group @change="changeDefaultRadio">
							<view  v-for="(option, idx) in item.options">
								<radio :value="option.val"  :checked="option.is_default == 1"  :color="tempColor"  />
								<text class="ml10 ft14 cl-info2">{{option.val}}</text>
							</view>
						</radio-group>
					</view>
				</view>
				<view class="flex alcenter" v-else-if="item.type === 'checkbox'">
					<view class="ft14 cl-main" style="margin-left: -10rpx;color: #FF3D3D;" v-if="item.isNecessary === 1">*</view>
					<view class="ft14 cl-main" style="width: 144rpx;">
					  {{item.desc}}
					</view>
					<view style="width: calc(100% - 144rpx);">
						<checkbox-group @change="changeDefaultCheckbox">
							<view v-for="(option, idx) in item.options">
								<checkbox :value="option.val"  :checked="option.is_default == 1"  :color="tempColor"  />
								<text class="ml10 ft14 cl-info2">{{option.val}}</text>
							</view>
						</checkbox-group>
					</view>
				</view>
				<view class="flex alcenter" v-else-if="item.type === 'select'">
					<view class="ft14 cl-main" style="margin-left: -10rpx;color: #FF3D3D;" v-if="item.isNecessary === 1">*</view>
					<view class="ft14 cl-main" style="width: 144rpx;">
						{{item.desc}}
					</view>
					<picker @change="bindPickerChange($event)" :value="count" :range="item.options"  range-key="val">
						<view class="ft14 cl-main">{{item.options[count].val}}</view>
					</picker>
				</view>
				<view class="flex alcenter" v-else-if="item.type === 'date'">
					<view class="ft14 cl-main" style="margin-left: -10rpx;color: #FF3D3D;" v-if="item.isNecessary === 1">*</view>
					<view class="ft14 cl-main" style="width: 144rpx;">
						{{item.desc}}
					</view>
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					     <view class="ft14 cl-main">{{date}}</view>
					</picker>
				</view>
				<view class="bd-line mt20 mb20" v-if="index != formData.cdata.form.length - 1"></view>
			</div>
		</view>
		<view v-else class="box pd20_15">
			<div v-for="(item, index) in formData.cdata.form" :key="index">
				<view class="alcenter" v-if="item.type === 'text'">
					<view class="flex alcenter b5">
						<view class="ft14 cl-main" style="margin-left: -10rpx;color: #FF3D3D;" v-if="item.isNecessary === 1">*</view>
						<view class="ft14 cl-main" >
							{{item.desc}}
						</view>
					</view>
					<view>
						<input :maxlength="64" v-model="item.val" :placeholder="item.placeholder"  class="ft14 cl-main" placeholder-class="cl-notice" />
					</view>
				</view>
				<view class="alcenter" v-if="item.type === 'number'">
					<view class="flex alcenter b5">
						<view class="ft14 cl-main" style="margin-left: -10rpx;color: #FF3D3D;" v-if="item.isNecessary === 1">*</view>
						<view class="ft14 cl-main">
							{{item.desc}}
						</view>
					</view>
					<view>
						<input :maxlength="64" type="number" v-model="item.val" :placeholder="item.placeholder"  class="ft14 cl-main" placeholder-class="cl-notice" />
					</view>
				</view>
				<view class="alcenter" v-else-if="item.type === 'radio'">
					<view class="flex alcenter b5">
						<view class="ft14 cl-main" style="margin-left: -10rpx;color: #FF3D3D;" v-if="item.isNecessary === 1">*</view>
						<view class="ft14 cl-main">
							{{item.desc}}
						</view>
					</view>
					<view class="alcenter">
						<radio-group @change="changeDefaultRadio">
							<view  v-for="(option, idx) in item.options">
								<radio :value="option.val"  :checked="option.is_default == 1"  :color="tempColor"  />
								<text class="ml10 ft14 cl-info2">{{option.val}}</text>
							</view>
						</radio-group>
					</view>
				</view>
				<view class="alcenter" v-else-if="item.type === 'checkbox'">
					<view class="flex alcenter b5">
						<view class="ft14 cl-main" style="margin-left: -10rpx;color: #FF3D3D;" v-if="item.isNecessary === 1">*</view>
						<view class="ft14 cl-main">
							{{item.desc}}
						</view>
					</view>
					<view>
						<checkbox-group @change="changeDefaultCheckbox">
							<view v-for="(option, idx) in item.options">
								<checkbox :value="option.val"  :checked="option.is_default == 1"  :color="tempColor"  />
								<text class="ml10 ft14 cl-info2">{{option.val}}</text>
							</view>
						</checkbox-group>
					</view>
				</view>
				<view class="alcenter" v-else-if="item.type === 'select'">
					<view class="flex alcenter b5">
						<view class="ft14 cl-main" style="margin-left: -10rpx;color: #FF3D3D;" v-if="item.isNecessary === 1">*</view>
						<view class="ft14 cl-main">
							{{item.desc}}
						</view>
					</view>
					<picker @change="bindPickerChange($event)" :value="count" :range="item.options"  range-key="val">
						<view class="ft14 cl-main">{{item.options[count].val}}</view>
					</picker>
				</view>
				<view class="alcenter" v-else-if="item.type === 'date'">
					<view class="flex alcenter b5">
						<view class="ft14 cl-main" style="margin-left: -10rpx;color: #FF3D3D;" v-if="item.isNecessary === 1">*</view>
						<view class="ft14 cl-main">
							{{item.desc}}
						</view>
					</view>
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					     <view class="ft14 cl-main">{{date}}</view>
					</picker>
				</view>
				<view class="bd-line fmt20 mb20" v-if="index != formData.cdata.form.length - 1"></view>
			</div>
		</view>
		<view class="mt24">
			<button class="btn-big" :style="getBtnStyle" @click="submit()">确定保存</button>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			const currentDate = this.getDate({
			    format: true
			})
			return {
				date: currentDate,
				count: 0
			}
		},
		props:{
			formData:{
				type: Object
			}
		},
		computed: {
		    startDate() {
		        return this.getDate('start');
		    },
		    endDate() {
		        return this.getDate('end');
		    }    
		},
		methods:{
			changeDefault(){
				this.form.is_default = this.form.is_default == 0 ? 1 : 0;
			},
			changeDefaultRadio(e){
				let val = e.detail.value;
				for(let i = 0; i < this.formData.cdata.form.length; i++){
					let item = this.formData.cdata.form[i];
					if(item.type === 'radio'){
						item.val = val;
						break;
					}
				}
			},
			changeDefaultCheckbox(e){
				console.log(e)
				let val = e.detail.value;
				for(let i = 0; i < this.formData.cdata.form.length; i++){
					let item = this.formData.cdata.form[i];
					if(item.type === 'checkbox'){
						item.val = val.join();
						break;
					}
				}
			},
			bindPickerChange(e){
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.count = e.target.value
				for(let i = 0; i < this.formData.cdata.form.length; i++){
					let item = this.formData.cdata.form[i];
					if(item.type === 'select'){
						item.val = item['options'][this.count].val
						break;
					}
				}
			},
			bindDateChange: function(e) {
			    this.date = e.target.value
				for(let i = 0; i < this.formData.cdata.form.length; i++){
					let item = this.formData.cdata.form[i];
					if(item.type === 'date'){
						item.val = this.date
						break;
					}
				}
			},
			submit(){
				let flag = true;
				let url = 'http://yima.hazer.top/api/submit';
				for(let i = 0; i < this.formData.cdata.form.length; i++){
					if(this.formData.cdata.form[i].isNecessary === 1 && this.formData.cdata.form[i].val === ''){
						if(this.formData.cdata.form[i].type === 'date'){
							this.formData.cdata.form[i].val = this.getDate({format: true});
							continue;
						}
						flag = false;
						uni.showToast({ 
						    title: this.formData.cdata.form[i].desc+'是必填项',
							duration: 1000,
							icon:'none'
						}) 
						break;
					}
				}
				if(flag){
					new Promise((resolve, reject)=>{uni.request({
						url: url,
						method: 'POST',
						header:{
							'content-type':'application/json'
						},
						data: {
							obj: this.formData.cdata.form,
							codeId: this.formData.codeId
						},
						success(res) {
							resolve(res)
						}
					})}).then(res=>{
						uni.showToast({
							title: '操作成功',
							duration: 1000
						});
						console.log(this.formData)
						for(let i = 0; i < this.formData.cdata.form.length; i++){
							
							let item = this.formData.cdata.form[i];
							if(item.type === 'select' || item.type === 'radio' || item.type === 'checkbox'){
								
							}else{
								item.val = ''
							}
						}
					})
				}
			},
			getDate(type) {
			    const date = new Date();
			    let year = date.getFullYear();
			    let month = date.getMonth() + 1;
			    let day = date.getDate();
			    			
			    if (type === 'start') {
			        year = year - 60;
			    } else if (type === 'end') {
			        year = year + 2;
			    }
			    month = month > 9 ? month : '0' + month;
			    day = day > 9 ? day : '0' + day;
			    return `${year}-${month}-${day}`;        
			}
		}
	}
</script>

<style>
	.fmt20{margin-top: 10rpx;}
	.b5{margin-bottom: 30rpx;}
</style>