<template>
  <div class="bottom-bar">
    <div class="checkAll">
      <check-button class="check-button"/>
      <span>全选</span>
    </div>

    <div class="totalPrice">
      合计:&nbsp;￥&nbsp;{{totalPrice}}
    </div>

    <div class="calculate">
      去结算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import {mapGetters} from "vuex"

  export default {
    name: "CartBottomBar",
    components: {CheckButton},
    computed: {
      ...mapGetters(["cartList"]),
      totalPrice() {
        return this.cartList.filter(item =>
            item.checked
        ).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item =>
            item.checked
        ).reduce((preValue, item) => {
          return preValue + (item.count)
        }, 0)
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;
    font-size: 14px;

    background-color: #eee;
  }

  .checkAll {
    display: flex;
    align-items: center;
    margin-left: 5px;
    margin-right: 5px;
    width: 60px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .totalPrice {
    margin-left: 30px;
    flex: 1;
  }

  .calculate {
    width: 90px;
    background-color: #eb4868;
    color: #fff;
    text-align: center;
  }
</style>