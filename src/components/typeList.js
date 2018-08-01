import React, { Component } from 'react';


class TypeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    if (this.props.liveList && this.props.liveList.length) {
      var itemsList = [];
      this.props.liveList.forEach((item, index)=>{
          itemsList.push(
            <a className="live-warp-container" key={index}>
              <img className="live-warp-ico" src={item.snapshot} alt={item.game.id} />
              <span className="live-warp-name ellipsis">{item.room.name}</span>
            </a>
          )
      })
    }
    return (
      <div className="live-warp">
        {itemsList}
      </div>
    );
  }
}

export default TypeList;
