const _ = require('lodash');

const validateUserId = (req, res) => {
  if (_.isEmpty(req.header('x-user-id'))) {
    return res.status(400).send({ status: 'error', message: 'UserId Missing - Pass x-user-id header' });
  }
};

module.exports = {
  validateUserId,
};
