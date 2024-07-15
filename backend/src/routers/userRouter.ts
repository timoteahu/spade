import express from "express";

import {
  deleteUser,
  joinGroup,
  leaveGroup,
  login,
  signUp,
} from "../controllers/userController";
import { checkMembership } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", signUp);
router.post("/login", login);
router.post("/join", joinGroup);
router.post("/leave", checkMembership, leaveGroup);
router.post("/delete", deleteUser);

export default router;
