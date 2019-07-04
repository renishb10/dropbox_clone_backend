const router = require('express').Router();

router.get('/', (req, res) => {
  res.json('Dropbox Clone Backend Service');
});

module.exports = router;
