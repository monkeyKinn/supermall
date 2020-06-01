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
    props: {
      probeType: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    // 组件创建完成后调用
    mounted() {
      // 创建Bscroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType
      })

      // 监听滚动的区域
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll',position)
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