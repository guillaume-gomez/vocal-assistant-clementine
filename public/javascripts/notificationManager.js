import React from 'react';
import uuidv4 from 'uuid/v4';

import Notification from './notification.js';
import annyang from './recognition.js';


class NotificationManager extends React.Component {

  constructor() {
    super();
    ["addNotification", "removeNotification"].forEach(item => {
      this[item] = this[item].bind(this);
    });
    this.state = { notifications : []};
  }

  componentDidMount() {
    annyang.addCallback('result', phrases => {
      this.addNotification("info", `Action performed name "${phrases[0]}"`);
    });

    annyang.addCallback('resultNoMatch', phrases => {
      this.addNotification("danger", `Result not match "${phrases[0]}"`);
    });
  }

  addNotification(alertType, message) {
    const { notifications } = this.state;
    const id = uuidv4();
    setTimeout(() => {
      this.removeNotification(id);
    }, 10000);
    const notification = { idNotification: id, message, alertType };
    const newNotifications = notifications.slice();
    this.setState({ notifications: [...newNotifications, notification] });
  }

  removeNotification(id) {
    const { notifications } = this.state;
    const newNotifications = notifications.slice().filter(notification => { return notification.idNotification !== id });
    this.setState({ notifications: newNotifications });
  }

  render () {
    const { notifications } = this.state;
    const notificationsTag = notifications.map(notification => { 
      return (<Notification
        key={notification.idNotification}
        idNotification={notification.idNotification}
        message={notification.message}
        alertType={notification.alertType}
      />);
    }); 
    return (
      <div>
        {notificationsTag}
      </div>
    );
  }
}

export default NotificationManager;