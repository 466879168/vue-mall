import Vue from 'vue'
import Vuex from 'vuex'
//安装插件
Vue.use(Vuex)

//创建store对象
// export default new Vuex.Store({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart(state, payload) {
			payload.checked=true
      //payload是新添加的商品
      let oldProduct = null
      for (let item of state.cartList) {
        if (item.iid === payload.iid) {
          oldProduct = item
        }
      }
      //判断oldProduct
      if (oldProduct) {
        oldProduct.count += 1
      } else {
        payload.count = 1
        state.cartList.push(payload)
      }

    }
  },
  actions: {
  },
  modules: {
  }
})



//3 挂载vue实例上
export default store