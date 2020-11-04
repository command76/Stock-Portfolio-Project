<template>
    <div>
      <Header :funds="funds"></Header>
      <transition name="slide" mode="out-in">
        <component :is="component" :stocksavailable="stocks" :mystocks="stockSelection" :funds="funds">
          <dash></dash>
          <portfolio></portfolio>
          <stocks></stocks>
        </component>
      </transition>
    </div>
</template>

<script>
import Header from "./components/Header.vue";
import Dash from "./components/Dash.vue";
import Portfolio from "./components/Portfolio.vue";
import Stocks from "./components/Stocks.vue";
import { eventBus } from "./main";
import myMixins from "./mixins/mixins";
const stocks = [
          { 
              company: "Tesla",
              id: 1,
              owned: true,
              price: Math.round(100 * (Math.random() * 600)) / 100,
              stockOwned: 0,
              quantity: 100,
              stocksToPurchase: 0,
              buyErrorMessage: "",
              errorMessage: "",
          }, {
              company: "Apple",
              id: 2,
              owned: true,
              price: Math.round(100 * (Math.random() * 200)) / 100,
              stockOwned: 0,
              quantity: 100,
              stocksToPurchase: 0,
              buyErrorMessage: "",
              errorMessage: "",
          }, {
              company: "Microsoft",
              id: 3,
              owned: false,
              price: Math.round(100 * (Math.random(10) * 150)) / 100,
              stockOwned: 0,
              quantity: 100,
              stocksToPurchase: 0,
              buyErrorMessage: "",
              errorMessage: "",
          }, {
              company: "Amazon",
              id: 4,
              owned: false,
              price: Math.round(100 * (Math.random() * 1200)) / 100,
              stockOwned: 0,
              quantity: 100,
              stocksToPurchase: 0,
              buyErrorMessage: "",
              errorMessage: "",
          },
      ];



export default {
  mixins: [myMixins],
  data() {
    return {
      component: Dash,
      stocks: stocks,
      stockSelection: [...stocks],
      soldStock: [],
      funds: this.convertToDollars(10000),
    }
  },
  methods: {
    test() {
      this.$http.get('/test').then(response => {
    // success callback
    console.log("Connected")
    console.log(response.json)
  }, response => {
    // error callback
    console.log("Failed")
    console.log(response.error)
  });
    }
  },
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

    eventBus.$on("bought", (data, funds) => {
            this.funds = funds
            const stockPurchased = (company) => this.stockSelection.findIndex((element) => element.company === company)
            switch (data.company) {
                case "Tesla":
                    if (typeof this.stockSelection.find(element => element.company === "Tesla") === "undefined") {
                        this.stockSelection.unshift(data);
                    }
                    this.stockSelection[0].owned = true;
                    break
                case "Apple":
                    if (typeof this.stockSelection.find(element => element.company === "Apple") === "undefined") {
                      if (stockPurchased("Microsoft") === 0 || stockPurchased("Amazon") === 0 || this.stockSelection.length === 0) {
                        this.stockSelection.unshift(data);
                     } else {
                       this.stockSelection.splice(1, 0, data);
                     }
                    }
                  this.stockSelection[stockPurchased("Apple")].owned = true;
                    break
                case "Microsoft":
                  if (typeof this.stockSelection.find(element => element.company === "Microsoft") === "undefined") {
                      if (this.stockSelection[stockPurchased("Amazon")].company === "Amazon") {
                         this.stockSelection.splice(stockPurchased("Amazon"), 0, data);
                     } else {
                         this.stockSelection.push(data);
                     }
                    }
                  this.stockSelection[stockPurchased("Microsoft")].owned = true;
                    break
                case "Amazon":
                  if (typeof this.stockSelection.find(element => element.company === "Amazon") === "undefined") {
                      this.stockSelection.push(data);
                    }
                  this.stockSelection[stockPurchased("Amazon")].owned = true;
                    break
                  }
                     
                
            }
        )

    
    eventBus.$on("sold", (data, funds) => {
            this.funds = funds;
            switch (data.company) {
                case "Tesla": 
                    this.stocks[0].stockOwned = data.stockOwned;
                    break
                case "Apple":
                    this.stocks[1].stockOwned = data.stockOwned;
                    break
                case "Microsoft":
                    this.stocks[2].stockOwned = data.stockOwned;
                    break
                case "Amazon":
                    this.stocks[3].stockOwned = data.stockOwned;
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
