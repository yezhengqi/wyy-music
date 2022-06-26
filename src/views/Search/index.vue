<template>
  <div class="box">
    <van-search
  v-model="value"
  @search="onSearch"
  input-align="center"
  placeholder="请输入搜索关键词"

>

</van-search>
    <!-- 热门搜索 -->
    <div v-show="value == 0">
      <van-divider content-position="left">热门搜索</van-divider>
      <div class="tablist">
        <ul>
          <li
            v-for="(hot, index) in hotSearchs"
            :key="index"
            @click="toucHot(hot.first)"
          >
            {{ hot.first }}
          </li>
        </ul>
      </div>
    </div>
    <!-- 搜索框输入显示搜索建议 -->
    <div class="suggest" v-show="value.length > 0 && searchList.length == 0">
      <span class="search-name">搜索"{{ value }}"</span>
      <van-loading type="spinner" size="30px" v-show="suggest.length == 0" class="loading"/>
      <van-cell v-for="item in suggest"
      :title="`${item.name} - ${item.artists[0].name}`" :key="item.id" icon="search"
      @click="tapSuggest(item.name,item.artists[0].name,item.id)"
      />
    </div>
    <!-- 点击回车显示搜索结果 -->
    <div v-show="searchList.length > 0">
      <van-divider content-position="left">搜索结果</van-divider>
      <van-loading type="spinner" size="30px" v-show="searchList.length == 0" class="loading"/>
      <MusicMessage :newSongs="searchList" />
    </div>
  </div>
</template>

<script>
export default {
  name,
  data () {
    return {
      value: '',
      hotSearchs: [],
      suggest: [],
      searchList: [],
      timer: null,
      isOnSearch: false // 搜索确认接口请求判断
    }
  },
  methods: {
    async getHotsearch () {
      const result = await this.$API.search.getHotsearch()
      if (result.code === 200) {
        this.hotSearchs = result.result.hots
      }
    },
    toucHot (hot) {
      this.value = hot
    },
    async tapSuggest (name, nametype) {
      if (this.isOnSearch) {
        console.log('执行回车搜索')
      } else {
        this.value = name + nametype
      }
      const result = await this.$API.search.getSearcchList(this.value)
      if (result.code === 200) {
        this.searchList = result.result.songs
      }
    },
    onSearch () {
      this.isOnSearch = true
      this.tapSuggest() // 输入框确认搜索
    }
  },
  created () {
    this.getHotsearch()
  },
  watch: {
    value (val) {
      // 防抖请求
      clearTimeout(this.timer)
      if (val.length === 0) {
        this.suggest = []
        this.searchList = []
      } else {
        this.timer = setTimeout(async () => {
          const result = await this.$API.search.getSearchSuggest(val)
          if (result.code === 200) {
            console.log(result)
            this.suggest = result.result.songs
          }
        }, 500)
      }
    }
  }
}
</script>

<style scoped lang="less">
.box {
  .tablist {
    padding: 0 8px 0 16px;
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        font-size: 14px;
        padding: 4px 8px;
        text-align: center;
        border: 1px solid rgb(247, 248, 250);
        border-radius: 12px;
        margin: 0 8px 8px 0;
      }
    }
  }
  .suggest {
    position: relative;
    padding: 12px;
    .search-name {
      color: rgb(58, 126, 175);
      font-size: 16px;
    }
    /deep/.van-cell{
      // color: red;
    }
    .loading{
      position: absolute;
      left: 50%;
      top: 50px;
      color: red;
    }
  }
}
</style>
