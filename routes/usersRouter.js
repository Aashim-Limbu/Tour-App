const express = require('express');

const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  checkUser,
} = require('../controllers/userController');

const router = express.Router();
//index in param is called everytime when we react /:index it is used in order to check if the useer is available or not
//the checkUser also have the argument req,res,next,val where val is used to check the value of the index sent
// since a router is specified to a particular  Router so the router.param is bound with the userRouter
router.param('index', checkUser);
router.route('/').get(getAllUsers).post(createUser);
router.route('/:index').get(getUser).patch(updateUser).delete(deleteUser);
module.exports = router;
