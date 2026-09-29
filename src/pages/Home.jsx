import { Link } from "react-router-dom";

const Home = () => {
    return (
        <main className="min-h-screen bg-slate-950 text-white">

            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

                <div className="absolute -right-32 top-40 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-24 sm:pb-28 sm:pt-32">

                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                            <span className="h-2 w-2 rounded-full bg-cyan-400" />
                            A space for ideas
                        </div>

                        <h1 className="font-['Space_Grotesk'] text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl">
                            Ideas that
                            <span className="block text-cyan-400">
                                start conversations.
                            </span>
                        </h1>

                        <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
                            Read thoughtful stories, share your perspective,
                            and publish ideas that deserve to be heard.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link
                                to="/register"
                                className="rounded-full bg-cyan-400 px-7 py-4 font-bold text-slate-950 transition hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-xl hover:shadow-cyan-400/20"
                            >
                                Start Writing →
                            </Link>

                            <Link
                                to="/posts"
                                className="rounded-full border border-slate-700 px-7 py-4 font-bold text-white transition hover:border-cyan-400 hover:text-cyan-400"
                            >
                                Explore Stories
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Editorial Statement */}
            <section className="border-y border-white/5 bg-slate-900/40">
                <div className="mx-auto max-w-7xl px-6 py-12">
                    <div className="grid gap-8 sm:grid-cols-3">

                        <div>
                            <p className="text-3xl font-black text-cyan-400">
                                01
                            </p>
                            <h3 className="mt-3 font-['Space_Grotesk'] text-xl font-bold">
                                Read
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Discover perspectives from curious minds.
                            </p>
                        </div>

                        <div>
                            <p className="text-3xl font-black text-cyan-400">
                                02
                            </p>
                            <h3 className="mt-3 font-['Space_Grotesk'] text-xl font-bold">
                                Write
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Turn your experiences and ideas into stories.
                            </p>
                        </div>

                        <div>
                            <p className="text-3xl font-black text-cyan-400">
                                03
                            </p>
                            <h3 className="mt-3 font-['Space_Grotesk'] text-xl font-bold">
                                Connect
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Start meaningful conversations through comments.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

        </main>
    );
};

export default Home;