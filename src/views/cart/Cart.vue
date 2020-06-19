<template>
  <div class="cart">
    <!--导航-->
    <navbar class="navBar">
      <div slot="center">购物车({{length}})</div>
    </navbar>

    <!--列表-->
    <cart-list/>

    <!--底部汇总-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import Navbar from "components/common/navbar/Navbar";
  import {mapGetters} from 'vuex'
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  export default {
    name: "Cart",
    components: {CartBottomBar, CartList, Navbar},
    data() {
      return {}
    },
    computed: {
      // 两种语法
      // 默认名字 用数组
      // ...mapGetters(['cartLength','cartList'])
      // 自定义名字 用对象
      ...mapGetters({
        // 对应的就是length成为'计算属性'了
        length: 'cartLength'
      })
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .navBar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>