import express from "express";
import {
  getLatestActivity,
  getLatestPost,
  getUser,
  getUserByCity,
  getUserByUserName,
  getUserId,
  updateUser,
} from "../controllers/user.js";

const router = express.Router();

router.get("/find/:userId", getUser);
router.get("/load/:userID", getUserByCity);
router.put("/", updateUser);
router.get("/search/:username", getUserByUserName);
router.get("/getUserId", getUserId);
router.get("/trending/:userID", getLatestActivity);
router.get("/latestPost/:userID", getLatestPost);

export default router;
