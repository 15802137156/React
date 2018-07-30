import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PubSub from 'pubsub-js';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 1,
      source: true,
    };
  }

  seclectTab(i) {
    this.setState({
      tab: i
    });
  }

  componentDidMount() {
    this.init();
    this.pubsubGameId = PubSub.subscribe('gameId', (argum, data) => {
      this.setState({
        source: false
      })
    })
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.pubsubGameId);
  }

  init() {
    var href = window.location.hash.slice(2);
    switch(href){
      case 'Game':
        this.setState({
          tab: 2
        });
      break;
      case 'Play':
        this.setState({
          tab: 3
        });
      break;
      case 'Sport':
        this.setState({
          tab: 4
        });
      break;
      case 'List':
        this.setState({
          source: false
        });
      break;
      default:
      this.setState({
        tab: 1
      });
    }
  }

  render() {
    if (!this.state.source) {
      return null;
    }
    return (
      <ul className="navbar">
          <li className={this.state.tab === 1 ? 'active' : ''} onClick={this.seclectTab.bind(this, 1)}>
            <Link to="/"><span>推荐</span></Link>
          </li>
          <li className={this.state.tab === 2 ? 'active' : ''} onClick={this.seclectTab.bind(this, 2)}>
            <Link to="/Game"><span>游戏</span></Link>
          </li>
          <li className={this.state.tab === 3 ? 'active' : ''} onClick={this.seclectTab.bind(this, 3)}>
            <Link to="/Play"><span>娱乐</span></Link>
          </li>
          <li className={this.state.tab === 4 ? 'active' : ''} onClick={this.seclectTab.bind(this, 4)}>
            <Link to="/Sport"><span>体育</span></Link>
          </li>
      </ul>
    );
  }
}

export default Navbar;