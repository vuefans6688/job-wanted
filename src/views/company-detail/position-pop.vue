<template>
  <!-- 弹出层 -->
  <div class="position-pop-container">
    <!-- 评分弹框 -->
    <van-popup
      @click-overlay="$emit('input', false)"
      v-model="value"
      :close-on-click-overlay="false"
      class="score-popup"
    >
      <div class="content">
        <h3>请根据实际情况为企业打分</h3>
        <ul class="detail-box">
          <li>
            <span>岗位描述</span>
            <van-rate v-model="positionScore"></van-rate>
          </li>
          <li>
            <span>面试情况</span>
            <van-rate v-model="interviewScore"></van-rate>
          </li>
          <li>
            <span>面试官</span>
            <van-rate v-model="interviewerScore"></van-rate>
          </li>
        </ul>
        <!-- 职位选择 -->
        <van-field
          readonly
          clickable
          class="position-van-field"
          name="position"
          :value="position"
          @click="showPositionPicker = true"
          label="职位选择"
          placeholder="点击选择面试的职位"
        >
        </van-field>
        <!-- 输入区域 -->
        <van-field
          v-model="content"
          rows="6"
          type="textarea"
          placeholder="请输入留言"
          class="score-field"
        ></van-field>
        <!-- 按钮 -->
        <div class="bottom-box van-hairline--top">
          <div class="cancel-button" @click="$emit('input', false)">取消</div>
          <!-- 通过取反设置内容 -->
          <div
            @click="submitComment"
            :class="{ disabled: !(positionId && content) }"
            class="submit-button van-hairline--left"
          >
            提交
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 输入框 -->
    <van-popup v-model="showPositionPicker" position="bottom">
      <van-picker
        @confirm="onConfirm"
        @cancel="showPositionPicker = false"
        value-key="name"
        :columns="positions"
        show-toolbar
      >
      </van-picker>
    </van-popup>
  </div>
</template>

<script>
// 导入接口
import { companyPositions, addComment } from '@/api'
export default {
  data () {
    return {
      positionScore: 5,
      interviewScore: 5,
      interviewerScore: 5,
      content: '',
      // 分页相关，为了获取所有数据
      limit: 9999999,
      start: 0,
      // 职位列表数据
      positions: [],
      // 是否显示职位弹框
      showPositionPicker: false,
      // 显示的职位文本信息
      position: '',
      // 提交的职位信息
      positionId: ''
    }
  },
  props: {
    // 双向绑定的数据
    value: {
      type: Boolean,
      default: false
    },
    // 企业id
    companyId: {
      type: Number,
      default: 0
    }
  },
  created () {
    this.loadEnterpriseData()
  },
  methods: {
    // 获取企业数据
    async loadEnterpriseData () {
      const positionRes = await companyPositions({
        id: this.companyId,
        limit: this.limit,
        start: this.start
      })
      // 保存数据
      this.positions = positionRes.data.list
    },
    // 点击提价评论数据
    async submitComment () {
      if (!(this.positionId && this.content)) {
        return
      }
      // 提交数据
      const addRes = await addComment({
        positionScore: this.positionScore,
        interviewScore: this.interviewScore,
        interviewerScore: this.interviewerScore,
        position: this.positionId,
        tags: ['面试官很nice', '面试效率高'],
        content: this.content
      })
      const data = addRes.data
      // 处理总分
      data.score = parseFloat((data.positionScore + data.interviewerScore + data.interviewScore) / 3)
      // 头像
      data.user.avatar += 'https://autumnfish.cn/heimamm_server/'
      // 关闭弹框
      this.$emit('input', false)
      // 把新增的数据派发给父组件
      this.$emit('on-added', data)
    },
    // 点击选择职位
    onConfirm (items) {
      // 保存职位名
      this.position = items.name
      // 保存职位id
      this.positionId = items.id
      // 关闭弹框
      this.showPositionPicker = false
    }
  }
}
</script>

<style lang="scss">
.position-pop-container {
  .position-van-field {
    padding-left: 61px;
  }
  .bottom-box {
    .cancel-button {
      color: #ddd;
    }
    .submit-button {
      color: #42b983;
    }
  }
}
</style>
