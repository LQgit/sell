<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decCart">
      </div>
     </transition>
    <div class="cart-count" v-show="food.count>0" >{{this.food.count}}</div>
    <div class="cart-add" @click.stop.prevent="addCart"></div>
  </div>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue'
  export default {
    name: 'cartcontrol',
    props: {
      food: {
      type: Object
      }
    },
    data() {
      return {
      }
    },
    methods: {
      addCart(event) {
        if(!event._constructed){
          return
        }
        if(!this.food.count){
          Vue.set(this.food, 'count', 1)
        }else {
          this.food.count++
        }
        this.$emit('add', event.target)
        return this.food.count
      },
      decCart(event) {
        if(!event._constructed) {
        return
        }
        if(this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>
<style lang="stylus" ref="stylesheet/stylus">
    .cartcontrol
      font-size: 0
      line-height: .24rem
      .cart-decrease
        &.move-enter-active, &.move-leave-active
          transition: all .4s
        &.move-enter, &.move-leave-active
          opacity: 0
          transform: translate3D(.24rem,0,0)
          transform: rotate(90deg)
      .cart-decrease, .cart-add
        display: inline-block
        font-size: .24rem
        vertical-align: bottom
        &.cart-decrease:after
          font-family: 'iconfont'
          content: '\e661'
          font-size: .24rem
          color: #00a3da
        &.cart-add:after
          font-family: 'iconfont'
          content: '\e621'
          color: #00a3da
      .cart-count
        display: inline-block
        vertical-align: bottom;
        width: .27rem
        font-size: .12rem
        color: #666
        line-height: .24rem
        text-align: center

</style>
