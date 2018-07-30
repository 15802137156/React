import React, { Component } from 'react';
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import axios from 'axios';


class Swpier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerList: [],
    };
  }

  componentDidMount() {
    this.init();
  }

  async init() {
    await axios.get('http://stark.longzhu.com/api/home?tab=hot').then((res) => {
      this.setState({
        bannerList: res.data.data.banner
      })
    });
    new Swiper(this.swiperBanner, {
      loop: true,
      autoplay : {
        delay: 2000,
        disableOnInteraction: false,
      },
      pagination: {
        el: this.paginateBanner,
        dynamicBullets: true,
      },
    });
  }

  render() {
    if (this.state.bannerList.length) {
      var bannerArray = this.state.bannerList.map((item, index)=>{
          return (
            <div className="swiper-slide" key={index}><img src={item.image} alt={item.name} /></div>
          )
      })
    }
    return (
      <div className="home-swpier">
          <div className="swiper-container" ref={self => this.swiperBanner = self}>
            <div className="swiper-wrapper">
              {bannerArray}
            </div>
            <div className="swiper-pagination" ref={self => this.paginateBanner = self}></div>
          </div>
      </div>
    );
  }
}

export default Swpier;
