import React, { memo, useState } from "react";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      value: "",
      editStatus: false,
      todo: {},
      index: "",
    };
  }
  
  focusInput = (todo,index) => {
    this.setState({
      editStatus: true,
      value: todo.content, // Set the input value to the todo content
      todo: todo,
      index: index,
    });
    this.state.editStatus = true;
    this.inputRef.current.focus();
  };

  onAddTodo = (e = {}) => {
    const { value:content,editStatus, todo, index } = this.state;
    const { onEditTodo } = this.props;
    if (editStatus) {
      onEditTodo({ ...todo, content }, index);
      this.setState({ 
        value: '',
        editStatus: false
      });
    } else {
      if (e.key === "Enter" && content) {
        this.props.addTodo({
          id: this.props.numOfTodo + 1,
          content,
          isCompleted: false,
        });
        this.setState({ value: "" });
      }
    }
  };

  render() {
    const {editStatus} = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        {!editStatus ? (
          <input
          className="new-todo"
          ref={this.inputRef}
          placeholder="What needs to be done?"
          value={this.state.value}
          onChange={(e) => this.setState({ value: e.target.value })}
          onKeyDown={this.onAddTodo}
          checked={this.isCheckedAll}
        />
        ) : (
          <input
          className="new-todo"
          ref={this.inputRef}
          placeholder="fix todo"
          value={this.state.value}
          onChange={(e) => this.setState({ value: e.target.value })}
          onBlur={this.onAddTodo}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              this.onAddTodo();
            }
          }}
          checked={this.isCheckedAll}
          />
        )
        }
        
      </header>
    );
  }
}

export default Header;
