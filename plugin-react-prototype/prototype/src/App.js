import React from 'react';
// import { render } from 'react-dom';
import './App.css';

import Data from './Data';
import Options from './Options';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderOptions: false,
      renderData: false
    }
    this.goToOptions = this.goToOptions.bind(this);
    this.goToData = this.goToData.bind(this);
  }

  render() {
    let page; 
    if (this.state.renderOptions) {
      page = <Options />
    } else if (this.state.renderData) {
      page = <Data />
    } else {
      page = "";
    }

    return (
      <div className="App">
        <header>
          <ul>
            <li><a href="#" onClick={this.goToOptions}>Options</a></li>
            <li><a href="#" onClick={this.goToData}>Data</a></li>
          </ul>
        </header>
      {page}
      </div>
    );
  }

 goToOptions() {
    this.setState({renderOptions: true, renderData: false});
  }

  goToData() {
    this.setState({renderOptions: false, renderData: true});
  }

}



export default App;
