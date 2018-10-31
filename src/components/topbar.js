import React, { Component } from 'react';
import { observer } from "mobx-react";

@observer 
class Topbar extends Component {
  render() {
    return (
        <div className="topbar">
            <a className="topbar-logo" href="https://m.longzhu.com/index"> </a>
            <div className="topbar-right">{this.props.Tab.index}</div>
        </div>
    );
  }
}

export default Topbar;
