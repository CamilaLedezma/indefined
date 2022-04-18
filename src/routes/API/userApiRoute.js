const express = require("express");
const userApiController = require("../../controllers/API/userApiController");
const { route } = require("./productApiRoute");
const router = express.Router();


router.get("/users", userApiController.users)
router.get("/users/:id", userApiController.detail)
router.get("/usersList",userApiController.list)



module.exports = router;