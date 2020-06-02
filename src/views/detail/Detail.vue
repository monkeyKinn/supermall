<template>
  <div class="detail">
    <detail-nav-bar/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
    },
    data() {
      return {
        iid: null
      }
    },
    created() {
      // 获取传入的参数iid
      this.iid = this.$route.params.iid
    }
  }
</script>

<style scoped>

</style>