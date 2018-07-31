import React, { Component } from 'react';
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import axios from 'axios';


class Swpier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swpierList: [],
      tab: 0,
    };
  }

  componentDidMount() {
    this.init();
  }

  async init() {
    await axios.get('http://api.longzhu.com/sport/home/matches?version=3.9.3&device=8&packageId=1').then((res) => {
    var json = {
      image: 'http://r.plures.net/pt/images/pt/ui/sidenav/pic.png?imageView2/format/webp',
      name: '全部',
      target: '0'
    }
    res.data.data.unshift(json);
    this.setState({
        swpierList: res.data.data
      })
    })
    new Swiper(this.swiperGame, {
      slidesPerView: 'auto',
      spaceBetween: 30,
      pagination: {
        clickable: true,
      },
    });
  }

  getLeagueId(index, item, argum) {
    this.setState({
      tab: index
    })
    this.props.getTarget && this.props.getTarget(item);
  }

  render() {
    if (this.state.swpierList.length) {
      var listArray = [];
      this.state.swpierList.forEach((item, index) => {
        listArray.push(
          <div className="swiper-slide" key={item.name}>
            <a onClick={this.getLeagueId.bind(this, index, item)} className={this.state.tab === index ? 'active' : ''}>
              <img src={item.image} alt={item.target} />
              <span>{item.name}</span>
            </a>
          </div>
        )
      })
    }
    return (
      <div className="sport-swpier">
        <div className="swiper-container" ref={self => this.swiperGame = self}>
          <div className="swiper-wrapper">
            {listArray}
          </div>
        </div>
      </div>
    );
  }
}

export default Swpier;
