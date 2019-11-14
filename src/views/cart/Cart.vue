<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">
        购物车({{cartLength}})
      </div>
    </nav-bar>
		<cart-list>
			
		</cart-list>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps/CartList.vue'

  export default {
    name: "Cart",
    components: {
      NavBar,
			CartList
    },
		computed:{
			cartLength(){
				return this.$store.state.cartList.length
			}
		}
  }
</script>

<style lang="less" scoped>
.cart{
  height: 100vh;
  .nav-bar{
		background-color:var(--color-tint);
		color:#fff;
    font-weight: 700;
    position: relative;
    z-index: 9;
	}
}
</style>
