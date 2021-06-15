const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const PORT = 3000;
const User = require('./user');
const userControl = new User();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



///////////////////////Middleware route to serve the home page////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
app.use(express.static('public'));
app.get('/', (req, res, next) => {

  const options = {
    root: path.join(__dirname + '/public/')
  };

  const fileName = 'login.html';
  res.sendFile(fileName, options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
      next();
    }
  });
});
//////////////////////////////////////////////////////////////////////////////////////
///////////////////////Middleware route to serve the home page////////////////////////

////////////////////////////
////Under implementation////
app.route('/users/:id')
  .get((req, res) => { })
  .put((req, res) => { })
  .delete((req, res) => { });
////Under implementation////
////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////
//Request triggered by the user registration function on the page "login_scripts.js"//
app.post('/users', (req, res) => {

  let newUser = {}
  newUser.id = 0;
  newUser.name = req.body.name;
  newUser.email = req.body.email1;
  newUser.phone = req.body.phone;
  newUser.password = req.body.password1;
  newUser.cep = req.body.cep;
  newUser.street = req.body.street;
  newUser.number = req.body.number;
  newUser.district = req.body.district;
  newUser.city = req.body.city;
  newUser.state = req.body.state;

  userControl.saveUsers(newUser);

  res.send('')
});
//Request triggered by the user registration function on the page "login_scripts.js"//
//////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////
/////Request triggered by the user login function on the page "login_scripts.js"//////
app.post('/login', (req, res) => {

  const userName = req.body.name;
  const userPassword = req.body.password;

  if (userControl.login(userName, userPassword)) {
    //if (userControl.validateLogin(userName, userPassword, userMatch)) {
    //userControl.login(userMatch);

    res.json('');
    //}
  } else {
    res.send('no user')
  }
})
/////Request triggered by the user login function on the page "login_scripts.js"//////
//////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////PORT configuration///////////////////////////////////
app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
/////////////////////////////////PORT configuration///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////