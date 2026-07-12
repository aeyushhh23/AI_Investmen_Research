import { useMemo, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
    ArrowRight,
    CirclePlay,
    Eye,
    EyeOff,
    LoaderCircle,
    LockKeyhole,
    Mail,
    ShieldCheck,
    BarChart3,
} from "lucide-react";
import CursorField from "../components/common/CursorField";
import { useAuth } from "../context/useAuth";

const rememberedEmailKey = "ai_investment_remembered_email";

const getErrorMessage = (error) => {
    if (error.response?.data?.message) {
        return error.response.data.message;
    }

    return error.message || "Unable to sign in";
};

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { demoLogin, isAuthenticated, login } = useAuth();

    const [form, setForm] = useState(() => ({
        email: localStorage.getItem(rememberedEmailKey) || "",
        password: "",
        remember: Boolean(localStorage.getItem(rememberedEmailKey)),
    }));
    const [showPassword, setShowPassword] = useState(false);
    const [loadingAction, setLoadingAction] = useState("");
    const [errors, setErrors] = useState({});

    const redirectTo = useMemo(() => {
        return location.state?.from?.pathname || "/dashboard";
    }, [location.state]);

    if (isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    const updateField = (event) => {
        const { name, value, checked, type } = event.target;

        setForm((current) => ({
            ...current,
            [name]: type === "checkbox" ? checked : value,
        }));

        setErrors((current) => ({
            ...current,
            [name]: "",
        }));
    };

    const validate = () => {
        const nextErrors = {};

        if (!form.email.trim()) {
            nextErrors.email = "Email is required";
        }

        if (!form.password) {
            nextErrors.password = "Password is required";
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const submitLogin = async (event) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            setLoadingAction("email");

            await login({
                email: form.email,
                password: form.password,
            });

            if (form.remember) {
                localStorage.setItem(rememberedEmailKey, form.email.trim());
            } else {
                localStorage.removeItem(rememberedEmailKey);
            }

            toast.success("Welcome back");
            navigate(redirectTo, { replace: true });
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setLoadingAction("");
        }
    };

    const submitDemoLogin = async () => {
        try {
            setLoadingAction("demo");
            await demoLogin();
            toast.success("Demo session started");
            navigate(redirectTo, { replace: true });
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setLoadingAction("");
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
                    <Link to="/" className="flex items-center gap-4">
                        <motion.span
                            whileHover={{ rotate: 15, scale: 1.08 }}
                            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-indigo-500 shadow-lg shadow-blue-500/30"
                        >
                            <BarChart3 className="text-white" size={22} />
                        </motion.span>

                        <span>
                            <span className="gradient-text block text-xl font-extrabold">
                                AI Investment
                            </span>
                            <span className="text-xs text-slate-400">
                                Research Terminal
                            </span>
                        </span>
                    </Link>

                    <Link
                        to="/register"
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold transition hover:bg-white/10"
                    >
                        Register
                    </Link>
                </motion.nav>

            <section className="mx-auto grid min-h-[calc(100vh-6.5rem)] w-full max-w-6xl items-center gap-10 py-10 lg:grid-cols-[1fr_460px]">
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
                        Institutional-grade market intelligence, signed and secured.
                    </h1>

                    <p className="hero-copy mt-7 max-w-xl text-lg leading-8 text-slate-400">
                        Access AI-backed equity research, sentiment, financials and
                        export-ready reports from a private trading workspace.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-3">
                        {["JWT secure", "MongoDB users", "Demo ready"].map((item) => (
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

                <motion.form
                    initial={{ opacity: 0, y: 28, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.55 }}
                    onSubmit={submitLogin}
                    className="glass card-hover p-6 sm:p-8"
                >
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
                                Secure access
                            </p>
                            <h2 className="gradient-text mt-3 text-3xl font-black">
                                Welcome back
                            </h2>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
                            <LockKeyhole size={21} className="text-cyan-200" />
                        </div>
                    </div>

                    <div className="space-y-5">
                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-slate-300">
                                Email
                            </span>
                            <div className="auth-input flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition focus-within:border-cyan-300/60">
                                <Mail size={18} className="text-slate-400" />
                                <input
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={updateField}
                                    autoComplete="email"
                                    className="w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-slate-500"
                                    placeholder="you@company.com"
                                />
                            </div>
                            {errors.email && (
                                <span className="mt-2 block text-sm text-red-300">
                                    {errors.email}
                                </span>
                            )}
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-slate-300">
                                Password
                            </span>
                            <div className="auth-input flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition focus-within:border-cyan-300/60">
                                <LockKeyhole size={18} className="text-slate-400" />
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={form.password}
                                    onChange={updateField}
                                    autoComplete="current-password"
                                    className="w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-slate-500"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((current) => !current)}
                                    className="rounded-lg p-1 text-slate-400 transition hover:text-white"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <span className="mt-2 block text-sm text-red-300">
                                    {errors.password}
                                </span>
                            )}
                        </label>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-4 text-sm">
                        <label className="flex items-center gap-2 text-slate-300">
                            <input
                                name="remember"
                                type="checkbox"
                                checked={form.remember}
                                onChange={updateField}
                                className="h-4 w-4 rounded border-white/20 bg-white/10 accent-cyan-400"
                            />
                            Remember me
                        </label>
                        <Link to="/login" className="font-semibold text-cyan-200 hover:text-white">
                            Forgot password?
                        </Link>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={Boolean(loadingAction)}
                        className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-400 px-5 py-4 text-sm font-black text-white shadow-lg shadow-blue-500/25 transition hover:shadow-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loadingAction === "email" ? (
                            <LoaderCircle className="animate-spin" size={18} />
                        ) : (
                            <ArrowRight size={18} />
                        )}
                        Sign in
                    </motion.button>

                    <div className="my-6 flex items-center gap-3">
                        <span className="h-px flex-1 bg-white/10" />
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            or
                        </span>
                        <span className="h-px flex-1 bg-white/10" />
                    </div>

                    <button
                        type="button"
                        onClick={submitDemoLogin}
                        disabled={Boolean(loadingAction)}
                        className="demo-login-button flex w-full items-center justify-center gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/10 px-5 py-4 text-sm font-black transition hover:border-blue-400/50 hover:bg-blue-500/15 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loadingAction === "demo" ? (
                            <LoaderCircle className="animate-spin" size={18} />
                        ) : (
                            <CirclePlay size={18} className="text-cyan-200" />
                        )}
                        Demo login
                    </button>

                    <p className="mt-7 text-center text-sm text-slate-400">
                        New to the terminal?{" "}
                        <Link to="/register" className="font-bold text-cyan-200 hover:text-white">
                            Create an account
                        </Link>
                    </p>
                </motion.form>
            </section>
            </div>
        </main>
    );
};

export default Login;
