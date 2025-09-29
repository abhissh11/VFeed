import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { upload } from "../utils/upload.js";
import {
  createPost,
  getPosts,
  getPostById,
  toggleLike,
  addComment,
  deleteComment,
  deletePost,
  getPostComments,
  getPostsByHashtag,
  getPostsByAuthor,
} from "../controllers/postController.js";
import { attachTagsToPost } from "../controllers/tagController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  attachTagsToPost,
  createPost
);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.put("/:id/like", authMiddleware, toggleLike);
router.post("/:id/comment", authMiddleware, addComment);
router.get("/:id/comments", getPostComments);
router.delete("/:id/comments/:commentId", authMiddleware, deleteComment);
router.delete("/:id", authMiddleware, deletePost);
router.get("/hashtag/:tag", getPostsByHashtag);
router.get("/author/:authorId", getPostsByAuthor);

export default router;
