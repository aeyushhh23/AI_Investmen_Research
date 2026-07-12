import { useMemo, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
    BarChart3,
    CirclePlay,
    LoaderCircle,
    ShieldCheck,
    Sparkles,
} from "lucide-react";
import CursorField from "../components/common/CursorField";
import { useAuth } from "../context/useAuth";

const getErrorMessage = (error) => {
    if (error.response?.data?.message) {
        return error.response.data.message;
    }

    return error.message || "Unable to start demo session";
};

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { demoLogin, isAuthenticated } = useAuth();
    const [loadingDemo, setLoadingDemo] = useState(false);

    const redirectTo = useMemo(() => {
        return location.state?.from?.pathname || "/dashboard";
    }, [location.state]);

    if (isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    const submitDemoLogin = async () => {
        try {
            setLoadingDemo(true);
            await demoLogin();
            toast.success("Demo session started");
            navigate(redirectTo, { replace: true });
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setLoadingDemo(false);
        }
    };

    return (
        <main className="auth-page relative min-h-screen overflow-hidden px-5 py-5">
            <CursorField />
            <div className="blur-orb orb-left" />
            <div className="blur-orb orb-right" />

            <div className="relative z-10">
                <motion.nav
                    initial={{ opacity: 0, y: -25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="glass-card mx-auto flex w-[96%] max-w-6xl items-center justify-between rounded-3xl border border-white/[0.035] bg-white/[0.012] px-6 py-4 backdrop-blur-2xl"
                >
                    <Link to="/" className="flex min-w-0 items-center gap-4">
                        <motion.span
                            whileHover={{ rotate: 15, scale: 1.08 }}
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-indigo-500 shadow-lg shadow-blue-500/30"
                        >
                            <BarChart3 className="text-white" size={22} />
                        </motion.span>

                        <span className="min-w-0">
                            <span className="block truncate text-xl font-extrabold">
                                <span className="nav-brand-ai">AI</span>{" "}
                                <span className="nav-brand-investment">Investment</span>
                            </span>
                            <span className="text-xs text-slate-400">
                                Research Terminal
                            </span>
                        </span>
                    </Link>
                </motion.nav>

                <section className="mx-auto grid min-h-[calc(100vh-6.5rem)] w-full max-w-6xl items-center gap-10 py-10 lg:grid-cols-[1fr_440px]">
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="hidden lg:block"
                    >
                        <div className="inline-flex items-center gap-3 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                            <p className="hero-eyebrow text-sm font-medium text-blue-300">
                                AI Powered Investment Research Platform
                            </p>
                        </div>

                        <h1 className="gradient-text hero-title mt-10 max-w-2xl text-5xl font-black leading-tight lg:text-6xl">
                            Explore market intelligence instantly.
                        </h1>

                        <p className="hero-copy mt-7 max-w-xl text-lg leading-8 text-slate-400">
                            Launch the demo workspace and try AI-backed equity research,
                            sentiment, financials and export-ready reports without creating
                            an account.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-3">
                            {["Instant access", "Demo ready", "Secure session"].map((item) => (
                                <span
                                    key={item}
                                    className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-slate-300 backdrop-blur-xl"
                                >
                                    <ShieldCheck size={16} className="text-cyan-300" />
                                    {item}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 28, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.55 }}
                        className="glass card-hover p-6 text-center sm:p-8"
                    >
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-blue-500/20 bg-blue-500/10 text-cyan-200">
                            <Sparkles size={28} />
                        </div>

                        <p className="mt-7 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
                            Demo access
                        </p>

                        <h2 className="gradient-text mt-3 text-3xl font-black">
                            Start instantly
                        </h2>

                        <p className="mx-auto mt-4 max-w-sm text-base leading-7 text-slate-400">
                            Use the demo account to enter the research terminal and test the
                            full analysis flow.
                        </p>

                        <button
                            type="button"
                            onClick={submitDemoLogin}
                            disabled={loadingDemo}
                            className="demo-login-button mt-8 flex w-full items-center justify-center gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/10 px-5 py-4 text-sm font-black transition hover:border-blue-400/50 hover:bg-blue-500/15 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {loadingDemo ? (
                                <LoaderCircle className="animate-spin" size={18} />
                            ) : (
                                <CirclePlay size={18} className="text-cyan-200" />
                            )}
                            Demo login
                        </button>
                    </motion.div>
                </section>
            </div>
        </main>
    );
};

export default Login;
