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
    const { alertType, message } = this.props;
    if(show === false) {
      return null;
    }

    return (
      <Alert bsStyle={alertType} onDismiss={this.handleDismiss}>
        {message}
      </Alert>
    );
  }
}

Notification.propTypes = {
  idNotification: PropTypes.string,
  alertType: PropTypes.string,
  message:  PropTypes.string,
  onDismissCallback: PropTypes.func,
  duration: PropTypes.number
};

Notification.defaultProps = {
  idNotification: "1",
  alertType: "info",
  message: "Notification",
  onDismissCallback: () => {},
}

export default Notification;