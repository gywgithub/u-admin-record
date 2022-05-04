<template>
	<div class="login-container">
		<el-form
			ref="loginForm"
			:model="loginForm"
			:rules="loginRules"
			class="login-form"
			auto-complete="on"
			label-position="left"
		>
			<div class="title-container">
				<h3 class="title">柚 询</h3>
			</div>

			<el-form-item prop="username">
				<span class="svg-container">
					<svg-icon icon-class="user" />
				</span>
				<el-input
					ref="username"
					v-model="loginForm.username"
					placeholder="手机号码 或 电子邮箱"
					name="username"
					type="text"
					tabindex="1"
					auto-complete="on"
				/>
			</el-form-item>

			<el-form-item prop="password">
				<span class="svg-container">
					<svg-icon icon-class="password" />
				</span>
				<el-input
					:key="passwordType"
					ref="password"
					v-model="loginForm.password"
					:type="passwordType"
					placeholder=""
					name="password"
					tabindex="2"
					auto-complete="on"
					@keyup.enter.native="handleLogin"
				/>
				<span class="show-pwd" @click="showPwd">
					<svg-icon
						:icon-class="
							passwordType === 'password' ? 'eye' : 'eye-open'
						"
					/>
				</span>
			</el-form-item>
			<el-row :gutter="12">
				<el-col :span="12">
					<el-button
						:loading="loadingReg"
						style="width: 100%"
						type="primary"
						@click.native.prevent="handleRegiter"
						>注 册</el-button
					></el-col
				>
				<el-col :span="12">
					<el-button
						:loading="loadingLogin"
						type="primary"
						style="width: 100%"
						@click.native.prevent="handleLogin"
						>登 录</el-button
					>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script>
import { regiterReq } from "@/api/user";
export default {
	name: "Login",
	data() {
		return {
			loginForm: {
				username: "", //15600117320
				password: "", //123456zpwZPW
			},
			loginRules: {
				username: [
					{
						required: true,
						message: "请输入",
						trigger: "change",
					},
				],
				password: [
					{
						required: true,
						message: "至少六个字符，至少一个小写字母，一个数字",
						trigger: "change",
					},
				],
			},
			loadingLogin: false,
			loadingReg: false,
			passwordType: "password",
			redirect: undefined,
		};
	},
	watch: {
		$route: {
			handler: function (route) {
				this.redirect = route.query && route.query.redirect;
			},
			immediate: true,
		},
	},
	methods: {
		showPwd() {
			if (this.passwordType === "password") {
				this.passwordType = "";
			} else {
				this.passwordType = "password";
			}
			this.$nextTick(() => {
				this.$refs.password.focus();
			});
		},
		checkAccount(username) {
			// let regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			let regEmail =
				/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
			let regPhone =
				/^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
			if (regEmail.test(username) || regPhone.test(username)) {
				return true;
			}
			return false;
		},
		// 字符串转base64
		encode(str) {
			// 对字符串进行编码
			var encode = encodeURI(str);
			// 对编码的字符串转化base64
			var base64 = btoa(encode);
			return base64;
		},
		// base64转字符串
		decode(base64) {
			// 对base64转编码
			var decode = atob(base64);
			// 编码转字符串
			var str = decodeURI(decode);
			return str;
		},
		handleRegiter() {
			if (!this.checkAccount(this.loginForm.username)) {
				this.$message.warning("账号填写错误");
				return;
			}
			//至少六个字符，至少一个小写字母，一个数字
			let regPwd = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,}$/;
			if (!regPwd.test(this.loginForm.password)) {
				this.$message.warning("密码填写错误");
				return;
			}
			let params = {
				loginName: this.loginForm.username,
				userPassword: this.loginForm.password,
			};
			this.loadingReg = true;
			regiterReq(params).then((res) => {
				this.$message.success(res.message);
				this.loadingReg = false;
			});
		},
		randomString(e) {
			e = e || 16;
			var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
				a = t.length,
				n = "";
			for (let i = 0; i < e; i++)
				n += t.charAt(Math.floor(Math.random() * a));
			return n;
		},
		genPassword() {
			let pwdEncodeStr = this.encode(this.loginForm.password);
			let randomStr = this.randomString(32);
			return randomStr + pwdEncodeStr;
		},
		handleLogin() {
			if (!this.checkAccount(this.loginForm.username)) {
				this.$message.warning("账号填写错误");
				return;
			}
			//至少六个字符，至少一个小写字母，一个数字
			let regPwd = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,}$/;
			if (!regPwd.test(this.loginForm.password)) {
				this.$message.warning("密码填写错误");
				return;
			}
			this.$refs.loginForm.validate((valid) => {
				if (valid) {
					this.loadingLogin = true;
					let params = {
						loginName: this.loginForm.username,
						userPassword: this.genPassword(),
					};
					this.$store
						.dispatch("user/login", params)
						.then((res) => {
							if (res.success) {
								localStorage.setItem(
									"userInfo",
									JSON.stringify(res.data.userInfo)
								);
								this.$router.push({ path: "/" });
							} else {
								this.$message.warning(res.message);
							}
							this.loadingLogin = false;
						})
						.catch(() => {
							this.loadingLogin = false;
						});
				} else {
					return false;
				}
			});
		},
	},
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
	.login-container .el-input input {
		color: $cursor;
	}
}

/* reset element-ui css */
.login-container {
	.el-input {
		display: inline-block;
		height: 47px;
		width: 85%;

		input {
			background: transparent;
			border: 0px;
			-webkit-appearance: none;
			border-radius: 0px;
			padding: 12px 5px 12px 15px;
			color: $light_gray;
			height: 47px;
			caret-color: $cursor;

			&:-webkit-autofill {
				box-shadow: 0 0 0px 1000px $bg inset !important;
				-webkit-text-fill-color: $cursor !important;
			}
		}
	}

	.el-form-item {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		color: #454545;
	}
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
	min-height: 100%;
	width: 100%;
	background-color: $bg;
	overflow: hidden;

	.login-form {
		position: relative;
		width: 520px;
		max-width: 100%;
		padding: 160px 35px 0;
		margin: 0 auto;
		overflow: hidden;
	}

	.tips {
		font-size: 14px;
		color: #fff;
		margin-bottom: 10px;

		span {
			&:first-of-type {
				margin-right: 16px;
			}
		}
	}

	.svg-container {
		padding: 6px 5px 6px 15px;
		color: $dark_gray;
		vertical-align: middle;
		width: 30px;
		display: inline-block;
	}

	.title-container {
		position: relative;

		.title {
			font-size: 26px;
			color: $light_gray;
			margin: 0px auto 40px auto;
			text-align: center;
			font-weight: bold;
		}
	}

	.show-pwd {
		position: absolute;
		right: 10px;
		top: 7px;
		font-size: 16px;
		color: $dark_gray;
		cursor: pointer;
		user-select: none;
	}
}
</style>
