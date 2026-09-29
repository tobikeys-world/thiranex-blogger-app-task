const Post = require("../models/Post");

// Get all posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("author", "name email")
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch posts.",
            error: error.message,
        });
    }
};

// Get one post
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate("author", "name email");

        if (!post) {
            return res.status(404).json({
                message: "Post not found.",
            });
        }

        res.json(post);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch post.",
            error: error.message,
        });
    }
};

// Create post
const createPost = async (req, res) => {
    try {
        const {
            title,
            excerpt,
            content,
            coverImage,
            category,
            tags,
        } = req.body;

        if (!title || !excerpt || !content || !category) {
            return res.status(400).json({
                message:
                    "Title, excerpt, content and category are required.",
            });
        }

        const post = await Post.create({
            title,
            excerpt,
            content,
            coverImage,
            category,
            tags: tags || [],
            author: req.user._id,
        });

        const populatedPost = await post.populate(
            "author",
            "name email"
        );

        res.status(201).json({
            message: "Post created successfully.",
            post: populatedPost,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create post.",
            error: error.message,
        });
    }
};

// Update own post
const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found.",
            });
        }

        if (
            post.author.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                message:
                    "You can only edit your own posts.",
            });
        }

        const {
            title,
            excerpt,
            content,
            coverImage,
            category,
            tags,
        } = req.body;

        post.title = title ?? post.title;
        post.excerpt = excerpt ?? post.excerpt;
        post.content = content ?? post.content;
        post.coverImage = coverImage ?? post.coverImage;
        post.category = category ?? post.category;
        post.tags = tags ?? post.tags;

        await post.save();

        const updatedPost = await post.populate(
            "author",
            "name email"
        );

        res.json({
            message: "Post updated successfully.",
            post: updatedPost,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update post.",
            error: error.message,
        });
    }
};

// Delete own post
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found.",
            });
        }

        if (
            post.author.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                message:
                    "You can only delete your own posts.",
            });
        }

        await post.deleteOne();

        res.json({
            message: "Post deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete post.",
            error: error.message,
        });
    }
};

module.exports = {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};