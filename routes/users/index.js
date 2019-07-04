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
    // TODO : Implement pagination
    await userModel.find({})
      .then(users => {
        if (_.isEmpty(users))
          return res.status(404).send({ status: 'error', message: 'No users found'});

        res.json(users);
      })
      .catch(e => { throw e });
  } catch (e) {
    res.status(404).send({ status: 'error', message: e.message});
  }
});

///////////////////////////////////////////////////////////////
/// GET a user
///////////////////////////////////////////////////////////////
router.get('/:userId', async(req, res, next) => {
  try {
    await userModel.findById({_id: req.params.userId})
      .then(users => {
        if (_.isEmpty(users))
          return res.status(404).send({ status: 'error', message: 'No user found'});

        res.json(users);
      })
      .catch(e => { throw e });
  } catch (e) {
    res.status(404).send({ status: 'error', message: e.message});
  }
});

///////////////////////////////////////////////////////////////
/// POST user info
///////////////////////////////////////////////////////////////
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
  } catch (e) {
    res.status(400).send({ status: 'error', message: e.message });
  }
});

module.exports = router;