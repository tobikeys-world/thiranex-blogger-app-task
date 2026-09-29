import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                {/* Logo */}
                <Link
                    to="/"
                    className="group flex items-center gap-3"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 font-black text-slate-950 shadow-lg shadow-cyan-400/20 transition group-hover:rotate-6">
                        I
                    </div>

                    <div>
                        <p className="font-['Space_Grotesk'] text-xl font-bold tracking-tight text-white">
                            INTORAC
                        </p>

                        <p className="hidden text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500 sm:block">
                            Ideas that start conversations
                        </p>
                    </div>
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-3 sm:gap-6">

                    <Link
                        to="/"
                        className="text-sm font-semibold text-slate-300 transition hover:text-cyan-400"
                    >
                        Home
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/posts"
                                className="hidden text-sm font-semibold text-slate-300 transition hover:text-cyan-400 sm:block"
                            >
                                Stories
                            </Link>

                            <Link
                                to="/dashboard"
                                className="hidden text-sm font-semibold text-slate-300 transition hover:text-cyan-400 sm:block"
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/create-post"
                                className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/20"
                            >
                                Write
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="hidden text-sm font-semibold text-slate-400 transition hover:text-red-400 sm:block"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="hidden text-sm font-semibold text-slate-300 transition hover:text-cyan-400 sm:block"
                            >
                                Sign in
                            </Link>

                            <Link
                                to="/register"
                                className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/20"
                            >
                                Start Writing
                            </Link>
                        </>
                    )}

                </div>
            </nav>
        </header>
    );
};

export default Navbar;