<template>
   <div class="container">
        <div v-for="(value, key) in stocksavailable" :key="key">
            <div class="grid-item">
                <div class="stock-head">
                    <strong>{{ key }}</strong>&nbsp;<small>(Price: {{ value.price}})</small>
                </div>
                <div class="flex">
                    <input type="text" value="Quantity">
                    <button class="btn" @click="purchased(key)">Buy</button>
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
import { eventBus } from  "../main.js";


export default {
    name: "stocks",
    props: ["stocksavailable"],
    data() {
        return {
       
        }
    },
    methods: {
        purchased(company) {
            eventBus.$emit("bought", company);
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