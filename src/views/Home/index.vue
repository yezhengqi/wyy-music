<template>
  <div class="home">
    <div>
      <span class="title">推荐歌单</span>
      <van-empty description="加载中" v-show="personMusic.length == 0"/>
      <van-grid
        :column-num="3"
        class="musiclist"
        style="margin-bottom: 15px"
      >
        <van-grid-item v-for="personal in personMusic" :key="personal.id">
          <img :src="personal.picUrl" />
          <span class="van-multi-ellipsis--l2">{{ personal.name }}</span>
        </van-grid-item>
      </van-grid>
    </div>

    <div class="newmusic">
      <span class="title">最新音乐</span>
      <van-loading type="spinner" color="red"  style="text-align:center" v-show="newSongs.length==0"/>
      <MusicMessage :newSongs="newSongs"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'view-home',
  data () {
    return {
      personMusic: [],
      newSongs: []
    }
  },
  methods: {
    async getpersonmusic () {
      const data = await this.$API.home.getpersonal(6)
      if (data.code === 200) {
        this.personMusic = data.result
      }
    },
    async getnewsongs () {
      const result = await this.$API.home.getnewsongs()
      if (result.code === 200) {
        this.newSongs = result.data.dailySongs
      }
    }

  },
  created () {
    this.getpersonmusic()
    this.getnewsongs()
  }
}
</script>

<style lang="less" scoped>
.home {
  .title {
    display: block;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    border-left: 3px solid red;
    background-color: rgb(247, 248, 250);
    padding-left: 10px;
    margin-bottom: 15px;
  }
  .musiclist {
    img {
      width: 100%;
      height:117px;
    }
    span {
      margin-top: 5px;
      font-size: 14px;
    }
  }

}
</style>
