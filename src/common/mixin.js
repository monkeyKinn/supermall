import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";

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
    // console.log('我是混入');
  }
}

export const backTopMixin = {

  components: {
    BackTop
  },
  data() {
    return {
      // 是否显示回到顶部属性
      isShowBackTop: true
    }
  },
  methods: {
    backTop() {
      // 在500ms内回到顶部
      // console.log('backTop');
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
  }

}