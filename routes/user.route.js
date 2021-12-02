const {
  getAllUser,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  resetPassword,
  updateStatusUser,
} = require("../controllers/user.controller");

const userDestroyMiddleware = require("../middleware/user/user.destroy.middleware");
const getUserMiddleware = require("../middleware/user/user.get.middleware");
const userRegisterMiddleware = require("../middleware/user/user.register.middleware");
const userUpdateMiddleware = require("../middleware/user/user.update.middleware");
const loginMiddleware = require("../middleware/login.middleware");
const userValidatorReset = require("../middleware/user/user.validator.reset.middleware");
const userValidatorStatusMiddleware = require("../middleware/user/user.validator.status.middleware");

const router = require("express").Router();
const routerReset = require("express").Router();

router.delete("/", userDestroyMiddleware, deleteUser);
router.put("/", userUpdateMiddleware, updateUser);
router.post("/register", userRegisterMiddleware, addUser);
router.get("/all", getAllUser);
router.put("/status", userValidatorStatusMiddleware, updateStatusUser )
router.get("/", getUserMiddleware, getUserById);

module.exports = router;
