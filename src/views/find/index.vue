<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div class="find-container">
      <van-nav-bar title="发现"></van-nav-bar>
      <div class="main-box">
        <!-- 面试技巧区域 -->
        <div class="interview-box">
          <!-- 标题区域 -->
          <div class="title-box">
            <div class="title">面试技巧</div>
            <div class="arrow-box" @click="$router.push('/technic-list')">
              <span>查看更多</span>
              <i class="iconfont more"></i>
            </div>
          </div>
          <!-- 列表区域 -->
          <div class="interview-list">
            <van-skeleton v-if="!technicList" title :row="6"></van-skeleton>
            <technic-item
              v-for="item in technicList"
              :key="item.id"
              @item-click="$router.push(`/technic-detail/${item.id}`)"
              :item="item"
            >
            </technic-item>
          </div>
        </div>
        <!-- 市场数据 -->
        <chart-list></chart-list>
        <!-- 面经分享 -->
        <div class="experience-box">
          <!-- 标题区域 -->
          <div class="title-box">
            <div class="title">面经分享</div>
            <div class="arrow-box" @click="$router.push('/share-list')">
              <span>查看更多</span>
              <i class="iconfont more"></i>
            </div>
          </div>
          <!-- 列表 -->
          <div class="experience-list">
            <share-item
              v-for="item in shartList"
              :key="item.id"
              @share-item-click="$router.push(`/share-detail/${item.id}`)"
              :item="item"
            >
            </share-item>
          </div>
        </div>
      </div>
    </div>
  </van-pull-refresh>
</template>

<script>
import { articlesTechnic, articlesShare } from '@/api'
import ShareItem from '../share-list/share-item'  // 分享列表项
import TechnicItem from '../technic-list/technic-item'  // 技术列表项
import ChartList from './chart-list'  // 数据统计列表
export default {
  components: {
    ShareItem,
    TechnicItem,
    ChartList
  },
  data () {
    return {
      limit: 3,
      // 面试技巧
      technicList: '',
      // 分享面经
      shartList: [],
      // 是否正在加载
      isLoading: false
    }
  },
  methods: {
    async getData () {
      this.$toast.loading()
      // 面试技巧获取
      const technicRes = await articlesTechnic({ limit: this.limit })
      this.$toast.clear()
      const baseURL = 'https://autumnfish.cn/heimamm_server/'
      // 处理封面地址
      technicRes.data.list.forEach(v => {
        if (v.cover) {
          v.cover += baseURL
        }
      })
      this.technicList = technicRes.data.list
      // 面经分享获取
      const shareRes = await articlesShare({ limit: this.limit })
      // 处理封面地址
      shareRes.data.list.forEach(v => {
        if (v.cover) {
          v.cover += baseURL
        }
        if (v.author) {
          v.author.avatar += baseURL
        }
      })
      this.shartList = shareRes.data.list
    },
    async onRefresh () {
      await this.getData()
      this.isLoading = false
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="scss">
.van-nav-bar__title {
  font-size: 18px;
}
.find-container {
  .main-box {
    background: #f9f9f9;
  }
  .interview-box {
    background: #fff;
    padding: 0 15px;
    margin-bottom: 10px;
  }
  .title-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 69px;
    .title {
      font-size: 18px;
      font-weight: 500;
      color: #181a39;
    }
    .arrow-box {
      span {
        font-size: 400;
        font-size: 14px;
        color: #545671;
      }
    }
  }
  .interview-list {
    .item {
      padding-bottom: 29px;
      display: flex;
      min-height: 67px;
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
      .cover {
        width: 113px;
        height: 75px;
        margin-left: 16px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .experience-box {
    padding: 0 15px;
    background: #fff;
    .item {
      padding-top: 16px;
      padding-bottom: 28px;
      .title {
        font-size: 16px;
        color: #181a39;
        margin-bottom: 12px;
      }
      .content {
        color: #545671;
        font-size: 14px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .info-box {
        margin-top: 20px;
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #b4b4bd;
        .userinfo {
          flex: 1;
          display: flex;
          align-items: center;
        }
        img {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .time {
          margin-right: 21px;
        }
        .mes {
          margin-right: 23px;
        }
        .iconfont {
          margin-right: 7px;
        }
        .mes,
        .zan {
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
