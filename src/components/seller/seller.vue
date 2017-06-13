<template>
  <div class="seller" ref="seller">
    <div class="content">
      <div class="seller-score">
        <h1 class="title">{{seller.name}}</h1>
        <div class="star-wrap">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="seller-news">
          <li class="block">
            <h2>起送价</h2>
            <div class="stress">
              <span class="text">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="stress">
              <span class="text">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="stress">
              <span class="text">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite" >
          <span class="icon-favorite" :class="{'active': favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrap">
          <p class="text">{{seller.bulletin}}</p>
        </div>
        <ul class="support">
          <li class="support-item" v-for="(item, index) in seller.supports">
            <span class="icon-decrease" :class="classMap[index]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pics-wrap" ref="picWrap">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="(pic,index) in seller.pics"><img width="120" height="90" :src="pic" alt=""/></li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item" v-for="(info, index) in seller.infos">{{seller.infos[index]}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import star from 'components/star/star'
  import split from 'components/split/split'
  import {saveToLocal, loadFromLocal} from 'common/js/store'
  export default {
    props: {
        seller: {
          type: Object
        }
      },
    data() {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false)
        })()
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏'
      }
    },
    watch: {
        'seller'() {
          this.$nextTick(() => {
            this._initScroll()
            this._initPics()
          })
        }
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll();
        this._initPics();
      });
    },
    methods: {
      toggleFavorite(event) {
        if(!event._constructed){
          return
        }
         this.favorite = !this.favorite
          saveToLocal(this.seller.id, 'favorite', this.favorite);
      },
      _initScroll() {
          if(!this.scroll) {
            this.scroll = new BScroll(this.$refs.seller, {
              click: true
            })
          }else {
            this.scroll.refresh()
          }
      },
      _initPics() {
        if(this.seller.pics){
          let picWidth = 1.2
          let margin = 0.06
          let width = (picWidth + margin) * this.seller.pics.length - margin
          this.seller.pics.length - margin
          this.$refs.picList.style.width = width + 'rem'
          this.$nextTick(() => {
            if(!this.picScroll) {
              this.picScroll = new BScroll(
                this.$refs.picWrap, {
                  srcollX: true,
                  eventPassthrough: 'vertical'
                }
              )
            }else {
              this.picScroll.refresh()
            }
          })
          console.log(1)
        }
      }
    },
    components: {
      star,
      split
    }
  }
</script>
<style lang="stylus" ref="stylesheet/stylus">
  @import '../../common/stylus/mixin'
    .seller
      background: #fff
      height: 4.95rem
      overflow: hidden
      .content
        .seller-score
          position: relative
          padding: .18rem
          .title
            padding-bottom: .08rem
            font-size: .14rem
            color: #07111b
          .star-wrap
            padding-bottom: .18rem
            line-height: 1.1
            .star
              display: inline-block
              padding-right: ,08rem
            .text
              display: inline-block
              vertical-align: top
              padding-right: ,12rem
        .seller-news
          display: flex
          padding-top: .18rem
          border-t1px(rgba(7,17,27,0.1))
          .block
            flex: 1
            text-align: center
            border-right: 1px solid rgba(7,17,27,0.1)
            &:last-child
              border-right: 0
            h2
              font-size: .1rem
              color: #93999f
              padding-bottopm: .04rem
            .stress
              font-size: .1rem
              color: #07111b
              .text
                font-size: .24rem
        .favorite
          position: absolute
          top: .18rem
          right: .11rem
          text-align: center
          width: .5rem
          .icon-favorite
            display: block
            padding-bottom: .04rem
            &:after
              font-family: 'iconfont'
              content: '\e610'
              display: block
              font-size: 24px;
              color: #d4d6d9;
            &.active
             &:after
              color: rgb(240, 20, 20)
        .bulletin
          padding: .18rem .18rem 0 .18rem
          .title
            padding-bottom: .08rem
            font-size: .14rem
            color: #07111b
          .content-wrap
            padding: 0 .12rem .16rem .12rem
            border-1px(rgba(7,17,27,0.1))
            .text
              line-height: 2
              font-size: .12rem
              color: #f01414
        .support
          .support-item
            padding: .16rem .12rem
            line-height: 1.4;
            border-1px(rgba(7,17,27,0.1))
            font-size: 0
            .icon-decrease
              display: inline-block
              vertical-align: top
              margin-right: .06rem
              width: .16rem
              height: .16rem
              background-size: 100%
              background-repeat: no-repeat
              &.decrease
                bg-image(decrease_4)
              &.discount
                bg-image(discount_4)
              &.guarantee
                bg-image(guarantee_4)
              &.invoice
                bg-image(invoice_4)
              &.special
               bg-image(special_4)
            .text
              display: inline-block;
              font-size: .12rem
        .pics
          padding: .18rem
          .title
            padding-bottom: .12rem
            line-height: 1
            font-size: .14rem
            color: #07111b
          .pics-wrap
            width: 100%
            overflow: hidden
            white-space: nowrap
            line-height: 1
            .pic-list
              font-size: 0
              .pic-item
                display: inline-block
                margin-right: .06rem
                &:last-child
                  margin: 0
        .info
          padding: .18rem
          .title
            padding-bottom: .12rem
            font-size: .14rem
            border-1px(rgba(7,17,27,0.1))
          .info-item
            padding: .16rem .12rem
            border-1px(rgba(7,17,27,0.1))
</style>
