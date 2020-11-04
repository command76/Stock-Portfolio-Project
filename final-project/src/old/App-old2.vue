<template>
    <div>
      <Header></Header>
      <transition name="slide" mode="out-in">
        <component :is="component" :stocksavailable="stocks" :mystocks="stockSelection">
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
const stocks = [
          { 
              company: "Tesla",
              id: 1,
              owned: true,
              price: 0,
          }, {
              company: "Apple",
              id: 2,
              owned: true,
              price: 0,
          }, {
              company: "Microsoft",
              id: 3,
              owned: false,
              price: 0,
          }, {
              company: "Amazon",
              id: 4,
              owned: false,
              price: 0,
          },
      ];



export default {
  data() {
    return {
      component: Dash,
      stocks: stocks,
      stockSelection: [...stocks],
      soldStock: [],
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
            switch (data.company) {
                case "Tesla":
                  var Ti = 0;
                  while (Ti < this.stockSelection.length + 1) {
                    if (typeof this.stockSelection[Ti] === "undefined") {
                      this.stockSelection.push(data);
                      this.stockSelection[Ti].owned = true;
                      break
                    } else if (this.stockSelection[Ti].company === "Apple") {
                      this.stockSelection.splice(0, 0, data);
                      this.stockSelection[Ti].owned = true;
                      break;
                    } else if (this.stockSelection[Ti].company === "Tesla") {
                      this.stockSelection[Ti].owned = true;
                      break;
                    }
                    Ti++
                  }

                  break
                case "Apple":
                  var Ai = 0;
                  while (Ai < this.stockSelection.length + 1) {
                    if (typeof this.stockSelection[Ai] === "undefined") {
                      this.stockSelection.push(data);
                      this.stockSelection[Ai].owned = true;
                      break;
                    } else if (this.stockSelection[Ai].company === "Microsoft") {
                      this.stockSelection.splice(this.stockSelection.indexOf(this.stockSelection[Ai].company === "Microsoft") - 1, 0, data)
                      this.stockSelection[Ai].owned = true;
                      break;
                    } else if (this.stockSelection[Ai].company === "Apple") {
                      this.stockSelection[Ai].owned = true;
                      break;
                    }
                    Ai++;
                  }
                    break
                case "Microsoft":
                  var Mi = 0;
                  while (Mi < this.stockSelection.length + 1) {
                    if (typeof this.stockSelection[Mi] === "undefined") {
                      this.stockSelection.push(data);
                      this.stockSelection[Mi].owned = true;
                      break;
                    } else if (this.stockSelection[Mi].company === "Amazon") {
                      this.stockSelection.splice(this.stockSelection.indexOf(this.stockSelection[Mi].company === "Amazon"), 0, data)
                      this.stockSelection[Mi].owned = true;
                      break;
                    } else if (this.stockSelection[Mi].company === "Microsoft") {
                      this.stockSelection[Mi].owned = true;
                      break;
                    }
                    Mi++;
                  }   
                  break; 
                case "Amazon":
                  var i = 0;
                  while (i < this.stockSelection.length + 1) {
                    if (typeof this.stockSelection[i] === "undefined") {
                      this.stockSelection.push(data);
                      this.stockSelection[i].owned = true;
                      break;
                    } else if (this.stockSelection[i].company === "Amazon") {
                      this.stockSelection[i].owned = true;
                      break;
                    }
                    i++;

                  }
                    
                
            }
        })
    
    eventBus.$on("sold", (data) => {
            switch (data.company) {
                case "Tesla": 
                    this.stockSelection[0].owned = false;
                    break
                case "Apple":
                    this.stockSelection[1].owned = false;
                    break
                case "Microsoft":
                    this.stockSelection[2].owned = false;
                    break
                case "Amazon":
                    this.stockSelection[3].owned = false;
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
