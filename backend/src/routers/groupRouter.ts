import express from "express";

import * as groups from "../controllers/groupController";

const router = express.Router();

router.post("/", groups.createGroup);
router.get("/:userId", groups.getGroups);
router.get("/join/:groupId", groups.joinGroup);
router.get("/leave/:groupId", groups.leaveGroup);
router.get("/change-name/:groupId", groups.changeGroupName);

export default router;
