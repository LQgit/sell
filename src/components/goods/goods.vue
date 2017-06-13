<template>
  <div class="goods">
     <div class="menu-wrap" ref="menuWrap">
        <ul class="menu">
          <li v-for="(item,index) in goods" class="menu-item" :class="{'current': currentIndex===index}" @click="selectMenu(index,$event)">
            <span class="text">
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>   {{item.name}}
            </span>
          </li>
        </ul>
     </div>
     <div class="foods-wrap" ref="foodsWrap">
        <ul>
          <li v-for="item in goods" ref="foodList" class="food-list1">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="food in item.foods" @click="selectFood(food,$event)" class="food-list">
                <div class="icon">
                  <img :src="food.icon"/>
                </div><div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                      <span>月售{{food.sellCount}}</span>
                      <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                      <span><span class="RMB">¥</span>{{food.price}}</span>
                      <del v-if="food.oldPrice">¥{{food.oldPrice}}</del>
                  </div>
                  <div class="cartcontrol-wrap">
                    <v-cartcontrol  @add="addFood" :food="food"></v-cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
     </div>
     <v-shopcar ref="shopcar" :selectFoods="selectFoods" :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice"></v-shopcar>
     <food @add="addFood" :food="selectedFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import shopcar from 'components/shopcar/shopcar'
import cartcontrol from 'components/cartcontrol/cartcontrol'
import food from 'components/food/food'
  const ERR_OK = 0
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
       goods: [],
       listHeight: [],
       scrollY: 0,
       selectedFood: {}
      }
    },
    computed: {
      currentIndex() {
        for(var i = 0; i < this.listHeight.length; i++){
          var height1 = this.listHeight[i]
          var height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
           }
        }
        return 0
      },
      selectFoods() {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
           if (food.count) {
              foods.push(food)
           }
          })
        })
        return foods
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.$http.get('/api/goods').then((response) => {
        response = response.body
        if(response.errno === ERR_OK){
          this.goods=response.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          });
        }
      })
    },
    methods: {
      selectMenu(index, event) {
        if (!event._constructed) {
          return
        }
        var foodList = this.$refs.foodList
        var el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      selectFood(food, event) {
        if(!event._constructed){
          return
        }
        this.selectedFood = food
        this.$refs.food.show()
      },
      addFood(target) {
        this._drop(target)
      },
      _drop(target) {
        // 体验优化,异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcar.drop(target)
        })
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrap, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrap, {
          click: true,
          probeType: 3
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight(){
        var foodList = this.$refs.foodList
        var height = 0
        this.listHeight.push(height)
        for(var i = 0; i < foodList.length; i++) {
            var item = foodList[i]
            height += item.clientHeight
            this.listHeight.push(height)
        }
      }
    },
    components: {
    'v-shopcar': shopcar,
    'v-cartcontrol': cartcontrol,
    food
    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
  .goods
    background: #fff
    display: flex
    width: 100%
    height:4.26rem
    .menu-wrap
      flex-basis: .8rem

      background-color: #f3f5f7
      overflow: hidden
      .menu-item
        display: table
        padding: 0 .12rem
        box-sizing: border-box
        font-size: .12rem
        height: .54rem
        width:100%
        line-height:.14rem
        border-1px(rgba(7,17,27,.1))
        &.current
          position:relative
          z-index: 10
          background: #fff
          font-weight: 700
        .text
           display: table-cell
           vertical-align: middle
      .icon
        display: inline-block
        width: .12rem
        height: .12rem
        background-size: 100%
        background-repeat: no-repeat
        &.decrease
          bg-image('decrease_3')
        &.discount
          bg-image('discount_3')
        &.invoice
          bg-image('invoice_3')
        &.special
          bg-image('special_3')
        &.guarantee
          bg-image('guarantee_3')
    .foods-wrap
      flex: 1

      overflow: hidden
      .title
        padding-left: .14rem
        line-height:2.2
        font-size: .12rem
        color: rgb(147,153,159)
        background: #f3f5f7
        border-left:.02rem solid #d9dde1
      ul
        .food-list
          position: relative
          padding: .18rem
          box-shadow: .18rem 1px rgba(7,17,27,.1)
          display:  flex
          .icon
            display: inline-block
            vertical-align: top
            width: .57rem
            height: .57rem

            img
              width: 100%
              height: 100%
              border-radius: 2px
          .content
            display: inline-block
            padding-left: .1rem
            flex: 1
            .name
              font-size: .14rem
            .desc
              font-size: .1rem
              color: rgb(147,153,159)

            .extra
               font-size: .1rem
               color: rgb(147,153,159)
            .cartcontrol-wrap
              position: absolute
              right: .2rem
              bottom: .1rem
            .price
              span
                color:#f01414
                font-size: .14rem
                font-weight:700
                .RMB
                  font-size: .1rem
                  font-weight:normal
              del
                font-size: .1rem
                color: #93999f
                font-weight:700




</style>
