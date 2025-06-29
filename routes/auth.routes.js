import express from "express";
import {
  login,
  refreshToken,
  register,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/refreshtoken", refreshToken);

export default router;
