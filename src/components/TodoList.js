import React, { memo } from "react";
import Todo from "./Todo";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    // this.todoListRef = React.createRef();
  }



  render(){
    const { todoList, isCheckedAll, checkAllTodo,focusInputInHeader,getIndex } = this.props;
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
              // ref={this.todoListRef}
              key={`todo${todo.id}`}
              {...{ todo } } 
              {...this.props} 
              index={index} 
              handleEditTodo={focusInputInHeader}
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
