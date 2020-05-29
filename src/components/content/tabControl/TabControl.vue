<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles"
         class="tab-control-item"
         :class="{active : index === currentIndex}"
         @click="itemClick(index)"
    >
      <!--动态绑定是对象语法-->
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        // 记录当前选中下标
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: var(--color-background);
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  /*活跃的样式*/
  .active {
    color: var(--color-high-text);
  }

  /*活跃时候的span*/
  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>
