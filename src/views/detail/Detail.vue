<template>
  <div class="detail">
    <detail-nav-bar/>
    <detail-swiper :top-images="topImages"/>
  </div>
</template>

<script>
  import {getDetail} from "network/detail.js"
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  export default {
    name: "Detail",
    components: {
      DetailSwiper,
      DetailNavBar,
    },
    data() {
      return {
        iid: null,
        topImages: []
      }
    },
    created() {
      // 1.获取并保存传入的参数iid
      this.iid = this.$route.params.iid
      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        console.log(res);
        // 获取顶部的图片轮播数据
        this.topImages = res.result.itemInfo.topImages
      })
    }
  }
</script>

<style scoped>

</style>