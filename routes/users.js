const express = require('express');
const router = express.Router();
const user = require("../controllers/users.js");

router.get("/",user.getUsers);
router.post("/",user.createUser);
router.post("/login",user.login);

module.exports = router;