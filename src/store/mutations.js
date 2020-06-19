import {
  ADD_COUNTER,
  ADD_2_CART
} from './mutation-types'
// mutations 唯一的目的就是修改state中的状态
// 设计原则:每个方法完成的事件尽可能简单
export default {
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_2_CART](state, payload) {
    // 添加购物车的时候 设置默认选中
    payload.checked = true
    state.cartList.push(payload)
  }
}