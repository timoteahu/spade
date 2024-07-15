import express from "express";

import {
  deleteUser,
  getUser,
  joinGroup,
  leaveGroup,
  login,
  signUp,
} from "../controllers/userController";
import { checkMembership, verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", signUp);
router.post("/login", login);
router.post("/join", verifyToken, joinGroup);
router.post("/leave", verifyToken, checkMembership, leaveGroup);
router.post("/delete", verifyToken, deleteUser);

export default router;
