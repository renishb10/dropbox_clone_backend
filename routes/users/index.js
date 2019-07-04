const router = require('express').Router();

router.get('/', async(req, res, next) => {
  try {
    res.send('Users');
  } catch (error) {
    
  }
});

module.exports = router;