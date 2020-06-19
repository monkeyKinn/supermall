<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoadAll"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-button-bar @addCart="add2Cart"/>
    <!--组件监听点击事件要加native属性-->
    <back-top @click.native="backTop" v-show="isShowBackTop" class="back-top"/>
  </div>
</template>

<script>
  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail.js"

  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/goodsList";

  import {itemListenerMixin,backTopMixin} from "common/mixin";
  import {debounce} from "../../common/utils";
  import DetailButtonBar from "./childComps/DetailButtonBar";

  import {mapActions} from "vuex"
  export default {
    name: "Detail",
    components: {
      DetailButtonBar,
      Scroll,
      GoodsList,
      DetailShopInfo,
      DetailBaseInfo,
      DetailSwiper,
      DetailNavBar,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo
    },
    mixins: [itemListenerMixin,backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0
      }
    },
    created() {
      // 1.获取并保存传入的参数iid
      this.iid = this.$route.params.iid
      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 2.1 获取顶部的图片轮播数据
        const data = res.result
        this.topImages = data.itemInfo.topImages
        // 2.2 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 2.3 获取店铺信息
        this.shop = new Shop(data.shopInfo)
        // 2.4 获取并直接保存商品的详情数据
        this.detailInfo = data.detailInfo
        // 2.5 获取商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // 2.6 取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })
      // 3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
      // 4.给getThemeTopY赋值 给this.getThemeTopY 防抖
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          // 为了简化判断条件,加一个最大值用于判断
        this.themeTopYs.push(Number.MAX_VALUE);
        console.log(this.themeTopYs)
      }, 500)
    },
    methods: {
      ...mapActions({
        add: 'addCart'
      }),
      // 加载完图片后刷新
      imageLoadAll() {
        this.refreshed()
        // 获取各个主题的offsetTop
        this.getThemeTopY()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
      },
      contentScroll(position) {
        // 获取y
        const positionY = -position.y
        // 大于1000的时候backTop显示,
        this.isShowBackTop = positionY > 1000
        // positionY 和主题中的对比
        let length = this.themeTopYs.length
        for (let kin = 0; kin < length-1; kin++) {
          // if (this.currentIndex !== kin && ((kin < length - 1 && (positionY >= this.themeTopYs[kin] && positionY < this.themeTopYs[kin + 1])) ||
          if (this.currentIndex !== kin && (positionY >= this.themeTopYs[kin] && positionY < this.themeTopYs[kin+1])) {
            this.currentIndex = kin;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      },
      add2Cart() {
        // 获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        // 添加到购物车,mutations,提交到mutations
        // this.$store.commit('addCart',product)
        // 添加到购物车,actions 分发到action
        // this.$store.dispatch('addCart',product).then(res => {
        //   console.log(res)
        // })
        this.add(product).then(res => {
          console.log(res)
        })
      }
    },
    mounted() {
    },
    destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImgListListener)
    }
  }
</script>

<style scoped>
  #detail {
    /*隐藏底部tabBar*/
    position: relative;
    z-index: 4;
    background-color: #fff;
    height: 100vh;
  }

  /*固定 顶部*/
  .detail-nav {
    position: relative;
    z-index: 3;
    background-color: #fff;
  }

  /*添加bs滚动*/
  .content {
    height: calc(100% - 44px - 50px);
  }

  .back-top {
    bottom: 50px;
  }
</style>
