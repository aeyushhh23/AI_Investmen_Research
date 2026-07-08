import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  CandlestickChart,
} from "lucide-react";

const FinancialCard = ({ financials }) => {
  if (!financials) return null;

  const metrics = [
    {
      title: "Current Price",
      value: `$${financials.currentPrice ?? "--"}`,
      icon: <DollarSign size={20} />,
      color: "text-green-400",
    },
    {
      title: "Day High",
      value: `$${financials.highPrice ?? "--"}`,
      icon: <TrendingUp size={20} />,
      color: "text-cyan-400",
    },
    {
      title: "Day Low",
      value: `$${financials.lowPrice ?? "--"}`,
      icon: <TrendingDown size={20} />,
      color: "text-red-400",
    },
    {
      title: "Open",
      value: `$${financials.openPrice ?? "--"}`,
      icon: <BarChart3 size={20} />,
      color: "text-yellow-400",
    },
    {
      title: "Previous Close",
      value: `$${financials.previousClose ?? "--"}`,
      icon: <Activity size={20} />,
      color: "text-violet-400",
    },
    {
      title: "Change",
      value: `${financials.percentChange ?? 0}%`,
      icon: <CandlestickChart size={20} />,
      color:
        Number(financials.percentChange) >= 0
          ? "text-green-400"
          : "text-red-400",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="
        relative
        overflow-hidden
        rounded-[30px]
        border
        border-white/10
        bg-white/5
        backdrop-blur-2xl
        p-8
        shadow-2xl
        hover:border-green-500/40
        hover:shadow-green-500/20
      "
    >
      {/* Glow */}

      <div className="absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-green-500/10 blur-[120px]" />

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black">
            Financial Overview
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Real-time market metrics
          </p>
        </div>

        <div className="rounded-2xl bg-green-500/10 p-3">
          <CandlestickChart className="text-green-400" />
        </div>
      </div>

      {/* KPI Grid */}

      <div className="grid grid-cols-2 gap-5">
        {metrics.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.08,
            }}
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/5
              p-5
              transition
              hover:border-green-500/30
              hover:bg-white/10
            "
          >
            <div className="flex items-center justify-between">
              <div className={`${item.color}`}>
                {item.icon}
              </div>

              <span className="text-xs uppercase tracking-wider text-slate-500">
                Live
              </span>
            </div>

            <p className="mt-5 text-sm text-slate-400">
              {item.title}
            </p>

            <h3 className={`mt-2 text-2xl font-black ${item.color}`}>
              {item.value}
            </h3>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FinancialCard;