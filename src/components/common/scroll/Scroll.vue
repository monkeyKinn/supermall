<template>
  <!--ref一般绑定给子组件-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {

      })
    },
    methods: {
      scrollTo(x, y,time = 300) {
        // 回到顶部,第三个参数是所用时间
        this.scroll.scrollTo(x,y,time)
      }
    }
  }
</script>

<style scoped>

</style>