import express from "express";

import * as groups from "../controllers/groupController";
import { checkMembership } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", groups.createGroup);
router.get("/:userId", groups.getGroups);
router.get("/groups/:groupId", checkMembership, groups.getGroupById);
export default router;
