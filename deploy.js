const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  // gives me the blockchain, ganahe blockchain in our case
  const provider = new ethers.JsonRpcProvider("HTTP://172.24.0.1:7545"); ///////////

  // gives me the wallet, private key is one of the adress from ganache blockchain
  const wallet = new ethers.Wallet(
    "0x1cad729703311077190aea80c08181aa17cc47f823ae85aef2f4d4338c13ea48",
    provider
  );

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  // connects the contract to a wallet
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  // console.log("contractFactory", contractFactory);
  console.log("Deploying contract...");
  const contract = await contractFactory.deploy();
  console.log("Contract deployed to address:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
  });

// async function setupMovieNight() {
//   cookPopcorn();
//   pourDrinks();
//   startMovie();
// }

// function cookPopcorn() {
//   console.log("Cooking the popcorn!");
//   return Promise();
// }

// function pourDrinks() {
//   console.log("Pouring drinks!");
// }

// function startMovie() {
//   console.log("Starting the movie!");
// }
