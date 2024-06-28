import express from "express";
import { getMessages, sendMessage } from "../controllers/messageController";
import { protectRoute } from "../middlewares/protectRoute";
const router = express.Router();

router.post("/send/:id",protectRoute, sendMessage);
router.get('/:id',protectRoute, getMessages);

export default router;
