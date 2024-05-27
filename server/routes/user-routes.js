const Router = require('express');
const userController = require('../controllers/user-controller');

require('dotenv').config();

const router = new Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/refresh", userController.refresh);
router.post("/getOneUser", userController.getOneUser);
router.post("/updateInfo", userController.updateUserInfo);
router.post("/updateDelivery", userController.updateDeliveryInfo);


module.exports = router;
