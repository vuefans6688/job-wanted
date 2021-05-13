<template>
  <div class="company-position-container">
    <!-- 顶部区域 -->
    <van-sticky>
      <div class="top-box">
        <!-- 顶部导航 -->
        <van-nav-bar :border="false" @click-left="$router.go(-1)">
          <template #left>
            <i class="iconfont iconbtn-nav-back"></i>
          </template>
          <template #title>
            <span class="custom-title"
              >在招职位
              <span class="num">{{ total }}</span>
            </span>
          </template>
        </van-nav-bar>
        <!-- 横向滚动的tags -->
        <div class="scroll-wrap">
          <div class="content">
            <van-tag
              @click="type = undefined"
              :type="type === undefined ? 'primary' : ''"
              round
              >全部</van-tag
            >
            <!-- 循环生成标签 -->
            <van-tag
              @click="type = item.text"
              :type="type === item.text ? 'primary' : ''"
              v-for="item in filter.types"
              :key="item.id"
              round
            >
              {{ item.text }}
            </van-tag>
          </div>
        </div>
        <!-- 下拉菜单 -->
        <van-dropdown-menu>
          <van-dropdown-item
            v-model="city"
            :options="filter.cityFilters"
            class="city-drop"
          >
            <!-- 标题插槽 -->
            <template #title>城市</template>
          </van-dropdown-item>
          <van-dropdown-item
            v-model="experience"
            :options="filter.experienceFilters"
            class="experience-drop"
          >
            <!-- 标题插槽 -->
            <template #title>经验</template>
          </van-dropdown-item>
          <van-dropdown-item
            class="order-drop"
            v-model="salary"
            :options="filter.salaryFilters"
          >
            <!-- 标题插槽 -->
            <template #title>待遇</template>
          </van-dropdown-item>
        </van-dropdown-menu>
      </div>
    </van-sticky>
    <!-- 底部列表区域 -->
    <div class="main-box">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <position-item
          v-for="item in list"
          :key="item.id"
          :item="item"
        ></position-item>
      </van-list>
    </div>
  </div>
</template>

<script>
import { companyPositions, positionFilters } from '@/api'  // 导入接口
import PositionItem from './position-item'
export default {
  components: {
    PositionItem
  },
  data () {
    return {
      // 分页相关数据
      limit: 5,
      start: 0,
      // 列表数据
      list: [],
      // 列表组件相关
      loading: false,
      finished: false,
      // 总数据
      total: 0,
      // 筛选相关数据
      filter: {
        cityFilters: [],
        experienceFilters: [],
        salaryFilters: [],
        types: []
      },
      // 筛选条件
      experience: undefined,
      salary: undefined,
      city: undefined,
      type: undefined
    }
  },
  methods: {
    // 加载数据
    async onLoad () {
      // 开启加载动画
      this.loading = true
      // 获取数据
      const positionRes = await companyPositions({
        id: this.$route.params.id,
        limit: this.limit,
        start: this.start,
        experience: this.experience,
        salary: this.salary,
        city: this.city,
        type: this.type
      })
      // 添加数据
      this.list.push(...positionRes.data.list)
      // 设置总数
      this.total = positionRes.data.total
      // 关闭loading
      this.loading = false
      // 累加索引
      this.start += this.limit
      if (this.start >= positionRes.data.total) {
        this.finished = true
      }
    }
  },
  watch: {
    // 经验
    experience () {
      this.start = 0
      this.list = []
      this.finished = false
    },
    // 薪水
    salary () {
      this.start = 0
      this.list = []
      this.finished = false
    },
    // 城市
    city () {
      this.start = 0
      this.list = []
      this.finished = false
    },
    // 类型
    type () {
      this.start = 0
      this.list = []
      this.finished = false
    },
    // 获取数据
    async saveFilterData () {
      const filterRes = await positionFilters(this.$route.params.id)
      // 保存筛选数据
      this.filter = filterRes.data
      // 处理数据格式 - 城市
      this.filter.cityFilters = this.filter.cityFilters.map(v => {
        return {
          value: v,
          text: v
        }
      })
      // 处理数据格式 - 经验
      this.filter.experienceFilters = this.filter.experienceFilters.map(v => {
        return {
          value: v,
          text: v
        }
      }
      )
      // 处理数据格式 - 待遇
      this.filter.salaryFilters = this.filter.salaryFilters.map(v => {
        return {
          value: v,
          text: v
        }
      })
      // 处理 数据格式 - 类型
      this.filter.types = this.filter.types.map(v => {
        return {
          value: v,
          text: v
        }
      })
      // 数据全部添加一个全部
      for (const key in this.filter) {
        if (key !== 'types') {
          this.filter[key].unshift({
            value: undefined,
            text: '全部'
          })
        }
      }
    }
  },
  created () {
    this.saveFilterData()
  }
}
</script>

<style lang="scss">
.company-position-container {
  .top-box {
    background-color: white;
    .van-nav-bar__left {
      padding-left: 5px;
    }
    .iconbtn-nav-back {
      font-size: 44px;
    }
    .van-ellipsis {
      overflow: visible;
    }
    .custom-title {
      position: relative;
      .num {
        position: absolute;
        top: -5px;
        right: -15px;
        font-size: 12px;
        color: #545671;
      }
    }
    .scroll-wrap {
      width: 100%;
      overflow-x: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      .content {
        padding: 15px;
        display: flex;
        .van-tag {
          padding: 6px 12px;
          flex-shrink: 0;
          margin-right: 10px;
          background: #f7f4f5;
          color: #545671;
        }
        .van-tag--primary {
          background: #00b8d4;
          color: white;
        }
      }
    }
    // 下拉菜单-自定义
    .experience-drop,
    .order-drop {
      .van-cell__title {
        text-align: center;
      }
      .van-cell__value {
        position: absolute;
        right: 10px;
      }
    }
    .city-drop {
      .van-index-anchor {
        transform: translateY(-1px);
        font-size: 12px;
        color: #939393;
        background-color: #f7f4f5;
      }
    }
  }
  // 主体区域
  .main-box {
    padding: 0 15px;
    background-color: white;
    margin-top: 2px;
  }
}
</style>
