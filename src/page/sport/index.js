import React, { Component } from 'react';
import Swpier from './swiper';
import axios from 'axios';
import './index.css';

class Sport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sportList: []
    };
  }

  componentDidMount() {
    this.init(0);
  }

  formatDate(time, index) {
    var result = '';
    var t= parseInt(time.slice(6, 19));
    var dt = new Date(t);
    var year = dt.getFullYear();
    var month = dt.getMonth() + 1;
    var date = dt.getDate();
    var day=dt.getDay();
    switch (day) {
    case 0:
      day="日"; break;
    case 1:
      day="一"; break;
    case 2:
      day="二"; break;
    case 3:
      day="三"; break;
    case 4:
      day="四"; break;
    case 5:
      day="五"; break;
    default:
      day="六"; break;
    }
    var hour = dt.getHours();
    var minute = dt.getMinutes() < 10 ? `0${dt.getMinutes()}` : dt.getMinutes();
    if (index === 1) {
      result = hour + ":" + minute;
    } else {
      result = year + "年" + month + "月" + date + "日  周" + day;
    }
    return result;
}

  async init(leagueId) {
    await axios.get(`http://sportsapi.longzhu.com/sportv2/EventNoticeListForIndex?leagueId=${leagueId}&device=8&packageId=1&utm_sr=chanel_2&version=3.9.3`).then((res) => {
      this.setState({
        sportList: res.data.soon
      })
    })
  }

  getTargetHandle(argum) {
    this.init(argum.target);
  }

  render() {
    var listArray = [];
    if (this.state.sportList.length) {
      this.state.sportList.forEach((item) => {
        listArray.push(
          <div key={item.matchId}>
            <div className="sportschedule-time">{this.formatDate(item.start, 2)}</div>
            <div className="sportschedule-card">
                <div className="card-bd">
                  <div className="card-team-info">
                    <div className="sport-title ellipsis">{this.formatDate(item.start, 1)} {item.leagueName} {item.roundName}</div>
                    <div className="sport-team">
                      <img src={item.teamALogo} alt={item.teamAName} />
                      <span>{item.teamAName}</span>
                    </div>
                    <div className="sport-team">
                      <img src={item.teamBLogo} alt={item.teamBName} />
                      <span>{item.teamBName}</span>
                    </div>
                  </div>
                  <div className="card-room-info">
                    <div className="btn-appointment">
                      <img src={item.topRecommend.roomLogo} alt={item.topRecommend.userId} />
                      <span>预约</span>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        )
      })
    } else {
      listArray.push(
        <div className="no-data" key="no-data">暂无数据</div>
      )
    }

    return (
      <div className="sport">
        <Swpier getTarget={this.getTargetHandle.bind(this)} />
        <div className="sportschedule-box">
          {listArray}
        </div>
      </div>
    )
  }
}

export default Sport;
