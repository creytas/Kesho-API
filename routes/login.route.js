const router = require("express").Router();

const loginMiddleware = require("../middleware/login.middleware");
/**
 * @openapi
 * /auth/login:
 *      post:
 *          description: Log in the kesho-cntes dashboard
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
 *                  description: Welcome back, You logged in successfully
 */
router.post("/login", loginMiddleware);

module.exports = router;
