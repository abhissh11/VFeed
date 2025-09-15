import Post from "../models/Post.js";
import Notification from "../models/Notification.js";
import { sendNotification } from "../socket/socket.js";

// Create Post
export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const hashtags = content.match(/#\w+/g) || [];
    const image = req.file ? req.file.filename : null;

    const newPost = new Post({
      author: req.userId,
      content,
      image,
      hashtags,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Posts (Explore)
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username avatar")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single Post
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "username avatar")
      .populate("comments.user", "username avatar");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Like / Unlike Post
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const alreadyLiked = post.likes.includes(req.userId);
    if (alreadyLiked) {
      post.likes.pull(req.userId);
    } else {
      post.likes.push(req.userId);

      const notif = await Notification.create({
        recipient: post.author,
        sender: req.userId,
        type: "like",
        post: post._id,
      });

      sendNotification(post.author.toString(), notif);
    }

    await post.save();
    res.json({ likes: post.likes.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add Comment
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = { user: req.userId, text };
    post.comments.push(comment);

    await post.save();

    // Create notification
    const notif = await Notification.create({
      recipient: post.author,
      sender: req.userId,
      type: "comment",
      post: post._id,
    });

    sendNotification(post.author.toString(), notif);

    res.json(post.comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
