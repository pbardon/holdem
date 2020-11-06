import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import Card from './Card';
import Bet from './Bet';
import Ledger from './Ledger';
import './App.css';

import {headers, data} from './Data';

import Deck from './Deck';


class App extends Component {
  render() {
    const deck = new Deck();
    return (
      <div>
        <Card name={deck.dealCard()}/>
        <Bet />
        <Ledger headers={headers} data={data}/>
      </div>
    )
  }
}

export default hot(module)(App);

