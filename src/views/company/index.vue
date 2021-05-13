<template>
  <div class="company-container">
    <van-sticky>
      <div class="top-box">
        <span class="title">公司</span>
        <!-- 搜索 -->
        <div class="search-box">
          <van-search
            @search="onSearch"
            v-model="keyword"
            shape="round"
            placeholder="请输入搜索关键词"
          ></van-search>
        </div>
      </div>
      <!-- 图片 -->
      <div v-if="!showPop" class="banner-box">
        <img src="@/assets/ios3x_img_banner@3x.png" />
      </div>
      <!-- 筛选区域 -->
      <div class="filter-box">
        <span
          @click="suggestFilter"
          :class="{ actived: !distance && !score }"
          class="recommend"
          >推荐</span
        >
        <span @click="distanceFilter" class="distance"
          >距离
          <span class="arrow-box">
            <i
              :class="{ actived: distance === 'asc' }"
              class="iconfont rotate iconicon-xuanze-sel"
            ></i>
            <i
              :class="{ actived: distance === 'desc' }"
              class="iconfont iconicon-xuanze-sel"
            ></i>
          </span>
        </span>
        <span @click="scoreFilter" class="grade"
          >评分
          <span class="arrow-box">
            <i
              :class="{ actived: score === 'asc' }"
              class="iconfont rotate iconicon-xuanze-sel"
            ></i>
            <i
              :class="{ actived: score === 'desc' }"
              class="iconfont iconicon-xuanze-sel"
            ></i>
          </span>
        </span>
        <span
          @click="showPop = true"
          :class="{ actived: showPop }"
          class="filter"
          >筛选</span
        >
      </div>
    </van-sticky>
    <!-- 主体区域 -->
    <div class="main-box">
      <van-list
        @load="onLoad"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
      >
        <!-- 列表项 -->
        <item-list
          v-for="item in list"
          :key="item.id"
          :item="item"
          @click-item="clickItem"
        ></item-list>
      </van-list>
    </div>
    <!-- 弹出层 -->
    <van-popup
      transition="fade"
      v-model="showPop"
      position="top"
      :style="{ height: '70%' }"
      class="company-pop"
    >
      <div class="section">
        <h2>距离</h2>
        <div class="items">
          <div
            @click="distanceFilter('desc')"
            :class="{ actived: distance === 'desc' }"
            class="item"
          >
            由远及近
          </div>
          <div
            @click="distanceFilter('asc')"
            :class="{ actived: distance === 'asc' }"
            class="item"
          >
            由近及远
          </div>
        </div>
      </div>
      <div class="section">
        <h2>评分</h2>
        <div class="items">
          <div
            class="item"
            v-for="(item, index) in scoreList"
            :key="index"
            @click="setScoreRange(index)"
            :class="{ actived: scoreIndex === index }"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="control-box van-hairline--top">
        <van-button @click="clearFilter" class="clear-button" type="default"
          >清除</van-button
        >
        <van-button
          @click="showPop = false"
          class="confirm-button"
          type="primary"
          >确认</van-button
        >
      </div>
    </van-popup>
  </div>
</template>

<script>
// 导入接口
import { companyList } from '@/api'
// 导入组件  
import ItemList from './item-list'
export default {
  // 注册组件
  components: { ItemList },
  data () {
    return {
      // 弹出层的状态
      showPop: false,
      // 起始索引
      start: 1,
      // 限制下拉加载数据的个数
      limit: 5,
      // 列表数据
      list: [],
      // 是否正在加载数据
      loading: false,
      // 数据是否加载完成
      finished: false,
      // 排序条件
      distance: undefined,
      score: undefined,
      // 查询关键字
      keyword: '',
      // 总数据量
      total: 0,
      // 分值索引
      scoreIndex: -1,
      // 索引值
      scoreList: ['4分-5分', '3分-4分', '2分-3分', '1分-2分', '1分以下'],
      // 分值范围
      scoreRange: ''
    }
  },
  methods: {
    // 顶部搜索
    onSearch () {
      this.start = 0
      this.list = []
      this.finished = false
      this.getList()
      // 搜索到的内容弹窗提示
      // this.$toast(value)  
    },
    // 获取数据
    async getList () {
      this.loading = true
      // 计算索引值
      const listRes = await companyList({
        start: this.start,
        limit: this.limit,
        distance: this.distance,
        score: this.score,
        q: this.keyword,
        scoreRange: this.scoreRange
      })
      const baseURL = 'https://autumnfish.cn/heimamm_server/'
      // 保存列表数据
      this.list.push(
        ...listRes.data.list.map(v => {
          v.logo += baseURL
          return v
        })
      )
      // 保存总条数
      this.total = listRes.data.total
      // 禁用加载
      this.loading = false
      this.start += this.limit
      if (this.start >= this.total) {
        this.finished = true
      }
    },
    // list组件加载数据
    onLoad () {
      // 计算页码
      this.getList()
    },
    // 元素的点击事件
    clickItem (id) {
      // 去详情页
      this.$router.push(`/company-detail/${id}`)
    },
    // 按距离筛选
    distanceFilter (type) {
      if (this.loading) {
        return
      }
      if (type) {
        this.distance = type
      } else {
        if (this.distance === 'asc') {
          this.distance = 'desc'
        } else {
          this.distance = 'asc'
        }
      }
      this.start = 0
      this.list = []
      this.finished = false
      this.getList()
    },
    // 按评分筛选
    scoreFilter () {
      if (this.loading) {
        return
      }
      if (this.score === 'asc') {
        this.score = 'desc'
      } else {
        this.score = 'asc'
      }
      this.start = 0
      this.list = []
      this.finished = false
      this.getList()
    },
    // 按联想建议筛选
    suggestFilter () {
      if (this.loading) {
        return
      }
      this.distance = undefined
      this.score = undefined
      this.start = 0
      this.list = []
      this.finished = false
      this.getList()
    },
    // 清除筛选
    clearFilter () {
      this.keyword = ''
      this.scoreIndex = -1
      this.scoreRange = ''
      this.suggestFilter()
      this.showPop = false
    },
    // 评分范围
    setScoreRange (index) {
      this.scoreIndex = index
      const item = this.scoreList[index]
      if (item !== '1分以下') {
        this.scoreRange = item.replace(/分/g, '')
      } else {
        this.scoreRange = '0-1'
      }
      this.list = []
      this.finished = false
      this.getList()
    }
  }
}
</script>

<style lang="scss">
.company-container {
  background-color: #fff;
  .top-box {
    padding: 18px 15px;
    display: flex;
    align-items: center;
    background-color: white;
    .title {
      font-size: 18px;
      font-weight: 600;
      margin-right: 19px;
    }
  }
  .search-box {
    width: 345px;
    flex: 1;
    margin: 0 auto;
    height: 34px;
    font-size: 14px;
    color: #b3b3b3;
    display: flex;
    align-items: center;
    justify-content: center;
    .iconfont {
      font-size: 19px;
    }
    .van-search {
      width: 100%;
    }
  }
  .banner-box {
    padding: 0 15px 10px;
    background-color: #fff;
    img {
      width: 100%;
    }
  }
  .filter-box {
    padding: 10px 15px 0;
    display: flex;
    align-items: center;
    background-color: white;
    > span {
      font-size: 14px;
      margin-right: 40px;
      font-weight: normal;
      display: flex;
      align-items: center;
      line-height: 20px;
      letter-spacing: 0;
      i {
        font-size: 15px;
        color: #b4b4bc;
      }
    }
    .arrow-box {
      display: flex;
      flex-direction: column;
      i {
        line-height: 9px;
      }
      .rotate {
        transform: rotate(180deg);
      }
      :not(.rotate) {
        margin-top: 2px;
      }
    }
    .filter {
      flex: 1;
      justify-content: flex-end;
      margin: 0;
    }
    // 高亮效果
    .actived {
      color: #e40137;
    }
  }
  .main-box {
    padding: 0 15px;
  }
  // 弹出层
  .van-overlay {
    top: 100px;
  }
  .van-popup {
    top: 100px;
  }
  // 动画
  // transition切换的效果 淡入 淡出
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  // 弹出层
  .company-pop {
    .section {
      padding: 11px 15px 18px;
      h2 {
        font-size: 18px;
        margin-bottom: 18px;
      }
      .items {
        margin-bottom: 9px;
        display: flex;
        flex-wrap: wrap;
      }
      .item {
        width: 165px;
        height: 32px;
        background: #f9f8f8;
        border-radius: 4px;
        font-size: 12px;
        text-align: center;
        line-height: 32px;
        margin-bottom: 10px;
        &.actived {
          color: #e40137;
        }
      }
      .item:nth-child(2n + 1) {
        margin-right: 15px;
      }
    }
  }
  // 按钮盒子
  .control-box {
    display: flex;
    padding: 15px;
    .van-button {
      border-color: transparent;
      margin-top: 20px;
    }
    .clear-button {
      width: 125px;
      height: 40px;
      background: #ffe2e9;
      border-radius: 7px;
      margin-right: 10px;
      font-size: 16px;
      color: #e40137;
    }
    .confirm-button {
      flex: 1;
      height: 40px;
      background: #e40137;
      border-radius: 7px;
    }
  }
}
</style>
