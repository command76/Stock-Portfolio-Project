<template>
    <div class="container">
        <div v-for="(value, index) in mystocks" :key="index">
            <div v-if="value.owned === true ">
                <div class="grid-item">
                    <div class="stock-head">
                        <strong>{{ value.company }}</strong>&nbsp;<small>(Price: &dollar;{{ value.price }})</small>
                    </div>
                    <div class="stock-owned"> Stock Owned {{ value.stockOwned }}</div>
                    <div class="flex">
                        <input type="number" v-model="value.stocksToPurchase">
                        <button class="btn" @click="sold(value, mystocks, index, funds)">Sell</button><!--//mystocks.splice(index, 1) -->
                    </div>
                    <div style="color: red; padding: 3px;">{{ value.errorMessage }}</div>
                </div>
            </div>
        </div>
    </div>   
</template>

<script>
import { eventBus } from  "../main.js";
import myMixins from "../mixins/mixins";


export default {
    mixins: [myMixins],
    name: 'portfolio',
    props: ['mystocks', 'funds'],
    data() {
        return {

        }
    },
    methods: {
        sold(company, mystocks, index, funds) {
            console.log(this.convertToNum(funds) + (company.stocksToPurchase * company.price))
            company.stocksToPurchase = Number(company.stocksToPurchase);
            // let diff = company.stockOwned;
            if (company.stockOwned - company.stocksToPurchase < 0) {
                company.errorMessage = "Please enter a amount within your current stocks owned."
            } else if (company.stockOwned - company.stocksToPurchase > company.stockOwned) {
                company.errorMessage = "Please enter a amount within your current stocks owned."
            } else if (company.stockOwned - company.stocksToPurchase === 0) {
                company.quantity = company.quantity + company.stocksToPurchase;
                company.stockOwned = company.stockOwned - company.stocksToPurchase;
                funds = this.convertToDollars(this.convertToNum(funds) + (company.stocksToPurchase * company.price))
                company.errorMessage = ""
                mystocks.splice(index, 1);
                company.owned = false;
            } else {
                company.errorMessage = ""
                company.quantity = company.quantity + company.stocksToPurchase;
                company.stockOwned = company.stockOwned - company.stocksToPurchase;
                funds = this.convertToDollars(this.convertToNum(funds) + (company.stocksToPurchase * company.price))
            }
            eventBus.$emit("sold", company, funds)
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
    border: 3px solid navy;
    margin: 20px 0
}

@media only screen and (max-width: 800px) {
    .container {
        grid-template-columns: 90%;
    }
}

.stock-head {
    padding: 10px;
    background-color: aliceblue;
    color: navy
}

.btn {
    background-color: navy;
    color: aliceblue;
    border: 1px solid navy;
    padding: 4px;
    border-radius: 3px;
    cursor: pointer;
}
.flex {
    padding: 10px;
    display: flex;
    justify-content: space-between;
}

.stock-owned {
    padding: 3px;
}

</style>