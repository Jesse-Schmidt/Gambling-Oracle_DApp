
import React, {Component} from "react";
import {
    Alert,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardText,
    Col,
    Container,
    Input,
    ListGroup,
    ListGroupItem,
    Row,
    Modal, ModalBody
} from 'reactstrap';
import PlaceBet from "./PlaceBet";

export default class Odds extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false,
            isActiveLeaguesOpen: false,
            selectedLeague: [],
            isGamesOpen: false,
            activeLeagues: [],
            leagueKeys: [],
            games: [],
            data: [],
            selectedOdds: "",
            selectedDetails: "",
            betValue: "",
            modalOpen: false
        };

    }

    componentDidMount() {
        {this.getActiveLeagues()}
    }

    render() {
        return (
            <Container>
                <ListGroup>
                    {this.state.activeLeagues.map((title) =>
                        (<ListGroupItem style={{ width: '40rem', cursor: 'pointer' }} tag="a" onClick={() => {this.getLeagueGames({title}); scrollToTopTimeout();}}>{title}</ListGroupItem>))}
                </ListGroup>
                {this.state.selectedLeague.map((league) => (
                    <Alert color="primary" style={{ width: '40rem' }}>
                        Selected League: {league}
                    </Alert>
                ))}
                    {this.state.games.map((game) => (
                        <Row>
                            <Col>
                                <Card style={{ width: '40rem' }}>
                                    <CardHeader>{game.teams[0]} <small className="text-muted">vs</small> {game.teams[1]}</CardHeader>
                                    <CardBody>
                                        <CardTitle>Place Bet</CardTitle>
                                        <Modal isOpen={this.state.modalOpen} toggle={() => this.setState({modalOpen: !this.state.modalOpen})}>
                                            <ModalBody>
                                                <div style={{alignItems:"center"}}>
                                                    <p>Place a bet on the outcome of the game</p>
                                                    <p>Game: {this.state.selectedDetails}</p>
                                                    <p>Selected Odds: {this.state.selectedOdds}</p>
                                                    <p/>
                                                    <Input type={"text"} placeholder={"enter the amount to bet"}
                                                           onChange={(event) => this.setState({betValue: event.target.value})}
                                                    />
                                                    <p/>
                                                    <div align={"flex"}>
                                                        <PlaceBet
                                                            walletAddress={this.props.myWallet}
                                                            AC={this.props.AC}
                                                            purchaserAddress={this.props.userAddress}
                                                            amountBet={this.state.betValue}
                                                            odds={this.state.selectedOdds}
                                                            gameDetails={this.state.selectedDetails}
                                                            closeModal={() => this.setState({modalOpen: !this.state.modalOpen})}
                                                        />
                                                        <Button onClick={() => this.setState({modalOpen: !this.state.modalOpen})}>Close</Button>
                                                    </div>
                                                </div>
                                            </ModalBody>
                                        </Modal>
                                        <Button color="primary" onClick={() => {
                                            this.setState({
                                                selectedOdds: game.teams[0] + " " + appendPlusSign(game.odds[0]),
                                                selectedDetails: game.teams[0] + " vs " + game.teams[1],
                                                modalOpen:true
                                            })
                                        }}>
                                            {game.teams[0]} {appendPlusSign(game.odds[0])}
                                        </Button>
                                        {' '}
                                        <Button color="primary" onClick={() => {
                                            this.setState({
                                                selectedOdds: game.teams[1] + " " + appendPlusSign(game.odds[1]),
                                                selectedDetails: game.teams[0] + " vs " + game.teams[1],
                                                modalOpen:true
                                            })
                                        }}>
                                            {game.teams[1]} {appendPlusSign(game.odds[1])}
                                        </Button>
                                        <CardText>
                                            <small className="text-muted">{String(new Date(game.commence_time)).substring(0,28)}</small>
                                            <br></br>
                                            <small className="text-muted">Odds Provided By: {game.site_nice}</small>
                                        </CardText>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    ))}
                <br></br>
            </Container>
        );
    }

    toggleActiveLeagues() {
        this.setState({isActiveLeaguesOpen: !this.state.isActiveLeaguesOpen})
        this.setState({games: []})
    }

    getActiveLeagues() {
        console.log("IN GETACTIVELEAGUES")
        const axios = require('axios')

        // An api key is emailed to you when you sign up to a plan
        // Get a free API key at https://api.the-odds-api.com/
        const api_key = '55ad2308b709c463ceccce0d162aaad5'

        const sport_key = 'upcoming' // use the sport_key from the /sports endpoint below, or use 'upcoming' to see the next 8 games across all sports

        const region = 'us' // uk | us | eu | au

        const market = 'h2h' // h2h | spreads | totals

        /*
            First get a list of in-season sports
                the sport 'key' from the response can be used to get odds in the next request
        */
        axios.get('https://api.the-odds-api.com/v3/sports', {
            params: {
                api_key: api_key
            }
        })
            .then(response => {
                console.log('Remaining requests', response.headers['x-requests-remaining'])
                console.log('Used requests', response.headers['x-requests-used'])
                let responseString = JSON.stringify(response.data.data);
                let mainObj = JSON.parse(responseString);
                let titleArray = [];
                for(let i =0; i < mainObj.length; i++) {
                    titleArray.push({
                        sport_key: mainObj[i].key,
                        title: mainObj[i].title
                    })
                }
                let titleSet = [...new Set(titleArray.map(item => item.title))];
                titleSet.sort();
                this.setState({activeLeagues: titleSet, leagueKeys: titleArray})

        })
           .catch(error => {
                console.log('Error status', error.response)
                console.log(error.response)
            })
    }

    getLeagueGames(title) {
        title = title.title
        console.log(this.state.leagueKeys)
        console.log(title)
        //console.log(this.state.leagueKeys[index].sport_key)
        let key = this.state.leagueKeys.find(o => o.title === title)
        console.log(key)
        key = key.sport_key
        console.log(key)
        console.log("IN GETLEAGUEGAMES")
        const axios = require('axios')

        // An api key is emailed to you when you sign up to a plan
        // Get a free API key at https://api.the-odds-api.com/
        const api_key = '55ad2308b709c463ceccce0d162aaad5'

        const region = 'us' // uk | us | eu | au

        const market = 'h2h' // h2h | spreads | totals

        const dateFormat = 'iso' //unix or iso

        const oddsFormat = 'american'



        /*
            First get a list of in-season sports
                the sport 'key' from the response can be used to get odds in the next request
        */
        axios.get('https://api.the-odds-api.com/v3/odds', {
            params: {
                api_key: api_key,
                sport: key,
                region: region,
                mkt: market,
                dateFormat: dateFormat,
                oddsFormat: oddsFormat

            }
        })
            .then(response => {
                console.log('Remaining requests', response.headers['x-requests-remaining'])
                console.log('Used requests', response.headers['x-requests-used'])
                console.log(response)
                let responseString = JSON.stringify(response.data.data);
                let mainObj = JSON.parse(responseString);
                let gameArray = [];
                let selectedLeagueArray = []
                for(let i =0; i < mainObj.length; i++) {
                    gameArray.push({
                        teams: mainObj[i].teams,
                        commence_time: mainObj[i].commence_time,
                        home_team: mainObj[i].home_team,
                        odds: mainObj[i].sites[0].odds.h2h,
                        sport_nice: mainObj[i].sport_nice,
                        site_nice: mainObj[i].sites[0].site_nice
                    })
                }
                selectedLeagueArray.push(gameArray[0].sport_nice)
                this.setState({activeLeagues: [], leagueKeys: []})
                this.setState({games: gameArray, selectedLeague: selectedLeagueArray})
                console.log(this.state.games)
                console.log(this.state.games[0].teams[0])
                console.log(this.state.games[0].odds)


            })
            .catch(error => {
                console.log('Error status', error.response)
                console.log(error.response)
            })
    }

}

function appendPlusSign(odds) {
    if(odds > 0) {
        return '+' + odds
    } else {
        return odds
    }
}

function scrollToTopTimeout() {
    window.setTimeout(scrollToTop, 750)
}

function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'})
}
