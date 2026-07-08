import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Shield,
  TrendingUp,
  Activity,
} from "lucide-react";

const icons = {
  "Current Price": DollarSign,
  "Daily Change": TrendingUp,
  "Investment Score": Activity,
  Risk: Shield,
};

const StatsCard = ({
  title,
  value,
  color,
  positive = true,
}) => {
  const Icon = icons[title] || Activity;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{ duration: 0.4 }}
      className="
      relative
      overflow-hidden
      rounded-[28px]
      border
      border-white/10
      bg-white/5
      backdrop-blur-2xl
      p-6
      h-40
      shadow-xl
      hover:border-blue-500/40
      hover:shadow-blue-500/20
      "
    >
      {/* Glow */}

      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-500/10 blur-[90px]" />

      {/* Header */}

      <div className="flex items-center justify-between">

        <div
          className="
          rounded-2xl
          bg-white/5
          p-3
          border
          border-white/10
          "
        >
          <Icon size={22} className={color} />
        </div>

        {title === "Daily Change" && (
          positive ? (
            <ArrowUpRight
              className="text-green-400"
              size={22}
            />
          ) : (
            <ArrowDownRight
              className="text-red-400"
              size={22}
            />
          )
        )}

      </div>

      {/* Label */}

      <p className="mt-6 text-sm uppercase tracking-widest text-slate-400">

        {title}

      </p>

      {/* Value */}

      <h2
        className={`
        mt-2
        text-5xl
        font-black
        ${color}
        `}
      >
        {value}
      </h2>

      {/* Footer */}

      <div className="mt-4 h-1 overflow-hidden rounded-full bg-slate-700">

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: .8 }}
          className={`
          h-full
          ${
            color.includes("green")
              ? "bg-green-400"
              : color.includes("red")
              ? "bg-red-400"
              : color.includes("yellow")
              ? "bg-yellow-400"
              : "bg-blue-500"
          }
          `}
        />

      </div>

    </motion.div>
  );
};

export default StatsCard;