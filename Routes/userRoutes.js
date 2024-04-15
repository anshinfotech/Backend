const express = require("express");
const { submitdata, allusers, singleuser, updateUser, deleteUser, verifyUser } = require("../Controllers/userController");
const router = express.Router();

router.post("/submitdata",submitdata)
router.get("/allusers",allusers)
router.get("/singleuser",singleuser)
router.delete("/deleteuser",updateUser)
router.put("/updateuser/:_id",deleteUser)
router.post("/verifyuser/:_id",verifyUser)


module.exports = router;
