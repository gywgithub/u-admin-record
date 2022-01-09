<template>
  <div class="login-container">
    <el-row>
      <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16">
        <div style="color: transparent">占位符</div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          class="login-form"
          label-position="left"
        >
          <div class="title">hello !</div>
          <div class="title-tips">欢迎来到{{ title }}！</div>
          <el-form-item style="margin-top: 40px" prop="loginName">
            <span class="svg-container svg-container-admin">
              <vab-icon :icon="['fas', 'user']" />
            </span>
            <el-input
              v-model.trim="form.loginName"
              v-focus
              placeholder="请输入用户名"
              tabindex="1"
              type="text"
            />
          </el-form-item>
          <el-form-item prop="userPassword">
            <span class="svg-container">
              <vab-icon :icon="['fas', 'lock']" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model.trim="form.userPassword"
              :type="passwordType"
              tabindex="2"
              placeholder="请输入密码"
              @keyup.enter.native="handleLogin"
            />
            <span
              v-if="passwordType === 'password'"
              class="show-password"
              @click="handlePassword"
            >
              <vab-icon :icon="['fas', 'eye-slash']"></vab-icon>
            </span>
            <span v-else class="show-password" @click="handlePassword">
              <vab-icon :icon="['fas', 'eye']"></vab-icon>
            </span>
          </el-form-item>
          <el-button
            :loading="loading"
            class="login-btn"
            type="primary"
            @click="handleLogin"
          >
            登录
          </el-button>
          <router-link to="/register">
            <div style="margin-top: 20px">注册</div>
          </router-link>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { isPassword } from '@/utils/validate'

  export default {
    name: 'Login',
    directives: {
      focus: {
        inserted(el) {
          el.querySelector('input').focus()
        },
      },
    },
    data() {
      const validateusername = (rule, value, callback) => {
        if (!this.checkAccount(value)) {
          callback(new Error('账号格式错误'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        //至少八个字符，至少一个大写字母，一个小写字母，一个数字和一个特殊字符
        let regPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
        if (!regPwd.test(value)) {
          callback(new Error('密码格式错误'))
        } else {
          callback()
        }
      }
      return {
        nodeEnv: process.env.NODE_ENV,
        title: this.$baseTitle,
        form: {
          loginName: '15600117320',
          userPassword: '123456zpwZPW',
        },
        rules: {
          loginName: [
            {
              required: true,
              trigger: 'blur',
              validator: validateusername,
            },
          ],
          userPassword: [
            {
              required: true,
              trigger: 'blur',
              validator: validatePassword,
            },
          ],
        },
        loading: false,
        passwordType: 'password',
        redirect: undefined,
      }
    },
    watch: {
      $route: {
        handler(route) {
          this.redirect = (route.query && route.query.redirect) || '/'
        },
        immediate: true,
      },
    },
    created() {
      document.body.style.overflow = 'hidden'
    },
    beforeDestroy() {
      document.body.style.overflow = 'auto'
    },
    mounted() {
      this.form.username = '15600117320'
      this.form.password = '123456zpwZPW'
    },
    methods: {
      // 字符串转base64
      encode(str) {
        // 对字符串进行编码
        var encode = encodeURI(str)
        // 对编码的字符串转化base64
        var base64 = btoa(encode)
        return base64
      },
      // base64转字符串
      decode(base64) {
        // 对base64转编码
        var decode = atob(base64)
        // 编码转字符串
        var str = decodeURI(decode)
        return str
      },
      checkAccount(user) {
        let regEmail =
          /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        let regPhone =
          /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
        if (regEmail.test(user) || regPhone.test(user)) {
          return true
        }
        return false
      },
      randomString(e) {
        e = e || 16
        var t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
          a = t.length,
          n = ''
        for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))
        return n
      },
      genPassword() {
        let pwdEncodeStr = this.encode(this.form.userPassword)
        let randomStr = this.randomString(32)
        return randomStr + pwdEncodeStr
      },
      handlePassword() {
        this.passwordType === 'password'
          ? (this.passwordType = '')
          : (this.passwordType = 'password')
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.loading = true
            let params = {
              loginName: this.form.loginName,
              userPassword: this.genPassword(),
            }
            this.$store
              .dispatch('user/login', params)
              .then((res) => {
                this.$router.push({
                  path: '/dashboard/index',
                })
                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            return false
          }
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .login-container {
    height: 100vh;
    background: url('~@/assets/login_images/background.jpg') center center fixed
      no-repeat;
    background-size: cover;

    .title {
      font-size: 54px;
      font-weight: 500;
      color: rgba(14, 18, 26, 1);
    }

    .title-tips {
      margin-top: 29px;
      font-size: 26px;
      font-weight: 400;
      color: rgba(14, 18, 26, 1);
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .login-btn {
      display: inherit;
      width: 220px;
      height: 60px;
      margin-top: 5px;
      border: 0;

      &:hover {
        opacity: 0.9;
      }
    }

    .login-form {
      position: relative;
      max-width: 100%;
      margin: calc((100vh - 425px) / 2) 10% 10%;
      overflow: hidden;

      .forget-password {
        width: 100%;
        margin-top: 40px;
        text-align: left;

        .forget-pass {
          width: 129px;
          height: 19px;
          font-size: 20px;
          font-weight: 400;
          color: rgba(92, 102, 240, 1);
        }
      }
    }

    .tips {
      margin-bottom: 10px;
      font-size: $base-font-size-default;
      color: $base-color-white;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .title-container {
      position: relative;

      .title {
        margin: 0 auto 40px auto;
        font-size: 34px;
        font-weight: bold;
        color: $base-color-blue;
        text-align: center;
      }
    }

    .svg-container {
      position: absolute;
      top: 14px;
      left: 15px;
      z-index: $base-z-index;
      font-size: 16px;
      color: #d7dee3;
      cursor: pointer;
      user-select: none;
    }

    .show-password {
      position: absolute;
      top: 14px;
      right: 25px;
      font-size: 16px;
      color: #d7dee3;
      cursor: pointer;
      user-select: none;
    }

    ::v-deep {
      .el-form-item {
        padding-right: 0;
        margin: 20px 0;
        color: #454545;
        background: transparent;
        border: 1px solid transparent;
        border-radius: 2px;

        &__content {
          min-height: $base-input-height;
          line-height: $base-input-height;
        }

        &__error {
          position: absolute;
          top: 100%;
          left: 18px;
          font-size: $base-font-size-small;
          line-height: 18px;
          color: $base-color-red;
        }
      }

      .el-input {
        box-sizing: border-box;

        input {
          height: 58px;
          padding-left: 45px;
          font-size: $base-font-size-default;
          line-height: 58px;
          color: $base-font-color;
          background: #f6f4fc;
          border: 0;
          caret-color: $base-font-color;
        }
      }
    }
  }
</style>
