import express from "express";
import {
  getPostsByTag,
  getTrendingTags,
} from "../controllers/tagController.js";

const router = express.Router();

router.get("/:tag", getPostsByTag);
router.get("/", getTrendingTags); // /api/tags → trending

export default router;
