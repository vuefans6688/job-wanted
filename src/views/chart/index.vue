<template>
  <div class="chart-container">
    <div class="top-box">
      <van-nav-bar
        title="市场数据"
        :border="false"
        @click-left="$router.push('/find')"
      >
        <template #left>
          <i class="iconfont button-nav-back"></i>
        </template>
      </van-nav-bar>
      <!-- 使用下拉菜单实现 -->
      <van-dropdown-menu>
        <van-dropdown-item :title="selectCity" ref="city-drop">
          <van-search
            v-model="cityQuery"
            shape="round"
            placeholder="请输入搜索关键词"
          ></van-search>
          <!-- 索引列 -->
          <van-index-bar>
            <template v-for="(citys, key) in indexData">
              <van-index-anchor :index="key" :key="key"></van-index-anchor>
              <van-cell
                v-for="item in citys"
                :title="item[0]"
                @click="selectedCity(item)"
                :key="item[0]"
              >
              </van-cell>
            </template>
          </van-index-bar>
        </van-dropdown-item>
        <van-dropdown-item
          :title="selectPosition"
          v-model="selectPosition"
          ref="position-drop"
        >
          <div class="list">
            <van-search
              v-model="positionQuery"
              shape="round"
              placeholder="请输入搜索关键词"
            ></van-search>
            <van-cell
              v-for="item in positions"
              :key="item"
              @click="selectedPosition(item)"
              :title="item"
            ></van-cell>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>
    <!-- 图标区域 -->
    <div class="main">
      <!-- 工资 -->
      <div class="salary-box">
        <h2>工资收入</h2>
        <!-- 表头 -->
        <div class="table-head van-hairline--bottom">
          <span>区间</span>
          <span>占比</span>
        </div>
        <canvas id="salary"></canvas>
        <!-- 底部 -->
        <div class="bottom-info">
          近1年 {{ percentSample }} 份样本 / 可信度：高
        </div>
      </div>
      <!-- 工作经验 -->
      <div class="experience-box">
        <h2>工作经验</h2>
        <div class="tooltip">
          <span></span>
          <span></span>
        </div>
        <canvas id="experience"></canvas>
      </div>
      <!-- 平均工资 -->
      <div class="average-box">
        <h2>历年平均工资变化趋势</h2>
        <div class="tooltip">
          <span></span>
          <span></span>
        </div>
        <canvas id="average"></canvas>
      </div>
      <!-- 就业形势 -->
      <div class="situation-box">
        <h2>就业形势</h2>
        <span class="axis">相关职位比例</span>
        <canvas id="situation"></canvas>
        <div class="tip-box">
          <van-icon name="warning-o">说明</van-icon>
        </div>
        <div class="info">
          曲线越向上代表市场需求量越大，就业情况越好。反之，代表该类职位需求量较少。
          该数据由各地招聘网站统计而来，可能因抓取系统稳定性等因素而致使数据偏离客观实情，仅供参考。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import F2 from '@antv/f2'
import $ from 'jquery'
import { chartIndexes, chartStatistics } from '@/api'  // 城市和职位接口
export default {
  data () {
    return {
      // 是否显示弹出层
      showPop: false,
      // 是否显示列表
      showCity: false,
      // 城市索引数据
      cityData: '',
      // 职位列表
      positionData: [],
      // 城市检索
      cityQuery: '',
      // 选择的城市
      selectCity: '',
      // 选择的职位
      selectPosition: '',
      // 职位检索
      positionQuery: '',
      // 索引数据
      indexData: '',
      // 工资收入百分比
      percentSalary: '',
      // 百分比分布样本个数
      percentSample: 0
    }
  },
  computed: {
    // 城市搜索
    citys () {
      // 临时城市
      const tempCity = {}
      // 遍历城市数据
      for (const key in this.cityData) {
        const filterCitys = this.cityData[key].filter(v => v.includes(this.cityQuery))
        if (filterCitys.length > 0) {
          tempCity[key] = filterCitys
        }
      }
      return tempCity
    },
    positions () {
      // 遍历城市数据
      return this.positionData.filter(v => v.includes(this.positionQuery))
    }
  },
  // 获取索引数据，并默认选中第一个
  async created () {
    const res = await chartIndexes()
    this.indexData = res.data
    // 默认选中第一个
    const cityData = this.indexData['热门'][0]
    this.selectCity = cityData[0]
    // 设置职位信息
    this.positionData = cityData[1]
    // 默认选中第一个
    this.selectPosition = this.positionData[0]
  },
  methods: {
    // 选中职位
    async selectedPosition (position) {
      // 保存职位
      this.selectPosition = position
      // 关闭遮罩层
      this.$refs['position-drop'].toggle()
    },
    // 选中城市
    async selectedCity (cityData) {
      this.selectCity = cityData[0]
      this.$refs['city-Drop'].toggle()
      // 设置职位信息
      this.positionData = cityData[1]
      // 默认选中第一个
      this.selectPosition = this.positionData[0]
    },
    // 工资收入
    salaryChart () {
      // 处理数据格式
      const data = this.percentSalary
      // 颜色数组
      const colorArray = ['#73a0fa', '#73deb3', '#7585a2', '#eb7e65', '#f7c739']
      // 定义颜色对象
      const colorObject = {}
      // 设置图例项的内容
      const legendItems = []
      data.forEach((obj, i) => {
        const item = {
          name: obj.assetType,
          // 显示的内容
          value: ' ' + obj.percent + '%',
          marker: {
            symbol: 'square',
            fill: colorArray[i],
            radius: 4
          }
        }
        // 生成颜色和 assetType的对应关系
        colorObject[obj.assetType] = colorArray[i]
        legendItems.push(item)
      })
      const chart = new F2.Chart({
        id: 'salary',
        pixelRatio: window.devicePixelRatio
      })
      chart.source(data, {
        percent: {
          formatter: function formatter (val) {
            return val + '%'
          }
        }
      })
      chart.coord('polar', {
        transposed: true,
        radius: 0.9,
        innerRadius: 0.5
      })
      chart.legend({
        position: 'right',
        // 开启自定义
        custom: true,
        showTitle: true,
        // 设置每一项
        items: legendItems,
        nameStyle: {
          fill: '#808080'
        }, // 图例每项key值文本样式
        valueStyle: {
          fill: '#333',
          textAlign: 'left'
        }
      })
      chart.axis(false)
      chart.guide().html({
        position: ['50%', '55%'],
        html: `<div class="salary-info" >\n
            <p id="title"></p>\n
            <p id="money"></p>\n
          </div>`
      })
      chart
        .interval()
        .position('const*percent')
        .color('assetType', val => {
          return colorObject[val]
        })
        .adjust('stack')
        .style({
          lineWidth: 1,
          stroke: '#fff'
        })
      chart.render()
      document.querySelector('#title').innerText = '平均'
      document.querySelector('#money').innerText = '¥ 17610'
    },
    // 工作经验
    experienceChart () {
      // 数据
      /*
       *
       * [{ num:'4500',info:'应届生',value:1000 },]
       */
      const data = this.experienceSalary
      // 位置
      const canvasOffsetTop = $('#experience').position().top
      const canvasOffsetLeft = $('#experience').position().left
      const chart = new F2.Chart({
        id: 'experience',
        pixelRatio: window.devicePixelRatio
      })
      chart.source(data)
      chart.tooltip({
        custom: true,
        onChange: function onChange (ev) {
          const tooltipEl = $('.experience-box .tooltip')
          const currentData = ev.items[0]
          const text = currentData.value
          tooltipEl.html(
            [
              `<span><b>${currentData.origin.info}:${currentData.origin.value}元</b></span>`,
              '<span>' + text + ' 个样本</span>'
            ].join('')
          )
          tooltipEl.css({
            opacity: 1,
            left:
              canvasOffsetLeft +
              currentData.x -
              tooltipEl.outerWidth() / 2 +
              'px',
            top:
              canvasOffsetTop +
              currentData.y -
              tooltipEl.outerHeight() -
              15 +
              'px'
          })
        }
      })
      chart.axis('info', {
        tickLine: {
          length: 4,
          stroke: '#e8e8e8',
          lineWidth: 1
        }
      })
      // 设置线段
      chart
        .line()
        .position('info*value')
        .color('#00b8d4')
      // 设置转折点
      chart
        .point()
        .position('info*value')
        .adjust('stack')
        .style('medalType', { fill: '#fff', lineWidth: 1 })
        .color('#00b8d4')
      // 设置面积区域
      chart
        .area()
        .position('info*value')
        .color('#00b8d4')
      chart.render()
    },
    // 平均工资变化趋势
    averageChart () {
      // 数据
      const data = this.yearSalary
      // 位置
      const canvasOffsetTop = $('#average').position().top
      const canvasOffsetLeft = $('#average').position().left
      const chart = new F2.Chart({
        id: 'average',
        pixelRatio: window.devicePixelRatio
      })
      chart.source(data, {
        date: {
          tickCount: 5,
          min: 0
        }
      })
      chart.tooltip({
        custom: true,
        onChange: function onChange (ev) {
          const tooltipEl = $('.average-box .tooltip')
          const currentData = ev.items[0]
          tooltipEl.html(
            [
              `<span><b>${currentData.origin.date}:${currentData.origin.value}元</b></span>`
            ].join('')
          )
          tooltipEl.css({
            opacity: 1,
            left:
              canvasOffsetLeft +
              currentData.x -
              tooltipEl.outerWidth() / 2 +
              'px',
            top:
              canvasOffsetTop +
              currentData.y -
              tooltipEl.outerHeight() -
              15 +
              'px'
          })
        }
      })
      chart.axis('date', {
        tickLine: {
          length: 2,
          stroke: '#e8e8e8',
          lineWidth: 1
        }
      })
      // 设置线段
      chart
        .line()
        .position('date*value')
        .color('#00b8d4')
      // 设置转折点
      chart
        .point()
        .position('date*value')
        .adjust('stack')
        .style('medalType', { fill: '#fff', lineWidth: 1 })
        .color('#00b8d4')
      // 设置面积区域
      chart
        .area()
        .position('date*value')
        .color('#00b8d4')
      chart.render()
    },
    // 就业形势
    situationChart () {
      // 数据
      const data = this.employmentNum
      const chart = new F2.Chart({
        id: 'situation',
        pixelRatio: window.devicePixelRatio
      })
      chart.source(data, {})
      chart.axis('value', false)
      chart.axis('date', {
        label: {
          rotate: -Math.PI / 2,
          textAlign: 'end',
          textBaseline: 'middle'
        }
      })
      // 设置线段
      chart
        .line()
        .position('date*value')
        .color('#00b8d4')
        .shape('smooth')
      // 设置转折点
      chart
        .point()
        .position('date*value')
        .adjust('stack')
        .style('medalType', { fill: '#fff', lineWidth: 1 })
        .color('#00b8d4')
      // 设置面积区域
      chart
        .area()
        .position('date*value')
        .color('#00b8d4')
      chart.render()
    },
    // 切换城市弹出层
    toggleCity () {
      this.showCity = !this.showCity
    },
    // 切换职位弹出层
    togglePosition () {
      this.showPop = !this.showPop
    }
  },
  watch: {
    async selectPosition () {
      // 调用接口获取统计数据
      const chartRes = await chartStatistics({
        city: this.selectCity,
        position: this.selectPosition
      })
      // 保存百分比数据
      this.percentSalary = chartRes.data.percentSalary
      // 重新百分比待遇信息渲染
      this.salaryChart()
      // 保存样本数
      this.percentSample = chartRes.data.percentSample
      // 保存工作经验数据
      this.experienceSalary = chartRes.data.experienceSalary
      this.experienceChart()
      // 处理历史平均工资
      this.yearSalary = chartRes.data.yearSalary.map(v => {
        return {
          num: v.sample + '',
          date: parseInt(v.year) + '',
          value: parseInt(v.salary)
        }
      })
      // 生成平均工资图表
      this.averageChart()
      // 招聘形式图表
      this.employmentNum = chartRes.data.employmentNum
      this.situationChart()
    }
  }
}
</script>

<style lang="scss">
.chart-container {
  .top-box {
    background: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(24, 26, 57, 0.04);
    position: relative;
    .van-nav-bar__left {
      padding-left: 5px;
    }
    .button-nav-back {
      font-size: 44px;
    }
    .option-box {
      display: flex;
      justify-content: space-between;
      padding: 0 79px;
      .option {
        font-size: 14px;
        color: #222222;
      }
      .iconfont {
        color: #b4b4bc;
      }
    }
  }
  .main {
    padding: 15px;
    h2 {
      font-size: 18px;
      font-weight: 500;
      margin: 0;
      margin-bottom: 12px;
    }
    canvas {
      width: 100%;
      height: 190px;
    }
    .salary-info {
      text-align: center;
      width: 150px;
      height: 50px;
      p {
        color: #222222;
      }
      #title {
        font-size: 11px;
        margin: 0;
        margin-bottom: 5px;
      }
      #money {
        font-size: 11px;
        margin: 0;
      }
    }
    .salary-box {
      position: relative;
      margin-bottom: 40px;
      .table-head {
        width: 147px;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #b4b4bd;
        padding-bottom: 7px;
        position: absolute;
        right: 20px;
        top: 40px;
      }
      .bottom-info {
        font-size: 12px;
        color: #b4b4bd;
        text-align: center;
      }
    }
  }
  .chart-wrapper {
    position: relative;
  }
  .tooltip {
    -moz-box-shadow: 1px 1px 0.5px 0.5px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 1px 1px 0.5px 0.5px rgba(0, 0, 0, 0.3);
    box-shadow: 1px 1px 0.5px 0.5px rgba(0, 0, 0, 0.3);
    position: absolute;
    z-index: 99;
    background-color: #00b8d4;
    padding: 5px;
    border-radius: 3px;
    text-align: center;
    width: 140px;
    opacity: 0;
  }
  .tooltip span {
    display: block;
    color: #fff;
  }
  .tooltip span:nth-child(1) {
    font-size: 11px !important;
  }
  .tooltip span:nth-child(2) {
    font-size: 13px !important;
  }
  // 平均
  .situation-box {
    position: relative;
    .axis {
      position: absolute;
      font-size: 10px;
      transform: rotate(-90deg);
      left: -30px;
      top: 100px;
      color: #545671;
    }
    .tip-box {
      font-size: 12px;
      color: #545671;
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      span {
        font-size: 12px;
        font-weight: 600;
      }
    }
    .info {
      font-size: 10px;
      text-align: justify;
      color: #545671;
      line-height: 15px;
    }
  }
  // 弹出层
  .select-box {
    background-color: #f7f4f5;
    height: 649px;
    position: absolute;
    top: 75px;
    width: 100%;
    z-index: 999;
  }
  .van-dropdown-menu__bar {
    box-shadow: none;
  }
  // transition切换的效果 淡入 淡出
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .van-search {
    // background-color: transparent;
    background: #f7f4f5;
    .van-search__content {
      background-color: #fff;
    }
  }
  .van-index-anchor {
    background-color: #f7f4f5;
  }
  .van-ellipsis {
    font-size: 14px;
  }
  .van-dropdown-menu__title--active {
    color: #323233;
    &::after {
      color: #e40137;
      transform: rotate(-45deg);
      margin-top: -0.13333rem;
    }
  }
}
</style>
