import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter, Route } from 'react-router-dom';
import Home from './page/home/index';
import Game from './page/game/index';
import Play from './page/play/index';
import Sport from './page/sport/index';
import List from './page/list/index';
import Topbar from './components/topbar';
import Navbar from './components/navbar';
import './index.css';
import TodoList from './store/index';
console.log(TodoList.todos);

class App extends React.Component {

  render() {
    return (
      <div>
        <Topbar todoList ={TodoList.todos} />
        <Navbar />
        {/* {this.props.children} */}
      </div>
    );
  }
}

ReactDOM.render(
  (<HashRouter>
    <App>
      <Route exact path="/" component={Home} />
      <Route exact path="/Game" component={Game} />
      <Route exact path="/Play" component={Play} />
      <Route exact path="/Sport" component={Sport} />
      <Route exact path="/List" component={List} />
    </App>
  </HashRouter>)
  , document.getElementById('root'));
registerServiceWorker();
