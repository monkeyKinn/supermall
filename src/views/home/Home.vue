<template>
  <div id="home">
    <!--导航栏-->
    <navbar class="home">
      <div slot="center">セックスコンビニ</div>
    </navbar>
    <!--轮播图-->
    <home-swiper :banners="banners"/>
    <!--推荐视图-->
    <home-recommend-view :recommends="recommends"/>
    <!--本周流行-->
    <home-feature-view/>
    <!--'流行','新款','精选'-->
    <tab-control class="tab-control" :titles="['流行','新款','精选']"/>
    <ul>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
      <li>213</li>
    </ul>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommendView from "./childComps/HomeRecommendView";
  import HomeFeatureView from "./childComps/HomeFeatureView";

  import Navbar from "components/common/navbar/Navbar";
  import TabControl from "components/content/tabControl/TabControl";

  // home的网络请求,因为没有用default导出所以这里要用大括号
  import {
    getHomeMultidata,
    getHomeGoods
  } from "network/home";

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,

      Navbar,
      TabControl
    },
    data() {
      return {
        // 保存getHomeMultidata()的res
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0,list: []},
          'new': {page: 0,list: []},
          'sell': {page: 0,list: []},
        }
      }
    },

    // 只写主要逻辑
    created() {
      // 组件刚加载完就发送网络请求,请求首页多个展示数据,加个()表示调用函数
      this.getHomeMultidata()

      // 初始化请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },

    methods: {
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },

      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          console.info(res)
          // 把后面的数组依次放入前面的,把查询出来的数据保存
          this.goods[type].list.push(...res.data.list)
          // 因为加了数据,所以页码要加1
          this.goods[type].page += 1
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
  }

  .home {
    background: var(--color-tint);
    color: var(--color-background);

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 3;

  }

  /*简单的吸顶功能*/
  .tab-control {
    position: sticky;
    top: 44px;
  }
</style>