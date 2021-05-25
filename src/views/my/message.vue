<template>
  <div class="message-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="我的消息"
      right-text="全部已读"
      @click-left="$router.push('/my')"
    >
      <template #left>
        <i class="iconfont button-nav-back"></i>
      </template>
    </van-nav-bar>
    <!-- 主体区域 -->
    <div class="main-box">
      <van-swipe-cell>
        <van-cell class="my-cell" title="您提交的反馈我们已经收到">
          <template #right-icon>
            <div class="circle"></div>
            <i class="iconfont iconicon-more"></i>
          </template>
        </van-cell>
        <template #right>
          <van-button square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
      <van-swipe-cell>
        <van-cell class="my-cell" title="您提交的反馈我们已经收到">
          <template #right-icon>
            <div class="circle"></div>
            <i class="iconfont iconicon-more"></i>
          </template>
        </van-cell>
        <template #right>
          <van-button square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
      <van-swipe-cell>
        <van-cell class="my-cell" title="您提交的反馈我们已经收到">
          <template #right-icon>
            <div class="circle"></div>
            <i class="iconfont iconicon-more"></i>
          </template>
        </van-cell>
        <template #right>
          <van-button square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
      <van-swipe-cell>
        <van-cell class="my-cell" title="您提交的反馈我们已经收到">
          <template #right-icon>
            <div class="circle"></div>
            <i class="iconfont iconicon-more"></i>
          </template>
        </van-cell>
        <template #right>
          <van-button square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.message-container {
  .van-nav-bar__left {
    padding-left: 5px;
  }
  .button-nav-back {
    font-size: 44px;
  }
  .van-nav-bar__text {
    color: #181a39;
    font-size: 14px;
    font-weight: 400;
  }
  .main-box {
    padding: 15px;
  }
  .my-cell {
    height: 55px;
    align-items: center;
    border-radius: 8px;
    .iconfont:first-child {
      font-size: 22px;
      margin-right: 12px;
    }
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .iconfont:last-child {
      font-size: 10px;
      margin-left: 9px;
      color: #5b5d75;
    }
    .circle {
      width: 9px;
      height: 9px;
      background: #ff4949;
      border-radius: 50%;
    }
  }
}
</style>
