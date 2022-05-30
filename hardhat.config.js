require("@nomiclabs/hardhat-waffle");

const INFURA_PROJECT_ID = "411f315580074d408cbc2cb6c0ff3789";
const RINKEBY_PRIVATE_KEY = "My Secret";

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


module.exports = {
  paths: {
    sources: "./src/contracts",
    artifacts: "./src/artifacts"
  },
  solidity: "0.6.0",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${RINKEBY_PRIVATE_KEY}`]
    }
  }
};