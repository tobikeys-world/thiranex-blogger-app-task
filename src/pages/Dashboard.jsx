import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const { user } = useAuth();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const handleDelete = async (postId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this story?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await api.delete(`/posts/${postId}`);

            setPosts((prevPosts) =>
                prevPosts.filter(
                    (post) => post._id !== postId
                )
            );
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to delete the story."
            );
        }
    };

    useEffect(() => {
        const fetchMyPosts = async () => {
            try {
                const response = await api.get("/posts");

                const myPosts = response.data.filter(
                    (post) =>
                        post.author?._id === user?.id
                );

                setPosts(myPosts);
            } catch (error) {
                setError(
                    "Unable to load your stories."
                );
            } finally {
                setLoading(false);
            }
        };

        if (user?.id) {
            fetchMyPosts();
        }
    }, [user?.id]);

    return (
        <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <section className="flex flex-col gap-6 border-b border-slate-800 pb-10 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">
                            Dashboard
                        </p>

                        <h1 className="mt-3 font-['Space_Grotesk'] text-4xl font-bold tracking-tight sm:text-5xl">
                            Welcome, {user?.name || "Writer"}.
                        </h1>

                        <p className="mt-3 text-slate-400">
                            Manage your stories and keep the
                            conversation going.
                        </p>
                    </div>

                    <Link
                        to="/create-post"
                        className="inline-flex w-fit rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/20"
                    >
                        + Write a Story
                    </Link>
                </section>

                {/* Stats */}
                <section className="mt-8 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                        <p className="text-sm text-slate-500">
                            Stories
                        </p>

                        <p className="mt-2 text-3xl font-bold text-white">
                            {posts.length}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                        <p className="text-sm text-slate-500">
                            Role
                        </p>

                        <p className="mt-2 text-3xl font-bold capitalize text-white">
                            {user?.role || "User"}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                        <p className="text-sm text-slate-500">
                            Platform
                        </p>

                        <p className="mt-2 text-3xl font-bold text-cyan-400">
                            Intorac
                        </p>
                    </div>
                </section>

                {/* Stories */}
                <section className="mt-14">

                    <div className="mb-6">
                        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-400">
                            Your Writing
                        </p>

                        <h2 className="mt-2 font-['Space_Grotesk'] text-3xl font-bold">
                            My Stories
                        </h2>
                    </div>

                    {loading ? (
                        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-10 text-center">
                            <p className="text-cyan-400">
                                Loading your stories...
                            </p>
                        </div>
                    ) : error ? (
                        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-red-400">
                            {error}
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/30 p-12 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10 text-2xl text-cyan-400">
                                ✦
                            </div>

                            <h3 className="mt-6 text-xl font-bold">
                                Your first story is waiting.
                            </h3>

                            <p className="mx-auto mt-3 max-w-md text-slate-500">
                                Share an idea, experience, or
                                perspective and start a conversation.
                            </p>

                            <Link
                                to="/create-post"
                                className="mt-6 inline-block rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950"
                            >
                                Write Your First Story
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2">
                            {posts.map((post) => (
                                <article
                                    key={post._id}
                                    className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 transition hover:-translate-y-1 hover:border-slate-700"
                                >
                                    {post.coverImage && (
                                        <img
                                            src={post.coverImage}
                                            alt={post.title}
                                            className="h-52 w-full object-cover"
                                        />
                                    )}

                                    <div className="p-6">

                                        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                                            {post.category}
                                        </span>

                                        <h3 className="mt-3 text-2xl font-bold leading-tight">
                                            {post.title}
                                        </h3>

                                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                                            {post.excerpt}
                                        </p>

                                        <p className="mt-5 text-xs text-slate-600">
                                            Published{" "}
                                            {new Date(
                                                post.createdAt
                                            ).toLocaleDateString()}
                                        </p>

                                        <div className="mt-6 flex items-center gap-4 border-t border-slate-800 pt-5">
                                            <Link
                                                to={`/posts/${post._id}`}
                                                className="text-sm font-bold text-cyan-400 hover:text-cyan-300"
                                            >
                                                View →
                                            </Link>

                                            <Link
                                                to={`/edit-post/${post._id}`}
                                                className="text-sm font-bold text-slate-500 transition hover:text-cyan-400"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(post._id)}
                                                className="text-sm font-bold text-slate-500 transition hover:text-red-400"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
};

export default Dashboard;