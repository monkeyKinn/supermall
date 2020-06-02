<template>
  <div id="app">
    <!--不销毁组件-->
    <keep-alive>
      <router-view/>
    </keep-alive>
    <main-tab-bar class="main-tab-bar"/>
  </div>
</template>

<script>

  import MainTabBar from "./components/content/mainTabbar/MainTabBar";

  export default {
    name: 'App',
    components: {MainTabBar}
  }
</script>

<style>
  @import "assets/css/base.css";

  .main-tab-bar {
    z-index: 3;
  }
</style>
