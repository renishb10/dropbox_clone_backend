const _ = require('lodash');

const isUserPayloadValid = (user) => {
  if (_.isEmpty(user)
    || _.isEmpty(user.firstName)
    || _.isEmpty(user.lastName)
    || _.isEmpty(user.email)
    || _.isEmpty(user.password)) return false;
  return true;
};

module.exports = {
  isUserPayloadValid,
};
