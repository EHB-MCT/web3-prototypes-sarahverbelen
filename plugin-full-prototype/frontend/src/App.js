import './App.css';
let React = require('react');
let $ = require('jquery');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:prototypeAdmin@prototype.igxsj.gcp.mongodb.net/prototype?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      output: {
        text: '',
        judgement: null
      }
    } 
    this.sendData = this.sendData.bind(this);
    this.setState = this.setState.bind(this);
  }

  render() {
    return ( 
    <React.Fragment>
      <header className = "navbar navbar-dark bg-dark" >
        <h1> AI API Prototype </h1> 
      </header> 
      <main className = "container" >
        <Output output = { this.state.output }/> 
      </main> 
    </React.Fragment>
    );
  }

  getData() {
    client.connect
  }



  }



function Output(props) {
  if (props.output.text !== '') {
    let klasse;
    if (props.output.judgement > 0) {
      klasse = 'alert alert-success';
    } else if (props.output.judgement === 0) {
      klasse = 'alert  alert-secondary';
    } else {
      klasse = 'alert alert-danger';
    }
    return ( 
    <p className = { klasse }> { props.output.text } </p>
    );
  }

  return '';


}

export default App;