"core.server.routes.js";

/**
* @module routes
* @description
* Define all core routes of applications
*/
"user strict";

var express = require('express');
var router = express.Router();

const coreCtrl = require('../controllers').Core;

  router.route('/api/register').post(coreCtrl.UserRegister);
  router.route('/api/login').post(coreCtrl.UserLogin);
  router.route('/api/profile').get(coreCtrl.verifyToken, coreCtrl.getUserDetail);
  router.route('/api/change-avatar').post(coreCtrl.ChangeAvatar);
  router.route('/api/edit-profile').post(coreCtrl.EditUserProfile);

module.exports = router;
