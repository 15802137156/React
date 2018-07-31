import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import axios from 'axios';
import './index.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameList: [],
    };
  }

  componentDidMount() {
    this.init();
  }

  async init() {
    await axios.get('http://stark.longzhu.com/api/home?tab=games&device=6&packageId=1&version=3.9.3').then((res) => {
      this.setState({
        gameList: res.data.data.items
      })
    });
  }

  getGameId(item, argum) {
    PubSub.publish('gameId', item);
    this.props.history.push(`/List?id=${item.id}&type=1&name=${encodeURI(item.name)}`);
  }

  render() {
    if (this.state.gameList.length) {
      var listArray = [];
      this.state.gameList.forEach((item) => {
        listArray.push(
          <div className="game-list" key={item.id}>
            <a className="game-content" onClick={this.getGameId.bind(this, item)}>
              <img src={item.icon} alt={item.name} />
              <span className="game-content-font">{item.name}</span>
            </a>
          </div>
        )
      })
    }
    return (
      <div className="game">
        {listArray}
      </div>
    )
  }
}

export default Game;
