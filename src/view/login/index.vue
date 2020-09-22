<template>

  <div class="head">
	<!-- 导航栏 -->
	<router-link   to="/home">
		<van-nav-bar left-text="" left-arrow />
	</router-link>
	
    <font class="head_title">{{ msg }}</font>
		<div  class="content">
			<van-tabs v-model="active">
				<van-tab title="短信登录">
					<van-form >
						<van-field
							v-model="mobile"
							@input="checkMobile"
							name="phone"
							maxlength="11"
							placeholder="请输入手机号"
						/>
						<van-field
							v-model="code"
							center
							@input="checkSms"
							clearable
							maxlength="6"
							placeholder="请输入短信验证码"
						>
							<template #button >
							
								<van-button  :disabled="isSend"
								size="small" type="primary" @click="getSms">
									<font v-show="show">发送验证码</font>
									<van-count-down
										class="block"
										v-show="!show"
										ref="countDown"
										second
										:time="1000 * 60"
										:auto-start="false"
										format="已发送(sss) "
										@finish="finish"
									/>
								</van-button>
							</template>
							
						</van-field>
						<font class="content-text">未注册的手机号验证后自动创建账户</font>
						<div style="margin: 16px;">
							<van-button round block type="info" :disabled="isSubmit" native-type="button" @click="loginBySms">
								同意协议并登录
							</van-button>
						</div>

					</van-form>
					
				</van-tab>
				<van-tab title="密码登录">
					<van-form   @submit="onSubmit">
						<van-field
								v-model="mobile"
								name="pattern"
								placeholder="请输入手机号"
								:rules="[{ pattern, message: '请输入正确的手机号' }]"
							/>
						<van-field
								v-model="password"
								type="password"
								name="密码"
								placeholder="请输入密码"
								:rules="[{ required: true, message: '请填写密码' }]"
							/>
						<!-- TODO:生成图片验证码 -->
						<div style="margin: 16px;">
							<van-button round block type="info" native-type="submit">
								登录
							</van-button>
						</div>

					</van-form>
	
				</van-tab>
			</van-tabs>
		</div>
		
  </div>
</template>

<script>
	import Vue from 'vue';
	//按需导入 vant插件
	import { NavBar } from 'vant';
	import { Tab, Tabs } from 'vant';
	import { Form } from 'vant';
	import { Field } from 'vant';
	import { Button } from 'vant';
	import { Toast } from 'vant';
	import { CountDown } from 'vant';
	//导入登录的js文件
	import login from '@/api/login'


	Vue.use(NavBar);
	Vue.use(Tab);
	Vue.use(Tabs);
	Vue.use(Form);
	Vue.use(Field);
	Vue.use(CountDown);
	Vue.use(Button);
	Vue.use(Toast);
export default {
	data(){
		return{
			msg:'饿了么',
			active: 2,
			mobile: '',
			code: '',
			password:'',
			isSend:true,
			isSubmit:true,
			isloading:false,
			show:true,
			pattern:/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
		}
	},
	methods: {
		onClickLeft() {
      Toast('返回');
    },
    onClickRight() {
      Toast('按钮');
    },
    onSubmit(values) {
			console.log('submit', values);
			login.LoginByPwd(this.mobile, this.password).then(response =>{
				// console.log(response.data.code)
				if (response.data.code == 0){
					Toast.success('登录成功！');
				} else {
						Toast.fail('账号或密码错误，请重新输入');
				}

			})
		},
		//输入手机号11位，允许发送验证码
		checkMobile(values) {
			var pattern = /^\d{11}$/;

			// console.log("mobile",values);
			// console.log(pattern.test(values));
			if (pattern.test(values)){
				this.isSend = false;
			} else {
				this.isSend = true;
			}
			
		},
			//输入验证码6位，允许登录
		checkSms(values) {
			var pattern = /^\d{6}$/;

			// console.log("mobile",values);
			// console.log(pattern.test(values));
			if (pattern.test(values)){
				this.isSubmit = false;
			} else {
				this.isSubmit = true;
			}
			
		},
		getSms() {
			// 生成手机正则匹配式
			var pattern = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
			if (pattern.test(this.mobile)) {
				//输入手机号正确，发送请求
				this.isSend = true;
				this.show = false
				this.start() //调用倒计时失败

				login.getMobileSms(this.mobile)
					.then(response =>{
						console.log("提取成功"+ response.data)
					})
			} else {
				Toast('请输入正确的手机号');
			}
			// console.log("接收到的手机号", this.mobile)
		},
		// 启动发送短信倒计时
		start() {
      this.$refs.countDown.start();
		},
		// 倒计时结束 
		finish() {
		this.isSend = !this.isSend;
		this.show = !this.show;
		this.$refs.countDown.reset();
		},
		//用户进行登录
		loginBySms() {
			login.LoginByCode(this.mobile, this.code) .then( response =>{
				// console.log(response.data.code == 0)
				if (response.data.code == 0){
					Toast.success('登录成功！');
				} else {
						Toast.fail('登录失败！');
				}
			
			})
		},
  },
}
</script>
<style >
body{
	background-color: #ffffff;
}
.head{
	
  text-align: center;
}
.head .van-nav-bar {
	margin-bottom: 100px;
}
.head .head_title {
  font-size: 40px;
	font-weight:bold;
	color:#35AFFB;
}
.van-tabs{
	margin-top: 20px;
	
	
}
.van-tabs__wrap{

	width: 200px;
	margin:0  auto ;
	margin-bottom: 20px;
}
.van-tabs__content{
	width: 300px;

	margin:0  auto ;
}
.block {
    color: #fff;
    font-size: 12px;
    text-align: center;
  }
.content-text{
	color: gray;
	font-size: 10px;

}

</style>
