<template>
  <div>
    <van-cell-group v-for="musiclist in newSongs" :key="musiclist.id" inset class="newmusic">
        <van-cell :title="musiclist.name"
        :label="`${musiclist.ar[0].name} - ${musiclist.name}`"
        center title-style="font-size:16px"
        @click="toComment(musiclist.id)"
         >
          <template #right-icon>
            <van-icon name="play-circle-o" class="broadcast" @click.stop="playmusic(musiclist.id)"/>
          </template>
        </van-cell>
      </van-cell-group>
  </div>
</template>

<script>
export default {
  name,
  props: ['newSongs'],
  methods: {
    // 跳转播放页
    playmusic (id) {
      this.$router.push({ path: '/play', query: { id: id } })
    },
    toComment (id) {
      this.$router.push({ path: '/layout/comment', query: { id: id } })
    }
  }
}
</script>

<style lang="less" scoped>
.newmusic{
    .broadcast{
      font-size: 25px;
    }
  }
</style>
