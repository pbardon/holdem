import { hot } from 'react-hot-loader';
import React from 'react';
import LifecyleLoggerComponent from './LifecycleLoggerComponent.js';
import Counter from './Counter.js';
import './App.css';

class Bet extends LifecyleLoggerComponent {
  static getName() {
    return 'Bet';
  }

  constructor() {
    super();
    this.state = {};

    this.onIncreaseBet = this.onIncreaseBet.bind(this);
    this.onDecreaseBet = this.onDecreaseBet.bind(this);

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.amount > this.props.maxBet || this.state.amount < this.props.minBet) {
      this.setState({
        amount: prevState.amount || this.props.amount
      });
    }
  }

  getSnapshotBeforeUpdate(prevProps, prevState, snapshot) {
    console.log('getSnapshotBeforeUpdate', prevProps, prevState, snapshot);
    return 'hello';
  }

  shouldComponentUpdate(newProps, newState) {
    console.log('shouldComponentUpdate   ', newProps, newState);
    return true;
  }

  onIncreaseBet() {
      const amount = 'amount' in this.state ? this.state.amount : this.props.amount;
      this.setState({
          amount: amount + 1
      });
  }

  onDecreaseBet() {
    const amount = 'amount' in this.state ? this.state.amount : this.props.amount;
    this.setState({
      amount: amount - 1
    });
  }

  render() {
    console.log(`${this.constructor.getName()}::render`);
    const amount = 'amount' in this.state ? this.state.amount : this.props.amount;
    return(
      <div className="Bet">
        <button 
          className="button"
          onClick={this.onIncreaseBet}>
            +
        </button>
        <button
          className="button"
          onClick={this.onDecreaseBet}>
            -
        </button>
        <Counter count={amount} />
        <h3>Max Bet: {this.props.maxBet}</h3>
      </div>
    )
  }
}

Bet.defaultProps = {
    amount: 0,
    maxBet: 1000,
    minBet: 0
}

export default hot(module)(Bet);

