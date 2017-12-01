var mongoose = require('mongoose');
var Bike = mongoose.model('Bike');
var User = mongoose.model('User');

var path = require('path');
module.exports = {
  register: function(req, res) {
    User.findOne({email: req.body.email}, function(err, user) {
      console.log("from controller regi user: ",user);
      if(err) {
        console.log("register error from controller: ", err);
      }
      else {
        if(user == null) {
          console.log("from controller regi: ", req.body);
          var user = new User({first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, password: req.body.password});
          user.save(function(err, user) {
            if(err) {
              console.log(err);
              res.json(err);
            }
            else {
              res.json({success:"success", user: user});
            }
          })
        }
        else {
          res.json("email existed");
        }
      }
    })
  },

  login: function(req, res) {
    console.log("from controller login: ", req.body.email);

    User.findOne({email: req.body.email}, function(err, user) {
      if(err) {
        console.log("can't find user email from login controller", err);
      }
      else {
        if(user == null) {
          res.json({error: "email invalid"});
        }
        else {
          if(user.password == req.body.password) {
            console.log("from controller login", user)
            res.json(user);
          }
          else {
            res.json({error: "password is not correct."})
          }
        }
      }
    })
  },

  createBikes: function(req, res) {
    console.log("from controller createBikes: ", req.body);
    User.findOne({_id: req.params.id}, function(err, user) {
      console.log("from create bike controller,", req.body)
      var bike = new Bike(req.body);
      bike._user = user._id;
      bike.save(function(err) {
        if (err) {
          console.log("controller creat bike relationship", err);
        }
        else {
          user._bikes.push(bike);
          console.log("controller creat bike successfully");
          user.save(function(err) {
            if (err) { console.log(err); }
            else { console.log("create successfully"); }
          })
        }
      })
    })
  },

  findcreater: function(req, res) {
    User.findOne({_id: req.params.id}, function(err, user) {
      console.log("from controller findcreater: ", user);
      if(err) {
        console.log("from controller findcreater: ", err);
      }
      else {
        res.json(user);
      }
    })
  },

  //search bikes
  search: function(req, res) {
    Bike.find({$or: [{title: {$regex: req.body.data}}, {description: {$regex: req.body.data}}]}).sort({updatedAt: "desc"}).exec(function(err, bikes) {
      if(err) {
        console.log("search error from controller: ", err);
        res.json({error: err});
      }
      else {
        res.json(bikes);
      }
    })
  },


  //retrieve all the bikes
  getBikes: function(req, res) {
    Bike.find({},function(err, bikes) {
      if(err) {
        console.log("from controller getbike: ", err);
      }
      else {
        res.json(bikes)
      }
    })
  },
  //retrieve all the bike created by one user
  allMyBikes: function(req, res) {
    User.findOne({_id: req.params.id}).populate("_bikes").
    exec(function(err, user) {
      if (err) {
        console.log("from allMyBikes controller: ", err);
      }
      else {
        console.log("success from allMyBikes controller: ", user);
        res.json(user);
      }
    })
  },

  destroy: function(req, res) {
    console.log("delete from controller");
    Bike.remove({_id: req.params.id}, function(err) {
      if(err) {
        console.log("back end destroy method");
        res.json({err: err});
      }
      else {
        res.json("delete success");
      }  
    })
  },

  update: function(req, res) {
    console.log("from controller update: ", req.body.title)
    Bike.findOne({_id: req.params.id}, function(err, bike) {
      if(err) {
        console.log("from controller update err: ", err);
      }
      else {

        bike.title = req.body.title;
        bike.description = req.body.description;
        bike.price = req.body.price;
        bike.location = req.body.location;
        bike.image_url = req.body.image_url;
        bike.save(function(err) {
          if(err) {
            console.log(" err from controller update after save: ", err);
          }
          else {
            console.log("from controller update after err: ", bike);
            res.json("update success");
          }
        })
      }
    })
  }


  
  
  
}






