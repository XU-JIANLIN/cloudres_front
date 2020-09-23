<template>
<div>
  <van-pull-refresh
    v-model="isLoading"
    success-text="刷新成功"
    @refresh="onRefresh"
  >
  <!-- 顶部 -->
  <van-nav-bar  >
    <template #left>
      <van-icon name="location-o"  size="20"  color="#FFFFFF"/>
      <router-link to="" class="van-ellipsis" style="size: 25px;  color: #FFFFFF; width:160px">
        珠海格力电器股份有限公司
      </router-link>
      <van-icon name="arrow-down" size="15"  color="#FFFFFF"/>
      
    </template>
    <template #right>
      <van-icon name="chat-o"  badge="9"  size="20" color="#FFFFFF" />
    </template>
  </van-nav-bar>
  <!-- 搜索框 -->
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch()">搜索</div>
      </template>
    </van-search>
<!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <van-grid clickable :column-num="4"  :border="false">
      <van-grid-item 
        v-for="item in categories" :key="item.id"
        icon="https://img.yzcdn.cn/vant/apple-1.jpg" :text="item.title" to="/" >
      </van-grid-item>
    </van-grid>
    <!-- 内容 -->
    <div class="content_item">
      <router-link class="content_item" to="/">
        <van-skeleton title avatar :row="3"  loading="true"/>
      </router-link>
    </div>
    
      
  
  


  </van-pull-refresh>
</div>
</template>
<script>
//导入前台js
import front from '@/api/front'

//导入组件
import Vue from 'vue';
import { Grid, GridItem } from 'vant';
import { PullRefresh } from 'vant';
import { Search } from 'vant';
import { Image as VanImage } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { NavBar } from 'vant';
import { Icon } from 'vant';
import { Skeleton } from 'vant';

Vue.use(Skeleton);
Vue.use(Icon);
Vue.use(NavBar);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(VanImage);
Vue.use(Search);
Vue.use(PullRefresh);
Vue.use(Grid);
Vue.use(GridItem);
export default {
  data() {
    return {
      count: 0,
      isLoading: false,
      value:" ",
      categories:[],
    };
  },
  created () {
        this.init()
    },
  methods: {
    init() {
      front.getCategories().then(res =>{
      
        if(res.data.code == 0) {
          this.categories = res.data.data
          console.log(this.categories)
        }
      })

    },
    onSearch() {
      console.log(this.value)
    },
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
  },
}
</script>
<style >
.van-pull-refresh {
  height: 700px;

}
.van-grid-item__icon {
    font-size: 50px;
}
.van-nav-bar{
  font-size: 20px;
  height: 50px;
  background-color: #39a9ed;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 100px;
  text-align: center;
  background-color: #02B6FD;
  }
.van-grid {
  /* margin-bottom: 20px; */
}
.content_item {
  /* margin-top: 10px;
  margin-left: auto;
  margin-right: auto; */
  margin: 15px auto 0 auto  ;
  height: 120px;
  width: 98%;
  background-color: #FFFFFF;
}
</style>