import express from "express";
import {
  getRelationships,
  addRelationship,
  deleteRelationship,
  getRelationshipsByCity,
} from "../controllers/relationship.js";

const router = express.Router();

router.get("/", getRelationships);
router.post("/", addRelationship);
router.delete("/", deleteRelationship);
router.get("/", getRelationshipsByCity);

export default router;
