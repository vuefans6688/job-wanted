<template>
  <div class="interview-search-container">
    <!-- 顶部 -->
    <div class="top-box">
      <van-nav-bar :title="title" :border="false" @click-left="onBack">
        <template #left>
          <i class="iconfont button-nav-back"></i>
        </template>
      </van-nav-bar>
      <van-search
        shape="round"
        v-model="value"
        placeholder="请输入搜索关键词"
        @cancel="cancel"
        show-action
      >
        <template #left-icon>
          <i class="iconfont search"></i>
        </template>
      </van-search>
    </div>
    <!-- 搜索选项 -->
    <div class="option-box" v-if="showOption || !value">
      <!-- 区域1 -->
      <div class="section">
        <div class="title">大家都在搜索</div>
        <ul class="tags">
          <li
            class="tag"
            v-for="(item, index) in topSearch"
            :key="index"
            @click="clickTopSeach(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <!-- 区域2 -->
      <div class="section">
        <div class="title">历史记录 <span @click="clear">清空</span></div>
        <div class="tags">
          <span
            class="tag"
            v-for="item in history"
            :key="item"
            @click="clickTopSeach(item)"
            >{{ item }}</span
          >
        </div>
      </div>
    </div>
    <!-- 搜索结果 -->
    <div v-else class="result-box">
      <div class="interview-list" v-if="tag === 'technic'">
        <div
          class="item"
          v-for="item in list"
          :key="item.id"
          @click="$router.push(`/technic-detail/${item.id}`)"
        >
          <div class="content">
            <div class="title van-multi-ellipsis--l2" v-html="item.title"></div>
            <div class="info">
              <div class="time">{{ item.created_at | formatTime }}</div>
              <div class="see">
                <i class="iconfont liu-lan-liang"></i>
                <span>{{ item.read }}</span>
              </div>
              <div class="zan">
                <i class="iconfont dian-zan-small-nor"></i>
                <span>{{ item.star }}</span>
              </div>
            </div>
          </div>
          <div class="cover" v-if="item.cover">
            <img :src="item.cover" alt="" />
          </div>
        </div>
      </div>
      <template v-else>
        <share-item
          v-for="item in list"
          :key="item.id"
          :item="item"
          @share-item-click="shareItemClick"
        ></share-item>
      </template>
    </div>
  </div>
</template>

<script>
import { articlesTechnicTopSearch, articlesTechnic, articlesShareTopSearch, articlesShare } from '@/api'
import { getLocal, setLocal } from '@/utils/local'
import ShareItem from '../share-list/share-item'
export default {
  components: {
    ShareItem
  },
  data () {
    return {
      value: '',
      showOption: true,
      title: '',
      // 热搜 关键字
      topSearch: [],
      // 接口查询参数
      limit: 5,
      start: 0,
      // 搜索结果
      list: [],
      // 总条数
      total: 0,
      // 搜索历史
      history: [],
      // 类型
      tag: this.$route.params.tag
    }
  },
  async created () {
    if (this.tag === 'technic') {
      this.title = '面试技巧搜索'
      const res = await articlesTechnicTopSearch()
      this.topSearch = res.data
    } else {
      this.title = '面经搜索'
      const res = await articlesShareTopSearch()
      this.topSearch = res.data
    }
    // 读取搜索历史
    try {
      this.history = JSON.parse(getLocal(this.tag))
      // 类型判断
      if (!(this.history instanceof Array)) {
        // 不是数组，直接设置为数组
        this.history = []
      }
    } catch (error) {
      this.history = []
    }
  },
  methods: {
    async clickTopSeach (item) {
      this.value = item
      let res
      let topResult
      if (this.tag === 'technic') {
        res = await articlesTechnic({
          limit: this.limit,
          start: this.start,
          q: this.value
        })
        topResult = await articlesTechnicTopSearch()
        this.topSearch = topResult.data
      } else {
        res = await articlesShare({
          limit: this.limit,
          start: this.start,
          q: this.value
        })
        topResult = await articlesShareTopSearch()
        this.topSearch = topResult.data
      }
      // 显示查询结果
      this.showOption = false
      this.list = res.data.list
      // 处理列表数据
      this.list.forEach(v => {
        // 设置高亮效果
        v.title = v.title.replace(this.value, `<span class="high-light">${this.value}</span>`)
        // 封面
        const baseURL = 'https://autumnfish.cn/heimamm_server/'
        if (v.cover) {
          v.cover += baseURL
        }
        // 头像
        if (v.author && v.author.avatar) {
          v.author.avatar += baseURL
        }
      })
      // 保存总数
      this.total = res.data.total
      // 保存历史记录
      this.saveHistory()
    },
    saveHistory () {
      // 添加
      this.history.push(this.value)
      // 去重
      this.history = [...new Set(this.history)]
      // 长度判断
      if (this.history.length >= 4) {
        this.history.shift()
      }
    },
    // 清空历史
    clear () {
      this.history = []
    },
    // 取消搜索
    cancel () {
      this.value = ''
      this.showOption = true
    },
    onBack () {
      this.$router.go(-1)
    },
    shareItemClick (id) {
      this.$router.push(`/share-detail/${id}`)
    }
  },
  // 数据改变，同步到缓存中
  watch: {
    history () {
      setLocal(JSON.stringify(this.history), this.tag)
    }
  }
}
</script>

<style lang="scss">
.interview-search-container {
  .top-box {
    padding-bottom: 11px;
    background: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(24, 26, 57, 0.04);
    .van-nav-bar__left {
      padding-left: 5px;
    }
    .button-nav-back {
      font-size: 44px;
    }
    .van-search__content {
      background: #f7f4f5;
      font-size: 14px;
      color: #b3b3b3;
      .iconfont {
        font-size: 19px;
        color: #b3b3b3;
      }
    }
  }
  // 搜索选项
  .option-box {
    padding: 15px;
    .section {
      margin-bottom: 27px;
      .title {
        font-size: 18px;
        font-weight: 500;
        text-align: left;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 12px;
          color: #545671;
        }
      }
      .tags {
        margin-top: 18px;
        display: flex;
        .tag {
          margin-right: 10px;
          margin-bottom: 11px;
          padding: 6px;
          border-radius: 4px;
          font-size: 12px;
          color: #545671;
          background-color: #eceaea;
        }
      }
    }
  }
  .result-box {
    padding: 15px;
  }
  .interview-list {
    .item {
      padding-bottom: 29px;
      display: flex;
      min-height: 67px;
      .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          font-size: 16px;
          font-weight: 500;
          color: #181a39;
        }
        .info {
          color: #b4b4bd;
          font-size: 12px;
          display: flex;
          margin-top: 10px;
          align-items: center;
          .time {
            flex: 1;
          }
          .iconfont {
            margin-right: 8px;
            font-size: 16px;
            line-height: 1;
          }
          .see {
            margin-right: 23px;
            display: flex;
            align-items: center;
          }
          .zan {
            display: flex;
            align-items: center;
          }
        }
      }
      .cover {
        width: 113px;
        height: 75px;
        margin-left: 16px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  // 高亮
  span.high-light {
    color: #e40137;
  }
}
</style>
