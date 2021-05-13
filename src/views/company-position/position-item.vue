<template>
  <div class="item van-hairline--bottom" @click="$router.push('/position-detail/' + item.id)">
    <h3 class="name">
      <span>{{ item.name }}</span> 
      <span class="order">{{ item.salary }}</span>
    </h3>
    <div class="tags">
      <van-tag round>{{ item.city }}</van-tag>
      <van-tag round>{{ item.experience }}</van-tag>
      <van-tag round>{{ item.education }}</van-tag>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  background-color: white;
  align-items: center;
  height: 96px;
  padding-top: 20px;
  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #19232b;
    margin: 0;
    display: flex;
    justify-content: space-between;
    .order {
      font-size: 16px;
      font-weight: 400;
      color: #e40137;
      text-align: right;
      flex: 1;
    }
  }
  .van-tag {
    background: #f7f4f5;
    border-radius: 3px;
    padding: 1px 5px;
    margin-right: 9px;
    color: #b4b4bd;
  }
}
</style>
