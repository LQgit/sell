<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star1-item"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5
  const CLA_ON = 'on'
  const CLA_HALF = 'half'
  const CLA_OFF = 'off'
  export default {
    name: 'star',
     props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
     },
     computed: {
      starType() {
        return 'star-' + this.size
      },
      itemClasses() {
        var result = []
        var score = this.score
        score = Math.floor(this.score*2)/2
        var hasDecimal = score%1!==0
        var integer = parseInt(score)
        for(var i=0; i<integer; i++) {
          result.push(CLA_ON)
        }
       if(hasDecimal){
          result.push(CLA_HALF)
        }
       for(i = 0; result.length< LENGTH; i++) {
            result.push(CLA_OFF)
          }
        return result
      }
     }
  }
</script>
<style lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
  .star
    font-size: 0
    .star1-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
       .star1-item
        width: .2rem
        height: .2rem
        margin-right: .22rem
        background-size: 100%
        &:last-child
          margin-right: 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
     &.star-36
        .star1-item
         width: .15rem
         height: .15rem
         margin-right: .06rem
         background-size: 100%
         &:last-child
           margin-right: 0
         &.on
           bg-image('star36_on')
         &.half
           bg-image('star36_half')
         &.off
           bg-image('star36_off')
     &.star-24
         .star1-item
          width: .1rem
          height: .1rem
          margin-right: .03rem
          background-size: 100%
          &:last-child
            margin-right: 0
          &.on
            bg-image('star24_on')
          &.half
            bg-image('star24_half')
          &.off
            bg-image('star24_off')

</style>
