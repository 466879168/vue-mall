<template>
  <div class="feature">
    <a href="https://act.mogujie.com/zzlx67">
      <img src="~assets/img/home/recommend_bg.jpg" alt="" @load="imageLoad" />
    </a>
  </div>
</template>

<script>
export default {
  name: "FeatureView",
  methods:{
      imageLoad(){
          // console.log(2222)
      }
  }
};
</script>

<style scoped lang="less">
.feature {
  img {
    width: 100%;
  }
}
</style>
