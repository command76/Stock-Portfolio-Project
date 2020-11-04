<template>
   <div class="container">
        <div v-for="(value, index) in stocksavailable" :key="index">
            <div class="grid-item">
                <div class="stock-head">
                    <strong>{{ value.company }}</strong>&nbsp;<small>(Price: &dollar;{{ value.price}})</small>
                </div>
                <div :style="setColor(value.quantity, value.stocksToPurchase)"><em>Stocks Available for Purchase {{ value.quantity }}</em></div>
                <div class="flex">
                    <label>Enter Purchase Amount: <input type="number" value="Quantity" v-model="value.stocksToPurchase"></label>
                    <button class="btn" @click="purchased(value, funds)">Buy</button>
                </div>
                <div style="color: red; padding: 3px;">{{ value.buyErrorMessage }}</div>
            </div>
        </div>
    </div>  
</template>

<script>
import { eventBus } from  "../main.js";
import myMixins from "../mixins/mixins"


export default {
    mixins: [myMixins],
    name: "stocks",
    props: ["stocksavailable", "funds"],
    data() {
        return {
        
        }
    },
    methods: {
        purchased(company, funds) {
            if (this.convertToNum(funds) - (company.stocksToPurchase * company.price) > 0) {
                if (company.quantity - company.stocksToPurchase < 0) {
                    company.buyErrorMessage = "Please enter a number within the stocks available.";
                } else if (company.quantity - company.stocksToPurchase > company.quantity) {
                    company.buyErrorMessage = "Please enter a number within the stocks available.";
                } else {
                    company.buyErrorMessage = ""
                    company.quantity = company.quantity - Number(company.stocksToPurchase);
                    company.stockOwned = company.stockOwned + Number(company.stocksToPurchase);
                    funds = this.convertToDollars(this.convertToNum(funds) - (company.stocksToPurchase * company.price))
                }
            } else {
                company.buyErrorMessage = "You don't have enough to purchase the stocks.  You are overspending by: " + this.convertToDollars(Number(Math.abs(this.convertToNum(funds) - (company.stocksToPurchase * company.price)).toFixed(2))) + ".";
            }

            
            eventBus.$emit("bought", company, funds);
        },
        setColor(amount, purchase) {
            let difference = amount - purchase;
            if (difference > 50) {
                return { "background-color": "lime", "padding": "3px" }
            } else if ( difference >= 25) {
                return { "background-color": "gold", "padding": "3px"  }
            } else if ( difference < 25 ) {
                return { "background-color": "red", "padding": "3px"  }
            }

        }
    }
}
</script>

<style scoped>
.container {
    width: 90%; 
    margin: auto; 
    margin-top: 20px; 
    margin-bottom: 20px;
    display: grid;
    justify-content: space-evenly;
    grid-template-columns: 40% 40%;
}

.grid-item {
    border: 3px solid darkred;
    margin: 20px 0
}

@media only screen and (max-width: 800px) {
    .container {
        grid-template-columns: 90%;
    }
}

.stock-head {
    padding: 10px;
    background-color: mistyrose;
    color: darkred
}

.btn {
    background-color: darkred;
    color: mistyrose;
    border: 1px solid darkred;
    padding: 4px;
    border-radius: 3px;
    cursor: pointer;
}
.flex {
    padding: 10px;
    display: flex;
    justify-content: space-between;
}
</style>