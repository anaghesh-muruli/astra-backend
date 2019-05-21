var express = require('express');
var router = express.Router();
var trip = require('../models/home');
//var dvm = require('../models/drivervehiclemap');

router.get('/', function(req, res, next) {
    res.send('Home');
});

router.get('/get', function(req,res,next){
    trip.get(req,res,next);
});

router.get('/getForAttendant', function(req,res,next){
    trip.getForAttendant(req,res,next);
});

router.post('/add', function(req,res,next){
    trip.add(req,res,next);
});

router.post('/update', function(req,res,next){
    trip.update(req,res,next);
});

router.post('/delete', function(req,res,next){
    trip.delete(req,res,next);
});

router.post('/updateTariffDestinationID', function(req,res,next){
    trip.updateTariffDestinationID(req,res,next);
});

router.post('/updateDriverVehicleID', function(req,res, next){
    trip.updateDriverVehicleID(req,res,next);
    //dvm.updateStatus(req,res,next);
});

router.get('/getAfterBooking', function(req,res,next){
    trip.getAfterBooking(req,res,next);
});

module.exports = router;