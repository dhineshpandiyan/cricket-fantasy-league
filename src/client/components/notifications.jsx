import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

import Actions from '../actions';
import './notifications.css';

const AUTO_HIDE_DURATION = 5000;

export default class Notification extends Component {

  _onClose(messageId) {
    Actions.notificationAction.removeNotification(messageId);
  }

  render() {
    const { notifications = [] } = this.props;

    return notifications.map(({ _id, message, type }) => {
       const onClose = this._onClose.bind(this, _id);

      return (
        <Snackbar key={ _id } anchorOrigin={{ vertical: "bottom", horizontal: "left" }} open={true} onClose={onClose}
                  autoHideDuration={ AUTO_HIDE_DURATION } message={<span className={type}>{message}</span>} />
      );
    });
  }

}

Notification.propTypes = {
  notifications: PropTypes.array
};
