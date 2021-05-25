<template>
  <div class="position-detail-container">
    <!-- 顶部盒子 -->
    <div class="top-box">
      <van-sticky>
        <!-- 顶部导航 -->
        <van-nav-bar :border="false" @click-left="$router.go(-1)">
          <template #left>
            <i class="iconfont button-nav-back"></i>
          </template>
          <template #right>
            <i @click="collect" class="iconfont iconbtn_shoucang-nor"></i>
            <i @click="showShare = true" class="iconfont iconbtn-share"></i>
          </template>
        </van-nav-bar>
      </van-sticky>
      <!-- 信息 -->
      <h2 class="message">
        <span class="name">{{ detail.name }}</span>
        <span class="salary">{{ detail.salary }}</span>
      </h2>
      <!-- 职位 -->
      <div class="job-tags">
        <span> <i class="iconfont iconicon-city"></i>{{ detail.city }} </span>
        <span>
          <i class="iconfont iconicon-nian"></i>{{ detail.experience }}
        </span>
        <span>
          <i class="iconfont iconicon-xueli"></i>{{ detail.education }}
        </span>
      </div>
      <!-- 工作时间 -->
      <div class="time-tags">
        {{ detail.feature && detail.feature.join("·") }}
      </div>
    </div>
    <!-- 内容盒子 -->
    <div class="main-box van-hairline--bottom">
      <h3>职位描述</h3>
      <div class="responsibility-box" v-html="detail.responsibility"></div>
      <!-- 公司盒子 -->
      <div
        class="company-box van-hairline--top"
        @click="$router.push('/company-detail/' + detail.company.id)"
      >
        <div class="logo-wrap van-hairline--surround">
          <img :src="detail.company.logo" alt="" />
        </div>
        <div class="info-box">
          <div class="title">{{ detail.company.name }}</div>
          <div class="tags">
            <span>{{ detail.company.type }}</span>
            <span>{{ detail.company.step }}</span>
            <span>{{ detail.company.scale }}</span>
          </div>
        </div>
        <i class="iconfont iconicon-more"></i>
      </div>
    </div>
    <!-- 底部盒子 -->
    <div class="bottom-box">
      <van-button type="danger" @click="$router.push('/question')"
        >去刷题</van-button
      >
    </div>
    <!-- 分享界面 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    ></van-share-sheet>
  </div>
</template>

<script>
import { positionDetail } from '@/api'
export default {
  data () {
    return {
      // 职位详情
      detail: {
        company: {}
      },
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ]
    }
  },
  methods: {
    collect () {
      this.$toast('即将推出，敬请期待')
    },
    onSelect () {
      this.$toast('即将推出，敬请期待')
    }
  },
  async created () {
    const res = await positionDetail(this.$route.params.id)
    this.detail = res.data
    // 处理logo
    this.detail.company.logo += 'https://autumnfish.cn/heimamm_server/'
  }
}
</script>

<style lang="scss">
.position-detail-container {
  padding-bottom: 99px;
  .van-nav-bar {
    box-shadow: 0 2px 4px 0 rgba(24, 26, 57, 0.04);
    .van-nav-bar__left {
      padding-left: 5px;
    }
    .button-nav-back {
      font-size: 44px;
    }
    .van-nav-bar__right {
      display: flex;
      align-items: center;
    }
    .iconbtn-shoucang-nor {
      margin-right: 10px;
    }
    .iconfont {
      font-size: 30px;
    }
  }
  .top-box {
    padding: 0 0 10px;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(24, 26, 57, 0.04);
    h2 {
      font-size: 22px;
      font-weight: 600;
      padding: 0 15px;
      color: #222222;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      span {
        font-size: 16px;
        font-weight: 400;
        color: #e40137;
      }
    }
    .job-tags {
      margin-top: 19px;
      display: flex;
      padding: 0 15px;
      span {
        font-size: 12px;
        margin-right: 18px;
        display: flex;
        align-items: center;
        color: #181a39;
      }
      i {
        color: #b4b4bc;
      }
    }
    .time-tags {
      margin-top: 14px;
      font-size: 12px;
      color: #b4b4bd;
      padding: 0 15px;
    }
  }
  .main-box {
    padding: 24px 15px 0;
    background-color: white;
    h3 {
      font-size: 18px;
      font-weight: 500;
      text-align: left;
      margin: 0;
      color: #181a39;
      margin-bottom: 20px;
    }
    .responsibility-box {
      font-size: 16px;
    }
    h4 {
      margin: 0;
      margin-top: 26px;
      font-size: 16px;
      font-weight: 500;
      color: #b4b4bd;
    }
    p {
      font-size: 16px;
      font-weight: 400;
      text-align: justify;
      color: #181a39;
      line-height: 27px;
    }
    .company-box {
      display: flex;
      height: 104px;
      align-items: center;
      justify-content: space-between;
      .logo-wrap {
        width: 58px;
        height: 58px;
        margin-right: 11px;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .info-box {
        .title {
          font-size: 14px;
          font-weight: 400;
          color: #181a39;
        }
        .tags {
          margin-top: 11px;
          font-size: 12px;
          font-weight: 400;
          color: #545671;
          span {
            height: 18px;
            border: 1px solid #b4b4bd;
            border-radius: 3px;
            margin-right: 7px;
            padding: 0 7px;
            color: #545671;
          }
        }
      }
      .icon-font {
        font-size: 10px;
      }
    }
  }
  .bottom-box {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 99px;
    padding: 15px;
    padding-bottom: 0;
    background: #fcfcfc;
    .van-button {
      width: 100%;
      border-radius: 8px;
    }
  }
}
</style>
