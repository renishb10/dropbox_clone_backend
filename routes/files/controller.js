const fileModel = require('../../models/file.model')

const getFiles = async (parentId) => {
  if (parentId) {
    await fileModel.find({ parent: parentId })
    .then(fl => {
      return fl;
    })
    .catch(e => { throw e; });
  }
  return [];
};

const createFile = async (parentId) => {
  
}

module.exports = {
  getFiles,
};