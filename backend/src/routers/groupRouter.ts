import express from "express";

import * as groups from "../controllers/groupController";

const router = express.Router();

router.post("/", groups.createGroup);
// router.get("/:groupId", checkMembership, groups.getGroup);

export default router;
