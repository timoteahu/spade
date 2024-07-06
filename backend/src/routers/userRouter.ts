import express from "express";
import { upsertUser } from "../controllers/userController";
const router = express.Router();

router.post("/", upsertUser);

export default router;
