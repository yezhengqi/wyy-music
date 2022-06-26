<template>
  <div>
    <van-divider content-position="left">精彩评论 {{total}} 条</van-divider>
    <!-- 下拉刷新 上拉加载-->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
     <van-list
    v-model="loading"
    finished-text="没有更多了"
    @load="onLoad"
    :finished="finished"
  >
    <!-- 评论列表 -->
    <div class="boxboss" v-for="(item,index) in commentList" :key="index">
    <div class="box">
      <div class="ulogo"><img :src="item.user.avatarUrl"></div>
      <div class="umessage">
        <div class="user">
          <span>{{item.user.nickname}}</span>
          <div style="color:rgb(200, 204, 209);margin:4px 0 6px 0">{{item.timeStr}}</div>
        </div>
        <span class="comment" >{{item.content}}</span>
      </div>
      <div class="good">
        <span style="margin-right:5px">{{item.likedCount}}</span>
        <van-icon name="good-job-o" />
      </div>
    </div>
    <van-divider />
    </div>
     </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: 'view-comment',
  data () {
    return {
      musicId: this.$route.query.id,
      limit: 20,
      offset: 1,
      total: null,
      isLoading: false,
      loading: false,
      finished: false,
      commentList: []
    }
  },

  methods: {
    async getCommentList () {
      const result = await this.$API.comment.getcomment(this.musicId, this.limit, this.offset)
      if (result.code === 200) {
        // this.commentList = result.comments
        // 实现上拉加载数组数据拼接
        this.commentList.push.apply(this.commentList, result.comments)
        this.total = result.total
        this.isLoading = false
        this.loading = false
        // this.finished = true
        this.offset++
      }
    },
    onRefresh () {
      console.log('下拉刷新')
      this.commentList = []
      this.offset = 1
      this.getCommentList()
    },
    onLoad () {
      console.log('上拉加载')
      this.getCommentList()
    }
  }
  // created () {
  //   this.getCommentList()
  // }
}
</script>

<style scoped lang="less">
.box{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  padding: 0 10px;
  .ulogo{
    width: 10%;
    img{
      width: 100%;
      border-radius: 50%;
    }
  }
  .umessage{
    width: 60%;
    font-size: 14px;
    padding: 0 10px;
    .comment{
      width: 100%;
      flex-wrap: wrap;
    }
  }
  .good{
    width: 20%;
    font-size: 16px;
    color: rgb(200, 204, 209);
    text-align: right;
  }
}
</style>
