var IERC20ABI = require('./IERC20.json')
var Web3 = require('web3')
const fs = require('fs');

var web3 = new Web3('https://mainnet.infura.io/v3/ff9c17ace878499cbc561f990e98998a')

fs.unlinkSync('allAdresses.txt'); 

const getEvents = async (fromBlock, toBlock) => {
    var EventTestContract = new web3.eth.Contract(IERC20ABI, "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce")
    var events = await EventTestContract.getPastEvents({
        fromBlock: fromBlock,
        toBlock: toBlock
    })
    var eventsListToSort = []
    for (var i = 0; i < events.length; i++) {
        if (events[i].event === 'Transfer') {
            var address = events[i].returnValues.to
            eventsListToSort.push(address)
        }
    }
    for (var j = 0; j < eventsListToSort.length; j++) {
        fs.appendFile('allAdresses.txt', eventsListToSort[j] + '\n', function (err) { 
            if (err) throw err;
        });
    }
    //console.log(eventsListToSort)
    return events
}
// const getLastBlock = async () => { 
//      return lastBlock
// }
var lastBlock = 13102458
var firstBlock = lastBlock - 50 // 12448006 // SHIBA
const dif = 10 // 100

do {
    if (firstBlock > lastBlock) {
        dif = lastBlock - firstBlock
    }
    var events = getEvents(firstBlock, firstBlock + dif)
    firstBlock += dif
}
while (firstBlock <= lastBlock)

