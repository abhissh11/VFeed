import express from "express";
import multer from "multer";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  toggleFollow,
  getFollowingFeed,
  getExploreFeed,
  getUserConnections,
  updateProfile,
} from "../controllers/userController.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.put("/:id/follow", authMiddleware, toggleFollow);
router.get("/feed", authMiddleware, getFollowingFeed);
router.get("/explore", getExploreFeed);
router.get("/:id/connections", getUserConnections);
router.put("/me", authMiddleware, upload.single("avatar"), updateProfile);

export default router;
