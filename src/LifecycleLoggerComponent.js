import { hot } from 'react-hot-loader';
import React, { Component } from 'react';

class LifecycleLoggerComponent extends Component {
  static getName() {}
  componentDidMount() {
    console.log(`${this.constructor.getName()}::componentDidMount`);
  }
  componentWillUnmount() {
    console.log(`${this.constructor.getName()}::componentWillUnmount`);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(`${this.constructor.getName()}::componentDidUpdate`);
  }
  render() {
    console.log(`${this.constructor.getName()}::render`);
  }
}

// Don't use the hot loader for base classes
export default LifecycleLoggerComponent;
