import React, { Component } from 'react';
import axios from 'axios';
import Swpier from '../../components/swiper';
import Adverts from '../../components/adverts';
import Live from '../../components/live';
import './index.css';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      liveList: [],
    };
  }

  componentDidMount() {
    this.init();
  }

  async init() {
    await axios.get('http://stark.longzhu.com/api/home?tab=hot').then((res) => {
      this.setState({
        liveList: res.data.data.items
      })
    });
  }

  render() {
    return (
      <div>
        <Swpier />
        <Live liveList = {this.state.liveList} />
        <Adverts/>
      </div>
    );
  }
}
export default Home;
