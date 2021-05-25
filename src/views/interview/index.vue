<template>
  <div class="interview-container">
    <!-- 顶部区域 -->
    <div class="top-box">
      <!-- 顶部导航 -->
      <van-nav-bar
        :class="{ shadow: !company }"
        @click-left="back"
        @click-right="toggleAnswerSheet"
        :border="false"
      >
        <template #left>
          <i class="iconfont button-nav-back"></i>
        </template>
        <template #right>
          <span :class="{ disabled: !isStart }">答题卡</span>
        </template>
        <template #title>
          <span class="custom-title"
            >面试题
            <span class="num">{{ questionList.length }}</span>
          </span>
        </template>
      </van-nav-bar>
      <!-- 企业刷题才有的筛选区域 -->
      <div class="filter-box" v-if="company">
        <!-- 横向滚动的tags -->
        <div class="scroll-wrap">
          <div class="content" :class="{ disabled: isStart }">
            <van-tag
              v-for="(item, index) in filterIndex"
              :key="index"
              @click="selectType(index)"
              round
              :type="select.type === index ? 'primary' : ''"
            >
              {{ item[0] }}
            </van-tag>
          </div>
        </div>
        <!-- 下拉菜单 -->
        <van-dropdown-menu>
          <van-dropdown-item
            v-model="select.city"
            :options="cityOptions"
            :disabled="isStart"
            class="city-drop"
          >
            <template #title>城市</template>
          </van-dropdown-item>
          <van-dropdown-item
            v-model="select.position"
            :options="potitionOptions"
            :disabled="isStart"
            class="experience-drop"
          >
            <!-- 标题插槽 -->
            <template #title>岗位</template>
          </van-dropdown-item>
          <van-dropdown-item
            v-model="select.difficulty"
            :options="difficultyOptions"
            :disabled="isStart"
            class="order-drop"
          >
            <!-- 标题插槽 -->
            <template #title>难度</template>
          </van-dropdown-item>
        </van-dropdown-menu>
      </div>
    </div>
    <!-- 刷题区域 -->
    <div class="main-box" v-if="currentQuestion.detail">
      <p class="question">
        【{{
          { 1: "单选", 2: "多选", 3: "简答" }[currentQuestion.detail.type]
        }}】{{ currentQuestion.detail.title }}
      </p>
      <div class="tags">
        <span
          v-for="item in currentQuestion.detail.tag"
          :key="item"
          class="tag"
          >{{ item }}</span
        >
      </div>
      <!-- 选项区域 -->
      <div class="options-box van-hairline--bottom">
        <!-- 单选 选项 -->
        <van-radio-group
          v-if="currentQuestion.detail && currentQuestion.detail.type === 1"
          v-model="singleAnswer"
          :disabled="currentQuestion.result !== undefined"
        >
          <!-- 特殊类名 error 错误 right 正确 -->
          <van-radio name="A" :class="setClass('A')">
            <template #icon> A. </template>
            <template>
              <span class="content">{{
                currentQuestion.detail.option[0]
              }}</span>
              <i class="iconfont iconicon-zhengque"></i>
              <i class="iconfont iconicon-cuowu"></i>
            </template>
          </van-radio>
          <van-radio name="B" :class="setClass('B')">
            <template #icon> B. </template>
            <template>
              <span class="content">{{
                currentQuestion.detail.option[1]
              }}</span>
              <i class="iconfont iconicon-zhengque"></i>
              <i class="iconfont iconicon-cuowu"></i>
            </template>
          </van-radio>
          <van-radio name="C" :class="setClass('C')">
            <template #icon> C. </template>
            <template>
              <span class="content">{{
                currentQuestion.detail.option[2]
              }}</span>
              <i class="iconfont iconicon-zhengque"></i>
              <i class="iconfont iconicon-cuowu"></i>
            </template>
          </van-radio>
          <van-radio name="D" :class="setClass('D')">
            <template #icon> D. </template>
            <template>
              <span class="content">{{
                currentQuestion.detail.option[3]
              }}</span>
              <i class="iconfont iconicon-zhengque"></i>
              <i class="iconfont iconicon-cuowu"></i>
            </template>
          </van-radio>
        </van-radio-group>
        <!-- 多选 选项 -->
        <van-checkbox-group
          v-else-if="
            currentQuestion.detail && currentQuestion.detail.type === 2
          "
          v-model="multipleAnswer"
          :disabled="currentQuestion.result !== undefined"
        >
          <van-checkbox name="A" :class="setClass('A')">
            <template #icon> A. </template>
            <template>
              <span class="content">{{
                currentQuestion.detail.option[0]
              }}</span>
              <i class="iconfont iconicon-zhengque"></i>
              <i class="iconfont iconicon-cuowu"></i>
            </template>
          </van-checkbox>
          <van-checkbox name="B" :class="setClass('B')">
            <template #icon> B. </template>
            <template>
              <span class="content">{{
                currentQuestion.detail.option[1]
              }}</span>
              <i class="iconfont iconicon-zhengque"></i>
              <i class="iconfont iconicon-cuowu"></i>
            </template>
          </van-checkbox>
          <van-checkbox name="C" :class="setClass('C')">
            <template #icon> C. </template>
            <template>
              <span class="content">{{
                currentQuestion.detail.option[2]
              }}</span>
              <i class="iconfont iconicon-zhengque"></i>
              <i class="iconfont iconicon-cuowu"></i>
            </template>
          </van-checkbox>
          <van-checkbox name="D" :class="setClass('D')">
            <template #icon> D. </template>
            <template>
              <span class="content">{{
                currentQuestion.detail.option[3]
              }}</span>
              <i class="iconfont iconicon-zhengque"></i>
              <i class="iconfont iconicon-cuowu"></i>
            </template>
          </van-checkbox>
        </van-checkbox-group>
        <!-- 音乐选项 -->
        <div v-if="false" class="audio-group">
          <div class="audio-box">
            <!-- 自定义的音乐播放器 -->
            <div class="audio">
              <i @click="togglePlay" class="iconfont iconsanjiaoxing2"></i>
              <div class="process-wrap">
                <div class="process">
                  <div ref="step" class="step"></div>
                </div>
                <div @click="clickStep" class="click-bar"></div>
              </div>
              <span>35:02</span>
              <audio ref="audio" src="@/assets/music.mp3"></audio>
            </div>
            <!-- 删除按钮 -->
            <i class="iconfont iconbtn-delete-nor"></i>
          </div>
        </div>
      </div>
      <!-- 录音区域 -->
      <div class="voice-box" v-if="false">
        <div class="title-box">
          <span>按住说话</span>
        </div>
        <div class="record-wrap">
          <!-- 未录音状态 -->
          <img
            v-if="isRecord"
            @click="isRecord = !isRecord"
            src="@/assets/luyk.png"
          />
          <!-- 录音状态 -->
          <img
            v-else
            @click="isRecord = !isRecord"
            src="@/assets/luyk_hover.png"
          />
          <!-- 删除按钮 -->
          <div v-if="isRecord" class="del-btn">
            <i class="iconfont iconbtn-delete-nor"></i>
          </div>
        </div>
      </div>
      <!-- 答案解析区域 -->
      <div v-if="currentQuestion.result" class="answer-box">
        <h3>答案解析</h3>
        <div v-if="[1, 2].includes(currentQuestion.detail.type)" class="answer">
          正确答案:
          {{
            currentQuestion.detail.type === 1
              ? currentQuestion.result.singleAnswer
              : currentQuestion.result.multipleAnswer.join(",")
          }}
        </div>
        <div class="info-box">
          <div class="item">
            难度:
            {{
              { 1: "简单", 2: "中等", 3: "困难" }[
                currentQuestion.result.difficulty
              ]
            }}
          </div>
          <div class="item">
            提交次数: {{ currentQuestion.result.submitNum }}
          </div>
          <div class="item">
            正确次数: {{ currentQuestion.result.correctNum }}
          </div>
        </div>
        <p class="desc">{{ currentQuestion.result.answerAnalysis }}</p>
      </div>
    </div>
    <!-- 底部的操纵盒子 -->
    <div class="bottom-box van-hairline--top">
      <div class="content-wrap">
        <div class="left" :class="{ hidden: questionList.length === 0 }">
          <!-- 图标 -->
          <div class="icon-box">
            <span
              :class="{
                actived: collectQuestions.includes(currentQuestion.id),
              }"
              @click="collect"
            >
              <i class="iconfont iconbtn-shoucang-nor"></i>收藏
            </span>
            <span @click="showPop = true">
              <i class="iconfont iconbtn-shuati-fankui"></i>反馈
            </span>
          </div>
          <!-- 索引 -->
          <div class="index-box">
            <span>{{ questionIndex + 1 }}</span
            >/{{ questionList.length }}题
          </div>
        </div>
        <div class="right">
          <!-- 提交按钮 -->
          <van-button
            v-if="isStart && currentQuestion && !currentQuestion.result"
            @click="submit"
            :class="{ disabled: isDisabled }"
            :disabled="isDisabled"
            type="danger"
          >
            提交
          </van-button>
          <!-- 下一题按钮 -->
          <van-button
            v-else-if="currentQuestion && currentQuestion.result && !isFinish"
            @click="nextQuestion"
            type="info"
          >
            下一题
          </van-button>
          <!-- 结束按钮 -->
          <van-button v-else-if="isFinish" @click="finishedAnswer" type="danger"
            >结束</van-button
          >
          <!-- 开始答题按钮 -->
          <van-button v-else @click="startQuestion" type="primary"
            >开始</van-button
          >
        </div>
      </div>
    </div>
    <!-- 意见反馈对话框 -->
    <van-popup class="suggest-pop" v-model="showPop">
      <div class="pop-wrap">
        <h3>意见反馈</h3>
        <van-field
          v-model="suggest"
          rows="5"
          type="textarea"
          placeholder="请输入你对此问题的反馈意见"
        >
        </van-field>
        <!-- 底部按钮 -->
        <div class="button-wrap van-hairline--top">
          <div class="cancel van-hairline--right" @click="showPop = false">
            取消
          </div>
          <div class="submit" :class="{ disabled: !suggest.length }">提交</div>
        </div>
      </div>
    </van-popup>
    <!-- 答题卡 -->
    <van-popup v-model="showAnswerSheet" position="bottom">
      <div class="answer-sheet-container">
        <!-- 顶部盒子 -->
        <div class="top-box">
          <van-nav-bar :border="false">
            <template #right>
              <span>
                <span class="num">{{ questionIndex }}</span
                >/{{ questionList.length }}题
              </span>
            </template>
            <template #title>
              <span class="custom-title">答题卡题</span>
            </template>
          </van-nav-bar>
          <div class="title-box">共{{ questionList.length }}题</div>
        </div>
        <!-- 主体区域 -->
        <div class="main-box">
          <ul>
            <li
              class="item"
              v-for="(item, index) in questionList"
              :key="index"
              :class="{
                current: questionIndex === index,
                error:
                  questionList[index].result &&
                  !questionList[index].result.isRight,
                right:
                  questionList[index].result &&
                  questionList[index].result.isRight,
              }"
              @click="selectQuestion(index)"
            >
              {{ index + 1 }}
            </li>
          </ul>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { getLocal } from '@/utils/local'
import { questionFilters, companyQuestion, submitQuestion, questionDetail, collectQuestion } from '@/api'
export default {
  data () {
    return {
      // 企业id
      company: this.$route.query.company,
      // 筛选条件
      filterIndex: '',
      // 城市筛选条件
      cityOptions: [],
      // 职位筛选条件
      potitionOptions: [],
      // 选择的职位
      selectPosition: 1,
      // 难度
      selectDifficulty: 0,
      // 选择的选项
      select: {
        type: 0,
        city: '',
        position: '',
        difficulty: ''
      },
      // 难度选项
      difficultyOptions: [
        { text: '不限', value: 0 },
        { text: '简单', value: 1 },
        { text: '普通', value: 2 },
        { text: '困难', value: 3 }
      ],
      // 保存面试题数据
      questionDetail: '',
      // 单选答案
      singleAnswer: '',
      // 多选答案
      multipleAnswer: [],
      // 试题索引
      questionIndex: 0,
      // 是否显示刷题区域
      showMain: true,
      // 弹出层
      showPop: false,
      // 是否开始刷题
      isStart: false,
      // 反馈建议
      suggest: '',
      // 是否显示答题卡
      showAnswerSheet: false,
      // 是否正在录音中
      isRecord: false
    }
  },
  methods: {
    ...mapActions(['getUserInfo']),
    ...mapMutations(['SET_QUESTION', 'SET_COLLECT_QUESTIONS', 'CLEAR_QUESTION']),
    // 切换试题
    async selectQuestion (index) {
      // 重新获取数据
      // 清空选项
      this.singleAnswer = ''
      this.multipleAnswer = []
      // 判断是否已经获取过
      if (!this.questionList[index].detail) {
        // 重新获取下一题数据
        const detailRes = await questionDetail(this.questionList[index].id)
        // 设置对应试题的值
        this.questionList[index].detail = detailRes.data
      }
      // 赋值上去之后，再累加索引
      this.questionIndex = index
      // 关闭答题卡
      this.showAnswerSheet = false
    },
    // 选择类型
    selectType (index) {
      if (this.isStart) {
        return
      }
      this.select.type = index
    },
    // 显示答题卡
    toggleAnswerSheet () {
      if (this.isStart) {
        this.showAnswerSheet = true
      }
    },
    // 收藏面试题
    async collect () {
      const collectRes = await collectQuestion({ id: this.currentQuestion.id })
      // 修改vuex中的数据
      this.SET_COLLECT_QUESTIONS(collectRes.data)
      // 提示用户
      this.$toast.success('操作成功')
    },
    // 设置选中的值
    setSeletedValue () {
      // 基于索引获取对应的筛选条件-城市
      this.cityOptions = this.filterIndex[this.select.type][1]
      // 默认选中第一个
      this.select.city = this.cityOptions[0].value
      // 基于索引获取对应的筛选条件-职位
      this.potitionOptions = this.cityOptions[0].positions
      // 默认选中第一个
      this.select.position = this.potitionOptions[0].value
      // 难度默认选择全部
      this.select.difficulty = 0
    },
    // 返回
    back () {
      this.$dialog.confirm({ title: '确认退出？', message: '下次重新开始刷题哦' }).then(() => {
        // 确认是否有企业id
        if (this.company) {
          return this.$router.push(`/company-detail/${this.company}`)
        }
        this.$router.push('/question')
      }).catch()
    },
    // 提交试题
    async submit () {
      if (!this.isDisabled || !this.result) {
        const submitRes = await submitQuestion({
          id: this.currentQuestion.id,
          singleAnswer: this.singleAnswer,
          multipleAnswer: this.multipleAnswer
        })
        // 保存到当前试题的result选项中
        // this.questionList[this.questionIndex].result = submitRes.data
        this.$set(this.questionList[this.questionIndex], 'result', submitRes.data)
        // 判断是否答完了
        if (this.isFinish) {
          this.$toast('刷完啦！')
        }
      }
    },
    // 下一题
    async nextQuestion () {
      // 清空选项
      this.singleAnswer = ''
      this.multipleAnswer = []
      // 重新获取下一题数据
      const detailRes = await questionDetail(
        this.questionList[this.questionIndex + 1].id
      )
      this.questionList[this.questionIndex + 1].detail = detailRes.data
      // 赋值上去之后，再累加索引
      this.questionIndex++
    },
    // 开始刷题
    async startQuestion () {
      const questionRes = await companyQuestion({
        id: this.company,
        position: this.select.position,
        difficulty: this.select.difficulty
      })
      if (questionRes.data.length > 0) {
        // 保存面试题到vuex中，下次获取时直接通过vuex获取
        this.SET_QUESTION(questionRes.data)
        // 修改标记状态
        this.isStart = true
      } else {
        this.$toast('面试题还未收录，请重新选择')
      }
    },
    // 结束答题
    finishedAnswer () {
      this.$dialog.alert({ title: '提示', message: '答完啦，你真棒' }).then(() => {
        // 如果是企业刷题，就返回企业详情
        if (this.company) {
          this.$router.push(`/company-detail/${this.company}`)
        } else {
          // 如果是全局刷题，就返回刷题首页
          this.$router.push('/interview')
        }
      })
    },
    clickStep (e) {
      const offsetX = e.offsetX
      const clientWidth = e.target.clientWidth
      // 获取尺寸
      // 设置
      const percent = (offsetX / clientWidth) * 100 + '%'
      this.$refs.step.style.width = percent
    },
    // 音频播放切换
    togglePlay () {
      this.$refs.audio.play()
    },
    // 保证登录进来必须是登录状态
    async handleLoginState () {
      if (this.useInfo === '') {
        this.$toast('请先登录')
        return this.$router.toLogin()
      }
      // 如果有token，尝试获取一下用户信息
      if (getLocal()) {
        this.getUserInfo()
      }
      // 获取筛选数据
      if (this.company) {
        const res = await questionFilters(this.company)
        this.filterIndex = res.data
        // 设置选中值
        this.setSeletedValue()
        // 获取对应的面试题数据
      }
      // 判断是否可以开始答题
      if (this.questionList.length > 0) {
        this.isStart = true
      }
    }
  },
  created () {
    this.handleLoginState()
  },
  computed: {
    ...mapState(['userInfo', 'questionList']),
    ...mapGetters(['collectQuestions']),
    // 是否可以提交
    isDisabled () {
      // 根据类型进行不同的判断
      if (this.currentQuestion.detail.type === 1) {
        return !this.singleAnswer
      } else if (this.currentQuestion.detail.type === 2) {
        return !this.multipleAnswer.length
      }
      return false
    },
    // 动态生成类名
    setClass () {
      return str => {
        if (this.currentQuestion.result === undefined) {
          return ''
        }
        // 单选时
        if (this.currentQuestion.detail.type === 1) {
          // 单选
          // 返回对错
          if (this.currentQuestion.result.singleAnswer === str) {
            return 'right'
          }
          if (this.singleAnswer === str && this.singleAnswer !== this.currentQuestion.result.singleAnswer) {
            return 'error'
          } else {
            return ''
          }
        }
        // 多选时
        if (this.currentQuestion.detail.type === 2) {
          // 单选
          // 返回对错
          if (this.currentQuestion.result.multipleAnswer.includes(str)) {
            return 'right'
          }
          if (this.multipleAnswer.includes(str) && !this.currentQuestion.result.multipleAnswer.includes(str)) {
            return 'error'
          } else {
            return ''
          }
        }
      }
    },
    // 获取当前面试题
    currentQuestion () {
      return this.questionList[this.questionIndex] || {}
    },
    // 是否答题结束
    isFinish () {
      // 如果没有面试题，直接返回false
      if (this.questionList.length === 0) {
        return false
      }
      // 如果每一道题全部都有答案，说明答完了
      return this.questionList.every(v => v.result)
    }
  },
  filters: {
    formatOption (num) {
      const options = { 0: 'A', 1: 'B', 2: 'C', 3: 'D' }
      return options[num]
    }
  },
  // 侦听器
  watch: {
    // 顶部重新选择之后，修改筛选条件
    'select.type' () {
      this.setSeletedValue()
    },
    'select.city' () {
      // 获取城市的索引
      const cityIndex = this.cityOptions.findIndex(v => v.text === this.select.city)
      // 基于索引获取对应的筛选条件 职位
      this.potitionOptions = this.cityOptions[cityIndex].positions
      // 默认选中第一个
      this.select.position = this.potitionOptions[0].value
      // 难度默认选择全部
      this.select.difficulty = 0
    }
  },
  destroyed () {
    // 清空面试题
    this.CLEAR_QUESTION()
  }
}
</script>

<style lang="scss">
.interview-container {
  padding-bottom: 85px;
  .top-box {
    background-color: white;
    box-shadow: 0 2px 4px 0 rgba(24, 26, 57, 0.04);
    .van-nav-bar__left {
      padding-left: 5px;
    }
    .button-nav-back {
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
        &.disabled {
          opacity: 0.5;
        }
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
    .van-dropdown-menu__bar {
      box-shadow: 0 2px 4px 0 rgba(24, 26, 57, 0.04);
    }
  }
  // 阴影效果
  .shadow {
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.17);
  }
  // 主体区域
  .main-box {
    padding: 20px 15px 10px;
    background-color: #fff;
    .question {
      font-size: 16px;
      font-weight: 400;
      text-align: justify;
      color: #181a39;
    }
    .tags {
      display: flex;
      .tag {
        height: 18px;
        background: #f7f4f5;
        border-radius: 3px;
        margin-right: 7px;
        font-size: 12px;
        font-weight: 400;
        color: #b4b4bd;
        padding: 2px 7px;
      }
    }
    // 选项区域
    .options-box {
      margin-top: 28px;
      padding-bottom: 32px;
      .van-radio,
      .van-checkbox {
        min-height: 50px;
        border: 1px solid #f7f4f5;
        margin-bottom: 16px;
        font-size: 16px;
        color: #181a39;
        border-radius: 4px;
        padding: 5px 15px;
        .van-radio__icon,
        .van-checkbox__icon {
          font-size: 16px;
        }
        .iconfont {
          display: none;
          font-size: 25px;
        }
        .van-radio__label,
        .van-checkbox__label {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
        // 选项的禁用状态
        .van-checkbox__label--disabled {
          color: #000;
        }
      }
      // 正确
      .van-radio[aria-checked="true"],
      .van-checkbox[aria-checked="true"] {
        border-color: #b4b4bd;
      }
      // 错误
      .van-radio.error,
      .van-checkbox.error {
        background: #ffefea;
        border-color: transparent;
        .iconicon-cuowu {
          display: flex;
          align-items: center;
          color: #ec5851;
        }
      }
      .van-radio.right,
      .van-checkbox.right {
        background: #ddfad9;
        border-color: transparent;
        color: #1dc779;
        .content {
          color: #1dc779;
        }
        .iconicon-zhengque {
          display: flex;
          align-items: center;
          color: #1dc779;
        }
      }
      // 选中
    }
    // 答案解析
    .answer-box {
      padding-top: 19px;
      h3 {
        margin: 0;
        font-size: 18px;
      }
      .answer {
        margin-top: 18px;
        font-size: 16px;
        color: #1dc779;
      }
      .info-box {
        margin-top: 19px;
        padding: 10px;
        background: #f7f4f5;
        display: flex;
        border-radius: 4px;
        justify-content: space-between;
        font-size: 12px;
        color: #545671;
      }
      .desc {
        margin-top: 20px;
        text-align: justify;
        color: #181a39;
        line-height: 23px;
        font-size: 16px;
        margin-bottom: 0;
      }
    }
  }
  // 底部
  .bottom-box {
    height: 85px;
    position: fixed;
    left: 0;
    width: 100%;
    bottom: 0;
    padding-top: 11px;
    background-color: #fff;
    .content-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      > div {
        display: flex;
        align-items: center;
        &.hidden {
          visibility: hidden;
        }
      }
    }
    .icon-box {
      display: flex;
      span {
        font-size: 12px;
        color: #b4b4bd;
        margin-right: 21px;
        i {
          display: block;
          font-size: 28px;
          color: #b4b4bc;
        }
      }
    }
    .index-box {
      font-size: 14px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      span {
        font-size: 22px;
        color: #d12d3e;
      }
    }
    .disabled {
      background-color: #f5dfe4;
      border-color: #f5dfe4;
    }
    .van-button {
      width: 98px;
      height: 40px;
      border-radius: 4px;
    }
  }
  // 弹出框
  .van-popup.suggest-pop {
    border-radius: 8px;
  }
  // 建议弹出框
  .pop-wrap {
    width: 304px;
    height: 297px;
    padding: 20px 20px 0;
    position: relative;
    overflow: hidden;
    h3 {
      font-size: 18px;
      text-align: center;
      margin: 0;
    }
    .van-field {
      background: #f7f4f5;
      border-radius: 4px;
      margin-top: 15px;
    }
    .button-wrap {
      height: 48px;
      display: flex;
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      > div {
        flex: 1;
        text-align: center;
        line-height: 48px;
        font-size: 16px;
        color: #181a39;
      }
      .submit {
        color: #181a39;
        &.disabled {
          color: #b4b4bd;
        }
      }
    }
  }
  // 录音区域
  .voice-box {
    height: 234px;
    background-color: #f8f6f5;
    text-align: center;
    margin: 0 -15px;
    padding-top: 34px;
    .title-box {
      font-size: 16px;
      color: #545671;
    }
    .record-wrap {
      margin: 17px auto 0;
      width: 129px;
      height: 129px;
      border-radius: 50%;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.17);
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      position: relative;
      img {
        width: 67px;
        height: 67px;
      }
    }
    .del-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 54px;
      height: 54px;
      border-radius: 50%;
      right: -84px;
      background: #ff4949;
      display: flex;
      align-items: center;
      justify-content: center;
      .iconbtn-delete-nor {
        font-size: 30px;
        color: white;
      }
    }
  }
  // 音频选项区域
  .audio-group {
    .audio-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .audio {
        height: 45px;
        width: 301px;
        border-radius: 23px;
        background: #e3f4f7;
        padding: 9px;
        display: flex;
        align-items: center;
        i {
          width: 29px;
          height: 29px;
          background: #00b8d4;
          border-radius: 50%;
          margin-right: 6px;
          text-align: center;
          color: white;
          line-height: 29px;
          font-size: 10px;
        }
        .process-wrap {
          width: 183px;
          height: 2px;
          background: #c5dfe3;
          margin-right: 17px;
          position: relative;
          .process {
            height: 100%;
          }
          .step {
            height: 100%;
            width: 50%;
            background: #00b8d4;
          }
          .click-bar {
            height: 100%;
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;
          }
        }
        span {
          font-size: 14px;
        }
      }
      > i {
        font-size: 30px;
        color: #b5b1b1;
      }
    }
  }
  // 答题卡
  .answer-sheet-container {
    width: 100%;
    .top-box {
      background-color: white;
      .van-nav-bar__left {
        padding-left: 5px;
      }
      .button-nav-back {
        font-size: 44px;
      }
      .van-ellipsis {
        overflow: visible;
      }
      .van-nav-bar__right {
        .num {
          color: #e40137;
        }
      }
      .title-box {
        font-size: 14px;
        color: #b4b4bd;
        background-color: #f7f4f5;
        height: 44px;
        line-height: 44px;
        padding-left: 15px;
        span {
          font-size: 16px;
          color: #222222;
        }
      }
    }
    .main-box {
      background-color: #fff;
      ul {
        padding-top: 19px;
        padding-left: 15px;
        overflow: hidden;
        li {
          float: left;
          width: 33px;
          height: 33px;
          border-radius: 50%;
          text-align: center;
          line-height: 33px;
          border: 1px solid #b4b4bd;
          font-size: 14px;
          color: #b4b4bd;
          margin-right: 18px;
          margin-bottom: 19px;
        }
        // 三种状态
        li.current {
          color: #181a39;
          border-color: #181a39;
        }
        li.right {
          border-color: transparent;
          background-color: #ddfad9;
          color: #1dc779;
        }
        li.error {
          border-color: transparent;
          background: #ffefea;
          color: #ff4949;
        }
      }
    }
  }
  // 答题卡按钮禁用外观
  .van-nav-bar__right {
    .disabled {
      color: #969799;
    }
  }
}
</style>
