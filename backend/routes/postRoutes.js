const express = require("express");

const {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
} = require("../controllers/postController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public
router.get("/", getPosts);
router.get("/:id", getPostById);

// Protected
router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

module.exports = router;