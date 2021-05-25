<template>
  <div class="experience-list-container">
    <div class="top-box">
      <van-nav-bar
        title="面试技巧"
        :border="false"
        @click-left="$router.push('/find')"
      >
        <template #left>
          <i class="iconfont button-nav-back"></i>
        </template>
      </van-nav-bar>
      <div class="search-box" @click="$router.push('/search')">
        <i class="iconfont iconicon-search"></i>请输入关键字
      </div>
    </div>
    <!-- 列表 -->
    <div class="experience-box">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="experience-list">
          <share-item
            v-for="item in list"
            :key="item.id"
            :item="item"
            @share-item-click="shareItemClick"
          >
          </share-item>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { articlesShare } from '@/api'
import ShareItem from './share-item'
export default {
  components: {
    ShareItem
  },
  data () {
    return {
      limit: 5,
      start: 0,
      total: 0,
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async onLoad () {
      this.loading = true
      const listRes = await articlesShare({
        limit: this.limit,
        start: this.start
      })
      listRes.data.list.forEach(v => {
        if (v.author.avatar) {
          v.author.avatar += 'https://autumnfish.cn/heimamm_server/'
        }
      })
      this.list.push(...listRes.data.list)
      this.total = listRes.data.total
      this.start += this.limit
      this.loading = false
      if (this.start >= this.total) {
        this.finished = true
      }
    },
    shareItemClick (id) {
      this.$router.push(`/share-detail/${id}`)
    }
  }
}
</script>

<style lang="scss">
.experience-list-container {
  .top-box {
    padding-bottom: 11px;
    background: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(24, 26, 57, 0.04);
    .van-nav-bar__left {
      padding-left: 5px;
    }
    .button-nav-back {
      font-size: 44px;
    }
    .search-box {
      width: 345px;
      margin: 0 auto;
      height: 34px;
      background: #f7f4f5;
      border-radius: 17px;
      font-size: 14px;
      color: #b3b3b3;
      display: flex;
      align-items: center;
      justify-content: center;
      .iconfont {
        font-size: 19px;
      }
    }
  }
  .experience-box {
    padding: 0 15px;
    background: #fff;
  }
}
</style>
