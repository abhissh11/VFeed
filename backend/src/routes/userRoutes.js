import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  toggleFollow,
  getFollowingFeed,
  getExploreFeed,
  getUserConnections,
} from "../controllers/userController.js";

const router = express.Router();

router.put("/:id/follow", authMiddleware, toggleFollow);
router.get("/feed", authMiddleware, getFollowingFeed);
router.get("/explore", getExploreFeed);
router.get("/:id/connections", getUserConnections);

export default router;
