import React, { Component } from 'react';

class Topbar extends Component {
  render() {
    return (
        <div className="topbar">
            {this.props.todoList.length}
            {/* <a className="topbar-logo" href="https://m.longzhu.com/index"> </a> */}
            {/* <div className="topbar-right"></div> */}
        </div>
    );
  }
}

export default Topbar;
