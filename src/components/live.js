import React, { Component } from 'react';

class Live extends Component {
  render() {
    if (this.props.liveList && this.props.liveList.length) {
      var listArray = [];
      this.props.liveList.forEach((item)=>{
        if (item.streams.length) {
          var itemsList = [];
          item.streams.forEach((ele)=>{
            itemsList.push(
              <a className="live-warp-container" key={ele.room.id}>
                <img className="live-warp-ico" src={ele.snapshot} alt={ele.game.id} />
                <span className="live-warp-name ellipsis">{ele.room.name}</span>
              </a>
            )
          })
        }
        listArray.push(
          <div key={item.name}>
            <div className="live">
              <div className="live-title">
                <div className="live-title-hot">
                  <img className="live-title-ico left" src={item.icon} alt={item.name} />
                  <span className="live-title-name left">{item.name}</span>
                </div>
              </div>
            </div>
            <div className="live-warp">{itemsList}</div>
          </div>
        )
    })
    }
    return (
      <div>{listArray}</div>
    );
  }
}

export default Live;
