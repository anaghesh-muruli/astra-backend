function employee() {
    var helper = require('./helper');
    var dateFormat = require('dateformat');



    this.get = function (req, res, next) {
        try {
            req.getConnection(function (connectionError, conn) {
                if (connectionError) {
                    console.error('SQL Connection error: ', connectionError);
                    return next(connectionError);
                } else {
                    var query = "select * from employee order by dept desc";
                    conn.query(query, function(sqlError, result) {
                        if (sqlError) {
                            console.error('SQL error: ', sqlError);
                            return next(sqlError);
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
}

module.exports = new employee();