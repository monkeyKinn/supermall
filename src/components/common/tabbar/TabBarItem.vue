<template>
  <div class="tab-bar-item" @click="itemClick">
    <!--给活跃的图标设置颜色-->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <!--给活跃的字设置颜色-->
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      // 封装字体颜色
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    data() {
      return {

      }
    },
    // 计算属性
    computed: {
      isActive() {
        //$route 哪个路由活跃就是哪个对象 判断这个path是不是此时的path
        // /home -> item1(/home) = true
        // /home -> item1(/category) = true
        // /home -> item1(/cart) = true
        // /home -> item1(/profile) = true
        // indexof === -1 前面中没有找到括号里
        //                   找到就 !== -1
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  /*bar 靠下 居中 49px高*/
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
    /*在这刻修改底部tabbar字体默认不活跃颜色*/
    /*color: blue;*/
  }

  /*图标大小*/
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    /*去掉图片下面的3像素*/
    vertical-align: middle;
    margin-bottom: 2px;
  }
  /*移动端，div点击瞬间，出现阴影问题解决。*/
  div {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
</style>
