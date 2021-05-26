<template>
  <div class="item van-hairline--bottom">
    <div
      @click="$emit('share-item-click', item.id)"
      v-html="item.title"
      class="title van-multi-ellipsis--l2"
    ></div>
    <div @click="$emit('share-item-click', item.id)" class="content">
      {{ item.content }}
    </div>
    <div class="info-box">
      <div class="userinfo">
        <img :src="item.author.avatar" alt="" />
        <span>{{ item.author.nickname }}</span>
      </div>
      <div class="time">{{ item.created_at | formatTime }}</div>
      <div class="mes">
        <i class="iconfont ping-lun-liang"></i>
        <span>{{ item.article_comments }}</span>
      </div>
      <div class="zan">
        <i
          :class="{ actived: starArticles.includes(item.id) }"
          @click="star"
          class="iconfont dian-zan-small-nor"
        ></i>
        <span>{{ item.star }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { starArticle } from '@/api'
export default {
  props: {
    item: {
      type: Object
    }
  },
  computed: {
    ...mapGetters(['starArticles']),
    created () {
      return this.starArticles.includes(this.item.id)
    }
  },
  methods: {
    // 合并vuex中的方法
    ...mapMutations(['SET_STAR_ARTICLES']),
    // 点赞
    async star () {
      const starRes = await starArticle({
        article: this.item.id
      })
      // 修改vuex中的数据
      this.SET_STAR_ARTICLES(starRes.data.list)
      this.item.star = starRes.data.num
      this.$toast.success('点赞成功')
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  padding-top: 16px;
  padding-bottom: 28px;
  .title {
    font-size: 16px;
    color: #181a39;
    margin-bottom: 12px;
  }
  .content {
    color: #545671;
    font-size: 14px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .info-box {
    margin-top: 20px;
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #b4b4bd;
    .userinfo {
      flex: 1;
      display: flex;
      align-items: center;
    }
    img {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .time {
      margin-right: 21px;
    }
    .mes {
      margin-right: 23px;
    }
    .iconfont {
      margin-right: 7px;
    }
    .mes,
    .zan {
      display: flex;
      align-items: center;
    }
  }
}
</style>
