// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId,
  Q = require('q');


var PageSchema = new Schema({
  id: String,
  // access_token: String,
  // access_token_expire: Number,
  staffs_list: [{
  	type: Schema.Types.ObjectId,
  	ref: 'Staff'
  }]
});

PageSchema.virtual('staffs')
  .get(function(){
  	var deferred = Q.defer();
  	console.log(this.populate('staffs_list'));
    this.populate('staffs_list').exec(function(err, page){
    	if (err) deferred.reject();
    	deferred.resolve(page.staffs_list);
    });
    return deferred.promise;
  });

mongoose.model('Page', PageSchema);

var StaffSchema = new Schema({
  value: String
});

mongoose.model('Staff', StaffSchema);

var Staff = mongoose.models.Staff;
var Page = mongoose.models.Page;

// var s = new Staff({value: 'Yo'});
// s.save(function(){
// 	var p = new Page({id: '1'});

// 	p.staffs_list.push(s);

// 	p.save(function (err) {
// 	  Page
// 		.findOne({ id: '1' }).populate('staffs_list').exec(function(err, page){
// 	    	//console.log(page);
// 	    });
// 	});

// })