function assign() {
    var helper = require('./helper');
    var url = require('url');
    var asset;


    this.get = function (req, res, next) {
        try {
            req.getConnection(function (connectionError, conn) {
                if (connectionError) {
                    console.error('SQL Connection error: ', connectionError);
                    return next(connectionError);
                } else {
                      var query = "SELECT assign.aid, inventory.name as asset_name, assign.eid, employee.name as employee_name, assign.due, assign.status, inventory.location, inventory.category"
                     +" FROM ((assign"
                     +" INNER JOIN employee ON employee.id = assign.eid)"
                     + "INNER JOIN inventory ON inventory.aid = assign.aid)";
                    conn.query(query, function (connectionError, result) {
                        if (connectionError) {
                            console.error('SQL error: ', connectionError);
                            return next(connectionError);
                        }
                        //console.log(query);
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
    this.getAssets = function (req, res, next) {
        try {
            req.getConnection(function (connectionError, conn) {
                if (connectionError) {
                    console.error('SQL Connection error: ', connectionError);
                    return next(connectionError);
                } else {
                      var query = "SELECT * FROM `inventory`  ";
                    conn.query(query, function (connectionError, result) {
                        if (connectionError) {
                            console.error('SQL error: ', connectionError);
                            return next(connectionError);
                        }
                        //console.log(query);
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


    this.add = function (req, res, next) {
        try {
            var reqObj = req.body;
            req.getConnection(function (connectionError, conn) {
                if (connectionError) {
                    console.error('SQL Connection error: ', connectionError);
                    return next(connectionError);
                } else {
                        var insertSql = "INSERT INTO assign SET ?";

                        var insertValues = {
                            "aid": reqObj.aid,
                            "eid": reqObj.eid,
                            "due": reqObj.due

                        };
                        conn.query(insertSql, insertValues, function (sqlError, result) {
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
    
    this.addAsset1 = function (req, res, next) {
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
                            "name": reqObj.name,
                            "type": reqObj.type,
                            "status": "Unassigned",
                            "manufacturer": reqObj.manufacturer,
                            "location": "Bengaluru",
                            "category": reqObj.category
                         

                        };
                        conn.query(insertSql, insertValues, function (sqlError, result) {
                            if (sqlError) {
                                console.error('SQL error: ', sqlError);
                                return next(sqlError);
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
    this.addAsset = function (req, res, next) {
        try {
            var reqObj = req.body;
            req.getConnection(function (connectionError, conn) {
                if (connectionError) {
                    console.error('SQL Connection error: ', connectionError);
                    return next(connectionError);
                } else {
                        var insertSql = "INSERT INTO bill SET ?";

                        var insertValues = {
                            "aid": reqObj.aid,
                            "invoiceNum": reqObj.invoiceNum,
                            "warrenty": reqObj.warrenty,
                            "gstin": reqObj.gstin,
                            "vendorName": reqObj.vendorName,
                         

                        };
                        conn.query(insertSql, insertValues, function (sqlError, result) {
                            if (sqlError) {
                                console.error('SQL error: ', sqlError);
                                return next(sqlError);
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

    this.search = function (req, res, next) {
        try {
            var reqObj = req.body;
            req.getConnection(function (err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {

                    var query = "SELECT inventory.aid, inventory.name as aname, employee.id as eid, employee.name as ename FROM ((assign INNER JOIN inventory ON inventory.aid = assign.aid) INNER JOIN employee ON employee.id = assign.eid) where assign.aid='"+reqObj.aid+"'";
                    conn.query(query, function (err, result) {
                        if (err) {
                            console.error('SQL error: ', err);
                            return next(err);
                        }
                        if (result.length >= 1) {
                            asset = reqObj.aid;
                            res.send(helper.createResponse(helper.Success, helper.successStatusCode, helper.ResultMsg, (result)));
                        } else {
                            res.send(helper.createResponse(helper.Success, helper.errorStatusCode, helper.noResultMsg, "error"));
                        }
                    });
                }
            });

        } catch (ex) {
            console.error("Internal error:" + ex);
            return next(ex);
        }
    };
    
    this.transfer = function (req, res, next) {
        try {
            var reqObj = req.body;
            req.getConnection(function (err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {

                    var query = "update assign set eid = '"+ reqObj.toAid + "' where eid = '" + reqObj.fromAid + "'";
                    conn.query(query, function (err, result) {
                        if (err) {
                            console.error('SQL error: ', err);
                            return next(err);
                        }
                        if (result.affectedRows >= 1) {
                            asset = reqObj.aid;
                            res.send(helper.createResponse(helper.Success, helper.successStatusCode, helper.ResultMsg,"Success"));
                        } else {
                            res.send(helper.createResponse(helper.Success, helper.errorStatusCode, helper.noResultMsg, "error"));
                        }
                    });
                }
            });

        } catch (ex) {
            console.error("Internal error:" + ex);
            return next(ex);
        }
    };
    
    this.delete = function (req, res, next) {
        console.log(""+asset);
        try {
            var reqObj = req.body;
            req.getConnection(function (err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {

                    var query = "delete from assign where aid = '" + reqObj.aid + "'";
                    conn.query(query, function (err, result) {
                        if (err) {
                            console.error('SQL error: 1232', err);
                            return next(err);
                        }
                        if (result.affectedRows >= 1) {
                            var query = "update astra.inventory set status='Unassigned' where aid = '" +reqObj.aid+ "'";
                            conn.query(query, function (err, result) {
                                if (err) {
                                    console.error('SQL error: ', err);
                                    return next(err);
                                }
                        
                            });
                        } else {
                            res.send(helper.createResponse(helper.Success, helper.errorStatusCode, helper.noResultMsg, "error while deleting driver vehicle map info"));
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
        //for updating all the fields.
        try {
            var reqObj = req.body;
            req.getConnection(function (err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    var checkDuplication = " select dvMapID from drivervehiclemap where  driverID = '" + reqObj.driverID + "' and vehicleID != '" + reqObj.vehicleID + "'";
                    conn.query(checkDuplication, function (sqlError, checkDuplicateResult) {
                        if (sqlError) {
                            console.error('SQL error: ', sqlError);
                            return next(sqlError);
                        }
                        if (checkDuplicateResult.length >= 1) {
                            res.send(helper.createResponse(helper.Error, helper.errorStatusCode, ' This entry exists.', ""));
                        } else {
                            var query = " update drivervehiclemap set vehicleID = '" + reqObj.vehicleID +
                                "' , driverID = '" + reqObj.driverID + "'";
                            conn.query(query, function (err, result) {
                                if (err) {
                                    console.error('SQL error: ', err);
                                    return next(err);
                                }
                                if (result.affectedRows >= 1) {
                                    res.send(helper.createResponse(helper.Success, helper.successStatusCode, "Updated successfully", ""));
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



    this.nextAid = function (req, res, next) {
              try {

            req.getConnection(function (err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    var query = " select aid from inventory ORDER BY aid DESC LIMIT 1;";

                    conn.query(query, function (err, result) {
                        if (err) {
                            console.error('SQL error: ', err);
                            return next(err);
                        }
                        if (result.length >= 1) {
                            res.send(helper.createResponse(helper.Success, helper.successStatusCode, "Success", result));

                        } else {
                            res.send(helper.createResponse(helper.Success, helper.errorStatusCode, helper.noResultMsg, "error info"));
                        }
                    });
                }
            });



        } catch (ex) {
            console.error("Internal error:" + ex);
            return next(ex);
        }
    };





}


module.exports = new assign();


