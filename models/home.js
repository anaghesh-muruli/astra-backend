function home() {
    var helper = require('./helper');
    var url = require('url');
    var dvm = require('./assign');


    this.get = function (req, res, next) {
        //for first page.
        try {
            var url_query = url.parse(req.url,true).query;
            var tripID = url_query.tripID;
            req.getConnection(function (connectionError, conn) {
                if (connectionError) {
                    console.error('SQL Connection error: ', connectionError);
                    return next(connectionError);
                } else {
                    var query = 'SELECT (SELECT COUNT(*) FROM inventory) AS total_assets,(SELECT COUNT(*) FROM assign) AS total_assigned,(SELECT COUNT(*) FROM issue WHERE status="pending") AS total_issues,(SELECT COUNT(*) FROM inventory WHERE inventory.status = "non-operational") AS non_opr FROM dual';
                    conn.query(query, function (connectionError, result) {
                        if (connectionError) {
                            console.error('SQL error: ', connectionError);
                            return next(connectionError);
                        }
                        

                        if (result.length >= 1) {
                           
                            res.send(helper.createResponse(helper.Success, helper.successStatusCode, helper.ResultMsg, result));
                        } else {
                            res.send(helper.createResponse(helper.Success, helper.errorStatusCode, helper.noResultMsg, ""));
                        }
                    });
                }
            });
        } catch (internalError) {
            console.error("Internal error:" + internalError);
            return next(internalError);
        }
    };

    this.add = function (req, res, next) {
        try {
            var reqObj = req.body;
            req.getConnection(function (connectionError, conn) {
                if (connectionError) {
                    console.error('SQL Connection error: ', connectionError);
                    return next(connectionError);
                } else {
                    var insertSql = "INSERT INTO inventory SET ?";
              
                    var insertValues = {
                        "aid": reqObj.aid,
                      
                    };
              
                    conn.query(insertSql,insertValues, function (sqlError, result) {
                        if (sqlError) {
                            console.error('SQL error: ', sqlError);
                            return next(sqlError);
                        }
                        if (result.affectedRows >= 1) {
                            res.send(helper.createResponse(helper.Success, helper.successStatusCode, 'Created Successfully.', result.insertId));
                        } else {
                            res.send(helper.createResponse(helper.Success, helper.errorStatusCode, 'Insert failed', ""));
                        }
                    });
                    var insertSql1 = "INSERT INTO inventory SET ?";
              
                    var insertValues1 = {
                        "id": reqObj.aid,
                      
                    };
              
                    conn.query(insertSql1,insertValues1, function (sqlError, result) {
                        if (sqlError) {
                            console.error('SQL error: ', sqlError);
                            return next(sqlError);
                        }
                        if (result.affectedRows >= 1) {
                            res.send(helper.createResponse(helper.Success, helper.successStatusCode, 'Created Successfully.', result.insertId));
                        } else {
                            res.send(helper.createResponse(helper.Success, helper.errorStatusCode, 'Insert failed', ""));
                        }
                    });
            
                }
                    });
                }
                catch (internalError) {
            console.error("Internal error:" + internalError);
            return next(internalError);
        }
    };

    this.delete = function (req, res, next) {
        try {
            var reqObj = req.body;
            req.getConnection(function (err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {

                    var query = "delete from tripbookingtable where tripID = '" + reqObj.tripID + "'";
                    conn.query(query, function (err, result) {
                        if (err) {
                            console.error('SQL error: ', err);
                            return next(err);
                        }
                        if (result.affectedRows >= 1) {
                            res.send(helper.createResponse(helper.Success, helper.successStatusCode, "Deleted successfully", ""));
                        } else {
                            res.send(helper.createResponse(helper.Success, helper.errorStatusCode, helper.noResultMsg, "error while deleting trip info"));
                        }
                    });
                }
            });

        } catch (ex) {
            console.error("Internal error:" + ex);
            return next(ex);
        }
    };

    this.update = function (req, res, next) {
        //When all the fields are to be updated.
        try {
            var reqObj = req.body;
            req.getConnection(function (err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    var checkDuplication = " select tripID from tripbookingtable where  passengerName = '" + reqObj.passengerName + "' , passengerPhoneNo != '" + reqObj.passengerPhoneNo + "' and Status = 1";
                    conn.query(checkDuplication, function (sqlError, checkDuplicateResult) {
                        if (sqlError) {
                            console.error('SQL error: ', sqlError);
                            return next(sqlError);
                        }
                        if (checkDuplicateResult.length >= 1) {
                            res.send(helper.createResponse(helper.Error, helper.errorStatusCode, ' This entry exists.', ""));
                        } else {
                            var query = " update tripbookingtable set tdMapID = '" + reqObj.tdMapID +
                                "',startTime = '" + reqObj.startTime+
                                "' ,dvMapID = '" +reqObj.dvMapID +
                                "' ,paymentModeID= '"+reqObj.paymentModeID +
                                "',paymentMode = '"+reqObj.paymentMode +
                                "',paymentStatus = '"+reqObj.paymentStatus +
                                + "'";
                            conn.query(query, function (err, result) {
                                if (err) {
                                    console.error('SQL error: ', err);
                                    return next(err);
                                }
                                if (result.affectedRows >= 1) {
                                    res.send(helper.createResponse(helper.Success, helper.successStatusCode, "Updated successfully", ""));
                                } else {
                                    res.send(helper.createResponse(helper.Success, helper.errorStatusCode, helper.noResultMsg, "error while updating passenger info"));
                                }
                            });
                        }
                    });
                }
            });

        } catch (ex) {
            console.error("Internal error:" + ex);
            return next(ex);
        }
    };

    this.updateTariffDestinationID = function (req, res, next) {
        //When only tdMapID is to be updated.
        try {
            var reqObj = req.body;
            req.getConnection(function (err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    var checkDuplication = " select tripID from tripbookingtable where  passengerPhoneNo = '" + reqObj.passengerPhoneNo + "' and status = !0";
                    conn.query(checkDuplication, function (sqlError, checkDuplicateResult) {
                        if (sqlError) {
                            console.error('SQL error: ', sqlError);
                            return next(sqlError);
                        }
                        console.log(checkDuplication);
                        if (checkDuplicateResult.length >= 1) {
                            res.send(helper.createResponse(helper.Error, helper.errorStatusCode, ' This entry exists.', ""));
                        } else {
                            var query = " update tripbookingtable set tdMapID = '" + reqObj.tdMapID + "', status =  1 "+
                                "where tripID = '" + reqObj.tripID +"'";
                            conn.query(query, function (err, result) {
                                if (err) {
                                    console.error('SQL error: ', err);
                                    return next(err);
                                }
                                console.log(query);
                                if (result.affectedRows >= 1) {
                                    res.send(helper.createResponse(helper.Success, helper.successStatusCode, "Updated successfully", ""));
                                } else {
                                    res.send(helper.createResponse(helper.Success, helper.errorStatusCode, helper.noResultMsg, "error while updating tariff and destination info"));
                                }
                            });
                        }
                    });
                }
            });

        } catch (ex) {
            console.error("Internal error:" + ex);
            return next(ex);
        }
    };

    this.updateDriverVehicleID = function (req, res, next) {
        //For assigning a driver for a trip.
        try {
            var reqObj = req.body;
            req.getConnection(function (err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    var checkDuplication = " select tripID from tripbookingtable where  passengerPhoneNo = '" + reqObj.passengerPhoneNo + "' and dvMapID != '" +reqObj.dvMapID +"'";
                    // Here once a driver is assigned a new driver can't be assigned for the same trip.
                    conn.query(checkDuplication, function (sqlError, checkDuplicateResult) {
                        if (sqlError) {
                            console.error('SQL error: ', sqlError);
                            return next(sqlError);
                        }
                        if (checkDuplicateResult.length >= 1) {
                            res.send(helper.createResponse(helper.Error, helper.errorStatusCode, ' This entry exists.', ""));
                        } else {
                            var query = " update tripbookingtable set dvMapID = '" + reqObj.dvMapID +
                                "' where tripID = '" + reqObj.tripID + "'";
                            conn.query(query, function (err, result) {
                                if (err) {
                                    console.error('SQL error: ', err);
                                    return next(err);
                                }


                                if (result.affectedRows >= 1) {
                                    var msg = "Your tripID is '"+  reqObj.tripID + "' and driver name is '" + reqObj.driverName + "' and vehicle no is '" + reqObj.vin + "'";
                                    helper.sendSms('+91' + reqObj.passengerPhoneNo, msg);

                                    dvm.updateStatusEngage(req, res,reqObj.dvMapID, next);
                                    //res.send(helper.createResponse(helper.Success, helper.successStatusCode, "Updated successfully", ""));
                                } else {
                                    res.send(helper.createResponse(helper.Success, helper.errorStatusCode, helper.noResultMsg, "error while updating driver info"));
                                }
                            });
                        }
                    });
                }
            });

        } catch (ex) {
            console.error("Internal error:" + ex);
            return next(ex);
        }
    };

    this.getAfterBooking = function (req, res, next) {
        //for displaying everything after booking is complete.
        try {
            // var reqObj = req.body;
            var url_query = url.parse(req.url,true).query;
            var tripID = url_query.tripID;
            req.getConnection(function (connectionError, conn) {
                if (connectionError) {
                    console.error('SQL Connection error: ', connectionError);
                    return next(connectionError);
                } else {
                    var query = " select * from viewtripbooking where status = 1";
                    if(tripID>0)
                         query = query + " and tripID ="+ tripID;
                         console.log(query);
                    conn.query(query, function (connectionError, result) {
                        if (connectionError) {
                            console.error('SQL error: ', connectionError);
                            return next(connectionError);
                        }

                        if (result.length >= 1) {
                            res.send(helper.createResponse(helper.Success, helper.successStatusCode, helper.ResultMsg, (result)));
                        } else {
                            res.send(helper.createResponse(helper.Success, helper.errorStatusCode, helper.noResultMsg, ""));
                        }
                    });
                }
            });
        } catch (internalError) {
            console.error("Internal error:" + internalError);
            return next(internalError);
        }
    };

    this.getForAttendant = function (req, res, next) {
        //for displaying everything in attendant's screen.
        try {
            req.getConnection(function (connectionError, conn) {
                if (connectionError) {
                    console.error('SQL Connection error: ', connectionError);
                    return next(connectionError);
                } else {
                    var query = " select * from viewtripbooking where status = 0" ;
                    conn.query(query, function (connectionError, result) {
                        if (connectionError) {
                            console.error('SQL error: ', connectionError);
                            return next(connectionError);
                        }

                        if (result.length >= 1) {
                            res.send(helper.createResponse(helper.Success, helper.successStatusCode, helper.ResultMsg, (result)));
                        } else {
                            res.send(helper.createResponse(helper.Success, helper.errorStatusCode, helper.noResultMsg, ""));
                        }
                    });
                }
            });
        } catch (internalError) {
            console.error("Internal error:" + internalError);
            return next(internalError);
        }
    };








}


module.exports = new home();


