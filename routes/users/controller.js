const getBoxObject = userId => ({
  userId,
  name: 'Home',
  isFolder: true,
  isBox: true,
  meta: null,
  parent: null,
});

module.exports = {
  getBoxObject,
};
