import {debounce} from "./utils";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListListener: null,
      refreshed: null
    }
  },
  mounted() {
    // 防抖封装
    this.refreshed = debounce(this.$refs.scroll.refresh, 500)
    // 对监听的事件进行保存
    this.itemImgListListener = () => {
      this.refreshed()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListListener)
    console.log('我是混入');
  }
}