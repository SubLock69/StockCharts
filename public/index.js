async function main() {

    const timeChartCanvas = document.querySelector('#time-chart').getContext('2d');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart').getContext('2d');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart').getContext('2d');

    //let res = await fetch('') //request to twelvedata
    let res = mockData; //Fake fetch
    const {GME, MSFT, DIS, BNTX} = res;
    const stocks = [GME, MSFT, DIS, BNTX];

    stocks.forEach(stock => stock.values.reverse());

    new Chart(timeChartCanvas, {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol)
            }))
        }
    });

    new Chart(highestPriceChartCanvas, {
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [
                {
                    label: "Highest",
                    data: stocks.map(stock => findHigh(stock.values)),
                    backgroundColor: stocks.map(stock => getColor(stock.meta.symbol)),
                    borderColor: stocks.map(stock => getColor(stock.meta.symbol))
                }
            ]
        }
    });

    function getColor(stock){
        if(stock === "GME"){
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === "MSFT"){
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === "DIS"){
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === "BNTX"){
            return 'rgba(166, 43, 158, 0.7)'
        }
    }
    function findHigh(numset) {
        let highest = numset[0].high;
        numset.forEach( (num, index) => {
            if(index <= numset.length) {
                if(highest < parseFloat(numset[index].high)) {
                    highest = numset[index].high;
                }
            }
        })
        return highest;
    }

}

main()