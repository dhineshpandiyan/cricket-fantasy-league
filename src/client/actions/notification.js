const dataStore = require('../data-store');

class NotificationAction {

  information(message) {
    dataStore.pushNotifications(message, 'information');
  }

  warning(message) {
    dataStore.pushNotifications(message, 'warning');
  }

  error(message) {
    dataStore.pushNotifications(message, 'error');
  }

  removeNotification(messageId) {
    dataStore.removeNotification(messageId);
  }

}

module.exports = new NotificationAction();