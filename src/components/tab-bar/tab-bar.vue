<!-- 底部导航栏 组件 -->
<template>
  <van-tabbar route>
    <!-- TODO:图标的引入 -->
    <van-tabbar-item replace to="/home" icon="home-o">
      首页
    </van-tabbar-item>
    <van-tabbar-item replace to="/search" icon="search">
      发现
    </van-tabbar-item>
    <van-tabbar-item replace to="/order" icon="orders-o">
      订单
    </van-tabbar-item>
    <van-tabbar-item replace to="/user" icon="user-o">
      我的
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import Vue from 'vue';
import { Tabbar, TabbarItem } from 'vant';

Vue.use(Tabbar);
Vue.use(TabbarItem);
export default {

  components: {},
  data () {
    return {

    }
  },

}
</script>

