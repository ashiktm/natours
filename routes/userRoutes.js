const express = require("express");

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();
router.post("/signup", authController.signup);
router.post("/login", authController.login, authController.isLoggedIn);
router.get("/logout", authController.logout);

router.patch("/forgotPassword", authController.forgotPassword);
router.post("/resetPassword/:token", authController.resetPassword);
router.patch("/updateMyPassword", authController.protect, authController.updatePassword);

router.use(authController.protect);

router.get("/me", userController.getME, userController.getUser);
router.patch(
  "/updateMe",
  userController.uploadPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete("/deleteME", userController.deleteMe);

router.use(authController.restrictTo("admin"));

router.route("/").get(userController.getAllUser).post(userController.createUser);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
module.exports = router;
