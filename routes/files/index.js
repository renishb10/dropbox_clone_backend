const router = require('express').Router();

// Custom dependencies
const validator = require('./validator');
const userController = require('../users/controller');
const fileController = require('./controller');

///////////////////////////////////////////////////////////////
/// GET all folders & files for the given user
/// (TODO: pagination & admin authorization)
///////////////////////////////////////////////////////////////
router.get('/', async(req, res, next) => {
  try {
    validator.validateUserId(req, res); // We can use Joi or Express-Validator middlewares
    const userId = req.header('x-user-id');
    
    // Find if user exist
    const user = await userController.getUser(userId);
    if (!user)
      res.status(404).send({ status: 'error', message: 'Invalid user' });

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
/// POST - Create a file
///////////////////////////////////////////////////////////////
router.post('/:parentId/create', async(req, res, next) => {
  try {
    validator.validateUserId(req, res); // We can use Joi or Express-Validator middlewares
    const userId = req.header('x-user-id');
    
    // Find if user exist
    const user = await userController.getUser(userId);
    if (!user)
      res.status(404).send({ status: 'error', message: 'Invalid user' });

    res.json('create');

  } catch (e) {
    res.status(404).send({ status: 'error', message: e.message});
  }
});

///////////////////////////////////////////////////////////////
/// POST - Upload a file
/// (TODO: push it to Cloud storage & map CDN)
///////////////////////////////////////////////////////////////
router.post('/:parentId/upload', async(req, res, next) => {
  try {
    validator.validateUserId(req, res); // We can use Joi or Express-Validator middlewares
    const userId = req.header('x-user-id');
    
    // Find if user exist
    const user = await userController.getUser(userId);
    if (!user)
      res.status(404).send({ status: 'error', message: 'Invalid user' });

    res.json('upload');

  } catch (e) {
    res.status(404).send({ status: 'error', message: e.message});
  }
});

module.exports = router;