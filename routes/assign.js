var express = require('express');
var router = express.Router();
var dvMap = require('../models/assign');

router.get('/', function(req, res, next) {
    res.send('assign');
});

router.get('/get', function(req,res,next){
    dvMap.get(req,res,next);
});
router.get('/getAssets', function(req,res,next){
    dvMap.getAssets(req,res,next);
});

router.post('/add', function(req,res,next){
    dvMap.add(req,res,next);
});
router.post('/addAsset', function(req,res,next){
    dvMap.addAsset(req,res,next);
});

router.post('/addAsset1', function(req,res,next){
    dvMap.addAsset1(req,res,next);
});
router.post('/update', function(req,res,next){
    dvMap.update(req,res,next);
});

router.post('/search', function(req,res,next){
    dvMap.search(req,res,next);
});

router.post('/delete', function(req,res,next){
    dvMap.delete(req,res,next);
})

router.post('/transfer', function(req,res,next){
    dvMap.transfer(req,res,next);
});
router.get('/nextAid', function(req,res,next){
    dvMap.nextAid(req,res,next);
});

module.exports = router;