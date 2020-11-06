import { hot } from 'react-hot-loader';
import React from 'react';
import LifecyleLoggerComponent from './LifecycleLoggerComponent';
import './App.css';

class Card extends LifecyleLoggerComponent {
  static getName() {
    return 'Card';
  }

  render() {
    console.log(`${this.constructor.getName()}::render`);
    return(
      <div className="Card">
        <h1> Card: {this.props.name} </h1>
      </div>
    )
  }
}

Card.defaultProps = {
    name: 'Q♥'
}

export default hot(module)(Card);

