<template>
  <div class="user-info-container">
    <!-- 导航栏 -->
    <van-nav-bar @click-left="$router.push('/my')" title="我的资料">
      <template #left>
        <i class="iconfont button-nav-back"></i>
      </template>
    </van-nav-bar>
    <!-- 主体区域 -->
    <div class="main-box">
      <!-- 头像 -->
      <van-cell
        @click="toEdit('avatar')"
        title="头像"
        class="icon-cell my-cell"
      >
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <i class="iconfont more"></i>
        </template>
        <template>
          <img :src="userInfo && userInfo.avatar" alt="" class="avatar" />
        </template>
      </van-cell>
      <!-- 昵称 -->
      <van-cell-group>
        <van-cell
          @click="toEdit('nickname')"
          title="昵称"
          :border="false"
          class="my-cell"
          :value="userInfo && userInfo.nickname"
        >
          <template #right-icon>
            <i class="iconfont more"></i>
          </template>
        </van-cell>
        <van-cell
          @click="showGenderPicker = true"
          title="性别"
          :border="false"
          class="my-cell"
          :value="userInfo && userInfo.gender | formatGender"
        >
          <template #right-icon>
            <i class="iconfont more"></i>
          </template>
        </van-cell>
        <van-cell
          @click="showAreaPicker = true"
          title="地区"
          :border="false"
          class="my-cell"
          :value="(userInfo && userInfo.area) || '未知'"
        >
          <template #right-icon>
            <i class="iconfont more"></i>
          </template>
        </van-cell>
        <!-- 简介 -->
        <van-cell
          @click="toEdit('intro')"
          title="个人简介"
          :border="false"
          class="my-cell"
          :value="userInfo && userInfo.intro"
        >
          <template #right-icon>
            <i class="iconfont more"></i>
          </template>
        </van-cell>
      </van-cell-group>
      <!-- 底部登出按钮 -->
      <van-button @click="logout" class="logout-button">退出登录</van-button>
      <!-- 性别选择弹出层 -->
      <van-popup v-model="showGenderPicker" position="bottom">
        <van-picker
          @confirm="onGenderConfirm"
          :columns="genderColumns"
          show-toolbar
          @cancel="showGenderPicker = false"
          :default-index="userInfo && userInfo.gender"
        >
        </van-picker>
      </van-popup>
      <!-- 城市选择弹出层 -->
      <van-popup v-model="showAreaPicker" position="bottom">
        <van-area
          @confirm="onAreaConfirm"
          @cancel="showAreaPicker = false"
          :area-list="areaList"
          :columns-num="2"
        >
        </van-area>
      </van-popup>
    </div>
  </div>
</template>

<script>
// 导入vuex的辅助函数
import { mapActions, mapState, mapMutations } from 'vuex'
// 导入省市区数据  
import areaList from '@/utils/cityData'
// 导入token工具函数  
import { removeLocal } from '@/utils/local'
// 导入接口  
import { edit } from '@/api'
export default {
  data () {
    return {
      // 是否显示性别选择器
      showGenderPicker: false,
      // 性别选项
      genderColumns: ['未知', '男', '女'],
      // 是否显示城市选择器
      showAreaPicker: false,
      // 性别
      gender: '',
      // 省市区数据
      areaList
    }
  },
  async created () {
    // 获取用户信息
    await this.getUserInfo()
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapActions(['getUserInfo']),
    ...mapMutations(['SET_USER_INFO']),
    // 确认了性别
    async onGenderConfirm (item, gender) {
      // 修改数据
      await edit({ gender })
      // 重新获取数据
      await this.getUserInfo(true)
      this.$toast.success('性别修改成功')
      // 关闭弹出框
      this.showGenderPicker = false
    },
    // 确认了城市
    async onAreaConfirm (items) {
      // 修改城市
      await edit({ area: items[1].name })
      // 重新获取数据
      await this.getUserInfo(true)
      this.$toast.success('城市修改成功')
      // 关闭弹出框
      this.showAreaPicker = false
    },
    // 用户登出
    logout () {
      this.$dialog.confirm({ title: '提示', message: '确认退出?' }).then(() => {
        // 移除用户信息
        this.SET_USER_INFO(undefined)
        // 移除token
        removeLocal()
        // 去发现页
        this.$router.push('/login')
      }).catch(() => {
        this.$toast.fail('取消退出')
      })
    },
    // 去编辑页
    toEdit (event) {
      this.$router.push(`/edit-info?property=${event}`)
    }
  }
}
</script>

<style lang="scss">
.user-info-container {
  background-color: #f9f9f9;
  height: 100vh;
  .van-nav-bar__left {
    padding-left: 5px;
  }
  .button-nav-back {
    font-size: 44px;
  }
  .main-box {
    padding: 15px;
  }
  .icon-cell {
    border-radius: 8px;
  }
  .my-cell {
    height: 55px;
    align-items: center;
    .iconfont:first-child {
      font-size: 22px;
      margin-right: 12px;
    }
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .iconfont:last-child {
      font-size: 10px;
      margin-left: 9px;
      color: #5b5d75;
    }
  }
  .icon-cell {
    .van-cell__value {
      padding-top: 5px;
    }
  }
  .van-cell-group {
    margin-top: 10px;
    border-radius: 8px;
    overflow: hidden;
  }
  .logout-button {
    width: 100%;
    border-radius: 8px;
    color: #e40137;
    margin-top: 10px;
  }
}
</style>
