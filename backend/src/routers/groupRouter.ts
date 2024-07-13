import express from "express";

import * as groups from "../controllers/groupController";

const router = express.Router();

router.post("/", groups.createGroup);
router.get("/:groupId", groups.getGroup);

export default router;
