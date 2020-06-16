<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommends"/>
    </scroll>
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

  import {itemListenerMixin} from "common/mixin";

  export default {
    name: "Detail",
    components: {
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
    mixins: [itemListenerMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: []
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
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
      })
      // 3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    },
    methods: {
      // 加载完图片后刷新
      imageLoad() {
        this.refreshed()
      }
    },
    mounted() {},
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
    height: calc(100% - 44px);
  }
</style>
