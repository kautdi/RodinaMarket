const Router = require('express');
const userController = require('../controllers/user-controller');
const tovarsController = require('../controllers/tovars-controller');
const fileMiddleware = require('../middlewares/file');
require('dotenv').config();

const router = new Router();

router.get("/sneakers", tovarsController.getAllTovars);
router.post("/sneakerOne", tovarsController.getOneTovar);
router.post("/getCompanySneaker", tovarsController.getOneCompanyTovar);
router.get("/sizes", tovarsController.getAllSize);
router.get("/brands", tovarsController.getAllBrands);
router.get("/colors", tovarsController.getAllColor);

router.post("/createSneaker", tovarsController.createTovar);
router.post("/updateSneaker", tovarsController.updateTovars);
router.post("/deleteSneaker", tovarsController.deleteTovars);
router.post("/uploadImage", fileMiddleware.single('picture'), tovarsController.uploadImage);




module.exports = router;
