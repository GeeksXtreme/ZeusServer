var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId,
  Q = require('q');

 module.exports = function(app){
 	var DB = {};
 	DB.model = function(name){
 		return mongoose.models[name];
 	};
 	DB.find = function(){
 		var deferred = Q.defer();
 		var name = arguments[0];
 		var args = [];
 		for (var i = 1, l = arguments.length; i < l; i++) {
 			args.push(arguments[i]);
 		};
 		var model = mongoose.models[name];
 		var model_path = model.schema.paths;
 		var result = model.find.apply(model,args);
		for (prop in model_path){
			if (model_path[prop].caster 
				&& model_path[prop].caster.instance==='ObjectID')
				result = result.populate(prop);
		}
		result.exec(function(err, found){
			if (err) deferred.reject();
	    	deferred.resolve(found);
	    });
	    return deferred.promise;
 	};
 	app.createModule('DB', DB);
 }