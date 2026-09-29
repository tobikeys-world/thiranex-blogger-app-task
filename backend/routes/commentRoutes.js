const express = require("express");

const {
    getCommentsByPost,
    createComment,
    deleteComment,
} = require("../controllers/commentController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public - get comments for a post
router.get("/post/:postId", getCommentsByPost);

// Protected - create comment
router.post("/post/:postId", protect, createComment);

// Protected - delete own comment
router.delete("/:id", protect, deleteComment);

module.exports = router;