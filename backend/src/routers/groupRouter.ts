import express from "express";

import * as groups from "../controllers/groupController";
import { checkMembership } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", groups.createGroup);
router.get("/:groupId", checkMembership, groups.getGroup);

export default router;
