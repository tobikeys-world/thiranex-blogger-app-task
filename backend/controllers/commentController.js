const Comment = require("../models/Comment");

// Get comments for a post
const getCommentsByPost = async (req, res) => {
    try {
        const comments = await Comment.find({
            post: req.params.postId,
        })
            .populate("author", "name")
            .sort({ createdAt: -1 });

        res.json(comments);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch comments.",
            error: error.message,
        });
    }
};

// Create a comment
const createComment = async (req, res) => {
    try {
        const { content } = req.body;

        if (!content || !content.trim()) {
            return res.status(400).json({
                message: "Comment content is required.",
            });
        }

        const comment = await Comment.create({
            content: content.trim(),
            post: req.params.postId,
            author: req.user._id,
        });

        const populatedComment = await comment.populate(
            "author",
            "name"
        );

        res.status(201).json({
            message: "Comment added successfully.",
            comment: populatedComment,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create comment.",
            error: error.message,
        });
    }
};

// Delete own comment
const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found.",
            });
        }

        if (
            comment.author.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                message:
                    "You can only delete your own comments.",
            });
        }

        await comment.deleteOne();

        res.json({
            message: "Comment deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete comment.",
            error: error.message,
        });
    }
};

module.exports = {
    getCommentsByPost,
    createComment,
    deleteComment,
};