<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"/>
    </scroll>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Scroll from "components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";

  export default {
    name: "CartList",
    components: {CartListItem, Scroll},
    computed: {
      ...mapGetters(['cartList'])
    },
    // 添加购物车后进行刷新,就是当组件活跃时刷新
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 80px - 44px);
  }

  .content {
    height: 100%;
    overflow: hidden;
  }
</style>