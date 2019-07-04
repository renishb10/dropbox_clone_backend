const _ = require('lodash');
const userController = require('../users/controller');

const validateUser = async (req, res) => {
  const userId = req.header('x-user-id');
  if (_.isEmpty(userId)) {
    return res.status(400).send({ status: 'error', message: 'UserId Missing - Pass x-user-id header' });
  }

  // Find if user exist
  const user = await userController.getUser(userId);
  if (!user)
    return res.status(404).send({ status: 'error', message: 'Invalid user' });

  return user;
};

module.exports = {
  validateUser,
};
