<template>
  <div class="goods-item" @click="itemClick">
    <!-- Vue中的@load="imgLoaded"监听图片加载函数-->
    <img :src="showImage" alt="21" @load="imgLoaded">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "goodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImage() {
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imgLoaded() {
        // 发射事件总线事件
        this.$bus.$emit('itemImageLoaded')
      },
      itemClick() {
        this.$router.push('/detail/'+this.goodsItem.iid)
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    /*相对定位,子绝父相*/
    position: relative;
    /*为了在goodsList中flex均分*/
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  /*商品信息*/
  .goods-info {
    font-size: 12px;
    /*子绝对定位*/
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>