import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  LogOut,
  Moon,
  UserCircle,
  Sun,
  BarChart3,
} from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { useTheme } from "../../context/useTheme";

const Navbar = () => {
  const { darkMode, setDarkMode } = useTheme();
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card sticky top-4 z-50 mx-auto mt-5 flex w-[96%] items-center justify-between rounded-3xl border border-white/[0.035] bg-white/[0.012] px-4 py-3 backdrop-blur-2xl sm:px-7 sm:py-4"
    >
      {/* LEFT */}

      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <motion.div
          whileHover={{
            rotate: 15,
            scale: 1.08,
          }}
          transition={{ type: "spring", stiffness: 320, damping: 18 }}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-indigo-500 shadow-lg shadow-blue-500/30 sm:h-12 sm:w-12"
        >
          <BarChart3 className="text-white" size={22} />
        </motion.div>

        <Link to="/dashboard" className="min-w-0">
          <h2 className="truncate text-lg font-extrabold sm:text-xl">
            <span className="nav-brand-ai">AI</span>{" "}
            <span className="nav-brand-investment">Investment</span>
          </h2>

          <p className="hidden text-xs text-slate-400 sm:block">
            Research Terminal
          </p>
        </Link>
      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <>
            <Link
              to="/profile"
              className="nav-link-pill hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold transition hover:border-blue-400/30 hover:bg-white/10 sm:flex"
            >
              <UserCircle size={18} />
              {user?.name || "Profile"}
            </Link>

            <motion.button
              whileTap={{ scale: .92 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleLogout}
              transition={{ type: "spring", stiffness: 380, damping: 18 }}
              className="nav-link-pill rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:border-blue-400/30 hover:bg-white/10"
              aria-label="Log out"
              title="Log out"
            >
              <LogOut size={18} />
            </motion.button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="nav-link-pill rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold transition hover:border-blue-400/30 hover:bg-white/10"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="hidden rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-blue-500/30 sm:inline-flex"
            >
              Register
            </Link>
          </>
        )}

        <motion.div
          whileHover={{ y: -2, scale: 1.04 }}
          transition={{ type: "spring", stiffness: 380, damping: 18 }}
          className="nav-candlestick hidden sm:flex"
          aria-hidden="true"
        >
          <span className="nav-candle nav-candle-up nav-candle-one" />
          <span className="nav-candle nav-candle-down nav-candle-two" />
          <span className="nav-candle nav-candle-up nav-candle-three" />
          <span className="nav-candle nav-candle-down nav-candle-four" />
        </motion.div>

        <motion.button
          whileTap={{ scale: .92 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setDarkMode((current) => !current)}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          transition={{ type: "spring", stiffness: 380, damping: 18 }}
          className="nav-link-pill rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:border-blue-400/30 hover:bg-white/10"
        >
          {darkMode ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
        </motion.button>

      </div>
    </motion.nav>
  );
};

export default Navbar;
