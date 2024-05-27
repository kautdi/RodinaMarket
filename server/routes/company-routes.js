const Router = require('express');
const userController = require('../controllers/user-controller');
const companyController = require('../controllers/company-controller');

require('dotenv').config();

const router = new Router();

router.post("/registration", companyController.registration);
router.post("/login", companyController.login);
router.post("/getOneCompany", companyController.getOneCompany);
router.get("/getTovars", companyController.getTovarsByCompanyId);
router.post("/update", companyController.updateCompanyInfo);
router.get("/taxs", companyController.getTovarsByCompanyId);
router.post("/refresh", companyController.refresh);
router.get("/companies", companyController.getAllCompany);



module.exports = router;
