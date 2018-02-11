import React from 'react';
import { Alert } from 'react-bootstrap';


class Notification extends React.Component {

  constructor() {
    super();
    ["handleDismiss"].forEach(item => {
      this[item] = this[item].bind(this);
    });
    this.state = { show: true };
  }

  handleDismiss() {
    this.setState({ show: false });
  }

  componentDidMount() {
    const { duration } = this.props;
    if(duration) {
      setTimeout(() => {
        this.handleDismiss();
      }, duration)
    }
  }


  render () {
    const { show } = this.state;
    if(show === false) {
      return null;
    }

    return (
      <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
        <strong>Holy guacamole!</strong> Best check yo self, you're not looking too good
      </Alert>
    );
  }
}

export default Notification;