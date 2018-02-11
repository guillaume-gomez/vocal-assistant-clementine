import React from 'react';
import PropTypes from 'prop-types';
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
    const { onDismissCallback, idNotification } = this.props;
    this.setState({ show: false });
    onDismissCallback(idNotification);
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

Notification.propTypes = {
  idNotification: PropTypes.number,
  onDismissCallback: PropTypes.func
};

Notification.defaultProps = {
  idNotification: 1,
  onDismissCallback: () => {},
}

export default Notification;