import { observable } from "mobx";
class TodoList {
   // 利用
  @observable todos = [] 
}
​
export default new TodoList()