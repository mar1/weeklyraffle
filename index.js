//DEPENDANCIES
const ethers = require('ethers'); // library to interact with the blockchain
var readlineSync = require('readline-sync'); // library to interact with user inputs
const fetch = require('node-fetch'); // fetch staked Apes

const contractAddress = '0x8fBE243D898e7c88A6724bB9eB13d746614D23d6'; // GLMR Apes contract address
const glmjAddress = '0xcB13945Ca8104f813992e4315F8fFeFE64ac49cA'; // GLMR Jungle contract address
const stakingContractAddress = '0xD10078FDbc835726c79533a4a19db40CFAd69d7f'
const abi = [{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}] // shorten version of our smartcontract ABI
const glmjabi = [{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"string","name":"_initBaseURI","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_mintAmount","type":"uint256"}],"name":"bananasMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_to","type":"address"},{"internalType":"uint256","name":"withdrawAmount","type":"uint256"}],"name":"bananasWithdrawTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_mintAmount","type":"uint256"}],"name":"publicMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"addresses","type":"address[]"},{"internalType":"uint8","name":"numAllowedToMint","type":"uint8"}],"name":"setAllowList","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_paused","type":"bool"}],"name":"setBananasMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_newBaseExtension","type":"string"}],"name":"setBaseExtension","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_newBaseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newmaxMintAmount","type":"uint256"}],"name":"setMaxMintAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_paused","type":"bool"}],"name":"setPublicMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newPrice","type":"uint256"}],"name":"setPublicPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_paused","type":"bool"}],"name":"setWlMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"withdrawAmount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_to","type":"address"},{"internalType":"uint256","name":"withdrawAmount","type":"uint256"}],"name":"withdrawTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint8","name":"_mintAmount","type":"uint8"}],"name":"wlMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bananasCost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseExtension","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isBananas","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isPublic","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isWl","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxMintAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"publicCost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"walletOfOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wlCost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
const providerURL = 'https://rpc.api.moonbeam.network'; // Moonbeam Provider
const provider = new ethers.providers.StaticJsonRpcProvider(providerURL, {
    chainId: 1284,
    name: 'moonbeam'
});

const crypto = require('crypto').webcrypto;

//CONFIG
//We declare an array for the future winners per round, a number of winners (for raffle 1 and 2) and the prizes for the lottery
const raffle1Winners = []
const raffle1Rounds = 5
const raffle1Price = 'tbc GLMR'
const raffle2Winners = []
const raffle2Rounds = 3
const raffle2Price = 'tbc GLMR'
const raffle3Winner = []
const raffle3Price = 'tbc GLMR'
const raffle4Winner = []
const raffle4Price = '5 GLMR'
// winners array will register all the winners addresses to verify they didn't win on the current session
let winners = []
// rand function to goes from 1 to 1001
randfunction=(min,max)=>Math.floor(Math.random() * (max - min + 1) + min);


//MAIN

//simple function which returns holder wallet address for a particular tokenID
async function getWallet(tokenID) {
    const apeContract = new ethers.Contract(contractAddress, abi, provider);
    let winnerAddress = await apeContract.ownerOf(tokenID)
    return winnerAddress
}

async function getWallet2(tokenID) {
    const glmjContract = new ethers.Contract(glmjAddress, glmjabi, provider);
    let winnerAddress = await glmjContract.ownerOf(tokenID)
    return winnerAddress
}

async function fetchStaked() {
        return new Promise((resolve, reject) => {
          fetch(`https://blockscout.moonbeam.network/api?module=account&action=tokenbalance&contractaddress=0x8fBE243D898e7c88A6724bB9eB13d746614D23d6&address=0xD10078FDbc835726c79533a4a19db40CFAd69d7f`)
          .then(res => res.json())
          .then(res => res.result)
          .then(resolve)
          .catch(reject)
        })
}

async function raffle1() {
    for (let i = 0; raffle1Winners.length < raffle1Rounds * 2; i++) {
        //for each rounds (winner) per raffle, we pick a random number between 1 and 1001: the winning tokenID
        let winner = randfunction(1,1001)
        //we then get the owner address of the tokenID
    let wallet = await getWallet(winner)
        //we verify here that the owner address didn't won today aka the whale security, if so we pick another number
        if (winners.includes(wallet) || wallet == stakingContractAddress) {
            console.log(`Ape ${winner} (${wallet}) already won today or is currently staked.`)
            console.log(`Let's find another Ape`)
            winner = randfunction(1,1001)
            wallet = await getWallet(winner)
            if (winners.includes(wallet) || wallet == stakingContractAddress) {
                console.log(`Ape ${winner} (${wallet}) already won today or is currently staked.`)
                console.log(`Let's find another Ape`)
                winner = randfunction(1,1001)
            wallet = await getWallet(winner)
            if (winners.includes(wallet) || wallet == stakingContractAddress) {
                console.log(`Ape ${winner} (${wallet}) already won today or is currently staked.`)
                console.log(`Let's find another Ape`)
                winner = randfunction(1,1001)
                wallet = await getWallet(winner)
                    }
                    else {
                    winners.push(winner,wallet)
                    }
            }
            else {
            winners.push(winner,wallet)
            }
        }
        else {
        //we push the tokenID and the owner adreess to the raffle winners array    
    winners.push(winner,wallet) 
    await sleep(3000)
    console.log(`Raffle 1 winner - ${raffle1Price}:`, winner, wallet)
    raffle1Winners.push(winner,wallet) 
        }
    }
    console.log(`Raffle 1 winners - ${raffle1Price}:`, raffle1Winners) 
}

async function raffle2() {
    for (let i = 0; raffle2Winners.length < raffle2Rounds * 2; i++) {
        let winner = randfunction(1,1001)
    let wallet = await getWallet(winner)
    if (winners.includes(wallet) || wallet == stakingContractAddress) {
        console.log(`Ape ${winner} (${wallet}) already won today or is currently staked.`)
        console.log(`Let's find another Ape`)
        winner = randfunction(1,1001)
        wallet = await getWallet(winner)
        if (winners.includes(wallet) || wallet == stakingContractAddress) {
            console.log(`Ape ${winner} (${wallet}) already won today or is currently staked.`)
            console.log(`Let's find another Ape`)
            winner = randfunction(1,1001)
        wallet = await getWallet(winner)
        if (winners.includes(wallet) || wallet == stakingContractAddress) {
            console.log(`Ape ${winner} (${wallet}) already won today or is currently staked.`)
        }
                else {
                winners.push(winner,wallet)
                }
        }
        else {
        winners.push(winner,wallet)
        }
    }
    else {
    //we push the tokenID and the owner adreess to the raffle winners array    
    winners.push(winner,wallet) 
    await sleep(3000)
    console.log(`Raffle 2 winner - ${raffle2Price}:`, winner, wallet)
    raffle2Winners.push(winner,wallet) 
    }
     }     
    console.log(`Raffle 2 winners - ${raffle2Price}:`, raffle2Winners)
}

async function raffle3() {
    for (let i = 0; raffle3Winner.length < 1; i++) {
    let winner = randfunction(1,1001)
    let wallet = await getWallet(winner)
    if (winners.includes(wallet) || wallet == stakingContractAddress) {
        console.log(`Ape ${winner} (${wallet}) already won today or is currently staked.`)
        console.log(`Let's find another Ape`)
        winner = randfunction(1,1001)
        wallet = await getWallet(winner)
        if (winners.includes(wallet) || wallet == stakingContractAddress) {
            console.log(`Ape ${winner} (${wallet}) already won today or is currently staked.`)
            console.log(`Let's find another Ape`)
            winner = randfunction(1,1001)
            wallet = await getWallet(winner)
        if (winners.includes(wallet) || wallet == stakingContractAddress) {
            console.log(`Ape ${winner} (${wallet}) already won today or is currently staked.`)
            console.log(`Let's find another Ape`)
            winner = randfunction(1,1001)
            wallet = await getWallet(winner)
            if (winners.includes(wallet) || wallet == stakingContractAddress) {
                console.log(`Ape ${winner} (${wallet}) already won today or is currently staked.`)
                console.log(`Let's find another Ape`)
                winner = randfunction(1,1001)
                wallet = await getWallet(winner)
                    }
                    else {
                    winners.push(winner,wallet)
                    }
                }
                else {
                winners.push(winner,wallet)
                }
        }
        else {
        winners.push(winner,wallet)
        }
    }
    else {
    //we push the tokenID and the owner adreess to the raffle winners array    
    winners.push(winner,wallet) 
    raffle3Winner.push(winner,wallet) 
    }
    await sleep(3000)
}
    console.log(`Raffle 3 winner - ${raffle3Price}:`, raffle3Winner)
}


//NEW CRYPTOGRAPHIC RANDOM METHOD. Need to implement next week for GLMA
const randomFloat = function () {
    const int = crypto.getRandomValues(new Uint32Array(1))[0]
    return int / 2**32
  }


//GLMJ RAFFLE
async function raffle4() {
    for (let i = 0; raffle4Winner.length < 33; i++) {
        const randomInt = function (min, max) {
            const range = max - min
            return Math.floor(randomFloat() * range + min)
          }
    let winner = randomInt(1,3333)  
    console.log(winner)
    console.log(`GLMJ #${winner} won ${raffle4Price}!`)
    let wallet = await getWallet2(winner)  
    let glmjWinner = {
        winnerGLMJ: winner,
        walletGLMJ: wallet
    }
    raffle4Winner.push(glmjWinner) 
    /*
  //  let winner = randfunction(1,3333)
      
    
    //we push the tokenID and the owner adreess to the raffle winners array    
    //winners.push(winner,wallet) 
    
    */
    await sleep(1000)
}
    console.log(`GLMR JUNGLE Lottery Winners - ${raffle4Price}:`, raffle4Winner)
}

//Create some suspense while revealing the winners
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

//Ask the user for the raffle number to launch.
async function pickRaffle() {
    
await fetchStaked()
.then(staked => {
  let percent = (staked*100/1001)
  let participants = 1001 - staked
 console.log(`Currently ${staked}/1001 staked Apes (${percent.toFixed(2)} %) `)
 console.log(`${participants} Apes participating to the lottery`)
})
.catch(error => {
  console.log(error)
})
console.log('What round is it dear Ape?')
console.log(`1 - ${raffle1Rounds} prizes of ${raffle1Price}`)
console.log(`2 - ${raffle2Rounds} prizes of ${raffle2Price}`)
console.log(`3 - 1 prize of ${raffle3Price}`)
console.log(`4 - 33 prizes for GLMJ holders`)

var prompt = readlineSync.question('Enter: 1/2/3/4 or 0 to exit');
if (prompt === '1') {
    await raffle1()
    pickRaffle()
} else if (prompt === '2') {
    await raffle2()
    pickRaffle()
} else if (prompt === '3') {
   await raffle3()
    pickRaffle()
}
 else if (prompt === '4') {
    await raffle4()
     pickRaffle()
 }
else {
    console.log(`%c
    ██████  ██    ██ ███████     ██████  ██    ██ ███████ 
    ██   ██  ██  ██  ██          ██   ██  ██  ██  ██      
    ██████    ████   █████       ██████    ████   █████   
    ██   ██    ██    ██          ██   ██    ██    ██      
    ██████     ██    ███████     ██████     ██    ███████                                                                                         
                                                                                        " 
`, `font-family: monospace`);
    process.exit(0)
}
}
console.log(`%c
██████  ██      ███    ███ ██████       █████  ██████  ███████ ███████ 
██       ██      ████  ████ ██   ██     ██   ██ ██   ██ ██      ██      
██   ███ ██      ██ ████ ██ ██████      ███████ ██████  █████   ███████ 
██    ██ ██      ██  ██  ██ ██   ██     ██   ██ ██      ██           ██ 
 ██████  ███████ ██      ██ ██   ██     ██   ██ ██      ███████ ███████ 
                                                                        
                                                                                        
 ██     ██ ███████ ███████ ██   ██ ██      ██    ██     ██████   █████  ███████ ███████ ██      ███████ 
 ██     ██ ██      ██      ██  ██  ██       ██  ██      ██   ██ ██   ██ ██      ██      ██      ██      
 ██  █  ██ █████   █████   █████   ██        ████       ██████  ███████ █████   █████   ██      █████   
 ██ ███ ██ ██      ██      ██  ██  ██         ██        ██   ██ ██   ██ ██      ██      ██      ██      
  ███ ███  ███████ ███████ ██   ██ ███████    ██        ██   ██ ██   ██ ██      ██      ███████ ███████                                                                                         
                                                                                        " 
`, `font-family: monospace`);



pickRaffle()