import express from "express";

import * as groups from "../controllers/groupController";

const router = express.Router();

router.post("/", groups.createGroup);
router.get("/:userId", groups.getGroups);

export default router;
