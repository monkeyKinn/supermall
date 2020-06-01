<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item"/>
  </div>
</template>

<script>

  import GoodsListItem from "./goodsListItem";

  export default {
    name: "goodsList",
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    /*包裹 不在一行显示*/
    flex-wrap: wrap;
    /*均等分*/
    justify-content: space-around;
    /*padding: 2px;*/
  }


</style>