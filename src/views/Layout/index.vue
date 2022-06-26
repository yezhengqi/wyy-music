<template>
  <div>
    <van-nav-bar :title="navtitle" fixed/>
    <keep-alive exclude="view-comment">
      <router-view class="contain"></router-view>
    </keep-alive>
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" replace to="/layout/home"
        >首页</van-tabbar-item
      >
      <van-tabbar-item icon="search" replace to="/layout/search"
        >搜索</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'view-comment',
  data () {
    return {
      active: 0,
      navtitle: this.$route.meta.title

    }
  },

  watch: {
    $route: {
      handler () {
        this.navtitle = this.$route.meta.title
      }
    }
  }
}
</script>

<style scoped>
.contain{
  padding: 46px 0 50px 0;
}
</style>
