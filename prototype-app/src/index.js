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
        this.handleDone = this.handleDone.bind(this);
    }

    handleRemove(id) {
        this.props.handleRemove(id);
    }

    handleDone(id) {
        this.props.handleDone(id);
    }
    render() {
        if(this.props.type === 'todo') {
            return (
                <li className="todo listitem">
                    {this.props.text}
                    <button className="remove" onClick={() => this.handleRemove(this.props.number)}>Remove</button>
                    <button className="done" onClick={() => this.handleDone(this.props.number)}>Done</button>
                </li>
            )
        } else {
            return (
                <li className="done listitem">
                    {this.props.text}
                    <button className="remove" onClick={() => this.handleRemove(this.props.number)}>Remove</button>
                </li>
            )
        }
        
    }
}

class List extends React.Component {
    constructor(props) {
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleDone = this.handleDone.bind(this);
    }

    handleRemove(id) {
        this.props.handleRemove(id);
    }

    handleDone(id) {
        this.props.handleDone(id);
    }

    render() {
       let listItems = [];
       //let listItems = this.props.todoList.map((todo) => <ToDo key={todo} text={todo} /> );
      for (let i = 0; i < this.props.list.length; i++) {
        listItems.push(<ToDo key={i} text={this.props.list[i]} number={i} handleRemove={this.handleRemove} handleDone={this.handleDone} type={this.props.type}/>)
      }

      return(
        <ul className={'list ' + this.props.type}>
            {listItems}
        </ul>
      );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: [],
            doneList: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.handleRemoveToDo = this.handleRemoveToDo.bind(this);
        this.handleRemoveDone = this.handleRemoveDone.bind(this);
        this.handleDone = this.handleDone.bind(this);
    }

    handleChange(e) {
        this.setState({todoList: e.target.value});
    }

    onValueChange(value) {
        let list = this.state.todoList;
        list.push(value);
        this.setState({todoList: list})
    }

    handleRemoveToDo(id) {
        let list = this.state.todoList;
        list.splice(id, 1);
        this.setState({todoList: list});
    }

    handleRemoveDone(id) {
        let list = this.state.doneList;
        list.splice(id, 1);
        this.setState({doneList: list});
    }


    handleDone(id) {
        let list = this.state.todoList;
        let doneItem = list.splice(id, 1);
        this.setState({todoList: list});
        let doneList = this.state.doneList;
        doneList.push(doneItem);
        this.setState({doneList: doneList});
    }

    render() {
        return (
            <div id="main">
            <Header />
            <NewToDo onValueChange={this.onValueChange}/>
            <h2>To Do:</h2>
            <List list={this.state.todoList} handleRemove={this.handleRemoveToDo} handleDone={this.handleDone} type='todo'/>
            <h2>Done: </h2>
            <List list={this.state.doneList} type='done' handleRemove={this.handleRemoveDone}/>
            </div>
        )
    }
}

ReactDOM.render(
    <App />, document.getElementById('root')
);