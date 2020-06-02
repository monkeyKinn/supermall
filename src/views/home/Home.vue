<template>
  <div id="home">
    <!--导航栏-->
    <navbar class="home">
      <div slot="center">セックスコンビニ</div>
    </navbar>

    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control" v-show="isTabFixed"/>

    <!--TODO 滚动区域 第18行有问题 会导致下了多次 解决思路 控制下拉距离底部的位置-->
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <!--轮播图-->
      <home-swiper :banners="banners" @swapperImageLoaded="swapperImageLoaded"/>
      <!--推荐视图-->
      <home-recommend-view :recommends="recommends"/>
      <!--本周流行-->
      <home-feature-view/>
      <!--'流行','新款','精选'-->
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
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

  import {debounce} from 'common/utils'

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
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
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
      // 1.组件刚加载完就发送网络请求,请求首页多个展示数据,加个()表示调用函数
      this.getHomeMultidata()

      // 2.初始化请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },

    mounted() {
      // 防抖封装
      const refresh = debounce(this.$refs.scroll.refresh, 500)
      // 3.监听事件总线中图片加载完成事件
      this.$bus.$on('itemImageLoaded', () => {
        refresh()
      })
    },
    activated() {//活跃 -> 进来
      console.log('进来:' + this.saveY);
      // setTimeout(() => {
      //   this.$refs.scroll.scrollTo(0, this.saveY, 0)
      // }, 0.1)
      //要刷新一下,避免回到顶部的问题
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    deactivated() {//不活跃 -> 离开
      this.saveY = this.$refs.scroll.getScrollY()
      console.log('离开:' + this.saveY);
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
        // 解决吸顶按钮不一致
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },

      backTop() {
        // 在500ms内回到顶部
        console.log('backTop');
        this.$refs.scroll.scrollTo(0, 0, 500)
      },

      contentScroll(position) {
        // 大于1000的时候backTop显示,
        this.isShowBackTop = (-position.y) > 1000

        // 决定tabControl是否吸顶(position:fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop

      },

      loadMore() {
        // console.log('加载更多');
        this.getHomeGoods(this.currentType)
      },

      swapperImageLoaded() {
        // 计算高度,轮播图加载完后计算
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

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
          // 把后面的数组依次放入前面的,把查询出来的数据保存
          this.goods[type].list.push(...res.data.list)
          // 因为加了数据,所以页码要加1
          this.goods[type].page += 1

          // 为了再次下拉更多
          this.$refs.scroll.finishPullUp()
        })
      },


    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    /*vh viewport height 视口高度*/
    height: 100vh;
    /*子绝父相*/
    position: relative;
  }

  .home {
    background: var(--color-tint);
    color: var(--color-background);

    /*在使用浏览器原生滚动时,为了让导航不跟随一起滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 3;*/

  }

  /*!*简单的吸顶功能*!*/
  /*.tab-control {*/
  /*position: sticky;*/
  /*top: 44px;*/
  /*z-index: 3;*/
  /*}*/

  /*确定内容高度*/
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 80px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 3;
  }
</style>