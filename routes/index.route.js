const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Dropbox Clone Backend Service');
});

module.exports = router;
