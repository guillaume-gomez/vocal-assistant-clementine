import React from 'react';
import { render } from 'react-dom';
import { Jumbotron, PageHeader } from 'react-bootstrap';

class App extends React.Component {

  constructor() {
    super();
    ["renderListOfCommands"].forEach(item => {
      this[item] = this[item].bind(this);
    });
    this.state = {};
  }

  componentDidMount() {
  }

  getParams(data) {
    //remove ?pages=
    return data.substring(6);
  }

  updateQueryString(params) {
    if (window.history.pushState) {
      var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?page=${params}`;
      window.history.pushState({path:newurl},'',newurl);
    }
  }

  renderListOfCommands() {
    const list = ["Play", "Stop", "Pause", "Volume up", "Volume down", "Next", "Previous"];
    const lis = list.map((item, index) => {
      return (<li key={index}>{item}</li>);
    });
    return (<ul>{lis}</ul>);
  }


  render () {
    return (
      <div className="container-fluid">
         <PageHeader>Clementine Vocal Assistant <small> Made in NodeJS</small></PageHeader>
         <Jumbotron>
          <h3> Says one of these words to enable clementine player </h3>
          {this.renderListOfCommands()}
        </Jumbotron>
      </div>
    );
  }
}
render(<App/>, document.getElementById('app'));
