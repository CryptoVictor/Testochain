// Copyright (c) 2022 Victor Garcia | Special Thanks: David Joseph Katz
// Distributed under the MIT software license, see the accompanying
// file LICENSE.txt or https://opensource.org/licenses/MIT

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Button } from 'react-bootstrap';

class App extends Component {

    state = { walletInfo: {}};

    componentDidMount() {
        fetch(`${document.location.origin}/api/wallet-info`)
            .then(response => response.json())
                .then(json => this.setState({walletInfo: json}));
    }

    render() {

        const {address, balance} = this.state.walletInfo;

        return (
            <div className='App'>
                <img className='logo' src = {logo}></img>
                <br/>
                <br/>
                <div>
                <h1>Testo</h1>
                </div>
                <br/>
                <div><Link to='/blocks'>Blocks</Link></div>
                <div><Link to='/conduct-transaction'>Conduct a Transaction</Link></div>
                <div><Link to='/transaction-pool'>Transaction Pool</Link></div>
                <br/>
                <div className='WalletInfo'>
                <div>Address: {address}</div>
                <div>Balance: {balance}</div>
                </div>
                <br/>
                <br/>
                <div>
                    <a href="https://testochain.000webhostapp.com">
                    <Button 
                    bsStyle="danger" 
                    bsSize="lem"
                    >
                    Central
                    </Button>
                    </a>
                </div>
                <br/>
            </div>
        );
    }
}

export default App;
