<template>
    <div>
      <Header></Header>
      <transition name="slide" mode="out-in">
        <component :is="component" :stocksavailable="stocks" :mystocks="stocks">
          <dash></dash>
          <portfolio></portfolio>
          <stocks></stocks>
        </component>
      </transition>
      <div style="border: 2px solid green; margin: 10px;" 
        v-for="(i, index) in test" 
        :key="index" 
        class="hello"
        @click="test.splice(index, 1)">{{  index + ' ' + i }}</div>
    </div>
</template>

<script>
import Header from "./components/Header.vue";
import Dash from "./components/Dash.vue";
import Portfolio from "./components/Portfolio.vue";
import Stocks from "./components/Stocks.vue";
import { eventBus } from "./main";

export default {
  data() {
    return {
      component: Dash,
      stocks: {
          Tesla: {
              id: 1,
              owned: true,
              price: 0,
          },
          Apple: {
              id: 2,
              owned: true,
              price: 0,
          },
          Microsoft: {
              id: 3,
              owned: false,
              price: 0,
          },
          Amazon: {
              id: 4,
              owned: false,
              price: 0,
          },
      },
      test: [1,2,3,4,5,6,7,8,9,10],
      number: 0,
    }
  },
  // watch: {
  //   number: function() {
  //     return this.test.splice(this.number - 1, 1)
  //   }
  // },
  name: 'App',
  components: {
    Header,
    Dash,
    Portfolio,
    Stocks
  },
  created() {
    eventBus.$on('choice', (data) => {
      this.component = data;
    })

    eventBus.$on("bought", (data) => {
            switch (data) {
                case "Tesla": 
                    this.stocks.Tesla.owned = true;
                    break
                case "Apple":
                    this.stocks.Apple.owned = true;
                    break
                case "Microsoft":
                    this.stocks.Microsoft.owned = true;
                    break
                case "Amazon":
                    this.stocks.Amazon.owned = true;
                    break 
            }
        })
    
    eventBus.$on("sold", (data) => {
            switch (data) {
                case "Tesla": 
                    this.stocks.Tesla.owned = false;
                    break
                case "Apple":
                    this.stocks.Apple.owned = false;
                    break
                case "Microsoft":
                    this.stocks.Microsoft.owned = false;
                    break
                case "Amazon":
                    this.stocks.Amazon.owned = false;
                    break 
            }
        })
  }
}
</script>

<style>


.slide-enter {
 opacity: 0;
 top: -50px;
}

.slide-enter-active {
  position: relative;
  transition: all 1000ms;
  /* transition: opacity 500ms */
}

.slide-enter-to {
  top: 0px;
  opacity: 1
}

.slide-leave {
  top: 0px;
  opacity: 1;
}

.slide-leave-active {
  position: relative;
  transition: all 1000ms;
}

.slide-leave-to {
  top: -50px;
  opacity: 0;
}

.test {
  position: relative;


}
</style>
