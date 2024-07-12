import express from 'express'
import * as groups from '../controllers/groupController'

const router = express.Router();

router.post("/create", groups.createGroup);
router.get("/:userId/get-groups", groups.getGroups);
router.get("/:groupId/join-group", groups.joinGroup);
router.get("/:groupId/leave-group", groups.leaveGroup)
router.get("/:groupId/change-group-name", groups.changeGroupName)

export default router