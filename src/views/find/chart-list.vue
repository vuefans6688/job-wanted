<template>
  <!-- 主题区域 -->
  <div v-if="chartData !== ''" class="shop-box">
    <!-- 标题区域 -->
    <div class="title-box">
      <div class="title">市场数据</div>
      <div class="arrow-box" @click="$router.push('/chart')">
        <span>查看更多</span>
        <i class="iconfont iconicon-more"></i>
      </div>
    </div>
    <!-- 标签区域 -->
    <span class="tag">{{ chartData.city }}</span>
    <span class="tag">{{ chartData.position }}</span>
    <!-- 统计数据 -->
    <!-- 数据统计表 -->
    <div class="list-container">
      <div class="item" v-for="item in list" :key="item.year">
        <span>{{ item.year }}</span>
        <div class="process">
          <div class="step" :style="{ width: (item.salary / chartData.topSalary) * 100 + '%' }">
            ¥{{ item.salary }}
          </div>
        </div>
        <div class="arrow-box">
          <i :class="{ 'iconicon-shangsheng': item.percent > 0, 'iconicon-xiajiang': item.percent < 0 }" class="iconfont"></i>
          <span class="percent-span">{{ item.percent && item.percent + '%' }}</span>
        </div>
      </div>
    </div>
    <!-- 展开更多 -->
    <div class="more" @click="toggleMore">
      <span>{{ list === chartData.yearSalary ? '收起显示' : '展开更多' }}</span>
      <i class="iconfont iconicon-zhankai" :class="{ rotate: list === chartData.yearSalary }"></i>
    </div>
  </div>
</template>

<script>
import { topChartData } from '@/api'
export default {
  data () {
    return {
      chartData: '',
      // 默认展示数组
      list: []
    }
  },
  async created () {
    const res = await topChartData()
    // 对数组进行倒序
    res.data.yearSalary.reverse()
    this.chartData = res.data
    // 默认展示4条数据
    this.list = this.chartData.yearSalary.slice(0, 4)
  },
  methods: {
    toggleMore () {
      if (this.list === this.chartData.yearSalary) {
        this.list = this.chartData.yearSalary.slice(0, 4)
      } else {
        this.list = this.chartData.yearSalary
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.shop-box {
  padding: 0 15px 15px;
  background: #fff;
  margin-bottom: 10px;
  .tag {
    margin-right: 10px;
    display: inline-block;
    padding: 6px;
    border-radius: 4px;
    font-size: 14px;
    color: #545671;
    background-color: #eceaea;
  }
  .list-container {
    margin-top: 26px;
    .item {
      display: flex;
      align-items: center;
      margin-bottom: 21px;
      span {
        color: #545671;
        font-size: 14px;
      }
      .percent-span {
        width: 29px;
        text-align: right;
      }
      .process {
        margin-left: 11px;
        margin-right: 14px;
        flex: 1;
        background-color: #ebdfdf;
        height: 12px;
        border-radius: 4px;
        .step {
          border-radius: 4px;
          background-color: #fe6d67;
          height: 100%;
          width: 50%;
          font-size: 11px;
          text-align: right;
          box-sizing: border-box;
          padding-right: 7px;
          color: #fff;
        }
      }
      .arrow-box {
        display: flex;
        align-items: center;
      }
      .iconfont {
        font-size: 16px;
        margin-right: 8px;
        width: 16px;
      }
      .iconicon-xiajiang {
        color: #fe6d67;
      }
      .iconicon-shangsheng {
        color: #60d183;
      }
    }
  }
  .more {
    text-align: center;
    margin-top: 25px;
    font-size: 14px;
    color: #545671;
    display: flex;
    justify-content: center;
    .iconfont {
      margin-left: 7px;
      font-size: 12px;
      color: #b4b4bc;
      &.rotate {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
