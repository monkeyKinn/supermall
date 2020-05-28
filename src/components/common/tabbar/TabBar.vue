<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  #tab-bar {
    /*fix布局*/
    display: flex;
    background-color: #f6f6f6;
    /*适配手机底部,免得太靠下*/
    height: 80px;
    /*fix定位*/
    position: fixed;
    /*自动平分*/
    left: 0;
    right: 0;
    bottom: 0px;

    /*盒子阴影*/
    box-shadow: 0 -3px 1px rgba(100, 100, 100, .2);
  }
</style>
