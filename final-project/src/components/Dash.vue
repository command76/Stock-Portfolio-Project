<template>
    <div>
        <div class="container">
            <h1>Trade or View your Portfolio</h1>
            <p>You may Save &amp; Load your Data</p>
            <p>Click on "End Day" to begin a new Day!</p>
            <hr>
            <h2>Your funds: {{ funds }}</h2>
        </div>       
    </div>    
</template>

<script>



export default {
    props: ['funds'],
    data() {
        return {
            // price: 0
        }
    }
}
</script>

<style scoped>
.container {
    background: #f0f0f1; 
    border: 1px solid silver;
    width: 90%; 
    margin: auto; 
    margin-top: 20px; 
    margin-bottom: 20px; 
    padding: 10px
}
</style>