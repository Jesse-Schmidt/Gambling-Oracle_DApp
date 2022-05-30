import React, {Component} from 'react';
import './App.css';
import Odds from './Odds.js';
import Header from './Header.js';
import initBlockchain from "../tools/initBlockchain.js";

export default class App extends Component {
  state = {
    AC: {},
    myWallet: "0xb2F4232a04d2A0E4434eb732171815E80337731F",
    userAddress: ""
  }

  componentDidMount = async () => {
    try {
      try {
        // Connect to blockchain
        const data = await initBlockchain(); // get contract instance and user address
        this.setState({
          AC: data.AC,
          userAddress: data.userAddress
        });
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
            `Failed to load accounts, or contract. Check console for details.`
        );
        console.log("initblockchain error", error);
      }
      console.log("state after initBlockchain", this.state);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
          "Failed to load accounts or contract. Check console for details."
      );
    }
  }

  render() {
    return (
        <>
          {this.renderHeader()}
          {this.renderOdds()}
        </>
    );
  }

  renderHeader() {
    return (
        <Header AC={this.state.AC} userAddress={this.state.userAddress}/>
    )
  }

  renderOdds() {
    return (
        <Odds AC={this.state.AC} myWallet={this.state.myWallet} userAddress={this.state.userAddress}/>
    )
  }
}

