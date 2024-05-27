const Router = require('express');
const zakazController = require('../controllers/zakaz-controller');
const companyController = require('../controllers/company-controller');

require('dotenv').config();

const router = new Router();

router.get("/getAllZakaz", zakazController.getAllZakaz);
router.post("/createZakaz", zakazController.createZakaz);
router.post("/delete", zakazController.deleteZakaz);
router.get("/getTovarsByUserId", zakazController.getTovarsByUserId);
router.get("/getZakazCompany", companyController.getZakazCompany);
router.post("/changeStatus",zakazController.changeStatus);


module.exports = router;
