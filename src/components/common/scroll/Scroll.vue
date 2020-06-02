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
        pullUpLoad: this.pullUpLoad,
        /*解决ios端拉下到最顶端回弹两次
        官方播放器bug 地址 http://ustbhuangyi.com/music/#/recommend
        解决方法:加上下面这个属性*/
        useTransition:false
      })

      // 2.监听滚动的区域
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position)
        })
      }

      // 3.监听上拉事件
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      scrollTo(x, y, time = 300) {
        // 回到顶部,第三个参数是所用时间
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh() {
        console.log('***');
        this.scroll && this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>