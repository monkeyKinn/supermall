<template>
  <div id="home">
    <!--导航栏-->
    <navbar class="home">
      <div slot="center">セックスコンビニ</div>
    </navbar>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true">
      <!--轮播图-->
      <home-swiper :banners="banners"/>
      <!--推荐视图-->
      <home-recommend-view :recommends="recommends"/>
      <!--本周流行-->
      <home-feature-view/>
      <!--'流行','新款','精选'-->
      <tab-control class="tab-control"
                   :titles="['流行','新款','精选']"
                   @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <!--组件监听点击事件要加native属性-->
    <back-top @click.native="backTop" v-show="isShowBackTop"/>

  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommendView from "./childComps/HomeRecommendView";
  import HomeFeatureView from "./childComps/HomeFeatureView";

  import Navbar from "components/common/navbar/Navbar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/goodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

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
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        // 保存getHomeMultidata()的res
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        // 当前类型
        currentType: 'pop',
        // 是否显示回到顶部属性
        isShowBackTop: false
      }
    },
    computed: {
      // 计算属性,因为直接写太长了
      showGoods() {
        return this.goods[this.currentType].list
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

      // 监听事件总线中图片加载完成事件
      this.$bus.$on('itemImageLoaded',() => {
        console.log('----');
        this.$refs.scroll.refresh()
      })
    },

    methods: {

      /**
       * 事件监听
       */
      tabClick(index) {
        switch (index) {
          case 0 :
            this.currentType = 'pop'
            break
          case 1 :
            this.currentType = 'new'
            break
          case 2 :
            this.currentType = 'sell'
            break
        }
      },

      backTop() {
        console.log('b 2 t');
        // 在500ms内回到顶部
        this.$refs.scroll.scrollTo(0,0,500)
      },

      contentScroll(position) {
        // console.log(position);
        // 大于1000的时候显示
        this.isShowBackTop = (-position.y) > 1000
      },

      // loadMore() {
      //   this.getHomeGoods(this.currentType)
      // },
      /**
       * network request methods
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },

      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.info(res)
          // 把后面的数组依次放入前面的,把查询出来的数据保存
          this.goods[type].list.push(...res.data.list)
          // 因为加了数据,所以页码要加1
          this.goods[type].page += 1

          // // 为了再次下拉更多
          // this.$refs.scroll.finishPullUp()
        })
      },


    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    /*vh viewport height 视口高度*/
    height: 100vh;
    /*子绝父相*/
    position: relative;
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
    z-index: 3;
  }

  /*确定内容高度*/
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 80px;
    left: 0;
    right: 0;
  }
</style>