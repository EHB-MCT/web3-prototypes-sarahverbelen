import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//let todoList = ['test123', 'blabla'];

class Header extends React.Component {
    render() {
        return(
            <header>
                <h1 className="title">To-Do App</h1>
            </header>
        )
    }
}

class TodoInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event) {
        this.setState({value: event.target.value});
      }

      handleSubmit(event) {
       // alert('A todo was submitted: ' + this.state.value);
        event.preventDefault();
        this.props.inputChange(this.state.value);
        this.setState({value: ''});
      }

    render() {
        if(this.props.visible){
            return (
                <form className='input' onSubmit={this.handleSubmit}>
                <textarea value={this.state.value} onChange={this.handleChange}>To-do:</textarea>
                <input type="submit" value="Submit" className="newElement" />
                </form>
            );
        } else {
            return null;
        }
        
    }
}

class NewToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,

        };

        this.inputChange = this.inputChange.bind(this);
    }

    inputChange(value) {
        this.props.onValueChange(value);
    }


    render() {
        return(
            <div className="newToDo">
                <button className="newElement" onClick={() => this.setState({visible: !this.state.visible}) }>Add New To-Do</button> <br />
            <TodoInput visible={this.state.visible} inputChange={this.inputChange}/>
            </div>
        );
    }
}

class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
    }
    handleRemove(data) {
        //alert(data);
        this.props.handleRemove(data);
    }
    render() {
        return (
            <li className="todo">
                {this.props.text}
                <button className="remove" onClick={() => this.handleRemove(this.props.number)}>Remove</button>
                <button className="done">Done</button>
            </li>
        )
    }
}

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleRemove(id) {
        this.props.handleRemove(id);
    }

    render() {
       let listItems = [];
       //let listItems = this.props.todoList.map((todo) => <ToDo key={todo} text={todo} /> );
      for (let i = 0; i < this.props.todoList.length; i++) {
        listItems.push(<ToDo key={i} text={this.props.todoList[i]} number={i} handleRemove={this.handleRemove}/>)
      }

      return(
        <ul className='todoList'>
            {listItems}
        </ul>
      );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleChange(e) {
        this.setState({todoList: e.target.value});
    }

    onValueChange(value) {
        let list = this.state.todoList;
        list.push(value);
        this.setState({todoList: list})
    }

    handleRemove(id) {
        let list = this.state.todoList;
        list.splice(id, 1);
        this.setState({todoList: list});
    }

    render() {
        return (
            <div id="main">
            <Header />
            <NewToDo onValueChange={this.onValueChange}/>
            <ToDoList todoList={this.state.todoList} handleRemove={this.handleRemove}/>
            </div>
        )
    }
}

ReactDOM.render(
    <App />, document.getElementById('root')
);