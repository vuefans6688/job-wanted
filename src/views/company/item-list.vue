<template>
  <div class="item van-hairline--bottom">
    <div @click="handleCover" class="cover">
      <img :src="item.logo" alt="" />
    </div>
    <div class="content-box">
      <div class="top">
        <div class="left">
          <span class="name">{{ item.name }}</span>
          <span class="sub">{{ item.region }} {{ item.distance }}</span>
        </div>
        <div class="score">{{ item.score }}分</div>
      </div>
      <div class="tags">
        <span class="tag">{{ item.type }}</span>
        <span class="tag">{{ item.step }}</span>
        <span class="tag">{{ item.scale }}</span>
      </div>
      <div class="bottom">
        在招职位: <span>{{ item.positions }}</span> / 最后更新时间:
        <span>{{ item.updated_at | formatTime }}</span>
      </div>
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
  },
  methods: {
    // 向父组件的列表项派发点击事件
    handleCover () {
      // 把id传递出去
      this.$emit('click-item', this.item.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  height: 156px;
  padding-top: 24px;
  .cover {
    margin-right: 15px;
    img {
      width: 66px;
      height: 66px;
    }
  }
  .content-box {
    flex: 1;
    .top {
      display: flex;
      align-items: center;
      .left {
        flex: 1;
        span {
          display: block;
        }
        .name {
          font-size: 18px;
          color: #19232b;
          margin-bottom: 5px;
        }
        .sub {
          font-size: 12px;
          color: #545671;
        }
      }
      .score {
        font-size: 12px;
        color: #545671;
      }
    }
    .tags {
      margin-top: 13px;
      display: flex;
      .tag {
        display: block;
        font-size: 12px;
        color: #b4b4bd;
        padding: 2px 7px;
        background: #f7f4f5;
        margin-right: 7px;
      }
    }
    .bottom {
      margin-top: 16px;
      font-size: 12px;
      color: #b4b4bd;
      span {
        color: #53b5d1;
      }
    }
  }
}
</style>
