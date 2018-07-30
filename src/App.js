import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
    };
  }
  static defaultProps = {
      progress: '-'
  };
  render() {
    return (
      <div></div>
    )
  }
}

export default App;
