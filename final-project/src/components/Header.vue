<template>
    <div class="nav container" role="navigation">
        <div class="flex">
            <h2 class="link" @click="chooseDash('Dash')">Stock Trader</h2>
            <p class="link" @click="chooseDash('Portfolio')">Portfolio</p>
            <p class="link" @click="chooseDash('Stocks')">Stocks</p>
            <div class="move-right">
                <p class="link text-right">End Day</p>
                <p class="link text-right">Save &amp; Load</p>
                <p>Funds: {{funds}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { eventBus } from "../main.js"

export default {
    props: ['funds'],
    data() {
        return {
            // funds: 0,
        }
    },
    methods: {
        chooseDash(choice) {
            eventBus.$emit('choice', choice);
        }
    }

}
</script>

<style scoped>
.nav.container {
    width: 90%;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
    border: 1px solid silver;
    background-color: #f0f0f1;
}

.flex {
    display: flex;
    padding: 5px;
    align-items: center;
}

.link {
    padding-right: 10px;
    cursor: pointer;
}

.move-right {
    display: flex;
    justify-content: flex-end;
    width: 100%;
}

</style>