async function main() {

    const [deployer] = await ethers.getSigners("localhost:8545");

    console.log(
        "Deploying contract_ABI with the account:",
        deployer.address
    );

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const ACF = await ethers.getContractFactory("AppContract");
    const AC = await ACF.deploy();
    console.log("AppContract address:", AC.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });