import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { ArrowDownRight, ArrowUpRight, BarChart3, LineChart } from "lucide-react";

const indices = {
    sensex: {
        label: "Sensex",
        symbol: "BSE SENSEX",
        value: "80,604.08",
        change: "+416.95",
        percent: "+0.52%",
        positive: true,
        color: "#10b981",
        gradient: "sensexGradient",
        data: [
            { time: "09:15", value: 80102 },
            { time: "10:00", value: 80244 },
            { time: "10:45", value: 80186 },
            { time: "11:30", value: 80322 },
            { time: "12:15", value: 80278 },
            { time: "13:00", value: 80418 },
            { time: "13:45", value: 80396 },
            { time: "14:30", value: 80502 },
            { time: "15:15", value: 80604 },
        ],
    },
    nifty: {
        label: "Nifty 50",
        symbol: "NSE NIFTY",
        value: "24,585.05",
        change: "-32.40",
        percent: "-0.13%",
        positive: false,
        color: "#ef4444",
        gradient: "niftyGradient",
        data: [
            { time: "09:15", value: 24612 },
            { time: "10:00", value: 24582 },
            { time: "10:45", value: 24622 },
            { time: "11:30", value: 24564 },
            { time: "12:15", value: 24596 },
            { time: "13:00", value: 24541 },
            { time: "13:45", value: 24572 },
            { time: "14:30", value: 24536 },
            { time: "15:15", value: 24585 },
        ],
    },
};

const MarketIndices = () => {
    const [activeIndex, setActiveIndex] = useState("sensex");
    const selected = indices[activeIndex];
    const TrendIcon = selected.positive ? ArrowUpRight : ArrowDownRight;

    const yDomain = useMemo(() => {
        const values = selected.data.map((point) => point.value);
        const min = Math.min(...values);
        const max = Math.max(...values);
        const padding = Math.max((max - min) * 0.25, 40);

        return [Math.floor(min - padding), Math.ceil(max + padding)];
    }, [selected]);

    return (
        <motion.section
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="market-index-section mt-16"
        >
            <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-300">
                        <BarChart3 size={16} />
                        Market Indices
                    </div>

                    <h2 className="mt-5 text-3xl font-black sm:text-4xl">
                        Sensex and Nifty overview
                    </h2>
                </div>

                <div className="market-index-tabs">
                    {Object.entries(indices).map(([key, index]) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => setActiveIndex(key)}
                            className={`market-index-tab ${
                                activeIndex === key ? "market-index-tab-active" : ""
                            }`}
                        >
                            {index.label}
                        </button>
                    ))}
                </div>
            </div>

            <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="market-index-card"
            >
                <div className="market-index-summary">
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="market-index-icon">
                                <LineChart size={22} />
                            </span>

                            <div>
                                <span className="block text-sm font-bold uppercase tracking-[0.22em] text-slate-400">
                                    {selected.symbol}
                                </span>
                                <h3 className="mt-1 text-3xl font-black sm:text-4xl">
                                    {selected.value}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`market-index-change ${
                            selected.positive ? "market-index-up" : "market-index-down"
                        }`}
                    >
                        <TrendIcon size={20} />
                        <span>{selected.change}</span>
                        <span>{selected.percent}</span>
                    </div>
                </div>

                <div className="mt-8 h-[280px] sm:h-[340px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={selected.data}>
                            <defs>
                                <linearGradient
                                    id={selected.gradient}
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="0%"
                                        stopColor={selected.color}
                                        stopOpacity={0.42}
                                    />
                                    <stop
                                        offset="100%"
                                        stopColor={selected.color}
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>

                            <CartesianGrid
                                stroke="rgba(148,163,184,.16)"
                                vertical={false}
                            />
                            <XAxis
                                dataKey="time"
                                stroke="#64748b"
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                domain={yDomain}
                                stroke="#64748b"
                                tickLine={false}
                                axisLine={false}
                                width={76}
                            />
                            <Tooltip
                                contentStyle={{
                                    background: "rgba(15,23,42,.92)",
                                    border: "1px solid rgba(255,255,255,.12)",
                                    borderRadius: 16,
                                    color: "white",
                                }}
                                formatter={(value) => [
                                    Number(value).toLocaleString("en-IN"),
                                    selected.label,
                                ]}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke={selected.color}
                                strokeWidth={4}
                                fill={`url(#${selected.gradient})`}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </motion.section>
    );
};

export default MarketIndices;
