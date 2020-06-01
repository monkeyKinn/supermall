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
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    // 组件创建完成后调用
    mounted() {
      // 1.创建Bscroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        // 监听滚动的区域 对应的属性
        probeType: this.probeType,
        // 监听上拉事件 对应的属性
        pullUpLoad: this.pullUpLoad
      })

      // 2.监听滚动的区域
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      })

      // 3.监听上拉事件
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    },
    methods: {
      scrollTo(x, y, time = 300) {
        // 回到顶部,第三个参数是所用时间
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp()  {
        this.scroll.finishPullUp()
      }
    }
  }
</script>

<style scoped>

</style>