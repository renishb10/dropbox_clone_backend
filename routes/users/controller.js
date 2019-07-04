const userModel = require('../../models/user.model')

const getBoxObject = userId => ({
  userId,
  name: 'Home',
  isFolder: true,
  isBox: true,
  meta: null,
  parent: null,
});

const getUser = async userId => {
  const user = await userModel.findById({ _id: userId }).populate('files')
    .then(u => {
      if(!u)
        return null;
      return u;
    })
    .catch(e => {
      logger.log('error', 'No user found');
      return null;
    });

  return user;
};

module.exports = {
  getUser,
  getBoxObject,
};
