<template>
  <div class="experience-add-container">
    <!-- 导航栏 -->
    <van-nav-bar title="面经分享" @click-left="$router.push('/interview')">
      <template #left>
        <i class="iconfont iconbtn-nav-back"></i>
      </template>
    </van-nav-bar>
    <!-- 输入区域 -->
    <div class="main">
      <van-form validate-first @failed="onFailed">
        <!-- 通过 pattern 进行正则校验 -->
        <van-field
          v-model="value1"
          name="pattern"
          placeholder="请输入面经内容"
          :rules="[{ pattern, message: '请输入正确内容' }]"
        >
        </van-field>
        <van-field
          v-model="value2"
          name="pattern"
          placeholder="请输入面经内容"
          type="textarea"
          rows="10"
          autosize
          :rules="[{ pattern, message: '请输入正确内容' }]"
        >
        </van-field>
      </van-form>
      <van-uploader upload-icon="plus" :after-read="afterRead"></van-uploader>
    </div>
    <!-- 底部按钮 -->
    <div class="bottom van-hairline--top">
      <van-button type="primary">发布</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: '',
      value2: ''
    }
  },
  methods: {
    onFailed () {
      console.log('onFailed')
    },
    afterRead () {
      console.log('afterRead')
    }
  }
}
</script>

<style lang="scss">
.experience-add-container {
  .van-nav-bar__left {
    padding-left: 5px;
  }
  .iconbtn-nav-back {
    font-size: 44px;
  }
  .main {
    padding: 15px;
    position: relative;
    .van-cell {
      background: #f7f4f5;
      margin-bottom: 10px;
      padding: 7px 10px;
      &::after {
        border: none;
      }
      &:first-child {
        height: 34px;
      }
      &:last-of-type {
        height: 293px;
      }
    }
    .van-uploader {
      position: absolute;
      left: 25px;
      bottom: 25px;
      .van-uploader__upload {
        width: 66px;
        height: 66px;
        background: #eceaea;
      }
    }
  }
  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 99px;
    background: #fcfcfc;
    padding: 0 15px;
    .van-button {
      margin-top: 15px;
      width: 100%;
      height: 50px;
      background: linear-gradient(#00cedc, #00b8d4);
      border-radius: 7px;
      border: none;
    }
  }
}
</style>
