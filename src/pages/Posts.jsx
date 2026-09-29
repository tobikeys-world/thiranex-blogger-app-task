import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get("/posts");

                setPosts(response.data);
            } catch (error) {
                setError(
                    "Unable to load stories right now."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
                <div className="mx-auto max-w-7xl">
                    <p className="text-cyan-400">
                        Loading stories...
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">

            <div className="mx-auto max-w-7xl">

                <div className="max-w-3xl">
                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">
                        Intorac Stories
                    </p>

                    <h1 className="mt-4 font-['Space_Grotesk'] text-5xl font-bold tracking-tight sm:text-6xl">
                        Ideas worth
                        <span className="text-cyan-400">
                            {" "}sharing.
                        </span>
                    </h1>

                    <p className="mt-5 text-lg leading-8 text-slate-400">
                        Explore stories, perspectives and experiences
                        from the Intorac community.
                    </p>
                </div>

                {error && (
                    <div className="mt-10 rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-red-400">
                        {error}
                    </div>
                )}

                {!error && posts.length === 0 && (
                    <div className="mt-12 rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">
                        <h2 className="text-2xl font-bold">
                            No stories yet.
                        </h2>

                        <p className="mt-3 text-slate-500">
                            Be the first person to share an idea.
                        </p>
                    </div>
                )}

                <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">

                    {posts.map((post) => (
                        <article
                            key={post._id}
                            className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
                        >

                            {post.coverImage && (
                                <div className="h-52 overflow-hidden">
                                    <img
                                        src={post.coverImage}
                                        alt={post.title}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                </div>
                            )}

                            <div className="p-6">

                                <div className="flex items-center justify-between gap-4">
                                    <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-400">
                                        {post.category}
                                    </span>

                                    <span className="text-xs text-slate-600">
                                        {new Date(
                                            post.createdAt
                                        ).toLocaleDateString()}
                                    </span>
                                </div>

                                <h2 className="mt-5 font-['Space_Grotesk'] text-2xl font-bold leading-tight transition group-hover:text-cyan-400">
                                    {post.title}
                                </h2>

                                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
                                    {post.excerpt}
                                </p>

                                <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-5">

                                    <p className="text-xs font-semibold text-slate-500">
                                        By{" "}
                                        {post.author?.name ||
                                            "Intorac Writer"}
                                    </p>

                                    <Link
                                        to={`/posts/${post._id}`}
                                        className="text-sm font-bold text-cyan-400 transition hover:text-cyan-300"
                                    >
                                        Read →
                                    </Link>

                                </div>
                            </div>
                        </article>
                    ))}

                </div>
            </div>
        </main>
    );
};

export default Posts;