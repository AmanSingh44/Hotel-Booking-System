import express from "express";
import { check } from "express-validator";
import verifyUserLogin from "../controller/authController";
import verifyToken from "../middlewares/auth";
import { bookingUserDetails, createNewUser } from "../controller/userController";
const router = express.Router();

router.get('/me',verifyToken, bookingUserDetails)

router.post(
  "/register",
  [
    check("name", "Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password must be 6 charatcer").isLength({ min: 6 }),
  ],
  createNewUser
);

router.post(
  "/signin",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password must be 6 character").isLength({
      min: 6,
    }),
  ],
  verifyUserLogin
);

router.get("/validate-token", verifyToken, (req, res) => {
  res.status(200).send({ userId: req.userId });
});

router.post("/signout", (req, res) => {
  res.cookie("auth_token", " ", {
    expires: new Date(0),
  });
  res.send();
});

module.exports = router;