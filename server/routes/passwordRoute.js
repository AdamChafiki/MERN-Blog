const {
  sendResetLinkCtrl,
  CheckValidCtrl,
  resetPasswordCtrl,
} = require("../controllers/PasswordController");

const router = require("express").Router();

// /api/password/reset
router.route("/reset").post(sendResetLinkCtrl);
// /api/password/reset/:userId/:token
router
  .route("/reset/:userId/:token")
  .get(CheckValidCtrl)
  .post(resetPasswordCtrl);

module.exports = router;
