<template>
  <div class="cart-list">
    <scroll class="content">
		<cart-list-item v-for="(item,index) in cartList" :key="index" :product="item"></cart-list-item>
	</scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from './CartListItem'

export default {
  name: "CartList",
  components: {
	Scroll,
	CartListItem
  },
  data() {
    return {
      cartList: this.$store.state.cartList
    };
  }
};
</script>

<style scoped="scoped" lang="less">
.cart-list {
	height: 100vh;
  .content {
	position: absolute;
	left: 0;
	right: 0;
	top: 44px;
	bottom: 49px;;
  }
}
</style>
