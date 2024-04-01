import React, { memo } from "react";
import Todo from "./Todo";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state
  }


  render(){
    const { todoList, isCheckedAll, checkAllTodo } = this.props;
    return (
      <section className="main">
        <input 
          className="toggle-all" 
          type="checkbox" 
          defaultChecked={isCheckedAll}
        />
        <label 
              htmlFor="toggle-all"
              onClick={checkAllTodo}>
        
        </label>
        <ul className="todo-list">
          {
            //chuyen object todo
            todoList.map((todo, index) => (
              <Todo 
              key={`todo${todo.id}`}
              {...{ todo } } 
              {...this.props} 
              index={index} 
              />
            )
            )
          }
        </ul>
      </section>
    );
  }
  
};

export default TodoList;
