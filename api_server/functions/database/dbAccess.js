var mysql = require('mysql');
var config = require('config');
var conString = config.get('connectionString');

var connectionpool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'cfiapp'
});

var volunteer_functions = {
    getAll : function(req, res){
    connectionpool.getConnection(function(err, connection) {
            if (err) {
                console.error('CONNECTION error: ',err);
                res.statusCode = 503;
                res.send({
                    result: 'error',
                    err:    err.code
                });
            } else {
                connection.query('SELECT * FROM volunteer_master',function(err,rows){
                    if(err){
                        console.error(err);
                        res.statusCode = 500;
                        res.send({
                            result: 'error',
                            err:    err.code
                        });
                    }
                    res.send({
                        result: 'success',
                        err:    '',
                        json:   rows,
                        length: rows.length
                    });
                    connection.release();
                });
            }
    });
    
    },
    
    edit : function(req, res){
        
        var id = req.params.id;
        connectionpool.getConnection(function(err, connection) {
            if (err) {
                console.error('CONNECTION error: ',err);
                res.statusCode = 503;
                res.send({
                    result: 'error',
                    err:    err.code
                });
            } else {
                connection.query('SELECT * FROM volunteer_master WHERE id = ?',[id],function(err,rows){
                    if(err){
                        console.error(err);
                        res.statusCode = 500;
                        res.send({
                            result: 'error',
                            err:    err.code
                        });
                    }
                    res.send({
                        result: 'success',
                        err:    '',
                        json:   rows,
                        length: rows.length
                    });
                    connection.release();
                });
            }
        });
    },
    
    /*Save the customer*/
    add : function(req,res){
        console.log("inside volunteer add");
        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
                first_name    : input.data.first_name,
                last_name : input.data.last_name,
                email : input.data.email,
                mob : input.data.mob,
                password : input.data.password,
                gender : input.data.gender,
                dob : input.data.dob,
                address : input.data.address,
                city : input.data.city,
                state : input.data.state,
                image_url : input.data.state
        };
        connectionpool.getConnection(function(err, connection) {
            if (err) {
                console.error('CONNECTION error: ',err);
                res.statusCode = 503;
                res.send({
                    result: 'error',
                    err:    err.code
                });
            } else {
                var query = connection.query("INSERT INTO volunteer_master set ? ",data, function(err, rows){
                    if(err){
                        console.error(err);
                        res.statusCode = 500;
                        res.send({
                            result: 'error',
                            err:    err.code
                        });
                    }
                    res.send({
                        result: 'success',
                        err:    '',
                        json:   rows
                    });
                    connection.release();
                });
            }
        });
    },
    
    save_edit : function(req,res){    
        var input = JSON.parse(JSON.stringify(req.body));
        var id = req.params.id;
        connectionpool.getConnection(function(err, connection) {
            if (err) {
                console.error('CONNECTION error: ',err);
                res.statusCode = 503;
                res.send({
                    result: 'error',
                    err:    err.code
                });
            } else {
                var data = {
                first_name    : input.first_name,
                last_name : input.last_name,
                email : input.email,
                mob : input.mob,
                password : input.password,
                gender : input.gender,
                dob : input.dob
                };
                connection.query("UPDATE volunteer_master set ? WHERE id = ? ",[data,id], function(err, rows){
                    if(err){
                        console.error(err);
                        res.statusCode = 500;
                        res.send({
                            result: 'error',
                            err:    err.code
                        });
                    }
                    res.send({
                        result: 'success',
                        err:    '',
                        json:   rows,
                        length: rows.length
                    });
                    connection.release();
                });
            }
        });
    },
    
    
    delete_customer : function(req,res){
            
        var id = req.params.id;
        connectionpool.getConnection(function(err, connection) {
            if (err) {
                console.error('CONNECTION error: ',err);
                res.statusCode = 503;
                res.send({
                    result: 'error',
                    err:    err.code
                });
            } else {
                connection.query("DELETE FROM volunteer_master  WHERE id = ? ",[id], function(err, rows){
                    if(err){
                        console.error(err);
                        res.statusCode = 500;
                        res.send({
                            result: 'error',
                            err:    err.code
                        });
                    }
                    res.send({
                        result: 'success',
                        err:    '',
                        json:   rows,
                        length: rows.length
                    });
                    connection.release();
                });
            }
        });
    }
};

module.exports = volunteer_functions;
