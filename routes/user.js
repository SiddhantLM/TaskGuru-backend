const express = require("express");
const router = express.Router();
const { toggleTheme, updateUser, deleteUser } = require("../controller/user");
const isAuth = require("../middlewares/isAuth");

router.post("/toggle-theme", isAuth, toggleTheme);
router.put("/update-user", isAuth, updateUser);
router.delete("/delete-user", isAuth, deleteUser);

module.exports = router;
