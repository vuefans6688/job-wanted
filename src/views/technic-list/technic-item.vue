<template>
  <div class="item">
    <div class="content">
      <div
        @click="$emit('item-click', item.id)"
        class="title van-multi-ellipsis--l2"
      >
        {{ item.title }}
      </div>
      <div class="info">
        <div class="time">{{ item.created_at | formatTime }}</div>
        <div class="see">
          <i class="iconfont iconicon-liulanliang"></i>
          <span>{{ item.read }}</span>
        </div>
        <div class="zan">
          <i
            class="iconfont iconbtn-dianzan-small-nor"
            :class="{ actived: isActive }"
            @click="star"
          ></i>
          <span>{{ item.star }}</span>
        </div>
      </div>
    </div>
    <div @click="$emit('item-click', item.id)" v-if="item.cover" class="cover">
      <img :src="item.cover" alt="" />
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
    isActive () {
      return this.starArticles.includes(this.item.id)
    }
  },
  methods: {
    // 合并vuex中的方法
    ...mapMutations(['SET_STAR_ARTICLES']),
    // 点赞
    async star () {
      const res = await starArticle({
        article: this.item.id
      })
      // 修改vuex中的数据
      this.SET_STAR_ARTICLES(res.data.list)
      this.item.star = res.data.num
      this.$toast.success('点赞成功')
    }
  }
}
</script>

<style lang="scss" scoped>
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
  // 高亮效果
  .iconbtn-dianzan-small-nor.actived {
    color: #e40137;
  }
}
</style>
