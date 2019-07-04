const router = require('express').Router();
const _ = require('lodash');


// Custom dependencies
const validator = require('./validator');
const fileController = require('./controller');

///////////////////////////////////////////////////////////////
/// GET all folders & files (root) for the given user
/// (TODO: pagination & admin authorization)
///////////////////////////////////////////////////////////////
router.get('/', async(req, res, next) => {
  try {
    const user = await validator.validateUser(req, res); // We can use Joi or Express-Validator middlewares

    // Get his box
    // TODO: Look for fetching in one query (users..[files])
    const boxId = user.boxId;
    const files = await fileController.getFiles(boxId);
    res.json(files);

  } catch (e) {
    res.status(404).send({ status: 'error', message: e.message});
  }
});

///////////////////////////////////////////////////////////////
/// GET specific folders & files for the given user & parent folder
/// (TODO: pagination & admin authorization)
///////////////////////////////////////////////////////////////
router.get('/:parentId', async(req, res, next) => {
  try {
    const user = await validator.validateUser(req, res); // We can use Joi or Express-Validator middlewares


    // Get given parentId
    // TODO: Look for fetching in one query (users..[files])
    const parentFolderId = req.params.parentId;
    const files = await fileController.getFiles(parentFolderId);
    res.json(files);

  } catch (e) {
    res.status(404).send({ status: 'error', message: e.message});
  }
});

///////////////////////////////////////////////////////////////
/// POST - Create a file
///////////////////////////////////////////////////////////////
router.post('/:parentId/create', async(req, res, next) => {
  try {
    // We can use Joi or Express-Validator middlewares
    await validator.validateUser(req, res); 

    // Decide based on request object
    // If its of file then we do expect "multipart/form-data"
    // Then we need to upload it to Cloud storage (CDN if possible) then form meta data
    // As of now saving only the name

    // Validate and get user input (better to use 3rd party validator)
    const fileObj = fileController.formFileObject(req, res);

    const result = await fileController.createFile(fileObj);

    res.json(result);

  } catch (e) {
    return res.status(404).send({ status: 'error', message: e.message});
  }
});

///////////////////////////////////////////////////////////////
/// UPDATE - Update a file
/// (TODO: push it to Cloud storage & map CDN)
///////////////////////////////////////////////////////////////
router.put('/:parentId', async(req, res, next) => {
  try {
    // We can use Joi or Express-Validator middlewares
    const user = await validator.validateUser(req, res);

    if (_.isEmpty(req.body.name))
      res.status(400).send({ status: 'error', message: 'Bad request'});

    // For assessment purpose (Only name)
    await fileController.renameFile(req.params.parentId, req.body.name);

    res.json({ status: 'success', message: `Updated (renamed) file/folder ${req.params.parentId}`});

  } catch (e) {
    res.status(404).send({ status: 'error', message: e.message});
  }
});

///////////////////////////////////////////////////////////////
/// DELETE - delete a file
/// Caution - This deletes subdirectories as well
/// So handle confirmation (popup) in the frontend
///////////////////////////////////////////////////////////////
router.delete('/:parentId', async(req, res, next) => {
  try {
    // We can use Joi or Express-Validator middlewares
    const user = await validator.validateUser(req, res);

    await fileController.removeFile(req.params.parentId);

    res.json({ status: 'success', message: `Deleted file/folder ${req.params.parentId}`});

  } catch (e) {
    res.status(404).send({ status: 'error', message: e.message});
  }
});

module.exports = router;