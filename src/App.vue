<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
    <div class="content">
      I am content

    </div>

  </div>
</template>

<script>
  import header from 'components/header/header'
  import {urlParse} from 'common/js/utill'
  const ERR_OK = 0

  export default {
    name: 'app',
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse()
            console.log(queryParam)
            return queryParam.id
          })()
        }
      }
    },
    created() {
      this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
           this.seller = Object.assign({}, this.seller, response.data)
          console.log(this.seller)
         }
      })
    },
    components: {
      'v-header': header

    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus">
    @import "common/stylus/mixin"
      .tab
        display: flex
        width: 100%
        height: .4rem
        line-height: .4rem
        background: #fff
        border-1px(rgba(7,17,27,0.1))
        .tab-item
          flex: 1
          text-align: center
          & > a
            display: block
            font-size: .14rem
            color: rgb(77, 85, 93)
            &.active
              color: rgb(240, 20, 20)



</style>
