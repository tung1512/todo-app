

// import { FILTER_STATUS } from "../App";
// class Footer extends PureComponent {


//   render() {
//     const { clearCompleted, numOfTodo, FILTER_STATUS, numbOfTodoLeft } = this.props;
//     const FilterBtns = [
//       {
//         title: "ALL",
//         isActived: this.props.status === "ALL",
//         onclick: () => this.props.setStatusFilter("ALL"),
//         link: "",
//       },
//       {
//         title: "Active",
//         isActived: this.props.status === FILTER_STATUS.ACTIVE,
//         onclick: () => this.props.setStatusFilter(FILTER_STATUS.ACTIVE),
//         link: "actived",
//       },
//       {
//         title: "Completed",
//         isActived: this.props.status === FILTER_STATUS.COMPLETED,
//         onclick: () => this.props.setStatusFilter(FILTER_STATUS.COMPLETED),
//         link: "completed",
//       },
//     ]

//     //can xem lai cach tao bien trong render

//     return (
//       <footer className="footer">
//         <span className="todo-count">
//           <strong>{numbOfTodoLeft}</strong>
//           <span> </span>
//           <span>{numbOfTodoLeft < 2 ? "item" : "items"} left</span>
//         </span>

//         <ul className="filters">
//           { FilterBtns.map((btn) => (
//             <FilterBtn 
//             key={`btn${btn.title}`}
//             {...btn}
//             />
//           ))
//           }
//         </ul>
//         <button
//           className="clear-completed"
//           disabled={numOfTodo === numbOfTodoLeft}
//           onClick={() => clearCompleted()}
//         >
//           Clear completed
//         </button>
//       </footer>
//     );
//   }
// }

// class FilterBtn extends PureComponent {
//   render() {
//     const { title, onclick, link, isActived } = this.props;
//     return (
//       <>
//         <li>
//           <a
//             href={`#/${link}`}
//             className={`${isActived ? "selected" : ""}`}
//             onClick={onclick}
//           >
//             {title}
//           </a>
//         </li>
//         <span></span>
//       </>
//     );
//   }
// }

// export default Footer;
import React, { PureComponent } from "react";
import { FILTER_STATUS } from "../App";
import "../css/todo.css";
import Pagination from "./Pagination";
 

class Footer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filterBtns: [
        {
          title: "ALL",
          isActived: this.props.status === "ALL",
          onclick: () => this.props.setStatusFilter("ALL"),
          link: "",
        },
        {
          title: "Active",
          isActived: this.props.status === FILTER_STATUS.ACTIVE,
          onclick: () => this.props.setStatusFilter(FILTER_STATUS.ACTIVE),
          link: "actived",
        },
        {
          title: "Completed",
          isActived: this.props.status === FILTER_STATUS.COMPLETED,
          onclick: () => this.props.setStatusFilter(FILTER_STATUS.COMPLETED),
          link: "completed",
        },
      ],
    };
  }

  render() {
    const { clearCompleted, numOfTodo, numbOfTodoLeft, currentPage } = this.props;
    const { filterBtns } = this.state;

    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{numbOfTodoLeft}</strong>
          <span> </span>
          <span>{numbOfTodoLeft < 2 ? "item" : "items"} left</span>
        </span>

        <ul className="filters">
          {filterBtns.map((btn) => (
            <FilterBtn key={`btn${btn.title}`} {...btn} />
          ))}
        </ul>
        <button
          className="clear-completed"
          disabled={numOfTodo === numbOfTodoLeft}
          onClick={() => clearCompleted()}
        >
          Clear completed
        </button>
      </footer>
      
    );
  }
}

class FilterBtn extends PureComponent {
  render() {
    const { title, onclick, link, isActived } = this.props;
    return (
      <>
        <li>
          <a
            href={`#/${link}`}
            className={`${isActived ? "selected" : ""}`}
            onClick={onclick}
          >
            {title}
          </a>
        </li>
        <span></span>
      </>
    );
  }
}

export default Footer;
