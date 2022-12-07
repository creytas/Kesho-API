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

/**
 * @openapi
 * /user:
 *      delete:
 *          description: Delete all users
 *          tags:
 *            - users
 *          responses:
 *              200:
 *                  description: All center's raw material successfully deleted
 */
router.delete("/", userDestroyMiddleware, deleteUser);
/**
 * @openapi
 * /user:
 *      put:
 *          description: Update the current user's data
 *          tags:
 *            - users
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          {}
 *          responses:
 *              200:
 *                  description: Current user's data successfully updated
 */
router.put("/", userUpdateMiddleware, updateUser);
/**
 * @openapi
 * /user/register:
 *      post:
 *          description: Register in the kesho-cntes software
 *          tags:
 *              - authentication
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          {email:exemple@exemple.com, password:"000000"}
 *          responses:
 *              200:
 *                  description: You registered in successfully
 */
router.post("/register", userRegisterMiddleware, addUser);
/**
 * @openapi
 * /user:
 *      get:
 *          description: Display all users data
 *          tags:
 *            - users
 *          responses:
 *              200:
 *                  description: Users data successfully displayed
 */
router.get("/all", getAllUser);
/**
 * @openapi
 * /user/status:
 *      put:
 *          description: Change the user's status
 *          tags:
 *            - users
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          {}
 *          responses:
 *              200:
 *                  description: The user's status is successfully updated
 */
router.put("/status", userValidatorStatusMiddleware, updateStatusUser);
router.get("/", getUserMiddleware, getUserById);

module.exports = router;
