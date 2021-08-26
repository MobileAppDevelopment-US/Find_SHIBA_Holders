var IERC20ABI = require('./IERC20.json') 
var Web3 = require('web3') 

var web3 = new Web3('https://mainnet.infura.io/v3/ff9c17ace878499cbc561f990e98998a') 

const getEvents = async(fromBlock, toBlock) => {
    var EventTestContract = new web3.eth.Contract(IERC20ABI, "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce")
    var events = await EventTestContract.getPastEvents({
        fromBlock: fromBlock, 
        toBlock: toBlock
    })
    var eventsListtoSort = []
    for (var i = 0; i < events.length; i++) {
        if (events[i].event === 'Transfer') { 
            var address = events[i].returnValues.to 
            eventsListtoSort.push(address)
        }
    }
    uniqueArray = eventsListtoSort.filter(function (item, pos) { 
        return eventsListtoSort.indexOf(item) == pos;
    })
    console.log(uniqueArray)
    //return events
}
// 13095867 - 12448006 = 647861 blocks
var firstBlock = 12448006 //  SHIBA
var lastBlock = 13095867 
var dif = 100 

do {
    if (firstBlock > lastBlock) { 
        dif = lastBlock - firstBlock
    }
    getEvents(firstBlock, firstBlock + dif) 
    firstBlock += dif
}
while (firstBlock <= lastBlock) 

