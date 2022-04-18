const express = require("express");
const ultimosApiController = require("../../controllers/API/ultimosApiController");
const router = express.Router();


router.get("/lastProduct", ultimosApiController.ultimProduct)
router.get("/lastUser", ultimosApiController.ultimUser)



module.exports = router;