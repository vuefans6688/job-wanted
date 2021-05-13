<template>
  <div class="experience-detail-container">
    <!-- 导航栏 -->
    <van-nav-bar @click-left="$router.push('/interview')">
      <template #left>
        <i class="iconfont iconbtn-nav-back"></i>
      </template>
    </van-nav-bar>
    <!-- 顶部 -->
    <div class="top-box">
      <div class="title">
        拿到百度音乐的offer后，我总结了面试产品实习的几点经验
      </div>
      <div class="info-box">
        <img src="@/assets/avatar2.jpg" alt="" />
        <div class="name-box">
          <span class="name">浩子</span>
          <span class="time">3小时前</span>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="experience-content">
      <img src="@/assets/detailCover.jpg" alt="" />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto enim id
      deleniti, sint, repudiandae obcaecati voluptatibus pariatur exercitationem
      odit est a illum et aperiam voluptas quo? Debitis quis ratione magni
      consequatur eos sit rerum at, corrupti est ullam soluta ad eveniet
      reiciendis. Dolores libero, suscipit id pariatur facilis omnis earum? Quo
      enim reprehenderit mollitia dolor dicta placeat, asperiores hic
      laboriosam. Beatae molestias officiis suscipit fugit in libero quae,
      sapiente voluptatum vel voluptatem sint atque nisi ab, repellendus officia
      temporibus commodi ipsam error rem tenetur magni sit cum blanditiis.
      Beatae, ullam assumenda debitis sint minima quasi! Dignissimos sapiente ut
      doloribus! Eveniet molestias itaque dolorem minima ratione maiores sint
      nostrum quidem, cumque non magni, eius amet sunt obcaecati eaque ea
      dolorum. Cumque vitae explicabo nemo omnis voluptas asperiores rem
      molestiae assumenda architecto sapiente, rerum excepturi quia veritatis
      tenetur magnam reiciendis deserunt natus ab modi? Illo molestiae sint iste
      asperiores nemo recusandae, dolorem et ea saepe sit cum deleniti,
      consectetur, iure nostrum quis sed rerum quos voluptates quibusdam!
      Ducimus ab commodi dolorum esse nisi, dignissimos in consequatur sunt
      tempore, eveniet ex facere quis placeat deleniti iure. Nostrum,
      exercitationem sequi commodi qui, consequuntur nihil quo praesentium,
      saepe omnis laboriosam ducimus molestiae aliquam voluptatem ut nulla
      accusamus soluta porro! Deserunt sed porro optio explicabo impedit
      exercitationem magnam iusto rerum inventore odio cumque praesentium quae
      modi nihil ut deleniti, totam dolores fugit vitae sint obcaecati
      asperiores officia quisquam. Quas, ipsa? Assumenda, hic. Est perspiciatis
      blanditiis quaerat ut ea, eos quisquam error a autem omnis dolores fugit
      hic! Amet impedit laborum voluptatum modi fuga labore repudiandae, at
      dolorem laudantium placeat, optio expedita qui quaerat dolores ullam
      debitis deserunt, consequatur nisi sunt necessitatibus rem maiores.
      Quibusdam facilis dolores vel eum odit eaque quos quisquam ab autem error
      blanditiis, voluptatum cumque vitae tempore quam ipsa reiciendis beatae
      aspernatur esse sequi alias! Doloribus deserunt, reprehenderit consequatur
      rem nostrum veritatis repellat recusandae aliquam asperiores dolorem
      numquam ducimus reiciendis, dolor eligendi blanditiis magni voluptatum
      inventore at, id quibusdam porro neque. Eum eos mollitia eligendi delectus
      tenetur. Eveniet provident nisi quia voluptatibus soluta repellat,
      distinctio labore, fugit minima voluptatum earum neque aspernatur dicta
      molestiae odit aperiam! Eaque harum accusamus, perspiciatis voluptatem
      quas iusto ipsum! Laboriosam quas aperiam ipsum, at rem aliquam vel optio
      aut odio pariatur sit voluptatibus recusandae praesentium neque
    </div>
    <!-- 评论 -->
    <div class="comment-box">
      <!-- 顶部评论 -->
      <div class="title">评论 <span class="num">68</span></div>
      <!-- 每一项 -->
      <div class="comment">
        <!-- 姓名 点赞区域 -->
        <div class="info-box">
          <img src="@/assets/avatar2.jpg" alt="" />
          <div class="name-box">
            <span class="name">浩子</span>
            <span class="time">3小时前</span>
          </div>
          <div class="zan-box">
            <span>68</span>
            <i class="iconfont iconbtn-dianzan-small-nor"></i>
          </div>
        </div>
        <!-- 评论内容 -->
        <div class="content-box">
          <div class="content">点赞，很有收获呢</div>
          <div class="reply-box">
            <div class="reply">
              <span class="name">小李: </span>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta
              velit ex accusantium enim cupiditate nostrum quibusdam nemo, iure
              modi quod fugit quasi rerum inventore eaque hic minima sunt
              voluptatibus mollitia!
            </div>
            <div class="reply">
              <span class="name">小黑: </span>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta
            </div>
          </div>
        </div>
        <!-- 回复评论 -->
      </div>
      <div class="comment">
        <!-- 姓名 点赞区域 -->
        <div class="info-box">
          <img src="@/assets/avatar2.jpg" alt="" />
          <div class="name-box">
            <span class="name">浩子</span>
            <span class="time">3小时前</span>
          </div>
          <div class="zan-box">
            <span>68</span>
            <i class="iconfont iconbtn-dianzan-small-nor"></i>
          </div>
        </div>
        <!-- 评论内容 -->
        <div class="content-box">
          <div class="content">点赞，很有收获呢</div>
          <div class="reply-box">
            <div class="reply">
              <span class="name">小李: </span>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta
              velit ex accusantium enim cupiditate nostrum quibusdam nemo, iure
              modi quod fugit quasi rerum inventore eaque hic minima sunt
              voluptatibus mollitia!
            </div>
            <div class="reply">
              <span class="name">小黑: </span>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      showShare: false
    }
  }
}
</script>

<style lang="scss">
.experience-detail-container {
  background-color: #f7f4f5;
  padding-bottom: 45px;
  .van-nav-bar__left {
    padding-left: 5px;
  }
  .iconbtn-nav-back {
    font-size: 44px;
  }
  .top-box {
    background-color: white;
    padding: 15px;
    .title {
      font-size: 18px;
      font-weight: 500;
    }
  }
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
  .experience-content {
    padding: 15px;
    font-size: 16px;
    color: #181a39;
    background-color: white;
    img {
      width: 100%;
      display: block;
    }
  }
  .comment-box {
    margin-top: 10px;
    background-color: white;
    padding: 26px 15px;
    .title {
      font-size: 18px;
      font-weight: 500;
      position: relative;
      span {
        color: #b4b4bd;
        font-size: 12px;
        position: absolute;
        left: 40px;
        top: -5px;
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
        padding-top: 18px;
        padding-left: 15px;
        padding-bottom: 12px;
        background: #f7f4f5;
        .reply {
          font-size: 14px;
          color: #545671;
          margin-top: 15px;
          .name {
            font-weight: 500;
            margin-right: 5px;
          }
        }
      }
    }
  }
  .bottom-box {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 85px;
    display: flex;
    box-sizing: border-box;
    padding: 10px 15px 0;
    background-color: white;
    width: 100%;
    justify-content: space-between;
    .input {
      height: 34px;
      background: #f7f4f5;
      border-radius: 4px;
      flex: 1;
      font-size: 14px;
      margin-top: 10px;
      color: #b4b4bd;
      margin-right: 24px;
      line-height: 34px;
      padding-left: 6px;
    }
    div:not(.input) {
      font-size: 12px;
      color: #b4b4bd;
      i {
        display: block;
        font-size: 28px;
      }
    }
    .shoucang {
      margin-right: 24px;
    }
    .star {
      margin-right: 24px;
    }
  }
  .input-pop {
    padding: 25px 15px 0;
    overflow: hidden;
    // 弹出层
    .van-cell::after {
      border-bottom: none;
    }
    .van-field {
      height: 99px;
      width: 100%;
      background: #f7f4f5;
      border-radius: 4px;
    }
    span {
      font-size: 16px;
      color: #b4b4bd;
      float: right;
      margin-top: 11px;
    }
  }
  // 底部弹出层
  .share-box {
    width: 311px;
    height: 553px;
    background-size: 100% 100%;
    background-position-x: 0;
    background-position-y: 0;
    padding: 0 15px 15px;
    background-image: url("@/assets/ios3x_img_share_bj@3x.png");
    display: flex;
    flex-direction: column;
    .text {
      text-align: center;
      font-size: 12px;
      color: white;
      padding: 15px;
    }
    .share-content-box {
      flex: 1;
      background-color: white;
      border-radius: 10px;
      padding: 0 15px;
      .title {
        font-size: 16px;
        margin-top: 20px;
      }
      .user-box {
        margin-top: 15px;
        display: flex;
        align-items: center;
        img {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          margin-right: 5px;
        }
        span {
          font-size: 12px;
        }
      }
      .content {
        font-size: 16px;
        margin-top: 20px;
        height: 165px;
        overflow: hidden;
        position: relative;
        &::after {
          content: "";
          width: 100%;
          bottom: 0;
          left: 0;
          height: 25px;
          background-color: white;
          opacity: 0.9;
          position: absolute;
        }
      }
      .logo {
        width: 150px;
        display: block;
        margin: 20px auto;
      }
      .code {
        margin: 0 auto;
        display: block;
        width: 80px;
      }
      .direction {
        font-size: 12px;
        text-align: center;
        margin-top: 20px;
        color: #c1c1c8;
      }
    }
  }
}
</style>
