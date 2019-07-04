const router = require('express').Router();

router.get('/', async(req, res, next) => {
  try {
    res.send('Files');
  } catch (error) {
    
  }
});

module.exports = router;