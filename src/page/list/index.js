import React, { Component } from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';
import TypeList from '../../components/typeList';
import imgURL from '../../images/all-bg.png';


class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      type: '',
      name: '',
      startIndex: 0,
      liveList: [],
      canLoad: false,
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
        liveList: [...this.state.liveList, ...res.data.data.items[0].streams]
      });
      if (res.data.data.items[0].streams.length < 30) {
        this.setState({
          canLoad: true
        });
      }
    });
  }

  loadingMore() {
    if(this.state.startIndex + 30 <= this.state.liveList.length) {
      this.setState({
        startIndex: this.state.startIndex + 30
      }, () => {
        this.init();
      });
    } else {
      this.setState({
        canLoad: true
      });
    }
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
          {this.state.type === '1' ? 
            <div onClick={this.cameGame.bind(this, 1)} className="title">
              <img src={imgURL} alt="all-bg" className="all-bg" />全部游戏
            </div>:
            <div onClick={this.cameGame.bind(this, 2)} className="title">
            <img src={imgURL} alt="all-bg" className="all-bg" />全部娱乐
          </div>
          }
          <span className="name">{this.state.name}</span>
        </div>
        {<TypeList liveList={this.state.liveList} />}
        {this.state.canLoad ? <div className="loading-more">(´・ω・)ﾉ没有更多咯~</div> : <div className="loading-more" onClick={this.loadingMore.bind(this)}>请给我更多吧！</div>}
      </div>
    )
  }
}

export default List;
