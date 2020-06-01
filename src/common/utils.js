// 防抖
export function debounce(func,delay) {
  let timer = null
  return function (...args) {
    // 有值就清除
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      func.apply(this,args)
    },delay)
  }
}