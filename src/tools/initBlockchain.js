import AppContract from "../artifacts/src/contracts/AppContract.sol/AppContract.json";

import { ethers } from "ethers";

//
//  set up the blockchain shadow contract, user address.
//

const initBlockchain = async () => {

    let provider;
    window.ethereum.enable().then(provider = new ethers.providers.Web3Provider(window.ethereum));

    // The provider also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, we need the account signer...

    const signer = await provider.getSigner();
    console.log("signer", signer);
    const userAddress =  await signer.getAddress();
    console.log("user address", userAddress);

    let AC = null;
    console.log("READ AppContract ABI");
    const ACabi = AppContract.abi;
    console.log(ACabi);
    AC = new ethers.Contract('0xcAa0067E8c4EcC03d7a365Cd4C2F2567b5B39BFF', ACabi, signer);

    let data = {
        AC,
        userAddress // shorthand
    };

    return data;
}

export default initBlockchain;