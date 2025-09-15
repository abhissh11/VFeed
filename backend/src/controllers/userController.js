import User from "../models/User.js";
import Post from "../models/Post.js";

// Follow / Unfollow User
export const toggleFollow = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.userId;

    if (targetUserId === currentUserId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser) return res.status(404).json({ message: "User not found" });

    const alreadyFollowing = currentUser.following.includes(targetUserId);

    if (alreadyFollowing) {
      currentUser.following.pull(targetUserId);
      targetUser.followers.pull(currentUserId);
    } else {
      currentUser.following.push(targetUserId);
      targetUser.followers.push(currentUserId);
    }

    await currentUser.save();
    await targetUser.save();

    res.json({
      following: currentUser.following,
      followers: targetUser.followers,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Following Feed
export const getFollowingFeed = async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);
    const posts = await Post.find({ author: { $in: currentUser.following } })
      .populate("author", "username avatar")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Explore Feed (All Posts)
export const getExploreFeed = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username avatar")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Followers / Following list
export const getUserConnections = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("followers", "username avatar")
      .populate("following", "username avatar");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      followers: user.followers,
      following: user.following,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
