var bicycle = require('../controllers/bicycle_controller.js');
var path = require('path');

module.exports = function(app){
  //user register
  app.post("/register", function(req, res) {
    bicycle.register(req, res);
  })

  //user login
  app.post("/login", function(req, res) {
    bicycle.login(req, res);
  })

  //create a new bike
  app.post("/user/:id/bike", function(req, res) {
    bicycle.createBikes(req, res);
  })

  //retrieve all the bike
  app.get("/bikes", function(req, res) {
    bicycle.getBikes(req, res);
  })

  //retrieve the creater of one bike
  app.get("/bikes/:id/user", function(req, res) {
    bicycle.findcreater(req, res);
  })

  //retrieve one user's all bikes
  app.get("/user/:id/bike", function(req, res) {
    bicycle.allMyBikes(req, res);
  })

  //delete one bike
  app.delete("/bikes/:id", function(req, res) {
    bicycle.destroy(req, res);
  })

  //update one bike
  app.put("/bikes/:id", function(req, res) {
    bicycle.update(req, res);
  })

  //search bikes
  app.post("/bikes/search", function(req, res) {
    bicycle.search(req, res);
  })

  app.all("*",function(req,res){
    res.sendFile('index.html', { root: './client/dist' });
  })




}
