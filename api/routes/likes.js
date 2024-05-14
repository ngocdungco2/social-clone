import express from "express";
import { getLikes, addLike, deleteLike, addLogLike, removeLog } from "../controllers/like.js";

const router = express.Router()

router.get("/", getLikes)
router.post("/", addLike)
router.post("/log", addLogLike)
router.delete("/", deleteLike)
router.delete("/removeLog", removeLog)


export default router