<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="image in topImages">
      <img :src="image" alt="详情轮播图">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from "components/common/swiper";

  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    // 父传子,子组件有props属性
    props: {
      topImages: Array,
      default() {
        return []
      }
    }
  }
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>