const dataStore = require('../data-store');

class LoginAction {

  setLoginInfo(payload) {
    dataStore.setLoginInfo(payload);
  }

}

module.exports = new LoginAction();