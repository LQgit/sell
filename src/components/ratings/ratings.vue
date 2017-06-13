<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="seller-score">
        <div class="seller-score-left">
          <p class="score">{{seller.score}}</p>
          <p class="title">综合评分</p>
          <p class="rank">高于周边商家{{seller.rankRate}}%</p>
        </div>
        <div class="seller-score-right">
          <div class="score-wrap">
            <span class="title">服务态度</span>
            <div class="star-wrap">
              <star :size="36" :score="seller.serviceScore"></star>
            </div>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrap">
            <span class="title"> 商品评分</span>
            <div class="star-wrap">
              <star :size="36" :score="seller.foodScore"></star>
            </div>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrap">送达时间<span class="delivery">{{seller.deliveryTime}}</span>分钟</div>
        </div>
      </div>
      <split></split>
      <ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings" ></ratingselect>
      <div class="ratings-wrap">
          <ul>
            <li v-for="rating in ratings" class=" rating-item" v-show="needShow(rating.rateType,rating.text)">
              <div class="avatar">
                <img width="28" height="28" :src="rating.avatar"/>
              </div>
              <div class="content">
                <h1 class="user">{{rating.username}}</h1>
                <div class="star-wrap">
                  <star :size="24" :score="rating.score"></star>
                  <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
                </div>
                <p class="text">{{rating.text}}</p>
                <div class="recommend"  v-show="rating.recommend && rating.recommend.length ">
                  <span class="icon-up"></span>
                  <span v-for="item in rating.recommend" class="recommend-item">{{item}}</span>
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
              </div>
            </li>
          </ul>
      </div>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import star from 'components/star/star'
  import ratingselect from 'components/ratingselect/ratingselect'
  import split from 'components/split/split'
  import {formatDate} from 'common/js/formatDate'
  const ERR_OK = 0
  const ALL = 2
  export default {
    props: {
      seller: {
         type: Object
      }
    },
    data() {
      return {
          ratings: [],
          selectType: ALL,
          onlyContent: true
      }
    },
  created() {
    this.$http.get('/api/ratings').then((response) => {
      response = response.body
      if(response.errno === ERR_OK) {
        this.ratings = response.data
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          })
        })
      }
    })
  },
    methods: {
      selectRating(type) {
        this.selectType = type
        this.$nextTick(() => {
          this.scroll.refresh()
        })
       },
      toggleContent() {
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      needShow(type, text) {
        if(!text && this.onlyContent) {
          return false
        }
        if(this.selectType === ALL) {
          return true
        }else {
          return type === this.selectType
        }
        }
      },
      filters: {
        formatDate(time) {
          let date = new Date(time)
          return formatDate(date, 'yyyy-MM-dd hh:mm')
        }
      },
    components: {
        star,
        split,
        ratingselect
    }
  }
</script>
<style lang="stylus" ref="stylesheet/stylus">
  @import '../../common/stylus/mixin'
  .ratings
    background: #fff
    height: 4.92rem
    overflow: hidden
    .seller-score
      padding: .18rem 0
      display: flex
      .seller-score-left
        flex: 1
        border-right: 1px solid rgba(7,17,27,0.1)
        .score
          text-align: center
          padding-bottom: .06rem
          font-size: .24rem
          color: #f90
        .title
          text-align: center
          font-size: .12rem
        .rank
          font-size: .1rem
          text-align: center
          color: #93999f
      .seller-score-right
        flex-basis: 2.37rem
        box-sizing: border-box
        padding: .06rem 0 .06rem .24rem
        .score-wrap
          line-height: 1.1
          vertical-align: middle
          margin-bottom: .08rem
          font-size: 0
          .title
            vertical-align: middle
            font-size: .12rem
          .star-wrap
            display: inline-block
            vertical-align: middle
            padding: 0 .12rem
          .score
            vertical-align: middle
            font-size: .12rem
            color: #f90
        .delivery-wrap
          font-size: .12rem
          .delivery
            padding-left: .12rem
            color: #93999f
    .ratings-wrap
      padding: 0 .18rem
      .rating-item
        display: flex
        padding: .18rem 0
        border-1px(rgba(7,17,27,0.1))
        .avatar
          flex-basis: .28rem
          padding-right: .12rem
        .content
          flex: 1
          .user
           font-size: .12rem
           color: #07111b
          .star-wrap
            .star
              display: inline-block
            .delivery
              display: line-block
          .text
            margin-bottom: .08rem
            font-size: .12rem
            color: #07111b
          .recommend
            font-size: 0
            span
              display: inline-block;
              margin: 0 .08rem .04rem 0
            .recommend-item
              padding: 0 .06rem
              border-radius: .01rem
              border: 1px solid rgba(7,17,27,.1)
              color: #93999f
              font-size: .09rem
            .icon-up:after
              font-family: 'iconfont'
              content: '\E60F'
              color: #00a0dc
              font-size: .09rem
          .time
            position: absolute
            top: .18rem
            right: 0
            font-size: .1rem
            color: #93999f
</style>

