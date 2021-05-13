<template>
  <div class="interview-detail-container">
    <!-- 顶部 -->
    <van-nav-bar>
      <template #left>
        <i class="iconfont iconbtn-nav-back" @click="$router.go(-1)"></i>
      </template>
    </van-nav-bar>
    <!-- 主体内容区域 -->
    <div class="main-box">
      <!-- 标题区域 -->
      <div class="title-box">
        <div class="content">
          <div class="title van-multi-ellipsis--l2">{{ detail.title }}</div>
          <div class="info">
            <div class="time">{{ detail.created_at | formatTime }}</div>
            <div class="see">
              <i class="iconfont iconicon-liulanliang"></i>
              <span>{{ detail.read }}</span>
            </div>
            <div class="zan">
              <i class="iconfont iconbtn-dianzan-small-nor"></i>
              <span>{{ detail.star }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 内容区域 -->
      <div class="main" v-html="detail.content"></div>
    </div>
  </div>
</template>

<script>
import { articlesTechnicDetail } from '@/api'
export default {
  data () {
    return {
      detail: {}
    }
  },
  async created () {
    const id = this.$route.params.id
    const detailRes = await articlesTechnicDetail(id)
    this.detail = detailRes.data
  }
}
</script>

<style lang="scss">
.interview-detail-container {
  .van-nav-bar__left {
    padding-left: 5px;
  }
  .iconbtn-nav-back {
    font-size: 44px;
  }
  .main-box {
    padding: 15px;
    .main {
      padding-top: 28px;
      font-size: 16px;
      img {
        width: 100%;
      }
    }
  }
  .title-box {
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 16px;
        font-weight: 500;
        color: #181a39;
      }
      .info {
        color: #b4b4bd;
        font-size: 12px;
        display: flex;
        margin-top: 10px;
        align-items: center;
        .time {
          flex: 1;
        }
        .iconfont {
          margin-right: 8px;
          font-size: 16px;
          line-height: 1;
        }
        .see {
          margin-right: 23px;
          display: flex;
          align-items: center;
        }
        .zan {
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
