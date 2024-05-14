import express from "express";
import {
  getPosts,
  addPost,
  deletePost,
  getPostsUnverified,
  verifyPost,
  addLogPost,
  removeLog,
} from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/unverified", getPostsUnverified);

router.post("/verify", verifyPost);
router.post("/log", addLogPost);
router.post("/", addPost);

router.delete("/:id", deletePost);
router.delete("/removeLog/:id", removeLog);

export default router;
