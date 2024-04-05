
import React, { PureComponent } from 'react';
// import Header from './Header';

class Todo extends PureComponent {
  constructor(props) {
    super(props);
    this.todoRef = React.createRef();
    this.state = {
      content: props.todo.content,
      todoEditingId: ''
    };
  }
  getTodoEditingId = (id = "") => {
      this.setState({ todoEditingId: id });
    };

  handleInputChange = (e) => {
    this.setState({ 
      content: e.target.value,
     });
  };

  handleEditTodo = () => {
    const { todo, index, onEditTodo } = this.props;
    const { content } = this.state;
    onEditTodo({ ...todo, content }, index);
    this.setState({todoEditingId: ''})
  };
  
  clickHandlerEdit = () =>{
    this.props.focusInputInHeader();
  }

  render() {
    const { todo, markCompleted, removeTodo } = this.props;
    const { content, todoEditingId } = this.state;
    const isEditing = todoEditingId === todo.id;


    return (
      <li className={`${isEditing ? 'editing' : ''} ${todo.isCompleted ? 'completed' : ''}`}>
        {!isEditing ? (
          <div className='view'>
            <input
              className='toggle'
              type='checkbox'
              checked={todo.isCompleted}
              onChange={() => { markCompleted(todo.id) }}
            />
            {/* <Header ref={this.componentRef}/> */}
            <label onDoubleClick={() => this.getTodoEditingId(todo.id)}>{todo.content}</label>
            <button className='editTodo' onClick={this.clickHandlerEdit} ></button>
            <button className='destroy' onClick={() => removeTodo(todo.id)}></button>
          </div>
        ) : (
            <input
              className='edit'
              type='text'
              value={content}
              onChange={this.handleInputChange}
              onBlur={this.handleEditTodo}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  this.handleEditTodo();
                }
              }}
            />
          )}
      </li>
    );
  }
}

export default Todo;