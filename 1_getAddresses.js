var IERC20ABI = require('./IERC20.json')
var Web3 = require('web3')
const fs = require('fs');

var web3 = new Web3('https://mainnet.infura.io/v3/ff9c17ace878499cbc561f990e98998a')

const getEvents = async (fromBlock, toBlock) => {
    var EventTestContract = new web3.eth.Contract(IERC20ABI, "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce")
   // console.log(EventTestContract)
    var events = await EventTestContract.getPastEvents({
        fromBlock: fromBlock,
        toBlock: toBlock
    })
    console.log("\nfromBlock -", fromBlock, "toBlock -", toBlock)
    var eventsListToSort = []
    for (var i = 0; i < events.length; i++) {
        if (events[i].event === 'Transfer') {
            var address = events[i].returnValues.to
            eventsListToSort.push(address)
        }
    }

    for (var j = 0; j < eventsListToSort.length; j++) {
        console.log(eventsListToSort[j])
        fs.appendFileSync("allAdresses.txt", eventsListToSort[j] + '\n', function (err) {
            if (err) throw err;
        });
    }
    return events
}

const dif = 100
var lastBlock = 13166782 
var firstBlock = 12448006 // SHIBA 13166785 - 12448006 = 718779

do {
    if (firstBlock > lastBlock) {
        dif = lastBlock - firstBlock
    }
    if (dif > 0) {
        var events = getEvents(firstBlock, firstBlock + dif)
        firstBlock += dif
    }
}
while (firstBlock <= lastBlock)

