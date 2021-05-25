<template>
  <div class="company-detail-container">
    <!-- 顶部区域 -->
    <div class="top-box">
      <img :src="detail.logo" />
      <!-- 导航栏 -->
      <van-nav-bar @click-left="$router.push('/company?isScroll=true')">
        <template #left>
          <i class="iconfont button-nav-back"></i>
        </template>
      </van-nav-bar>
      <!-- 信息区域 -->
      <div class="info-box">
        <div class="left">
          <h2>{{ detail.name }}</h2>
          <ul class="tags">
            <li>{{ detail.type }}</li>
            <li>{{ detail.step }}</li>
            <li>{{ detail.scale }}</li>
          </ul>
        </div>
        <img :src="detail.logo" alt="" />
      </div>
      <!-- 工作时间 -->
      <div class="time-box">
        <span>
          <i class="iconfont iconicon-gongsi-time"></i>{{ detail.workTime }}
        </span>
        <span>
          <i class="iconfont iconicon-gongsi-sx"></i>{{ detail.restDay }}
        </span>
        <span>
          <i class="iconfont iconicon-gongsi-jiaban"></i>{{ detail.overtime }}
        </span>
      </div>
      <!-- 额外福利 -->
      <div class="scroll-box">
        <div class="welfare-box">
          <div v-for="item in detail.weals" :key="item.id" class="item">
            <i :class="`iconfont ${item.icon}`"></i>{{ item.text }}
          </div>
        </div>
      </div>
    </div>
    <!-- 主体区域 -->
    <div class="main-box">
      <!-- 地址 -->
      <div class="address-box">
        <div class="left">
          <h3>公司地址</h3>
          <div class="address">{{ detail.region }} {{ detail.name }}</div>
          <div class="distance">距离当前50m，步行需要57秒</div>
        </div>
        <div class="right">
          <div class="more" @click="allAddress">
            全部地址 <i class="iconfont iconicon-more"></i>
          </div>
          <div class="nav-btn" @click="navAddress">
            <i class="iconfont iconicon-gongsi-daohang"></i>导航
          </div>
        </div>
      </div>
      <!-- 简介 -->
      <div class="desc-box">
        <h3>公司简介</h3>
        <p :class="{ 'van-multi-ellipsis--l6': !showMore }">
          {{ detail.desc }}
        </p>
        <span @click="showMore = true" v-if="!showMore">
          展开更多 <i class="iconfont iconicon-zhankai"></i>
        </span>
      </div>
      <!-- 照片 -->
      <div class="img-box">
        <h3>公司照片</h3>
        <div class="scroll-box">
          <div class="content">
            <img
              @click="previewImg(index)"
              v-for="(item, index) in detail.sliders"
              :key="index"
              :src="item"
              alt=""
            />
          </div>
        </div>
      </div>
      <!-- 工商信息 -->
      <div class="business-box">
        <h3>工商信息</h3>
        <ul>
          <li><span>公司全称</span>{{ detail.fullname }}</li>
          <li><span>成立时间</span>{{ detail.establishedTime }}</li>
          <li><span>注册资本</span>{{ detail.capital }}</li>
          <li><span>法人代表</span>{{ detail.legalPerson }}</li>
          <li><span>信息来源</span>{{ detail.messageSource }}</li>
        </ul>
      </div>
      <!-- 面试评价 -->
      <div class="comment-box">
        <h3>
          面试评价
          <van-button @click="addComment" type="info" size="mini"
            >写评论</van-button
          >
        </h3>
        <!-- 打分 -->
        <div class="score-box">
          <div class="num-box">
            <div><span>4.8</span>分</div>
            <van-rate v-model="totalScore" readonly></van-rate>
          </div>
          <ul class="detail-box van-hairline--left">
            <li>
              <span>岗位描述</span>
              <van-rate v-model="score.positionScore" readonly></van-rate>
            </li>
            <li>
              <span>面试情况</span>
              <van-rate v-model="score.interviewScore" readonly></van-rate>
            </li>
            <li>
              <span>面试官</span>
              <van-rate v-model="score.interviewerScore" readonly></van-rate>
            </li>
          </ul>
        </div>
        <!-- 列表项 -->
        <div class="items">
          <van-list
            @load="onLoad"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
          >
            <comment-item
              v-for="item in comments"
              :key="item.id"
              :item="item"
            ></comment-item>
          </van-list>
        </div>
      </div>
    </div>
    <!-- 底部区域 -->
    <div class="bottom-box van-hairline--top">
      <div
        @click="$router.push(`/company-position/${$route.params.id}`)"
        class="item van-hairline--surround"
      >
        <span
          >在招职位
          <span class="num">{{ detail.positions }}</span>
        </span>
      </div>
      <div
        @click="$router.push(`/interview?company=${$route.params.id}`)"
        class="item"
      >
        <span
          >企业面试题
          <span class="num">{{ detail.questions }}</span>
        </span>
      </div>
    </div>
    <!-- 弹框 -->
    <position-pop
      @on-added="onAdded"
      v-model="showPop"
      :company-id="+$route.params.id"
    ></position-pop>
  </div>
</template>

<script>
// 导入数据接口
import { companyDetail, companyComments } from '@/api'
import { ImagePreview } from 'vant'
// 导入并注册组件
import CommentItem from './comment-item'
import PositionPop from './position-pop'
// 导入辅助函数
import { mapState } from 'vuex'
export default {
  // 注册组件
  components: {
    CommentItem,
    PositionPop
  },
  data () {
    return {
      // 加载状态
      loading: false,
      // 加载完毕
      finished: false,
      // 评分数据-总分
      totalScore: 5,
      // 起始索引
      start: 0,
      // 个数
      limit: 5,
      // 评分数据-单独
      score: {
        interviewScore: 5,
        interviewerScore: 5,
        positionScore: 5
      },
      // 显示弹框
      showPop: false,
      message: '',
      // 是否显示查看更多
      showMore: false,
      // 企业信息
      detail: {},
      // 评论数据
      comments: []
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    previewImg (index) {
      ImagePreview({
        images: this.detail.sliders,
        startPosition: index
      })
    },
    // 写评论
    addComment () {
      // 登录状态判断
      if (!this.userInfo) {
        this.$toast.fail('请先登录')
        return this.$router.toLogin()
      }
      // 显示对话框
      this.showPop = true
    },
    // 数据加载
    async onLoad () {
      // 设置loading状态
      this.loading = true
      // 获取数据
      const res = await companyComments({
        id: this.$route.params.id,
        limit: this.limit,
        start: this.start
      })
      setTimeout(() => {
        // 关闭loading状态
        this.loading = false
        // 累加起始索引
        this.start += this.limit
        // 处理头像数据
        res.data.list.forEach(v => {
          // 处理头像
          v.user.avatar += 'https://autumnfish.cn/heimamm_server/'
          // 处理打分数据
          v.score = (v.positionScore + v.interviewScore + v.interviewerScore) / 3
        })
        // 保存评论数据
        this.comments.push(...res.data.list)
        // 判断是否完结
        if (this.start >= res.data.total) {
          this.finished = true
        }
      }, 1000)
    },
    // 获取评论总分
    async getCommentScore () {
      // 开启loading
      this.$toast.loading()
      const res = await companyDetail(this.$route.params.id)
      // 关闭loading
      this.$toast.clear()
      const baseURL = 'https://autumnfish.cn/heimamm_server/'
      // 处理logo
      res.data.logo += baseURL
      // 处理轮播图
      res.data.sliders = res.data.sliders.map(value => baseURL + value)
      // 赋值
      this.detail = res.data
      // 设置评分数据
      this.score = res.data.score
      // 计算总分
      let totalPoint = 0
      for (const key in this.score) {
        totalPoint += this.score[key]
      }
      this.totalScore = totalPoint / 3
    },
    // 数据添加完毕
    onAdded (data) {
      this.comments.unshift(data)
    },
    // 所有地址
    allAddress () {
      this.$toast('只有一个地址哦!')
    },
    // 地址导航
    navAddress () {
      this.$toast('敬请期待')
    }
  },
  created () {
    this.getCommentScore()
  }
}
</script>

<style lang="scss">
.company-detail-container {
  padding-bottom: 66px;
  padding-top: 261px;
  // 顶部盒子
  .top-box {
    background: #181a39;
    padding-bottom: 26px;
    height: 230px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
    box-shadow: 0 2px 4px 0 rgba(24, 26, 57, 0.04);
    overflow: hidden;
    > img {
      opacity: 0.41;
      filter: blur(17px);
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
    .van-nav-bar {
      background-color: transparent;
      &::after {
        border-color: transparent;
      }
    }
    .van-nav-bar__left {
      padding-left: 5px;
    }
    .button-nav-back {
      font-size: 44px;
      color: white;
    }
  }
  // 信息盒子
  .info-box {
    padding: 15px;
    padding-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      h2 {
        font-size: 20px;
        color: white;
        font-weight: 600;
      }
      .tags {
        display: flex;
        li {
          padding: 0 5px;
          line-height: 17px;
          opacity: 0.6;
          border: 1px solid #ffffff;
          border-radius: 3px;
          margin-right: 7px;
          font-size: 12px;
          color: white;
        }
      }
    }
    img {
      width: 58px;
      height: 58px;
      border-radius: 8px;
    }
  }
  // 时间盒子
  .time-box {
    display: flex;
    align-items: center;
    padding: 0 15px;
    margin-top: 16px;
    span {
      font-size: 12px;
      font-weight: 400;
      color: #ffffff;
      line-height: 17px;
      letter-spacing: 0;
      display: flex;
      align-items: center;
      margin-right: 17px;
    }
    .iconfont {
      font-size: 16px;
      margin-right: 3px;
    }
  }
  .scroll-box {
    width: 100%;
    overflow-x: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  // 额外福利
  .welfare-box {
    margin-top: 10px;
    display: flex;
    padding-left: 15px;
    .item {
      display: flex;
      padding: 10px;
      flex-shrink: 0;
      flex-basis: 99px;
      padding-right: 0;
      align-items: center;
      height: 40px;
      opacity: 0.6;
      border: 1px solid #ffffff;
      border-radius: 7px;
      font-size: 12px;
      font-weight: 400;
      color: #ffffff;
      letter-spacing: 0px;
      margin-right: 9px;
      i {
        font-size: 24px;
        margin-right: 6px;
      }
    }
  }
  // 主体区域
  .main-box {
    padding: 0 15px;
    background-color: white;
    .address-box {
      display: flex;
      justify-content: space-between;
      .left {
        .address {
          margin-top: 13px;
          font-size: 15px;
          font-weight: 400;
          line-height: 21px;
          letter-spacing: 0;
        }
        .distance {
          margin-top: 9px;
          font-size: 12px;
          font-weight: 400;
          color: #b4b4bd;
          line-height: 17px;
          letter-spacing: 0;
        }
      }
      .right {
        .more {
          font-size: 14px;
          font-weight: 400;
          text-align: left;
          color: #5b5d75;
          line-height: 20px;
          letter-spacing: 0;
          .iconfont {
            font-size: 10px;
          }
        }
        .nav-btn {
          width: 71px;
          height: 32px;
          background: #ffffff;
          border: 1px solid #b4b4bd;
          border-radius: 16px;
          font-size: 14px;
          font-weight: 400;
          color: #5b5d75;
          line-height: 20px;
          letter-spacing: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 25px;
          .iconfont {
            font-size: 16px;
          }
        }
      }
    }
    .desc-box {
      margin-top: 35px;
      p {
        margin-top: 15px;
        font-size: 15px;
        font-weight: 400;
        color: #181a39;
        line-height: 23px;
        letter-spacing: 0;
        // 超出显示隐藏的类名
        &.van-multi-ellipsis--l6 {
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
        }
      }
      span {
        margin: 13px;
        font-size: 14px;
        font-weight: 400;
        color: #545671;
        line-height: 20px;
        letter-spacing: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        i {
          font-size: 14px;
          margin-left: 7px;
          color: #b4b4bc;
        }
      }
    }
    // 照片区域
    .scroll-box {
      margin-top: 17px;
      .content {
        display: flex;
      }
      img {
        height: 83px;
        margin-right: 10px;
        flex-shrink: 0;
        flex-basis: 148px;
        border-radius: 8px;
      }
    }
    .business-box {
      margin-top: 30px;
      ul {
        margin-top: 18px;
        li {
          font-size: 15px;
          font-weight: 400;
          color: #545671;
          line-height: 21px;
          letter-spacing: 0;
          margin-bottom: 15px;
          span {
            font-size: 15px;
            font-weight: 400;
            color: #b4b4bd;
            line-height: 21px;
            letter-spacing: 0;
            margin-right: 30px;
          }
        }
      }
    }
    .comment-box {
      margin-top: 36px;
      h3 {
        display: flex;
        justify-content: space-between;
      }
      .score-box {
        margin-top: 24px;
        width: 345px;
        height: 116px;
        background: #f7f7f7;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        .num-box {
          div {
            font-size: 15px;
            font-weight: 400;
            color: #545671;
            line-height: 21px;
            letter-spacing: 0;
            text-align: center;
            span {
              font-size: 32px;
              font-weight: 400;
              color: #00b8d4;
              line-height: 45px;
              letter-spacing: 0;
            }
          }
        }
      }
    }
    // 评论列表项
    .items {
      margin-top: 30px;
    }
  }
  // 调整打分组件的样式
  .van-rate__item {
    padding-right: 1px;
    i {
      font-size: 15px;
    }
  }
  .detail-box {
    font-size: 14px;
    font-weight: 400;
    color: #545671;
    line-height: 20px;
    letter-spacing: 0;
    padding-left: 25px;
    margin-left: 19px;
    li {
      display: flex;
      align-items: center;
      margin-bottom: 7px;
    }
    span {
      min-width: 57px;
      display: inline-box;
    }
    .van-rate {
      margin-left: 28px;
    }
    &::after {
      border-color: #d1cccc;
    }
  }
  // 底部盒子
  > .bottom-box {
    height: 100px;
    width: 100%;
    left: 0;
    bottom: 0;
    position: fixed;
    background: #fcfcfc;
    display: flex;
    justify-content: space-around;
    padding-top: 12px;
    .item {
      text-align: center;
      line-height: 44px;
      width: 166px;
      height: 44px;
      background: #ffffff;
      border-radius: 8px;
      border: 1px solid #000;
      font-size: 14px;
      color: #181a39;
      > span {
        position: relative;
      }
      .num {
        height: 100%;
        font-size: 12px;
        color: #545671;
        position: absolute;
        right: -15px;
        top: -22px;
      }
    }
  }
  h3 {
    font-size: 18px;
    font-weight: 500;
    color: #181a39;
    line-height: 25px;
    letter-spacing: 0;
    margin: 0;
  }
  // 弹出层 容器
  .score-popup {
    border-radius: 9px;
    .content {
      width: 304px;
      height: 454px;
      padding-top: 29px;
      background: #ffffff;
      position: relative;
      h3 {
        text-align: center;
      }
      .detail-box {
        padding: 0 42px;
        margin-top: 24px;
        li {
          display: flex;
        }
        span {
          flex: 1;
        }
      }
      .score-field {
        width: 264px;
        margin: 26px auto;
        background: #f7f4f5;
        border-radius: 4px;
      }
      .bottom-box {
        display: flex;
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0;
        height: 50px;
        > div {
          flex: 1;
          text-align: center;
          line-height: 50px;
          font-size: 16px;
          color: #181a39;
          &.disabled {
            color: #b4b4bd;
          }
        }
      }
    }
  }
}
</style>
