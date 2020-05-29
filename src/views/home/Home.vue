<template>
  <div>
    <navbar class="home">
      <div slot="center">セックスコンビニ</div>
    </navbar>
  </div>
</template>

<script>
  import Navbar from "components/common/navbar/Navbar";
  export default {
    name: "Home",
    components: {Navbar}
  }
</script>

<style scoped>
  .home {
    background: var(--color-tint);
    color: var(--color-background);
  }
</style>