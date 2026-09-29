import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        tags: "",
        coverImage: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(
                    `/posts/${id}`
                );

                const post = response.data;

                setFormData({
                    title: post.title || "",
                    excerpt: post.excerpt || "",
                    content: post.content || "",
                    category: post.category || "",
                    tags: post.tags?.join(", ") || "",
                    coverImage: post.coverImage || "",
                });
            } catch (error) {
                setError(
                    "Unable to load this story."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

        try {
            setSaving(true);
            const postData = {
                title: formData.title,
                excerpt: formData.excerpt,
                content: formData.content,
                category: formData.category,
                coverImage: formData.coverImage,
                tags: formData.tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean),
            };
            await api.put(`/posts/${id}`, postData);

            navigate(`/posts/${id}`);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update the story."
            );
        } finally {
            setSaving(false);
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

    if (error && !formData.title) {
        return (
            <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="text-3xl font-bold">
                        Story unavailable
                    </h1>

                    <p className="mt-4 text-red-400">
                        {error}
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
            <div className="mx-auto max-w-4xl">

                <div className="mb-10">
                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">
                        Edit Story
                    </p>

                    <h1 className="mt-3 font-['Space_Grotesk'] text-4xl font-bold tracking-tight sm:text-5xl">
                        Refine your idea.
                    </h1>

                    <p className="mt-4 text-slate-400">
                        Make your changes and publish the
                        updated version.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl sm:p-8"
                >

                    {error && (
                        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    {/* Title */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-300">
                            Title *
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 text-white outline-none transition focus:border-cyan-400"
                        />
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-300">
                            Excerpt *
                        </label>

                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            maxLength="220"
                            rows="3"
                            required
                            className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 text-white outline-none transition focus:border-cyan-400"
                        />

                        <p className="mt-2 text-right text-xs text-slate-600">
                            {formData.excerpt.length}/220
                        </p>
                    </div>

                    {/* Content */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-300">
                            Story *
                        </label>

                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            rows="12"
                            required
                            className="w-full resize-y rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 leading-7 text-white outline-none transition focus:border-cyan-400"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-300">
                            Category *
                        </label>

                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 text-white outline-none transition focus:border-cyan-400"
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-300">
                            Tags
                        </label>

                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="react, javascript, web development"
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 text-white outline-none transition focus:border-cyan-400"
                        />

                        <p className="mt-2 text-xs text-slate-600">
                            Separate tags with commas.
                        </p>
                    </div>

                    {/* Cover Image */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-300">
                            Cover Image URL
                        </label>

                        <input
                            type="url"
                            name="coverImage"
                            value={formData.coverImage}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 text-white outline-none transition focus:border-cyan-400"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:justify-end">

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    `/posts/${id}`
                                )
                            }
                            className="rounded-full border border-slate-700 px-6 py-3 text-sm font-bold text-slate-300 transition hover:border-slate-500 hover:text-white"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-full bg-cyan-400 px-7 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
                        >
                            {saving
                                ? "Saving Changes..."
                                : "Save Changes →"}
                        </button>

                    </div>
                </form>
            </div>
        </main>
    );
};

export default EditPost;