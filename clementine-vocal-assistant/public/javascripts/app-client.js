import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {

  constructor() {
    super();
    [].forEach(item => {
      this[item] = this[item].bind(this);
    });
    this.state = {};
  }

  componentDidMount() {
    console.log("hjsd")
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

  render () {
    return (<h1>"Hi i"m a react component"</h1>);
  }
}
console.log("binouzes");
render(<App/>, document.getElementById('app'));