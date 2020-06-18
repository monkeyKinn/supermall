<template>
  <div class="cart">
    <navbar class="navBar">
      <div slot="center">购物车({{length}})</div>
    </navbar>
  </div>
</template>

<script>
  import Navbar from "components/common/navbar/Navbar";
  import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    components: {Navbar},
    data() {
      return {

      }
    },
    computed: {
      // 两种语法
      // 默认名字 用数组
      // ...mapGetters(['cartLength','cartList'])
      // 自定义名字 用对象
      ...mapGetters({
        // 对应的就是length成为'计算属性'了
        length :'cartLength',
        list: 'cartList'
      })
    }
  }
</script>

<style scoped>
  .navBar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>