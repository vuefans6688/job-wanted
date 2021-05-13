<template>
  <div class="question-container">
    <!-- 顶部盒子 -->
    <div class="top-box">
      <!-- 下拉菜单 -->
      <van-dropdown-menu class="question-dropdown-menu">
        <van-dropdown-item class="city-drop" ref="cityDrop">
          <template #title>
            <span>面试宝典 {{ selectedCity }}</span>
          </template>
          <template>
            <!-- 索引列 -->
            <van-index-bar>
              <template v-for="(value, key) in filter.citys">
                <van-index-anchor :key="key" :index="key"></van-index-anchor>
                <van-cell
                  v-for="city in value"
                  :key="city"
                  :title="city"
                  @click="selectCity(city)"
                ></van-cell>
              </template>
            </van-index-bar>
          </template>
        </van-dropdown-item>
      </van-dropdown-menu>
      <!-- 横向滚动的tags -->
      <div class="scroll-wrap" ref="scroll">
        <div class="content">
          <van-tag
            v-for="(item, index) in types"
            :key="index"
            @click="typeIndex = index"
            round
            :class="{ animated: types.length !== 0 }"
            :type="typeIndex === index ? 'primary' : ''"
          >
            {{ item.name }}
          </van-tag>
        </div>
      </div>
    </div>
    <!-- 引导盒子 -->
    <div class="nav-box" @click="add">
      <div class="item error">
        <i class="iconfont iconicon-mine-cuoti"></i>常错题库
      </div>
      <div class="item collect">
        <i class="iconfont iconicon-mine-tikushoucang"></i>收藏题库
      </div>
      <!-- 点击去企业 -->
      <div class="item company" @click="$router.push('/company')">
        <i class="iconfont iconicon-mine-qiyeshoucang"></i>企业题库
      </div>
      <div class="item answer">
        <i class="iconfont iconicon-mine-mianjing"></i>已答题库
      </div>
      <!-- 环形进度条 -->
      <van-circle
        v-model="currentRate"
        :rate="rate"
        :color="gradientColor"
        size="120"
        speed="100"
        :stroke-width="70"
        stroke-linecap="round"
        layer-color="transparent"
      >
        <template>
          <div class="circle-bg">
            <h2>顺序刷题</h2>
            <span
              >{{ userData.correctQuestions.toFixed(0) }}/{{
                userData.totalCount.toFixed(0)
              }}</span
            >
          </div>
        </template>
      </van-circle>
    </div>
    <!-- 计数盒子 -->
    <div class="num-box">
      <h2>累计收录</h2>
      <span>{{ userData.totalCount.toFixed(0) }}</span>
    </div>
    <!-- 开始按钮 -->
    <van-button @click="startInterview" class="question-button" type="default"
      >模拟面试</van-button
    >
  </div>
</template>

<script>
import { interFilters, interviewQuestions } from '@/api'
import { mapState, mapMutations } from 'vuex'
import gsap from 'gsap'
export default {
  data () {
    return {
      currentRate: 0,
      rate: 0,
      gradientColor: {
        '0%': '#e40137ad',
        '100%': '#E40137'
      },
      // 筛选条件
      filter: '',
      // 本地数据
      userData: {
        correctQuestions: 0,
        totalCount: 0
      },
      // 类型索引
      typeIndex: 0,
      // 选中的城市
      selectedCity: '全国',
      // 城市和类型的对应关系
      // 类型
      types: [],
      // 测试数字
      num: 100
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created () {
    this.userDataFilter()
  },
  methods: {
    ...mapMutations(['SET_QUESTION']),
    selectCity (city) {
      // 选中的城市
      this.selectedCity = city
      // 切换下拉面板
      this.$refs.cityDrop.toggle()
      // 设置类型的数组
      this.types = this.filter.cityPositions[city]
      // 默认选中全部
      this.typeIndex = 0
      // 滚到最左边
      this.$refs.scroll.scroll(0, 0)
    },
    // 开始面试
    async startInterview () {
      const questionRes = await interviewQuestions({
        type: this.types[this.typeIndex].id,
        city: this.selectedCity
      })
      this.SET_QUESTION(questionRes.data)
      // 去刷题页
      this.$router.push('/interview')
    },
    async userDataFilter () {
      if (this.userInfo === '') {
        return this.$router.toLogin()
      }
      // 重置数据
      this.userData.correctQuestions = 0
      this.userData.totalCount = 0
      this.rate = 0
      if (!this.filter) {
        this.$toast.loading()
        const filterRes = await interFilters()
        this.$toast.clear()
        this.filter = filterRes.data
      }
      // 数字
      gsap.to(this.$data.userData, {
        duration: 1.5,
        correctQuestions: this.userInfo.correctQuestions.length,
        totalCount: this.filter.totalCount
      })
      // 进度
      const targetRate = (this.userInfo.correctQuestions.length / this.filter.totalCount) * 100
      gsap.to(this.$data, { duration: 1.5, rate: targetRate })
      // 计算比例
      // 获取比例值
      // 设置类型的数组
      // 设置对应的类型
      this.types = this.filter.cityPositions[this.selectedCity]
    },
    add () {
      this.rate += 10
    }
  }
}
</script>

<style lang="scss">
.question-container {
  // 顶部盒子
  .top-box {
    background-color: white;
    box-shadow: 0 0.05333rem 0.32rem rgba(100, 101, 102, 0.08);
  }
  // 下拉菜单
  .question-dropdown-menu {
    // 顶部 中间
    .van-ellipsis {
      font-size: 12px;
      color: #545671;
      span {
        font-size: 18px;
        margin: 5px;
        color: #222;
      }
    }
    // 下箭头
    .van-dropdown-menu__title {
      &::after {
        border-color: transparent transparent #42b983 #42b983;
      }
    }
    // 阴影
    .van-dropdown-menu__bar {
      box-shadow: none;
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
  // 横向滚动 tags
  .scroll-wrap {
    width: 100%;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .content {
      padding: 15px;
      height: 59px;
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
  // 引导盒子
  .nav-box {
    height: 200px;
    margin-top: 15px;
    background-color: white;
    position: relative;
    .item {
      position: absolute;
      font-size: 12px;
      color: #545671;
      .iconfont {
        color: white;
        display: block;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        text-align: center;
        line-height: 44px;
        font-size: 24px;
        margin-bottom: 7px;
      }
      &.error {
        top: 20px;
        left: 42px;
        .iconfont {
          background: linear-gradient(#ff8080, #ff4949);
        }
      }
      &.collect {
        top: 20px;
        right: 42px;
        .iconfont {
          background: linear-gradient(#ffda05, #ffb302);
        }
      }
      &.company {
        bottom: 20px;
        left: 42px;
        .iconfont {
          background: linear-gradient(#00ddec, #00b8d4);
        }
      }
      &.answer {
        bottom: 20px;
        right: 42px;
        .iconfont {
          background: linear-gradient(#3ee5b1, #1dc779);
        }
      }
    }
    .van-circle {
      position: absolute;
      width: 112px;
      height: 112px;
      display: flex;
      align-items: center;
      justify-content: center;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .van-circle::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background-image: url("../../assets/circleBg.png");
      background-size: 100%;
    }
    .circle-bg {
      width: 100px;
      box-sizing: border-box;
      height: 100px;
      border-radius: 50%;
      background: linear-gradient(#ff6f92, #e40137);
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 20px 0;
      h2 {
        /* color: orange; */
        margin: 0;
        color: white;
        font-size: 16px;
      }
      span {
        color: white;
        font-size: 16px;
      }
    }
  }
  .num-box {
    height: 130px;
    background: white;
    font-size: 18px;
    text-align: center;
    padding-top: 21px;
    margin-top: 20px;
    h2 {
      margin: 0;
      margin-bottom: 21px;
    }
    span {
      font-size: 30px;
    }
  }
  .question-button {
    width: 345px;
    height: 50px;
    background: #00b8d4;
    border-radius: 7px;
    color: white;
    margin: 15px auto;
    display: block;
  }
  .content .van-tag {
    opacity: 0;
    transition: all 0.5s;
  }
  // 动画
  .content .van-tag.animated {
    opacity: 1;
  }
}
</style>
