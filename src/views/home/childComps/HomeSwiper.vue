<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" :alt="item.title" @load="imageLoaded">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from "components/common/swiper"

  export default {
    name: "HomeSwiper",
    // 父传子,在子组件中写props:{},在父组件用的时候用 :props中的属性="父组件中的data中的对应属性"
    props: {
      banners: {
        type: Array,
        // 类型是对象或者数组时,默认值必须是函数
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLoaded() {
        if (!this.isLoad) {
          this.$emit('swapperImageLoaded')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>

</style>
