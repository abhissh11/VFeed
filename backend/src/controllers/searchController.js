import User from "../models/User.js";
import Post from "../models/Post.js";

export const search = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.json({ users: [], posts: [] });

    // Case-insensitive regex
    const regex = new RegExp(query, "i");

    const users = await User.find({ username: regex }).select(
      "username avatar bio"
    );
    const posts = await Post.find({ content: regex })
      .populate("author", "username avatar")
      .limit(20);

    res.json({ users, posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
