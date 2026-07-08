import { motion } from "framer-motion";
import {
  Search,
  Bell,
  Moon,
  Sun,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="sticky top-4 z-50 mx-auto mt-5 flex w-[96%] items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-7 py-4 backdrop-blur-2xl"
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

      {/* CENTER */}

      <div className="hidden lg:flex w-[42%]">
        <div className="flex w-full items-center rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 transition duration-300 focus-within:border-blue-500/50 focus-within:shadow-lg focus-within:shadow-blue-500/10">
          <Search
            size={18}
            className="mr-3 text-slate-500"
          />

          <input
            placeholder="Search Apple, Tesla, Nvidia..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
          />
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
          onClick={() => setDark(!dark)}
          className="rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10"
        >
          {dark ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
        </motion.button>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2"
        >
          <img
            src="https://ui-avatars.com/api/?background=2563eb&color=fff&name=Ayush"
            alt="avatar"
            className="h-10 w-10 rounded-full"
          />

          <div className="hidden md:block">
            <h3 className="text-sm font-semibold">
              Ayush
            </h3>

            <p className="text-xs text-slate-400">
              Premium User
            </p>
          </div>

          <ChevronDown size={18} />
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;