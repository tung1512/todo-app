import "./App.css";
import "./css/todo.css";
import React, { PureComponent, useEffect } from "react";
import ReactPaginate from 'react-paginate';

//Component
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import Todo from "./components/Todo";

export const FILTER_STATUS = {
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
  REMOVE: "REMOVE",
};
const isNotCheckdAll = (todos = []) => todos.find((todo) => !todo.isCompleted);
const filterByStatus = (todo = [], status = "", id = "") => {
  switch (status) {
    case FILTER_STATUS.ACTIVE:
      return todo.filter((todo) => !todo.isCompleted);
    case FILTER_STATUS.COMPLETED:
      return todo.filter((todo) => todo.isCompleted);
    case FILTER_STATUS.REMOVE:
      return todo.filter((todo) => todo.id !== id);
    default:
      return todo;
  }
};
//PureComponent giup check state co thay doi hay khong(shadow). Nhung chi check dc 1 lop con nhieu lop thi phai tu check.
class App extends React.PureComponent {
  constructor(props){
    super(props);
    this.componentRef = React.createRef();
    this.indexRef = React.createRef(0);
    this.state = {
      todoList: [
        {
          id: 1,
          content: "todo 1",
          isCompleted: true,
        },
        {
          id: 2,
          content: "todo 2",
          isCompleted: false,
        },
      ],
      isCheckedAll: false,
      status: "ALL",
      currentPage: 1,
      pageSize: 5,
    };
  }
  // useEffect(() => {
  //   filterByStatus(currentPost, status)
  // })
  componentDidMount() {
    this.setState({
      isCheckedAll: !isNotCheckdAll(this.state.todoList),
    });
  }

  addTodo = (todo = {}) => {
    this.setState((preState) => ({
      todoList: [...preState.todoList, todo],
    }));
  };

  onEditTodo = (todo = {}, index = -1) => {
    if (index >= 0) {
      const { todoList: list } = this.state;
      //replace todo at index  with new one

      list.splice(index, 1, todo);
      this.setState({
        todoList: [...list],
      });
    }
  };

  markCompleted = (id = "") => {
    const { todoList } = this.state;
    const updateList = todoList.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    this.setState((preState) => ({
      todoList: updateList,
      isCheckedAll: !isNotCheckdAll(updateList),
    }));
  };

  checkAllTodo = () => {
    const { todoList, isCheckedAll } = this.state;
    this.setState((preState) => ({
      todoList: todoList.map((todo) => ({
        ...todo,
        isCompleted: isCheckedAll,
      })),
      isCheckedAll: !preState.isCheckedAll,
    }));
  };

  setStatusFilter = (status = "") => {
    this.setState({
      status,
      currentPage: 1
    });
  };

  clearCompleted = () => {
    const { todoList } = this.state;
    this.setState({
      todoList: filterByStatus(todoList, FILTER_STATUS.ACTIVE),
    });
  };

  removeTodo = (id = "") => {
    const { todoList } = this.state;
    this.setState({
      todoList: filterByStatus(todoList, FILTER_STATUS.REMOVE, id),
    });
  };

  handlePageClick = (data) => {
    console.log(data.selected)
    this.setState({ currentPage : data.selected +1})
  }

  setDefaultCurrentPage = () => {
    this.setState({
      currentPage: this.state.currentPage - 1
  })
  }

  componentDidUpdate(){
    const { todoList, status,currentPage,pageSize} = this.state;
    const afterFilterTodoList = filterByStatus(todoList, status);
    const lastPostIndex = currentPage*pageSize;
    const firstPostIndex = lastPostIndex - pageSize;
    const currentPost = afterFilterTodoList.slice(firstPostIndex ,lastPostIndex);
    if(currentPost.length === 0){
      this.setDefaultCurrentPage();
    }
  }

  focusInputInHeader = (todo, index) =>{
    this.componentRef.current.focusInput(todo, index);
  }



  render() {
    const { todoList, isCheckedAll, status,currentPage,pageSize,setDefaultCurrentPage } = this.state;
    const afterFilterTodoList = filterByStatus(todoList, status);
    const numOfTodo = afterFilterTodoList.length;
    const lastPostIndex = currentPage*pageSize;
    const firstPostIndex = lastPostIndex - pageSize;
    const currentPost = afterFilterTodoList.slice(firstPostIndex ,lastPostIndex);
    const pageCount = Math.ceil(numOfTodo / pageSize);
    
    return (
      <div className="todoapp">
        <Header
          addTodo={this.addTodo}
          isCheckedAll={isCheckedAll}
          numOfTodo={todoList.length}
          ref={this.componentRef}
          onEditTodo={this.onEditTodo}
          focusInputInHeader={this.focusInputInHeader}
        />
        <TodoList
          currentPost={currentPost}
          todoList={filterByStatus(currentPost, status)}
          numOfTodo={numOfTodo}
          onEditTodo={this.onEditTodo}
          markCompleted={this.markCompleted}
          isCheckedAll={isCheckedAll}
          checkAllTodo={this.checkAllTodo}
          removeTodo={this.removeTodo}
          focusInputInHeader={this.focusInputInHeader}
        />
        <Footer
          FILTER_STATUS={FILTER_STATUS}
          todoList={filterByStatus(currentPost, status)}
          setStatusFilter={this.setStatusFilter}
          status={status}
          clearCompleted={this.clearCompleted}
          numOfTodo={numOfTodo}
          numbOfTodoLeft={filterByStatus(todoList, "ACTIVE").length}
        />
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={" > "}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={3}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          activeClassName={'active'}
        />
      </div>
    );
  }
}

export default App;
