pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "./ownable.sol";


contract AppContract is Ownable{
    uint16 public totalBets = 0;

    struct BetConstruct {
        string odds;
        string amountBet;
        string gameDetails;
    }

    mapping (uint256 => BetConstruct) public indexToSpecificBet;

    mapping (address => uint256[]) public addressToBetArray;

    function getSpecificBet( uint _betIndex ) public view returns (string memory odds, string memory amountBet, string memory gameDetails) {
        BetConstruct memory _bet = indexToSpecificBet[_betIndex];
        odds = _bet.odds;
        amountBet = _bet.amountBet;
        gameDetails  = _bet.gameDetails;
    }

    function getAllBets(address _betPlacer) public view returns(BetConstruct[] memory allBets  ){
        uint256 numberOfBets = addressToBetArray[_betPlacer].length;
        BetConstruct[] memory betsFound = new BetConstruct[](numberOfBets);
        for(uint256 i = 0; i < numberOfBets; i++){
            betsFound[i] = indexToSpecificBet[addressToBetArray[_betPlacer][i]];
        }
        allBets = betsFound;
    }

    function placeBet(address _betPlacer, string memory _odds, string memory _amountBet, string memory _gameDetails) public payable{
        //require(msg.value == 0.001 ether, "Sorry, placing a bet costs 0.001 ether");
        BetConstruct memory _bet = BetConstruct({ odds: _odds, amountBet: _amountBet, gameDetails: _gameDetails });
        indexToSpecificBet[totalBets] = _bet;
        addressToBetArray[_betPlacer].push(totalBets);
        totalBets += 1;
    }

    function getBalance() external onlyOwner view returns (uint256) {
        return address(this).balance;
    }

    function withdraw() public onlyOwner{
        msg.sender.transfer(address(this).balance);
    }
}