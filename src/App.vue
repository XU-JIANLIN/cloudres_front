<template>
  <div id="app">
    <router-view />
  <tab-bar v-if="!$route.meta.TabbarShow"></tab-bar>
  </div>
</template>

<script>
import TabBar from '@/components/tab-bar/tab-bar'

export default {
    components: {
    TabBar,
  },
}
</script>
<style>
body {
  font-size: 16px;
  background-color: #f8f8f8;
  -webkit-font-smoothing: antialiased;
}
</style>
