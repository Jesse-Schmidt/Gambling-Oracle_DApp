import React, {Component} from 'react';
import {Button, Container, Modal, ModalBody, Table} from "reactstrap";

import HeaderLogo from '../static/images/SportsBettingLogo.jpg';

//import {CLIENT_TEAM_NAME} from '../../utils/constants';

const COURSE_URL = "https://cs.colostate.edu/~cs458";

export default class Header extends Component {
    state = {
        modalOpen: false,
        bets: []
    }

    async getBets(){
        try {
            console.log("AC", this.props.AC);
            console.log(
                "getBets",
                this.props.userAddress
            );
            await this.props.AC.getAllBets(
                this.props.userAddress
            ).then(result => {this.setState({bets: result})});
            console.log("bets gotten successfully");
            this.props.closeModal();
        } catch {
            console.log("bets failed");
        }
    };

    createBetList() {
        this.getBets();
        console.log(this.state.bets);
        let allBets = [];
        allBets.push(
            <tr>
                <td>The game</td>
                <td>The odds</td>
                <td>Your bet</td>
            </tr>
        );
        for(let i = 0; i < this.state.bets.length; i++){
            console.log(this.state.bets[1])
            allBets.push(
                <tr>
                    <td>{this.state.bets[i][2]}</td>
                    <td>{this.state.bets[i][0]}</td>
                    <td>{this.state.bets[i][1]}</td>
                </tr>
            );
        }
        return allBets;
    }

    render() {
        return (
            <div className="full-width header">
                <div className="vertical-center">
                    <Container>
                        <Modal isOpen={this.state.modalOpen} toggle={() => this.setState({modalOpen: !this.state.modalOpen})}>
                            <ModalBody>
                                <div style={{alignItems:"center"}}>
                                    <h1>Your Bets</h1>
                                    <Table>{this.createBetList()}</Table>
                                    <Button onClick={() => this.setState({modalOpen:false})}>Close</Button>
                                </div>
                            </ModalBody>
                        </Modal>
                        <div className="vertical-center">
                            <a href={COURSE_URL} target="_blank">
                                <img className="tco-logo" src={HeaderLogo} alt="TCO Brand Logo"/>
                            </a>
                            <a>
                                <h1 className="tco-text-upper">The Odds Oracle</h1>
                            </a>
                        </div>
                        <Button onClick={() => this.setState({modalOpen: !this.state.modalOpen})}>Show Bets</Button>
                    </Container>
                </div>
            </div>
        );
    }
}