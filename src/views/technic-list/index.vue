<template>
  <div class="interview-list-container">
    <!-- 顶部 -->
    <div class="top-box">
      <van-nav-bar title="面试技巧" :border="false" @click-left="onClickLeft">
        <template #left>
          <i class="iconfont iconbtn-nav-back"></i>
        </template>
      </van-nav-bar>
      <div class="search-box" @click="$router.push('/search')">
        <i class="iconfont iconicon-search"></i>请输入关键字
      </div>
    </div>
    <!-- 面试技巧区域 -->
    <div class="interview-box">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- 列表区域 -->
        <div class="interview-list">
          <technic-item
            v-for="item in list"
            :key="item.id"
            :item="item"
            @item-click="itemClick"
          >
          </technic-item>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { articlesTechnic } from '@/api'
import TechnicItem from './technic-item'
export default {
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
  components: {
    TechnicItem
  },
  methods: {
    itemClick (itemId) {
      this.$router.push(`/technic-detail/${itemId}`)
    },
    async onLoad () {
      this.loading = true
      const listRes = await articlesTechnic({
        limit: this.limit,
        start: this.start
      })
      const baseURL = 'https://autumnfish.cn/heimamm_server/'
      listRes.data.list.forEach(v => {
        if (v.cover) {
          v.cover += baseURL
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
    onClickLeft () {
      this.$router.push('/find')
    }
  }
}
</script>

<style lang="scss">
.interview-list-container {
  .top-box {
    padding-bottom: 11px;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(24, 26, 57, 0.04);
    .van-nav-bar__left {
      padding-left: 5px;
    }
    .iconbtn-nav-back {
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
  .interview-box {
    background: #fff;
    padding: 0 15px;
    margin-bottom: 10px;
  }
}
</style>
