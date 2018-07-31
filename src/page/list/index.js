import React, { Component } from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';
import TypeList from '../../components/typeList';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      type: '',
      name: '',
      startIndex: 0,
      liveList: []
    }
  }

  componentWillMount() {
    var href = window.location.hash;
    var start = href.indexOf('id') + 3;
    var middle = href.indexOf('&');
    var end = href.indexOf('name') + 5;
    this.setState({
      type: href.slice(middle + 6, end - 6),
      id: href.slice(start, middle),
      name: decodeURI(href.slice(end))
    });
  }

  componentDidMount(){
    this.init();
  }

  async init() {
    var url = `http://stark.longzhu.com/api/streams/search?game=${this.state.id}&tag=${this.state.name}&device=6&packageId=1&sort-by=views&start-index=${this.state.startIndex}&max-result=30`;
    await axios.get(url).then((res) => {
      this.setState({
        liveList: res.data.data.items[0].streams
      })
    });
  }

  cameGame(index) {
    if  (index === 1) {
      this.props.history.push('/Game');
    } else {
      this.props.history.push('/Play');
    }
    PubSub.publish('gameId', true);
  }

  render() {
    return (
      <div>
        <div className="event">
            {this.state.type === '1' ? <span onClick={this.cameGame.bind(this, 1)}>全部游戏</span> : <span onClick={this.cameGame.bind(this, 2)}>全部娱乐</span>}
          <span className="name">{this.state.name}</span>
        </div>
        {<TypeList liveList={this.state.liveList} />}
      </div>
    )
  }
}

export default List;
