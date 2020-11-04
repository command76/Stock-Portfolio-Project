const myMixins = {
    methods: {
        convertToDollars(num) {
            return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        },
        convertToNum(string) {
            return Number(string.replace(/[,$]/g, ""));
        },
    }

}

export default myMixins;