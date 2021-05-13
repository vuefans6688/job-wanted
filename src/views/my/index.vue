<template>
  <div class="my-container">
    <!-- 顶部 -->
    <div class="top-box" v-if="userInfo">
      <div class="user-box">
        <div class="image-box">
          <img :src="userInfo && userInfo.avatar" alt="">
        </div>
        <div class="info-box">
          <span>{{ userInfo && userInfo.nickname }}</span>
          <span>{{ userInfo && userInfo.intro }}</span>
        </div>
        <div class="icon-box">
          <van-icon name="arrow" @click="$router.push('/user-info')" />
        </div>
      </div>
      <!-- 统计数据 -->
      <div class="data-box">
        <div class="item">
          <span class="num">{{ userInfo.submitNum }}</span>
          <span>累计答题</span>
        </div>
        <div class="item">
          <span class="num">{{ userInfo.collectQuestions.length }}</span>
          <span>收藏题目</span>
        </div>
        <div class="item">
          <span class="num">{{ userInfo.errorQuestions.length }}</span>
          <span>我的错题</span>
        </div>
        <div class="item">
          <span class="num">{{ rightPercent }}</span>
          <span>正确率</span>
        </div>
      </div>
    </div>
    <!-- 主体内容区域 -->
    <div class="main-box" v-if="userInfo">
      <!-- 顶部的脱标cell -->
      <van-cell to="/edit-info?property=position" :value="userInfo.position" title="我的岗位" class="my-cell">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #icon>
          <i class="iconfont iconicon-mine-gangwei"></i>
        </template>
        <template #right-icon>
          <i class="iconfont iconicon-more"></i>
        </template>
      </van-cell>
      <!-- 中间的面经数据 -->
      <div class="experience-box">
        <div class="title">面经数据</div>
        <div class="chart-items">
          <div class="item">
            <div class="top">
              昨日阅读 <span>+{{ userInfo.shareData.read.yesterday }}</span>
            </div>
            <div class="num">{{ userInfo.shareData.read.total }}</div>
            <div class="bottom">阅读总数</div>
          </div>
          <div class="item">
            <div class="top">
              昨日获赞 <span>+{{ userInfo.shareData.star.yesterday }}</span>
            </div>
            <div class="num">{{ userInfo.shareData.star.total }}</div>
            <div class="bottom">获赞总数</div>
          </div>
          <div class="item">
            <div class="top">
              昨日新增 <span>+{{ userInfo.shareData.comment.yesterday }}</span>
            </div>
            <div class="num">{{ userInfo.shareData.comment.total }}</div>
            <div class="bottom">评论总数</div>
          </div>
        </div>
      </div>
      <!-- 底部的cell -->
      <van-cell-group>
        <van-cell title="我的面经分享" value="0" :border="false" class="my-cell">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <i class="iconfont iconicon-mine-mianjing"></i>
          </template>
          <template #right-icon>
            <i class="iconfont iconicon-more"></i>
          </template>
        </van-cell>
        <van-cell to="/my/message" title="我的消息" :value="userInfo.systemMessages" :border="false" class="my-cell">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <i class="iconfont iconicon-mine-xiaoxi"></i>
          </template>
          <template #right-icon>
            <i class="iconfont iconicon-more"></i>
          </template>
        </van-cell>
        <van-cell title="收藏的题库" :value="userInfo.collectQuestions.length" :border="false" class="my-cell">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <i class="iconfont iconicon-mine-tikushoucang"></i>
          </template>
          <template #right-icon>
            <i class="iconfont iconicon-more"></i>
          </template>
        </van-cell>
        <van-cell title="收藏的企业" value="0" :border="false" class="my-cell">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <i class="iconfont iconicon-mine-qiyeshoucang"></i>
          </template>
          <template #right-icon>
            <i class="iconfont iconicon-more"></i>
          </template>
        </van-cell>
        <van-cell title="我的错题" :value="userInfo.errorNum" :border="false" class="my-cell">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <i class="iconfont iconicon-mine-cuoti"></i>
          </template>
          <template #right-icon>
            <i class="iconfont iconicon-more"></i>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
// map辅助函数
import { mapState, mapMutations, mapActions } from 'vuex'  
export default {
  // 通过vuex的actions获取用户信息
  async activated () {
    await this.getUserInfo()  
  },
  methods: {
    // 通过辅助函数合并vuex中的mutations
    ...mapMutations(['SET_USER_INFO']),
    // 通过辅助函数合并vuex中的actions  
    ...mapActions(['getUserInfo'])  
  },
  computed: {
    ...mapState(['userInfo']),
    // 正确率计算
    rightPercent () {  
      if (this.userInfo.submitNum === 0) {
        return '0%'
      } else {
        return (
          parseInt(((this.userInfo.submitNum - this.userInfo.errorNum) / this.userInfo.submitNum) * 100) + '%'
        )
      }
    }
  }
}
</script>

<style lang="scss">
.my-container {
  .top-box {
    height: 200px;
    background: #07c160;
    .user-box {
      display: flex;
      justify-content: space-between;
      padding-top: 31px;
      align-items: center;
      padding-left: 15px;
      padding-right: 37px;
      .image-box {
        display: flex;
        align-items: center;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-left: 10px;
        }
      } 
      .info-box {
        display: flex;
        flex-direction: column;
        flex: 1;
        span {
          margin-left: 20px;
          color: white;
          display: block;
          &:first-child {
            font-size: 21px;
            font-weight: 600;
          }
          &:last-child {
            font-size: 12px;
            opacity: 0.7;
            margin-top: 6px;
          }
        }
      }
      .icon-box {
        .van-icon {
          color: #fff;
          font-size: 18px;
        }
      }    
    }
    .data-box {
      margin-top: 40px;
      display: flex;
      justify-content: space-around;
      color: white;
      span {
        display: block;
        text-align: center;
      }
      .num {
        font-size: 21px;
        font-weight: 600;
        display: block;
      }
      span:last-child {
        margin-top: 6px;
        opacity: 0.8;
        font-size: 12px;
      }
    }
  }
  .main-box {
    padding: 26px 15px;
    position: relative;
    .my-cell {
      height: 55px;
      display: flex;
      align-items: center;
      .iconfont:first-child {
        font-size: 22px;
        margin-right: 12px;
      }
      .iconfont:last-child {
        font-size: 10px;
        margin-left: 9px;
        color: #5b5d75;
      }
    }
    .van-cell-group {
      border-radius: 8px;
      overflow: hidden;
    }
    .experience-box {
      height: 143px;
      padding: 19px 15px 0;
      border-radius: 8px;
      background-color: #fff;
      margin-bottom: 10px;
      .title {
        font-size: 14px;
        font-weight: 600;
      }
      .chart-items {
        margin-top: 18px;
        display: flex;
        justify-content: space-around;
        .item {
          text-align: center;
        }
        .top {
          font-size: 10px;
          color: #b4b4bd;
          span {
            color: #53b5d1;
          }
        }
        .num {
          font-size: 21px;
          font-weight: 700;
          margin-top: 9px;
        }
        .bottom {
          font-size: 12px;
          color: #545671;
          margin-top: 6px;
        }
      }
    }
  }
}
</style>
