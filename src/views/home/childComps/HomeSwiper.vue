<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.kink">
        <img :src="item.image" alt="item.title">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from "components/common/swiper"

  export default {
    name: "HomeSwiper",
    // 子组件传父组件,在子组件中写props:{},在父组件用的时候用 :props中的属性="父组件中的data中的对应属性"
    props: {
      banners: {
        type: Array,
        // 默认值必须是函数
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
  }
</script>

<style scoped>

</style>