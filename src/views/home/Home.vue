<template>
  <div>
    <!--导航栏-->
    <navbar class="home">
      <div slot="center">セックスコンビニ</div>
    </navbar>
    <!--轮播图-->
    <home-swiper :banners="banners"/>
  </div>
</template>

<script>
  import Navbar from "components/common/navbar/Navbar";
  import HomeSwiper from "./childComps/HomeSwiper";

  // home的网络请求,因为没有用default导出所以这里要用大括号
  import {getHomeMultidata} from "network/home";

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      Navbar
    },
    data() {
      return {
        // 保存getHomeMultidata()的res
        banners: [],
        recommends: []
      }
    },
    created() {
      // 组件刚加载完就发送网络请求,请求首页多个展示数据,加个()表示调用函数
      getHomeMultidata().then(res => {
        console.log(res);
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    }
  }
</script>

<style scoped>
  .home {
    background: var(--color-tint);
    color: var(--color-background);
  }
</style>