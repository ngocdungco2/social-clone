import express from "express";
import { addCommentActivity, getLatestActivity, getLatestActivity1 } from "../controllers/activity.js";
const router = express.Router();

router.post("/", addCommentActivity);
router.get("/trending/:userId", getLatestActivity);
router.get("/load/:userID", getLatestActivity1);


export default router;
