const { expect } = require('chai');
const { waffle } = require("hardhat");
const { deployContract } = waffle;
const provider = waffle.provider;

describe("Sports Betting Contract", function () {

    let ContractFactory;
    let ContractInstance;
    let alice;
    let bob;



    // `beforeEach` will run before each test, re-deploying the contract every
    // time. It receives a callback, which can be async.

    beforeEach(async function () {
        [alice, bob] = await ethers.getSigners();
        ContractFactory = await ethers.getContractFactory("AppContract");
        ContractInstance = await ContractFactory.deploy();
    });

    describe('bets should be placed and retrieved', function() {

        it("Should should be able to place and retrieve a bet", async () => {
            const place = await ContractInstance.placeBet(alice.address, "20/1", "100", "team 1 vs team 2");
            const place2 = await ContractInstance.placeBet(alice.address, "200/1", "100", "team 1 vs team 2");

            const bet = await ContractInstance.getSpecificBet(0);
            expect(bet.odds).to.equal("20/1");
            expect(bet.amountBet).to.equal("100");
            expect(bet.gameDetails).to.equal("team 1 vs team 2");
            const betList = await ContractInstance.getAllBets(alice.address);
            console.log(betList)
            expect(betList.length).to.equal(2);
        });
    });

});