<template>
  <div class="comment">
    <!-- 姓名 点赞区域 -->
    <div class="info-box">
      <img
        :src="item.author && item.author.avatar"
        @click="$emit('re-comment', item)"
        alt=""
      />
      <div class="name-box">
        <span class="name">{{ item.author && item.author.nickname }}</span>
        <span class="time">{{ item.created_at | formatTime }}</span>
      </div>
      <div @click="star" class="zan-box">
        <span :class="{ active: starComments.includes(item.id) }">{{
          item.star
        }}</span>
        <i
          :class="{ active: starComments.includes(item.id) }"
          class="iconfont dian-zan-small-nor"
        ></i>
      </div>
    </div>
    <!-- 评论内容 -->
    <div class="content-box">
      <div class="content">{{ item.content }}</div>
      <div class="reply-box" v-if="item.children_comments.length > 0">
        <div v-for="it in item.children_comments" :key="it.id" class="reply">
          <span class="name">{{ it.author }}: </span>{{ it.content }}
        </div>
      </div>
    </div>
    <!-- 回复评论 -->
  </div>
</template>

<script>
import { starArticleComment } from '@/api'
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: {
    item: {
      type: Object
    }
  },
  computed: {
    ...mapGetters(['starComments'])
  },
  methods: {
    ...mapMutations(['SET_STAR_ARTICLE_COMMENTS']),
    async star () {
      const starRes = await starArticleComment({ id: this.item.id })
      // 修改store
      this.SET_STAR_ARTICLE_COMMENTS(starRes.data.list)
      // 修改num
      this.item.star = starRes.data.num
      // 提示
      this.$toast.success('点赞成功')
    }
  }
}
</script>

<style lang="scss" scoped>
.comment {
  .info-box {
    margin-top: 15px;
    display: flex;
    align-items: center;
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-right: 9px;
    }
    .name-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      .name {
        font-size: 12px;
        font-weight: 600;
        color: #545671;
      }
      .time {
        font-size: 12px;
        color: #b4b4bd;
      }
    }
    .zan-box {
      span {
        color: #b4b4bd;
        font-size: 12px;
      }
      .iconfont {
        color: #b4b4bd;
        font-size: 24px;
      }
    }
  }
  .content-box {
    padding-left: 44px;
    .content {
      margin-top: 11px;
      font-size: 16px;
      color: #181a39;
      line-height: 27px;
    }
    .reply-box {
      margin-top: 5px;
      padding-left: 15px;
      padding-bottom: 12px;
      background: #f7f4f5;
      .reply {
        font-size: 14px;
        color: #545671;
        padding-top: 15px;
        .name {
          font-weight: 500;
          margin-right: 5px;
        }
      }
    }
  }
  span.active {
    color: #e40137 !important;
  }
}
</style>
