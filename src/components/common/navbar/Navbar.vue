<template>
  <div class="nav-bar">
    <div class="left">
      <!--俱名插槽-->
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Navbar"
  }
</script>

<style scoped>
  .nav-bar {
    display: flex;
    line-height: 44px;
    height: 44px;
    text-align: center;
    /*导航阴影*/
    box-shadow: 0 3px 6px rgba(100, 100, 100, .2);
  }
  .left, .right {
    width: 60px;
  }
  .center {
    flex: 1;
  }
</style>