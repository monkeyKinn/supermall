import {
  ADD_COUNTER,
  ADD_2_CART
} from './mutation-types'
export default {
  addCart(context, payload) {
    // 查找之前数组中是否有该商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    if (oldProduct) {
      // 已经有该商品了,数量➕1
      // oldProduct.count += 1
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      // context.state.cartList.push(payload)
      context.commit(ADD_2_CART,payload)
    }
  }
}