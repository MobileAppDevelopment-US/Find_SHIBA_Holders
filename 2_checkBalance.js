var IERC20ABI = require('./IERC20.json')
var Web3 = require('web3')
const fs = require('fs');

var web3 = new Web3('https://mainnet.infura.io/v3/ff9c17ace878499cbc561f990e98998a')

const getArray = async () => { 
    var EventTestContract = new web3.eth.Contract(IERC20ABI, "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce")
    try {
        const data = fs.readFileSync('allAdresses.txt', 'utf8')
        dataArray = data.split('\n'); 
        var uniqueArray = dataArray.filter(function (item, pos) { 
            return dataArray.indexOf(item) == pos;
        })
        var balanceCount = 0
        for (var i = 0; i < uniqueArray.length; i++) {
            let address = uniqueArray[i]
            if (address != undefined || address != '') {
                let balance = await EventTestContract.methods.balanceOf(address).call()
                if (balance > 0) {
                    balanceCount ++;
                    fs.appendFile('listAddressWithBalance.txt', address + '\n', function (err) { 
                        if (err) throw err;
                        console.log(balance, address)
                    });
                }
            }
        }
        console.log(dataArray.length, uniqueArray.length, balanceCount)
    } catch (err) {
        console.error(err)
    }
}
fs.unlinkSync('listAddressWithBalance.txt'); 
getArray()