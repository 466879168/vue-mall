<template>
  <div class="goods-list">
    <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item="item" class="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
name:'GoodsList',
components: {
    GoodsListItem
},
props: {
    goods:{
        type:Array,
        default(){
            return []
        }
    }
}
}
</script>

<style lang="less" scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    justify-content: space-around;
    .item{
        width: 40%;
    }
}
</style>