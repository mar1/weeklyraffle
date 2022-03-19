//DEPENDANCIES
const ethers = require('ethers'); // library to interact with the blockchain
var readlineSync = require('readline-sync'); // library to interact with user inputs
const fetch = require('node-fetch'); // fetch staked Apes

const contractAddress = '0x8fBE243D898e7c88A6724bB9eB13d746614D23d6'; // GLMR Apes contract address
const stakingContractAddress = '0xD10078FDbc835726c79533a4a19db40CFAd69d7f'
const abi = [{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}] // shorten version of our smartcontract ABI
const providerURL = 'https://rpc.api.moonbeam.network'; // Moonbeam Provider
const provider = new ethers.providers.StaticJsonRpcProvider(providerURL, {
    chainId: 1284,
    name: 'moonbeam'
});


//CONFIG
//We declare an array for the future winners per round, a number of winners (for raffle 1 and 2) and the prizes for the lottery
const raffle1Winners = []
const raffle1Rounds = 5
const raffle1Price = '4.53 GLMR'
const raffle2Winners = []
const raffle2Rounds = 3
const raffle2Price = '11.33 GLMR'
const raffle3Winner = []
const raffle3Price = '28.33 GLMR'
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
    console.log(`Raffle 2 winner - ${raffle2Price}:`, raffle2Winners)
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

var prompt = readlineSync.question('Enter: 1/2/3 or 0 to exit');
if (prompt === '1') {
    await raffle1()
    pickRaffle()
} else if (prompt === '2') {
    await raffle2()
    pickRaffle()
} else if (prompt === '3') {
   await raffle3()
    pickRaffle()
} else {
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