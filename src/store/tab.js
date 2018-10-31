import { observable, action } from "mobx";


var href = window.location.hash.slice(2);
var i = 1;
if (href.indexOf('List') === 0) {
  href = 'List';
}
switch (href) {
  case 'Game':
    i = 2;
    break;
  case 'Play':
    i = 3;
    break;
  case 'Sport':
     i = 4;
    break;
  case 'List':
    break;
  default:
    i = 1;
}

class Tab {
  @observable index = i;

  @action clickTab(num) {
    this.index = num;
  }
}
export default new Tab();