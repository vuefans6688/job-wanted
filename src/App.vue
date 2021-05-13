<template>
  <div id="app" :class="{ 'active-tabbar': $route.meta.showTabbar }">
    <!-- 使用keep-alive包裹router-view -->
    <keep-alive include="company, question, find, my">
      <router-view></router-view>
    </keep-alive>
    <van-tabbar v-model="active" v-show="$route.meta.showTabbar" active-color="#07c160" 
      inactive-color="#b4b4bd" route>
      <van-tabbar-item name="company" to="/company">
        <span>公司</span>
        <template #icon>
          <i class="iconfont iconicon-footbar-gs-nor"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="question" to="/question" icon="search">
        <span>刷题</span>
        <template #icon>
          <i class="iconfont iconicon-footbar-st-nor"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="find" to="/find" icon="friends-o">
        <span>发现</span>
        <template #icon>
          <i class="iconfont iconicon-footbar-fx-nor"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="my" to="/my" icon="setting-o">
        <span>我的</span>
        <template #icon>
          <i class="iconfont iconicon-footbar-wode-nor"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapActions } from 'vuex'  // 导入vuex赋值函数
export default {
  name: 'app',
  data () {
    return {
      active: 'find'
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    ...mapActions(['getUserInfo'])  // 合并到methods中
  }
}
</script>

<style lang="scss">
#app {
  &.active-tabbar {
    padding-bottom: 50px;
  }
  .van-tabbar-item__icon {
    i {
      font-size: 28px;
    }
  }
  .van-tabbar-item__text {
    span {
      font-size: 10px;
    }
  }
  // transition切换的效果，淡入淡出
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.1s;
  }
  // .fade-leave-active below version 2.1.8
  .fade-enter,
  .fade-leave-to {   
    opacity: 0;
  }
}
</style>

