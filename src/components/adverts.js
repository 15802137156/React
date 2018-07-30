import React, { Component } from 'react';
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import axios from 'axios';


class Adverts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      advertsList: [],
    };
  }

  componentDidMount() {
    this.init();
  }

  async init() {
    await axios.get('http://stark.longzhu.com/api/home?tab=hot').then((res) => {
      this.setState({
        advertsList: res.data.data.adverts
      })
    });
    new Swiper(this.swiperAdverts, {
      direction: 'vertical',
      loop: true,
      autoplay : {
        delay: 1000,
        disableOnInteraction: false,
      },
      pagination: {
        el: this.paginateAdverts,
        dynamicBullets: true,
      },
    });
  }

  render() {
    if (this.state.advertsList.length) {
      var advertsArray = this.state.advertsList.map((item, index)=>{
          return (
            <div className="swiper-slide" key={index}><img src={item.image} alt={item.name} /></div>
          )
      })
    }
    return (
      <div className="adverts">
          <div className="swiper-container" ref={self => this.swiperAdverts = self}>
            <div className="swiper-wrapper">
              {advertsArray}
            </div>
            <div className="swiper-pagination" ref={self => this.paginateAdverts = self}></div>
          </div>
      </div>
    );
  }
}

export default Adverts;
