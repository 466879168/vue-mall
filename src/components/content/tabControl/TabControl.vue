<template>
    <div class="tab-control">
        <div v-for="(item ,index) in titles" :key="index" class="tab-control-item" :class="{active:index === currentIndex}" @click="tabClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TabControl",
        data(){
            return {
            currentIndex:0
            }
        },
        props:{
            titles:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        methods:{
            tabClick(index){
                this.currentIndex=index
                this.$emit('tabClick', index)
            }
        }
    }
</script>

<style scoped lang="less">
.tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 44px;
    line-height: 44px;
    background-color: #fff;
    .tab-control-item{
        flex: 1;
        span{
            padding: 5px;
        }
    }
    .active {
        color: var(--color-high-text);
        span{
            border-bottom: 3px solid var(--color-high-text);
        }
    }
}
</style>