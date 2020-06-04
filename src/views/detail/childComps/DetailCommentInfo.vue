<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <!--评论的小标题-->
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more" @click="noMore">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>

    <!--正真的评论-->
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>

    <!--评价内容-->
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span>{{commentInfo.created | showData}}&ensp;</span>
        <span>{{commentInfo.style}}</span>
      </div>

      <!--卖家秀-->
      <div class="info-imgs">
        <img :src="item" alt=""
              v-for="(item,index) in commentInfo.images"
              :key="index">
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from 'common/utils.js'

  export default {
    name: "DetailCommentInfo",
    props: {
      commentInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      noMore() {
        alert("木有更多辣~~~(*^__^*)")
      }
    },
    filters: {
      showData(time) {
        // 把时间戳转date
        const currentDate = new Date(time * 1000)
        // Date转格式
        return formatDate(currentDate,'yyyy年MM月dd日 hh:mm:ss')
      }
    }
  }
</script>

<style scoped>
  .comment-info {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  .header-title {
    float: left;
    font-size: 15px;
  }

  .header-more {
    float: right;
    margin-right: 10px;
    font-size: 13px;
  }

  .info-user {
    padding: 10px 0 5px;
  }

  .info-user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  .info-user span {
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
  }

  .info-detail {
    padding: 0 5px 15px;
  }

  .info-detail p {
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }

  .info-detail .info-other {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }

  .info-other .data {
    margin-right: 8px;
  }

  .info-imgs {
    margin-top: 10px;
  }

  .info-imgs img{
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>