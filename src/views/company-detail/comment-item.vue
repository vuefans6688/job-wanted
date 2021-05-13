<template>
  <div class="item">
    <img :src="item.user.avatar" alt="">
    <div class="content-box">
      <div class="top">
        <div class="left">
          <span class="name">{{ item.user.nickname }}</span>
          <span class="job">面试岗位: {{ item.position }}</span>
          <ul class="tags">
            <li class="tag" v-for="(tag, index) in item.tags" :key="index">{{ tag }}</li>
          </ul>
        </div>
        <!-- 打分 -->
        <van-rate v-model="item.score" readonly></van-rate>
      </div>
      <p>{{ item.content }}</p>
      <div class="time">{{ item.created_at | formatTime }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  margin-bottom: 18px;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 9px;
  }
  .content-box {
    flex: 1;
    .top {
      display: flex;
      justify-content: space-between;
      // 调整间隙
      .van-rate {
        margin-top: 10px;
      }
      span {
        display: block;
      }
      .name {
        font-size: 12px;
        font-weight: 600;
        color: #545671;
        line-height: 17px;
      }
      .job {
        font-size: 12px;
        font-weight: 400;
        color: #b4b4bd;
        margin-top: 3px;
      }
      .tags {
        display: flex;
        margin-top: 11px;
        li {
          padding: 2px 4px;
          background: #f7f4f5;
          border-radius: 3px;
          margin-right: 7px;
          font-size: 12px;
          font-weight: 400;
          color: #b4b4bd;
        }
      }
    }
    p {
      font-size: 14px;
      font-weight: 400;
      text-align: justify;
      color: #181a39;
      line-height: 27px;
      letter-spacing: 0;
    }
    .time {
      font-size: 12px;
      font-weight: 400;
      color: #b4b4bd;
      line-height: 17px;
      letter-spacing: 0;
    }
  }
}
</style>
