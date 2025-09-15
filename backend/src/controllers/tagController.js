import Post from "../models/Post.js";

// Utility: extract hashtags from text
const extractHashtags = (text) => {
  const regex = /#(\w+)/g;
  const tags = [];
  let match;
  while ((match = regex.exec(text))) {
    tags.push(match[1].toLowerCase());
  }
  return tags;
};

// Middleware to save tags when creating post (hook style)
export const attachTagsToPost = async (req, res, next) => {
  try {
    if (req.body.content) {
      req.body.tags = extractHashtags(req.body.content);
    }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET posts by tag
export const getPostsByTag = async (req, res) => {
  try {
    const { tag } = req.params;
    const posts = await Post.find({ tags: tag.toLowerCase() })
      .populate("author", "username avatar")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET trending tags
export const getTrendingTags = async (req, res) => {
  try {
    // Aggregate tags usage
    const trending = await Post.aggregate([
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    res.json(trending);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
