import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const PostDetails = () => {
    const { id } = useParams();
    const { user, isAuthenticated } = useAuth();

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");

    const [loading, setLoading] = useState(true);
    const [commentLoading, setCommentLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchPost = async () => {
        try {
            const response = await api.get(`/posts/${id}`);
            setPost(response.data);
        } catch (error) {
            setError("Unable to load this story.");
        }
    };

    const fetchComments = async () => {
        try {
            const response = await api.get(
                `/comments/post/${id}`
            );

            setComments(response.data);
        } catch (error) {
            console.error("Failed to load comments:", error);
        }
    };

    useEffect(() => {
        const loadPage = async () => {
            setLoading(true);

            await Promise.all([
                fetchPost(),
                fetchComments(),
            ]);

            setLoading(false);
        };

        loadPage();
    }, [id]);

    const handleCommentSubmit = async (event) => {
        event.preventDefault();

        if (!commentText.trim()) {
            return;
        }

        try {
            setCommentLoading(true);

            const token =
                localStorage.getItem("intoracToken");

            const response = await api.post(
                `/comments/post/${id}`,
                {
                    content: commentText,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setComments((prevComments) => [
                response.data.comment,
                ...prevComments,
            ]);

            setCommentText("");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to add comment."
            );
        } finally {
            setCommentLoading(false);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const token =
                localStorage.getItem("intoracToken");

            await api.delete(
                `/comments/${commentId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setComments(
                (prevComments) =>
                    prevComments.filter(
                        (comment) => comment._id !== commentId
                    )
            );
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to delete comment."
            );
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
                <div className="mx-auto max-w-4xl">
                    <p className="text-cyan-400">
                        Loading story...
                    </p>
                </div>
            </main>
        );
    }

    if (error || !post) {
        return (
            <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="text-3xl font-bold">
                        Story not found
                    </h1>

                    <Link
                        to="/posts"
                        className="mt-6 inline-block text-cyan-400"
                    >
                        ← Back to stories
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white">

            {/* Article Header */}
            <section className="mx-auto max-w-5xl px-6 pb-12 pt-16">

                <Link
                    to="/posts"
                    className="text-sm font-semibold text-cyan-400 hover:text-cyan-300"
                >
                    ← Back to stories
                </Link>

                <div className="mt-10">
                    <span className="rounded-full bg-cyan-400/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                        {post.category}
                    </span>

                    <h1 className="mt-6 font-['Space_Grotesk'] text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
                        {post.title}
                    </h1>

                    <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
                        {post.excerpt}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                        <span>
                            By{" "}
                            <strong className="text-slate-300">
                                {post.author?.name}
                            </strong>
                        </span>

                        <span>•</span>

                        <span>
                            {new Date(
                                post.createdAt
                            ).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </section>

            {/* Cover Image */}
            {post.coverImage && (
                <section className="mx-auto max-w-6xl px-6">
                    <img
                        src={post.coverImage}
                        alt={post.title}
                        className="max-h-[600px] w-full rounded-3xl object-cover"
                    />
                </section>
            )}

            {/* Article Content */}
            <article className="mx-auto max-w-3xl px-6 py-16">

                <div className="whitespace-pre-line text-lg leading-9 text-slate-300">
                    {post.content}
                </div>

                {/* Tags */}
                {post.tags?.length > 0 && (
                    <div className="mt-12 flex flex-wrap gap-2 border-t border-slate-800 pt-8">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-400"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </article>

            {/* Comments */}
            <section className="border-t border-slate-800 bg-slate-900/40">
                <div className="mx-auto max-w-3xl px-6 py-16">

                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-400">
                                Conversation
                            </p>

                            <h2 className="mt-2 font-['Space_Grotesk'] text-3xl font-bold">
                                Comments
                            </h2>
                        </div>

                        <span className="text-sm text-slate-500">
                            {comments.length}{" "}
                            {comments.length === 1
                                ? "comment"
                                : "comments"}
                        </span>
                    </div>

                    {/* Comment Form */}
                    {isAuthenticated ? (
                        <form
                            onSubmit={handleCommentSubmit}
                            className="mt-8"
                        >
                            <textarea
                                value={commentText}
                                onChange={(event) =>
                                    setCommentText(
                                        event.target.value
                                    )
                                }
                                placeholder="Share your thoughts..."
                                rows="4"
                                maxLength="500"
                                className="w-full resize-none rounded-2xl border border-slate-700 bg-slate-950 p-4 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
                            />

                            <div className="mt-3 flex items-center justify-between">
                                <span className="text-xs text-slate-600">
                                    {commentText.length}/500
                                </span>

                                <button
                                    type="submit"
                                    disabled={commentLoading}
                                    className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
                                >
                                    {commentLoading
                                        ? "Posting..."
                                        : "Post Comment"}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 p-6 text-center">
                            <p className="text-slate-400">
                                Sign in to join the conversation.
                            </p>

                            <Link
                                to="/login"
                                className="mt-3 inline-block font-semibold text-cyan-400"
                            >
                                Sign in →
                            </Link>
                        </div>
                    )}

                    {/* Comments List */}
                    <div className="mt-10 space-y-5">

                        {comments.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-slate-800 p-8 text-center">
                                <p className="text-slate-500">
                                    No comments yet. Start the
                                    conversation.
                                </p>
                            </div>
                        ) : (
                            comments.map((comment) => (
                                <div
                                    key={comment._id}
                                    className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
                                >
                                    <div className="flex items-start justify-between gap-4">

                                        <div>
                                            <p className="font-bold text-white">
                                                {comment.author?.name ||
                                                    "Intorac User"}
                                            </p>

                                            <p className="mt-1 text-xs text-slate-600">
                                                {new Date(
                                                    comment.createdAt
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>

                                        {user?.id ===
                                            comment.author?._id && (
                                                <button
                                                    onClick={() =>
                                                        handleDeleteComment(
                                                            comment._id
                                                        )
                                                    }
                                                    className="text-xs font-semibold text-slate-600 hover:text-red-400"
                                                >
                                                    Delete
                                                </button>
                                            )}
                                    </div>

                                    <p className="mt-4 leading-7 text-slate-400">
                                        {comment.content}
                                    </p>
                                </div>
                            ))
                        )}

                    </div>
                </div>
            </section>
        </main>
    );
};

export default PostDetails;