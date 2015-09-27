var db = require('./dbAccess');

var dbHelper={
	_insert : function(data,cb){
		db._insert(data,function(param){
			cb(param);
		});
	},
	_read : function(data,cb){
		db._read(data,function(param){
			cb(param);
		});
	},
	_readKey : function(data,cb){
		db._readKey(data,function(param){
			cb(param);
		});
	},
	_update : function(data,cb){
		db._update(data,function(param){
			cb(param);
		});
	},
	_delete : function(data,cb){
		db._delete(data,function(param){
			cb(param);
		});
	},
};

module.exports=dbHelper;