<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="check-button" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计：{{totalPrice}}</div>
    <div class="caclulate">去计算：{{checkedLength}}</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  data() {
    return {
      count: 0
    };
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartList
        .filter(item => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.price * item.count;
        }, 0)
        .toFixed(2);
    },
    checkedLength() {
      return this.$store.state.cartList.filter(item => item.checked).length;
    },
    isSelectAll() {
      if (this.$store.state.cartList.length == 0) return false;
      return !this.$store.state.cartList.filter(item => !item.checked).length;
    }
  },
  methods: {
    checkClick() {
		if(this.isSelectAll){//全部选中
			this.$store.state.cartList.forEach(item => item.checked=false)
		}else{//部分选中
			this.$store.state.cartList.forEach(item => item.checked=true)
		}
	}
  }
};
</script>

<style scoped="scoped">
.bottom-bar {
  height: 40px;
  position: absolute;
  bottom: 49px;
  left: 0;
  right: 0;
  line-height: 40px;
  background: #eee;
  display: flex;
  font-size: 14px;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 80px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
}
.price {
  margin-left: 30px;
  flex: 1;
}
.caclulate {
  width: 110px;
  background: red;
  color: #fff;
  text-align: center;
}
</style>
