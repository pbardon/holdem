import { hot } from 'react-hot-loader';
import React from 'react';
import LifecycleLoggerComponent from './LifecycleLoggerComponent.js';

class Counter extends LifecycleLoggerComponent {
  static getName() {
    return 'Counter';
  }
  render() {
    console.log(`${this.constructor.getName()}::render`);
    return <h3>Current Bet: {this.props.count}</h3>
  }
}

Counter.defaultProps = {
  count: 0
};

export default hot(module)(Counter);
