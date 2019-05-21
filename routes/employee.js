var express = require('express');
var router = express.Router();
var vehicle = require('../models/employee');

router.get('/', function(req, res, next) {
    res.send('employee');
});
router.get('/get', function(req, res, next) {
    vehicle.get(req,res,next);
});



module.exports = router;