# GLMR APES - Weekly Raffle

**Hi Ape, welcome to the GLMR Apes weekly raffle repo.**
This tool let you run a *random lottery among ERC 721 token holders.*
The code picks a random number between 0 & 1001, then find the wallet address for this particular tokenID and log it. It then loops over the number of rounds defined until the number of winners per raffle is reached.
If a wallet address won twice during the same session, his address is replaced by another random one.

# Prerequisites

 - Having [Node.js](https://nodejs.org/en/download/) installed on your computer
 - Having [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed on your computer

# Install

 - Create a new directory somewhere on your computer
 - Open a terminal and use the "cd" command to move to that folder
	 - For instance "cd C:/Users/marin/Documents/glmrapes/"
 - Clone github repository (you can also download the files and put them here directly)
	 - In the terminal "git clone https://github.com/mar1/weeklyraffle.git"
 - Enter in this new directory
	 - In the terminal "cd weeklyraffle"
 - Launch the tool using Node.js
	 - In the terminal "node index.js"
 - Start the lottery by writting 1, 2 or 3 corresponding to the raffle session

## Configuration

Contract Address is declared at line 5 as contractAddress.
Starting from line 14, you can configure number of winners by editing raffle1Rounds or raffle2Rounds variables
