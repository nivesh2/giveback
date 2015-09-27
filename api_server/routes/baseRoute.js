var express = require('express');
var router = express.Router();

var record = require('../functions/logic/record');

router.use('/getAllData',record.read);

module.exports = router;