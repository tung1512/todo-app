import React, {memo, useState} from 'react'

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value : ''
        }
    }

    onAddTodo = (e = {}) => {
            const content = this.state.value;
            if(e.key === 'Enter' && content) {
                this.props.addTodo({
                    id: this.props.numOfTodo + 1,
                    content,
                    isCompleted: false
                })
                this.setState({value: ''});
        }
    }

    render(){
        return(
            <header className='header'>
                <h1>todos</h1>
                <input 
                className='new-todo'
                placeholder='What needs to be done?'
                value={this.state.value}
                onChange={(e) => this.setState({value : e.target.value})}
                // onKeyDown={(e) => this.onAddTodo(e)}
                onKeyDown={this.onAddTodo}
                checked={this.isCheckedAll}
                />
            </header>
        )
    }
}

export default Header 