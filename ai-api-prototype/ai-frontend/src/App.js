import './App.css';
let React = require('react');
let $ = require('jquery');

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
        <Input sendData = { this.sendData } /> 
        <Output output = { this.state.output }/> 
      </main> 
    </React.Fragment>
    );
  }

  sendData(e) {
    e.preventDefault();
    let data = $('#input').val();
    $.ajax({
          'method': 'POST',
          'url': 'http://localhost:3001/result',
          'data': {
            text: data
          },
          'success': function (result) {
              console.log(result);

              let judge = 0;
              if (result.output === 'pos') {
                judge = 1;
              } else if (result.output === 'neg') {
                judge = -1;
              }

        this.setState({
          output: {
            text: result.text,
              judgement: judge
          }
        });
        }.bind(this)
        });

  }
  }



function Input(props) {
  return ( 
  <form className = 'form-group' >
    <input type = "text" id = "input" className = 'form-control' />  
    <button id = 'send' onClick = { props.sendData } className = 'btn btn-success' > Send </button> 
  </form>
  );
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