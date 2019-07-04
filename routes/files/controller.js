const _ = require('lodash');
const fileModel = require('../../models/file.model');

const getFiles = async (parentId) => {
  return await fileModel.find({ parent: parentId })
  .then(fl => {
    return fl;
  })
  .catch(e => { throw e; });
};

const createFile = async (fileObj) => {
  if (fileObj) {
    await fileModel.create(fileObj)
      .then(fl => {
        return fl;
      })
      .catch(e => { throw e; });
  }
  else throw new Error('Empty file object!');
};

// Optimization & Refactoring needed
// TODO: create a Query builder rather repeating queries
const removeFile = async (fileId) => {
  return await fileModel.findOne({ _id: fileId })
    .then(async fl => {
      if (fl) {
        // if Folder then delete subdirectories & files as well.
        if (fl.isFolder) {
          await fileModel.remove({ parent: fl._id });
        }

        await fileModel.remove({ _id: fl._id });
      }
    })
    .catch(e => { throw e; });
};

const renameFile = async (fileId, newName) => {
  return await fileModel.findOne({ _id: fileId })
    .then(fl => {
      if (!fl)
        throw new Error('No such file exist');

      fl.name = newName;
      fl.save()
        .then(data => { return data; })
        .catch(e => { throw e; });
    })
    .catch(e => { throw e; });
};

const formFileObject = (req, res) => {
  const isFolder =
      typeof req.body.isFolder === 'boolean'
        ? req.body.isFolder
        : null;

  if (_.isEmpty(req.params.parentId) 
    || _.isEmpty(req.body.name) 
    || (isFolder == null || typeof isFolder === "undefined")
    || _.isEmpty(req.header('x-user-id'))
  )
    return res.status(400).send({ status: 'error', message: 'Invalid request' }); 

  try {
    const parent = req.params.parentId;
    const userId = req.header('x-user-id');
    const { name, isFolder } = req.body;
    const fileObj = { name, isFolder, parent, userId };

    // If its a file!
    if (!isFolder) {
      const meta = {};

      // This logic works if "multer" is included
      if (req.file) {
        const { originalname, encoding, mimetype, size } = req.file;
        meta.encoding = encoding;
        meta.mimetype = mimetype;
        meta.size = size;
        meta.originalName = originalname;
        meta.blobUrl = `http://renishcdn.akamai.net/${userId}/${req.file.filename}`
      }

      // MIMIC object (for assessment purpose)
      meta.encoding = '356bit';
      meta.mimetype = 'audio/mpeg';
      meta.size = 129909;
      meta.originalName = `testfile_${Math.floor(Math.random() * (+100000 - +0)) + +0}`;
      meta.blobUrl = `http://renishcdn.akamai.net/${userId}/${Math.floor(Math.random() * (+100000 - +0)) + +0}`;

      // ingest to fileObj
      fileObj.meta = meta;
    }

    return fileObj;
  } catch (e) {
    return res.status(400).send({ status: 'error', message: 'Invalid request' });
  }
};

module.exports = {
  getFiles,
  formFileObject,
  createFile,
  removeFile,
  renameFile,
};