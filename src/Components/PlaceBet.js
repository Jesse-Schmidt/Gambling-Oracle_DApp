import React, {Component} from "react";
import {Button} from "reactstrap";

class PlaceBet extends Component {
    handleClick = async event => {
        event.preventDefault();

        try {
            try {
                console.log("AC", this.props.AC);
                console.log(
                    "purchaser",
                    this.props.purchaserAddress,
                    this.props.odds,
                    this.props.amountBet,
                    this.props.gameDetails
                );
                await this.props.AC.placeBet(
                    this.props.purchaserAddress,
                    this.props.odds,
                    this.props.amountBet,
                    this.props.gameDetails,
                );
                console.log("sale succeeded");
                this.props.closeModal();
            } catch {
                console.log("sales transfer failed");
            }
        } catch {
            console.log("the sale wasn't able to complete, please check ether in wallet");
        }
    };

    render() {
        return (
            <Button onClick={this.handleClick}>
                Place Bet
            </Button>
            );
        }
}
export default PlaceBet;