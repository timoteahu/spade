import express from "express";

import * as groups from "../controllers/groupController";

const router = express.Router();

router.post("/", groups.createGroup);
router.get("/:userId", groups.getGroups);
router.patch("/join/:groupId", groups.joinGroup);
router.patch("/leave/:groupId", groups.leaveGroup);
router.patch("/name/:groupId", groups.changeGroupName);

export default router;
