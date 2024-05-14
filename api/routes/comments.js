import express from "express";
import {
  getComments,
  addComment,
  deleteComment,
  addLogComment,
  // removeLogComment,
} from "../controllers/comment.js";

const router = express.Router();

router.get("/", getComments);
router.post("/", addComment);
router.delete("/:id", deleteComment);
router.post("/log", addLogComment);
// router.delete("/RMlog/:id", removeLogComment);

export default router;
