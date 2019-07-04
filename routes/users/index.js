const router = require('express').Router();
const _ = require('lodash');

// Custom dependencies
const { isUserPayloadValid } = require('./validator');
const { getBoxObject } = require('./controller');
const userModel = require('../../models/user.model');
const fileModel = require('../../models/file.model');


///////////////////////////////////////////////////////////////
/// GET all users (TODO: pagination & admin authorization)
///////////////////////////////////////////////////////////////
router.get('/', async(req, res, next) => {
  try {
    res.send('Users');
  } catch (error) {
    
  }
});

///////////////////////////////////////////////////////////////
/// GET all users (TODO: pagination & user authorization)
///////////////////////////////////////////////////////////////
router.get('/:userId', async(req, res, next) => {
  try {
    res.send('Users by Id');
  } catch (error) {
    
  }
});

router.post('/signup', async(req, res, next) => {
  try {
    // Validate user request
    if (!isUserPayloadValid(req.body))
      res.status(400).send({ status: 'error', message: 'Invalid request'});

    // Create a user
    await userModel.create(req.body)
      .then(async usr => {
        // Create a Box for him
        await fileModel.create(getBoxObject(usr._id))
          .then(async box => {
            // Assign Box to the user
            usr.boxId = box._id;
            usr.save()
              .then(boxedUser => {
                return res.json(boxedUser);
              })
              .catch(e => { throw e });
          })
          .catch(e => { throw e });
      })
      .catch(e => { throw e });
  } catch (error) {
    res.status(400).send({ status: 'error', message: error.message });
  }
});

module.exports = router;