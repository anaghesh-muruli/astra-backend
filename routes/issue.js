var express = require('express');
var router = express.Router();
var tdMap = require('../models/issue');

router.get('/', function(req, res, next) {
    res.send('The auto');
});

router.get('/get', function(req,res,next){
    tdMap.get(req,res,next);
});

router.post('/add', function(req,res,next){
    tdMap.add(req,res,next);
});

router.post('/update', function(req,res,next){
    tdMap.update(req,res,next);
});

router.post('/delete', function(req,res,next){
    tdMap.delete(req,res,next);
});

module.exports = router;