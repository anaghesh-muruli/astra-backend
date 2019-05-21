function tariffdestinationmap() {
    var helper = require('./helper');


    this.get = function (req, res, next) {
        try {
            req.getConnection(function (connectionError, conn) {
                if (connectionError) {
                    console.error('SQL Connection error: ', connectionError);
                    return next(connectionError);
                } else {
                    var query = "SELECT issue.tno, issue.aid, inventory.name, inventory.category, issue.type,issue.title, issue.attendedby, issue.status FROM issue INNER JOIN inventory ON issue.aid = inventory.aid";
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

    this.add = function (req, res, next) {
        try {
            var reqObj = req.body;
            req.getConnection(function (connectionError, conn) {
                if (connectionError) {
                    console.error('SQL Connection error: ', connectionError);
                    return next(connectionError);
                } else {
                            var insertSql = "INSERT INTO issue SET ?";

                            var insertValues = {

                                "aid":reqObj.aid,
                                "type":reqObj.type,
                                "status":'Pending',
                                "attendedby": '1',
                                "title" : reqObj.title,
                                "details" : reqObj.details,
                                //"createdOn" : "current_time_stamp"


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

    this.delete = function (req, res, next) {
        try {
            var reqObj = req.body;
            req.getConnection(function (err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {

                    var query = "delete from tariffdestinationmap where tdMapID = '" + reqObj.tdMapID + "'";
                    conn.query(query, function (err, result) {
                        if (err) {
                            console.error('SQL error: ', err);
                            return next(err);
                        }
                        if (result.affectedRows >= 1) {
                            res.send(helper.createResponse(helper.Success, helper.successStatusCode, "Deleted successfully", ""));
                        } else {
                            res.send(helper.createResponse(helper.Success, helper.errorStatusCode, helper.noResultMsg, "error while deleting becon info"));
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
        try {
            var reqObj = req.body;
            req.getConnection(function (err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    //select BeconID from becon where  BeconPublicID = '" + reqObj.BeconPublicID + "' and BeconID != '" + reqObj.BeconID
                    var checkDuplication = " select tripID from tariffdestinationmap where  tariffID = '" + reqObj.tariffID + "' and destinationID != '" + reqObj.destinationID+ "'";
                    conn.query(checkDuplication, function (sqlError, checkDuplicateResult) {
                        if (sqlError) {
                            console.error('SQL error: ', sqlError);
                            return next(sqlError);
                        }
                        if (checkDuplicateResult.length >= 1) {
                            res.send(helper.createResponse(helper.Error, helper.errorStatusCode, ' This entry exists.', ""));
                        } else {
                            var query = " update tariffdestinationmap set tariffID = '"+ reqObj.tariffID + "', destinationID = '"+ reqObj.destinationID +
                                 "'";
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






}


module.exports = new tariffdestinationmap();


