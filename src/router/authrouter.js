import {
  login,
  register,
  logout,
  otpVerification,
  isAuth,
} from "../controller/authController.js";
import express from "express";
import authGetToken from "../middelware/AccessToken.js";

const authrouter = express.Router();

authrouter.post("/register", register);
authrouter.post("/login", login);
authrouter.post("/logout", logout);
authrouter.post("/mailverify", authGetToken, otpVerification);
authrouter.get("/is-auth", authGetToken, isAuth);

export default authrouter;
