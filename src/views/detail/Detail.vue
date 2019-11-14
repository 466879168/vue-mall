<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
      <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from './childComps/DetailBottomBar'


import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
  import BackTop from 'components/content/backTop/BackTop';

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";

import {debounce} from "common/utils";

import { TOP_DISTANCE } from "common/const";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      itemImgListener: null,
      themeTopYs: [],
      currentIndex:0,
      isShowBackTop:false
    };
  },
  created() {
    //保存传入的iid
    this.iid = this.$route.params.id;

    //根据iid请求详细数据
    getDetail(this.iid).then(res => {
      //console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      //获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //获取店铺信息数据
      this.shop = new Shop(data.shopInfo);
      //保存商品的详情数据
      this.detailInfo = data.detailInfo;
      //获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      //在这里DOM已经渲染完了，但是图片还没有加载完
      this.$nextTick(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      });
    });
    //请求推荐数据
    getRecommend().then(res => {
      //console.log(res)
      this.recommends = res.data.list;
    });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    },
    titleClick(index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500);
    },
    contentScroll(position){
      //获取Y值
      const positionY=-position.y
      //console.log(positionY)
      //positionY和主题中的值进行对比
      //this.themeTopYs
      let length=this.themeTopYs.length
      for(let i=0;i<length;i++){
        //console.log(i)
        // if(positionY>this.themeTopYs[i] && positionY <this.themeTopYs[i+1]){

        // }
        if (this.currentIndex !==i&&(i<length-1&&positionY>this.themeTopYs[i] && positionY <this.themeTopYs[i+1])||(i==length-1&&positionY>this.themeTopYs[i])) {
          this.currentIndex=i
          this.$refs.nav.currentIndex=this.currentIndex
        }
      }

      //是否显示回到顶部按钮
      this.isShowBackTop=-position.y>TOP_DISTANCE
    },
    backClick(){
        this.$refs.scroll.scrollTo(0,0,1000)
      },
      addToCart(){
        //获取购物车需要展示的信息并且添加到购物车去 
        const product={}
        product.image=this.topImages[0]
        product.title=this.goods.title
        product.desc=this.goods.desc
        product.price=this.goods.realPrice
        product.iid=this.iid
        //将商品添加到购物车里  
        this.$store.commit('addCart', product)
      }
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 1000);
    this.itemImgListener = () => {
      newRefresh();
    };
    this.$bus.$on("itemImgLoad", this.itemImgListener);
    
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  }
};
</script>

<style lang="less" scoped>
#detail {
  position: relative;
  z-index: 11;
  background: #fff;
  height: 100vh;
  .detail-nav {
    position: relative;
    z-index: 11;
    background: #fff;
  }
  .content {
    position: absolute;
    overflow: hidden;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
