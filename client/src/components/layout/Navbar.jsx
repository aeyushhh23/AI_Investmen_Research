import { motion } from "framer-motion";
import {
  Bell,
  Moon,
  Sun,
  Sparkles,
} from "lucide-react";
import { useTheme } from "../../context/useTheme";

const Navbar = () => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="glass-card sticky top-4 z-50 mx-auto mt-5 flex w-[96%] items-center justify-between rounded-3xl border border-white/[0.035] bg-white/[0.012] px-7 py-4 backdrop-blur-2xl"
    >
      {/* LEFT */}

      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{
            rotate: 15,
            scale: 1.08,
          }}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-indigo-500 shadow-lg shadow-blue-500/30"
        >
          <Sparkles className="text-white" size={22} />
        </motion.div>

        <div>
          <h2 className="gradient-text text-xl font-extrabold">
            AI Investment
          </h2>

          <p className="text-xs text-slate-400">
            Research Terminal
          </p>
        </div>
      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-3">
        <motion.button
          whileTap={{ scale: .92 }}
          whileHover={{ scale: 1.05 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10"
        >
          <Bell size={18} />
        </motion.button>

        <motion.button
          whileTap={{ scale: .92 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setDarkMode((current) => !current)}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          className="rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10"
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
