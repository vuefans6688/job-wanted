<template>
  <div class="edit-info-container">
    <!-- 顶部信息 -->
    <div class="top-box">
      <van-nav-bar :border="false" @click-left="$router.push('/user-info')">
        <template #left>
          <i class="iconfont iconbtn-nav-back"></i>
        </template>
        <template #right>
          <span v-if="isEdit" @click="submit">保存</span>
        </template>
        <template #title>
          <span>修改{{ map[property] }}</span>
        </template>
      </van-nav-bar>
    </div>
    <!-- 个人信息 -->
    <div class="main-box">
      <van-form ref="form">
        <!-- 昵称 -->
        <van-field
          v-if="property === 'nickname'"
          v-model="form.nickname"
          name="nickname"
          placeholder="请输入昵称"
        ></van-field>
        <!-- 头像 -->
        <van-field
          v-else-if="property === 'avatar'"
          name="avatar"
          class="icon-field"
        >
          <template #input>
            <van-uploader
              v-model="files"
              :before-read="beforeRead"
              :after-read="afterRead"
              :max-count="1"
              preview-size="200px"
            ></van-uploader>
          </template>
        </van-field>
        <!-- 个人简介 -->
        <van-field
          v-else-if="property === 'intro'"
          v-model="form.intro"
          name="intro"
          placeholder="请输入个人简介"
        ></van-field>
        <!-- 职位名称 -->
        <van-field
          v-else-if="property === 'position'"
          v-model="form.position"
          name="position"
          placeholder="请输入职位名"
        ></van-field>
      </van-form>
    </div>
  </div>
</template>

<script>
// 导入接口
import { edit, uploadAvatar } from '@/api'
// 导入辅助函数  
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      // 修改个人信息的字段
      form: {
        nickname: '',
        intro: '',
        avatar: '',
        position: ''
      },
      // 上传的文件信息
      files: [],
      property: this.$route.query.property,
      // 属性对应关系
      map: {
        intro: '个性签名',
        nickname: '昵称',
        avatar: '头像',
        position: '职位'
      },
      // 数据是否变更了
      isEdit: false
    }
  },
  created () {
    this.getStateData()
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapActions(['getUserInfo']),
    // 获取vuex的数据并赋值
    getStateData () {
      this.form.nickname = this.userInfo.nickname
      this.form.intro = this.userInfo.intro
      this.form.position = this.userInfo.position
      // 上传组件使用的图片
      this.files = [{ url: this.userInfo.avatar }]
      // 注册监听  
      this.$watch('form', () => {
        this.isEdit = true
      },
        {
          deep: true
        }
      )
    },
    // 头像格式校验
    beforeRead (file) {
      const imageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp']
      if (!imageTypes.includes(file.type)) {
        this.$toast('请上传图片格式')
        return false
      }
      return true
    },
    // 上传头像
    async afterRead (file) {
      file.status = 'uploading'
      file.message = '上传中...'
      const res = await uploadAvatar(file.file)
      file.status = 'success'
      file.message = '上传成功'
      // 保存图片地址
      this.form.avatar = res.data[0].id
    },
    // 数据提交
    submit () {
      this.$refs.form.validate().then(async () => {
        await edit({
          [this.property]: this.form[this.property]
        })
        await this.getUserInfo(true)
        this.$toast.success('修改成功')
        this.$router.go(-1)
      }).catch(error => {
        this.$toast.fail(error)
      })
    }
  }
}
</script>

<style lang="scss">
.edit-info-container {
  height: 100vh;
  background-color: #fff;
  .top-box {
    background-color: white;
    box-shadow: 0 2px 4px 0 rgba(24, 26, 57, 0.04);
    .van-nav-bar__left {
      padding-left: 5px;
    }
    .iconbtn-nav-back {
      font-size: 44px;
    }
    .van-nav-bar__right {
      .num {
        color: #e40137;
      }
    }
  }
  .main-box {
    .van-field:not(.icon-field) {
      background: #f7f4f5;
      border-radius: 4px;
      width: 345px;
      margin: 15px auto;
    }
    .van-uploader {
      margin: 0 auto;
    }
  }
}
</style>
