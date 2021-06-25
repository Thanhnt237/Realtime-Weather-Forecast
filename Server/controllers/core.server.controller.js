const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

const User = require('../db/models/user');

//multer Setup
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()  + "-" + file.originalname)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        console.log(file);
        if(file.mimetype=="image/bmp" ||
           file.mimetype=="image/png" ||
           file.mimetype=="image/jpg" ||
           file.mimetype=="image/jpeg" ||
           file.mimetype=="image/gif"
         ){
            cb(null, true)
        }else{
            return cb(new Error('Only image are allowed!'))
        }
    }
}).single("avatar");


module.exports = {
  renderHomePage: renderHomePage,
  UserRegister: UserRegister,
  UserLogin: UserLogin,
  getUserDetail: getUserDetail,
  verifyToken: verifyToken,
  EditUserProfile: EditUserProfile,
  ChangeAvatar: ChangeAvatar,
  renderAdminDevices: renderAdminDevices
};

/**
* @name renderHomePage
* @param  {object} req HTTP request
* @param  {object} res HTTP response
*/
function renderHomePage(req, res) {
  res.render('socket-chating');
}

/**
* @name renderAdminDevices
* @param  {object} req HTTP request
* @param  {object} res HTTP response
*/
function renderAdminDevices(req, res) {
  res.render('socket-devices');
}

/**
* @name VerifyToken
* @param  {object} req HTTP request
* @param  {object} res HTTP response
*/

function verifyToken(req,res,next) {
  if(!req.headers.authorization){
    return res.status(401).send('Unauthorized request');
  }

  let token = req.headers.authorization.split(' ')[1];

  if (token == 'null'){
    return res.status(401).send('Unauthorized request');
  }
  let payload = jwt.verify(token, 'secretKey');

  if(!payload){
    return res.status(401).send('Unauthorized request');
  }

  req.userId = payload.subject;
  next();
}

/**
* @name getUserDetail
* @param  {object} req HTTP request
* @param  {object} res HTTP response
*/

function getUserDetail(req,res) {
  let token = req.headers.authorization.split(' ')[1];
  let payload = jwt.verify(token, 'secretKey');
  let userEmail = payload.email;

  User.findOne({email: userEmail}, (err,user) =>{
    if(err){
      console.log("err" + err);
    }else {
      res.status(200).send(user);
    }
  });
}

/**
* @name UserRegister
* @param  {object} req HTTP request
* @param  {object} res HTTP response
*/
function UserRegister(req, res) {
  let userData = req.body;
  let hash_password = bcrypt.hashSync(userData.password, 10);

  let user = new User({
    name: userData.name,
    email: userData.email,
    password: hash_password
  });

  console.log(user);

  User.countDocuments({email: userData.email}, function (err, count){
    if(count>0){
        res.status(401).send('User existed!');
    }else {
      user.save((err,userRegisted) => {
        if(err){
          console.log("err" + err);
        }else {
          let payload = { subject: userRegisted._id, email: user.email };
          let token = jwt.sign(payload, 'secretKey');
          res.status(200).send({token});
        }
      })
    }
  });
}

/**
* @name UserLogin
* @param  {object} req HTTP request
* @param  {object} res HTTP response
*/
function UserLogin(req,res) {
  let userData = req.body;

if(userData.email === '' || userData.password === ''){
  res.status(401).send('Invalid Email and Password');
}else {
  User.findOne({email: userData.email}, (err,user) => {
    if(err){
      console.log("err" + err);
    }else{
      if(!user){
        res.status(401).send('Invalid Email');
      }else
      if(!user.comparePassword(userData.password)){
        res.status(401).send('Invalid Password');
      }else {
        let payload = { subject:user._id, email: user.email }
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token});
      }
    }
  })
}
}

/**
* @name EditUserProfile
* @param  {object} req HTTP request
* @param  {object} res HTTP response
*/

function EditUserProfile(req, res) {
  let token = req.headers.authorization.split(' ')[1];
  let payload = jwt.verify(token, 'secretKey');
  let userEmail = payload.email;

  if(req.password === ''){
    res.status(401).send('Password can not be Null');
  }
  else {
    let hash_password = bcrypt.hashSync(req.body.password, 10);
    User.findOneAndUpdate(
      {email: userEmail},
      {$set: {userId: req.body.userId,
              name: req.body.name,
              phone: req.body.phone,
              password: hash_password
      }},
    (err) => {
      if(err){
        res.json({kq: 0, 'err':err});
      }else {
        res.json({kq: 1});
      }
    });
  }
}

/**
* @name ChangeAvatar
* @param {object} req HTTP request
* @param {object} res HTTP response
*/

function ChangeAvatar(req,res) {
  let token = req.headers.authorization.split(' ')[1];
  let payload = jwt.verify(token, 'secretKey');
  let userEmail = payload.email;

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log("A Multer error occurred when uploading.");
      res.json({kq: 0, "err": err});
    } else if (err) {
      console.log("An unknown error occurred when uploading." + err);
      res.json({kq: 0, "err": err});
    }else{
        console.log("Upload is okay");
        //console.log(req.file); // Thông tin file đã upload
        //res.send({kq:1, "file": req.file})
        User.findOneAndUpdate(
          {email: userEmail},
          {$set: {avatar: req.file.filename}},
        (err) => {
          if(err){
            res.json({kq: 0, 'err':err});
          }else {
            res.json({kq: 1});
          }
        });
    }
  });
}
