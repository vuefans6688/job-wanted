<template>
  <div class="login-container">
    <!-- 回退按钮 -->
    <van-nav-bar title="登录 / 注册" @click-left="onBack">
      <template #left>
        <i class="iconfont button-nav-back"></i>
      </template>
    </van-nav-bar>
    <!-- 表单 -->
    <van-form
      @submit="onLogin"
      @failed="onFailed"
      ref="login-form"
      :show-error="false"
    >
      <!-- 手机号 -->
      <van-field
        v-model="user.mobile"
        :rules="formRules.mobile"
        name="mobile"
        type="tel"
        placeholder="请输入手机号"
      >
        <template #left-icon>
          <i class="iconfont bian-zu-1"></i>
        </template>
      </van-field>
      <!-- 验证码 -->
      <van-field
        v-model="user.code"
        :rules="formRules.code"
        name="code"
        type="digit"
        clearable
        placeholder="请输入验证码"
      >
        <template #left-icon>
          <i class="iconfont yan-zheng-ma"></i>
        </template>
        <template #button>
          <van-button @click.prevent="onCaptcha" type="primary" size="mini">{{
            buttonText
          }}</van-button>
        </template>
      </van-field>
      <div class="submit-box">
        <van-button native-type="submit" type="primary" block>确定</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// 导入接口
import { getCode, login } from '@/api'
// 导入token工具函数  
import { setLocal } from '@/utils/local'
// map辅助函数  
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      buttonText: '获取验证码',
      delay: 0,
      formRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不对' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{4}$/, message: '验证码格式不对' }
        ]
      }
    }
  },
  methods: {
    // 导入mutations
    ...mapMutations(['SET_USER_INFO']),
    // 获取验证码
    onCaptcha () {
      // 防止用户重复点击按钮
      if (this.delay > 0) {
        return
      }
      this.$toast.loading()
      // 校验用户手机号
      this.$refs['login-form'].validate('mobile').then(() => {
        getCode({ mobile: this.user.mobile }).then(res => {
          this.$toast.success(res.data)
          // 设置倒计时
          this.delay = 60
          this.buttonText = `${this.delay}S后重试`
          // 开启定时器
          this.intervalId = setInterval(() => {
            this.delay--
            this.buttonText = `${this.delay}S后重试`
            if (this.delay <= 0) {
              clearInterval(this.intervalId)
              this.buttonText = '获取验证码'
            }
          }, 1000)
        })
      })
    },
    onFailed (error) {
      if (error.errors[0]) {
        this.$toast({
          // 提示消息
          message: error.errors[0].message,
          // 以防手机键盘太高，看不见操作面板  
          position: 'top'
        })
      }
    },
    // 提交数据
    onLogin (values) {
      login(values).then(res => {
        // 成功的提示
        this.$toast.success(res.message)
        // 保存用户token
        setLocal(res.data.jwt)
        // 图片地址特殊处理
        res.data.user.avatar += 'https://autumnfish.cn/heimamm_server/'
        // 保存用户信息
        this.SET_USER_INFO(res.data.user)
        // 获取返回的地址
        const { redirect } = this.$route.query
        if (redirect) {
          return this.$router.push(redirect)
        }
        // 跳转到我的页面
        this.$router.push('/my')
      }).catch(() => {
        this.$toast.fail('验证码错误，请重新输入')
      })
    },
    // 返回
    onBack () {
      const backPaths = ['/my', '/user-info', '/question']
      // 获取返回的地址
      const { redirect } = this.$route.query
      // 如果有就返回
      if (redirect) {
        // 是否存在返回的路径
        const isExist = backPaths.some(path => redirect.indexOf(path) === 0)
        if (!isExist) {
          return this.$router.push(redirect)
        }
      }
      // 如果没有就回到发现页
      this.$router.push('/find')
    }
  }
}
</script>

<style lang="scss">
.login-container {
  background-color: #f9f9f9;
  height: 100vh;
  .van-nav-bar {
    .van-nav-bar__left {
      padding-left: 5px;
    }
    .button-nav-back {
      font-size: 40px;
    }
  }
  .submit-box {
    padding: 0 15px;
    margin-top: 44px;
  }
}
</style>
