import { motion } from "framer-motion";
import {
  AreaChart,
  TrendingUp,
  CalendarDays,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart as Chart,
  Area,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const StockChart = ({ financials, historical }) => {
  if (!financials) return null;

  const current = Number(financials.currentPrice) || 0;
  const currency = financials.currency || "USD";

  const formatCurrency = (value) => new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);

  const data = Array.isArray(historical?.t)
    ? historical.t.map((time, index) => ({
      day: new Date(time * 1000).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),
      value: Number(historical.c?.[index]),
    })).filter((point) => Number.isFinite(point.value))
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5 }}
      className="
      magnetic-card
      relative
      overflow-hidden
      rounded-[32px]
      border
      border-white/10
      bg-white/5
      backdrop-blur-2xl
      p-8
      shadow-2xl
      hover:border-cyan-500/30
      "
    >
      {/* Glow */}

      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-[140px]" />

      {/* Header */}

      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>

          <div className="flex items-center gap-3">

            <div className="rounded-2xl bg-cyan-500/10 p-3">

              <AreaChart className="text-cyan-400" />

            </div>

            <div>

              <h2 className="text-2xl font-black sm:text-3xl">

                Price Performance

              </h2>

              <p className="text-slate-400">

                Live historical market trend

              </p>

            </div>

          </div>

        </div>

        {/* Time Buttons */}

        <div className="hidden md:flex gap-3">

          {["1D", "1W", "1M", "1Y"].map((item) => (

            <button
              key={item}
              className="
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-4
              py-2
              text-sm
              transition
              hover:bg-cyan-500/20
              hover:border-cyan-500/30
              "
            >
              {item}
            </button>

          ))}

        </div>

      </div>

      {/* Price */}

      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h1 className="break-words text-4xl font-black sm:text-5xl">

            {formatCurrency(current)}

          </h1>

          <div className="mt-2 flex items-center gap-2 text-green-400">

            <TrendingUp size={18} />

            <span>

              {financials.percentChange}% Today

            </span>

          </div>

        </div>

        <div className="hidden lg:flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3">

          <CalendarDays size={18} />

          {financials.marketState || "Live Market"}

        </div>

      </div>

      {/* Chart */}

      <div className="h-[320px] sm:h-[420px]">

        {data.length > 0 ? (

        <ResponsiveContainer width="100%" height="100%">

          <Chart data={data}>

            <defs>

              <linearGradient
                id="gradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="#06b6d4"
                  stopOpacity={0.45}
                />

                <stop
                  offset="100%"
                  stopColor="#06b6d4"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              stroke="rgba(255,255,255,.05)"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#111827",
                border: "1px solid rgba(255,255,255,.1)",
                borderRadius: 18,
                color: "white",
              }}
              formatter={(value) => [formatCurrency(value), "Close"]}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#06b6d4"
              strokeWidth={4}
              fill="url(#gradient)"
            />

          </Chart>

        </ResponsiveContainer>

        ) : (

          <div className="flex h-full items-center justify-center rounded-2xl border border-white/10 bg-slate-950/40 text-slate-400">
            Live historical chart data is unavailable for this symbol.
          </div>

        )}

      </div>

    </motion.div>
  );
};

export default StockChart;
