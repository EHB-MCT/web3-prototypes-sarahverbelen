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


// the input component is made up of a textarea and a button and is used in the newtodo component
// it only shows when you press the 'add new to-do' button in the newtodo component
class TodoInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      // when the textarea is changed, we change the state of the value
      // so that we can always access this value, for example when pressing the button
      handleChange(event) {
        this.setState({value: event.target.value});
      }

      // when pressing the submit button, we call the function given to this component through the props
      // we also clean out the textarea by putting the state that holds its value to an empty string
      handleSubmit(event) {
        event.preventDefault();

        this.props.inputChange(this.state.value);
        this.setState({value: ''});
      }

    render() {
        if(this.props.visible){ // this if-else controls the visibility of this component
            return (
                <form className='input' onSubmit={this.handleSubmit}> 
                <textarea value={this.state.value} onChange={this.handleChange}>To-do:</textarea>
                <input type="submit" value="Submit" className="newElement" />
                </form>
            );
        } else {
            return null; // if it's invisible, react doesn't have to render this at all
        }
        
    }
}

// this is the component that holds the todoinput component as well as the button that can hide/show that compoentn
class NewToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };

        this.inputChange = this.inputChange.bind(this);
    }

    inputChange(value) { // this function is given to this component by it's parent component; we need to define it here in order to give it to its own children
        this.props.onValueChange(value);
    } 


    render() {
        return(
            <div className="newToDo">
                <button className="newElement" onClick={() => this.setState({visible: !this.state.visible})}>Add New To-Do</button> <br />
            <TodoInput visible={this.state.visible} inputChange={this.inputChange}/>
            </div>
        );
    }
}

// the todo component holds one to-do item
// it receives the text, type (done or todo) and id (number) of that to-do item from its parent as a prop
class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleDone = this.handleDone.bind(this);
    }

    // handleremove and handledone are two functions that are also given by its parent as a prop
    handleRemove(id) {
        this.props.handleRemove(id);
    }

    handleDone(id) {
        this.props.handleDone(id);
    }
    render() {
        // depending on if this todo item is still to-do or already done, we render it slightly differently (different class, a button less/more)
        if(this.props.type === 'todo') { 
            return (
                <li className="todo listitem">
                    {this.props.text}
                    <button className="remove" onClick={() => this.handleRemove(this.props.number)}><i class="fas fa-trash-alt"></i></button>
                    <button className="done" onClick={() => this.handleDone(this.props.number)}><i class="fas fa-check"></i></button>
                </li>
            )
        } else {
            return (
                <li className="done listitem">
                    {this.props.text}
                    <button className="remove" onClick={() => this.handleRemove(this.props.number)}><i class="fas fa-trash-alt"></i></button>
                </li>
            )
        }
        
    }
}

// this is a list component that makes a list out of todo items.
// it receives its type and list from its parent
class List extends React.Component {
    constructor(props) {
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleDone = this.handleDone.bind(this);
    }

    // handleremove and handledone are two function from its parent that it needs to give to its children
    handleRemove(id) {
        this.props.handleRemove(id);
    }

    handleDone(id) {
        this.props.handleDone(id);
    }

    render() {
       let listItems = [];
       // we loop over every item from the list and create a todo component with the necessary props out of it
       // we then add this todo component to a list
      for (let i = 0; i < this.props.list.length; i++) {
        listItems.push(<ToDo key={i} text={this.props.list[i]} number={i} handleRemove={this.handleRemove} handleDone={this.handleDone} type={this.props.type}/>)
      } 
 
      // finally, we return this list of components to render inside of an ul
      return(
        <ul className={'list ' + this.props.type}>
            {listItems}
        </ul>
      );
    }
}

// app is the component that holds all other components
// it is also responsible for holding the todolist and donelist, which hold all of the items
// it gives these lists as well as the functions that change these to its children where necessary
class App extends React.Component {
    constructor(props) {
        super(props);
        // both lists are states; this allows the rendered lists to change when things are added or removed
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


// the last step is to let react render the entire app component on the document's root
ReactDOM.render(
    <App />, document.getElementById('root')
);