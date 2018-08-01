import React, { Component } from 'react';
import axios from 'axios';
import List from '../../components/live';

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liveList: []
    }
  }

  componentDidMount() {
    this.init();
  }

  async init() {
    await axios.get('http://stark.longzhu.com/api/home?tab=entertainment&version=3.9.3&device=6&packageId=1').then((res) => {
      this.setState({
        liveList: res.data.data.items
      })
    });
  }

  render() {
    return (
      <div>
        <List liveList={this.state.liveList} history={this.props.history} />
      </div>
    )
  }
}

export default Play;
