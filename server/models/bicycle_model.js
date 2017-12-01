var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: {type: String, required: true, index: { unique: true }},
  password: {type: String, required: true},
  _bikes: [{type: Schema.Types.ObjectId, ref:"Bike"}]
}, {timestamps: true});

var User = mongoose.model('User', UserSchema);

var BikeSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  location: {type: String, required: true},
  price: {type: Number, required: true},
  image_url: {type: String, required: true},
  _user: {type: Schema.Types.ObjectId, ref:"User"}
}, {timestamps: true});

var Bike = mongoose.model('Bike', BikeSchema);
