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
    const list = [
      ["Play", "play"],
      ["Stop", "stop"],
      ["Pause", "pause"],
      ["Volume up", "volume-up"],
      ["Volume down", "volume-down"],
      ["Next", "fast-backward"],
      ["Previous", "fast-forward"]];
    const lis = list.map(([item, icon], index) => {
      return (
        <li key={index} className="list-group-item">
          <span className={`glyphicon glyphicon-${icon}`} ariaHidden={true}></span>
          {" " + item}
        </li>);
    });
    return (<ul className="list-group">{lis}</ul>);
  }


  render () {
    return (
      <div className="container-fluid">
         <PageHeader>Clementine Vocal Assistant <small> Made in NodeJS</small></PageHeader>
         <Jumbotron>
          <h3> Says one of these words to control clementine player </h3>
          {this.renderListOfCommands()}
        </Jumbotron>
      </div>
    );
  }
}
render(<App/>, document.getElementById('app'));
